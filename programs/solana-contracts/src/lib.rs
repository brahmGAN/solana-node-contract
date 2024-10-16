use anchor_lang::{prelude::*, solana_program::system_instruction};
use std::mem::size_of;

declare_id!("6kgSdKsaQGrWMVrCgp7RmXX7pnqVnDZ5JDJjTDvC2j62");

#[program]
pub mod solana_contracts 
{
    use super::*;

    pub fn initialize(ctx: Context<InitializeContext>, tier_number: u64) -> Result<()> 
    {
        let owner_account = &mut ctx.accounts.owner_account;
        let owner_init_account = &mut ctx.accounts.owner_init_account;
        let current_tier_number_account = &mut ctx.accounts.current_tier_number_account; 
        require! (!owner_init_account.owner_initialized, ErrorCode::AlreadyInitialized);
        owner_account.owner_pubkey = ctx.accounts.payer.key();
        owner_init_account.owner_initialized = true; 
        current_tier_number_account.current_tier_number = tier_number; 
        emit!(OwnerEvent{
            owner: owner_account.owner_pubkey.key()
        });
        msg!("Owner:initialize: {}",owner_account.owner_pubkey);
        msg!("Owner init status: {}",owner_init_account.owner_initialized);
        Ok(())
    }

    pub fn add_whitelist_addresses(ctx: Context<AddWhitelistContext>, user:Pubkey) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(), ErrorCode::NotAuthorized);    
        let whitelist_account = &mut ctx.accounts.whitelist_account;
        whitelist_account.in_early_sale = true;
        emit!(WhitelistEvent{
            whitelist_address: user.key(), 
            in_early_sale: whitelist_account.in_early_sale
        });
        msg!("Whitelist address:{}",user.key());
        msg!("White list address: in early sale:{}",whitelist_account.in_early_sale); 
        Ok(())
    }

    /// @dev Add and remove a discount code by switching the boolean
    /// @dev `gpunet` is a reserved discount code string to signify no discount code is being used 
    pub fn discount_code(ctx: Context<DiscountCodeContext>, discount_code: String, discount_code_status: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require! (owner_account.owner_pubkey == ctx.accounts.payer.key(), ErrorCode::NotAuthorized); 
        let discount_code_account = &mut ctx.accounts.discount_code_account; 
        discount_code_account.discount_code = discount_code_status;
        msg!("Discount code:{}",discount_code);
        emit!(DiscountCodeEvent{
            discount_code: discount_code,
            discount_code_status: discount_code_account.discount_code
        });
        msg!("Discount code status:{}",discount_code_account.discount_code);
        Ok(())
    }

    pub fn buy_node(ctx: Context<BuyNodeContext>, tier_number:String, discount_code:String, quantity:u64) -> Result<()>
    {
        let tier_limit_account = &mut ctx.accounts.tier_limit_account; 
        let early_sale_status_account = &ctx.accounts.early_sale_status_account; 
        let tier_price_account = &ctx.accounts.tier_price_account;
        let whitelist_account = &ctx.accounts.whitelist_account;
        let total_nodes_held_account = &mut ctx.accounts.total_nodes_held_account;
        let discount_code_account = &ctx.accounts.discount_code_account;
        let current_tier_number_account = &mut ctx.accounts.current_tier_number_account;
        let amount:u64;
        let tier_price:u64;

        if discount_code_account.discount_code == true 
        {
            tier_price =  (tier_price_account.tier_price * 10 ) / 100; 
        }
        else
        {
            tier_price = tier_price_account.tier_price;
        }
        amount = quantity * tier_price;

        let tier_num:u64 = match tier_number.as_str()
        {
            "one" => 1, 
            "two" => 2, 
            "three" => 3,
            "four" => 4,
            "five" => 5,
            "six" => 6,
            "seven" => 7,
            "eight" => 8,
            "nine" => 9,
            "ten" => 10,
            "eleven" => 11,
            _ => 69,    
        };

        require!(tier_num != 69,ErrorCode::TierLimit);
        require!(tier_num == current_tier_number_account.current_tier_number,ErrorCode::IncorrectTier);
        require!(quantity <= tier_limit_account.tier_limit, ErrorCode::QuantityOutOfBounds);
        require!(ctx.accounts.payer.lamports() > amount, ErrorCode::InsufficientBalance);
        if early_sale_status_account.early_sale_status
        {
            require!(whitelist_account.in_early_sale,ErrorCode::EarlySale);
            let ix = system_instruction::transfer
            (   
                &ctx.accounts.payer.key(), 
                &ctx.accounts.funds_handler_account.key(), 
                amount 
            );

            anchor_lang::solana_program::program::invoke
            (   
                &ix, 
                &[
                    ctx.accounts.payer.to_account_info(),
                    ctx.accounts.funds_handler_account.to_account_info(), 
                 ],
            )?;       
        }
        else
        {
            let ix = system_instruction::transfer
            (   
                &ctx.accounts.payer.key(), 
                &ctx.accounts.funds_handler_account.key(), 
                amount 
            );

            anchor_lang::solana_program::program::invoke
            (   
                &ix, 
                &[
                    ctx.accounts.payer.to_account_info(),
                    ctx.accounts.funds_handler_account.to_account_info(),        
                 ],
            )?;
        }

        total_nodes_held_account.total_nodes_held += quantity;
        tier_limit_account.tier_limit -= quantity; 

        if tier_limit_account.tier_limit == 0
        {
            current_tier_number_account.current_tier_number += 1;
        }
        msg!("discount_code:{}",discount_code);
        emit!(NodeBoughtEvent{
            user: *ctx.accounts.payer.key,
            quantity: quantity,
            amount: amount,
            tier_number: tier_num,
            total_nodes_held: total_nodes_held_account.total_nodes_held,
            pending_tier_limit: tier_limit_account.tier_limit,
            discount_code: discount_code
        });
        msg!("user:{}",*ctx.accounts.payer.key);
        msg!("quantity:{}",quantity);
        msg!("amount:{}",amount);
        msg!("tier_number:{}",tier_number);
        msg!("total_nodes_held:{}",total_nodes_held_account.total_nodes_held);
        msg!("pending_tier_limit:{}",tier_limit_account.tier_limit);
        Ok(())
    }

    /// @dev Setter functions
    pub fn set_early_sale_status(ctx: Context<SetEarlySaleContext>, sale_status: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let early_sale_status_account = &mut ctx.accounts.early_sale_status_account;
        early_sale_status_account.early_sale_status = early_sale_status_account.early_sale_status; 
        emit!(EarlySaleStatusEvent{
            early_sale_status: sale_status
        });
        msg!("early_sale_status:{}",early_sale_status_account.early_sale_status);
        Ok(())
    }

    pub fn set_tier_limit(ctx: Context<SetTierLimitContext>,tier_number: String, new_tier_limit: u64) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let tier_num:u64 = match tier_number.as_str()
        {
            "one" => 1, 
            "two" => 2, 
            "three" => 3,
            "four" => 4,
            "five" => 5,
            "six" => 6,
            "seven" => 7,
            "eight" => 8,
            "nine" => 9,
            "ten" => 10,
            "eleven" => 11,
            _ => 69,    
        };
        let tier_limit_account = &mut ctx.accounts.tier_limit_account;
        require!(tier_num != 69,ErrorCode::TierLimit);
        tier_limit_account.tier_limit = new_tier_limit;
        emit!(TierLimitEvent{
            tier_limit: tier_limit_account.tier_limit,
            tier_number: tier_num
        });
        msg!("tier_limit:{}",tier_limit_account.tier_limit);
        msg!("tier_number:{}",tier_number);
        Ok(())
    }

    pub fn set_tier_price(ctx: Context<SetTierPriceContext>,tier_number: String, new_price:u64) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let tier_price_account = &mut ctx.accounts.tier_price_account; 
        tier_price_account.tier_price = new_price;
        let tier_num:u64 = match tier_number.as_str()
        {
            "one" => 1, 
            "two" => 2, 
            "three" => 3,
            "four" => 4,
            "five" => 5,
            "six" => 6,
            "seven" => 7,
            "eight" => 8,
            "nine" => 9,
            "ten" => 10,
            "eleven" => 11,
            _ => 69,    
        };
        emit!(TierPriceEvent{
            tier_price: tier_price_account.tier_price,
            tier_number: tier_num
        });
        msg!("tier_price:{}",tier_price_account.tier_price);
        msg!("tier_number:{}",tier_number);
        Ok(())
    }

    /// @dev Getter functions 

    pub fn get_early_sale_status(ctx: Context<GetEarlySaleStatusContext>) -> Result<()>
    {
        let early_sale_status_account = &ctx.accounts.early_sale_status_account;
        msg!("Early sale status:{}",early_sale_status_account.early_sale_status);
        emit!(EarlySaleStatusEvent{
            early_sale_status: early_sale_status_account.early_sale_status
        }); 
        Ok(())
    }

    pub fn get_tier_limit(ctx: Context<GetTierLimitContext>,tier_number: String) -> Result<()>
    {
        let tier_limit_account = &ctx.accounts.tier_limit_account;
        let tier_num:u64 = match tier_number.as_str()
        {
            "one" => 1, 
            "two" => 2, 
            "three" => 3,
            "four" => 4,
            "five" => 5,
            "six" => 6,
            "seven" => 7,
            "eight" => 8,
            "nine" => 9,
            "ten" => 10,
            "eleven" => 11,
            _ => 69,    
        };
        emit!(TierLimitEvent{
            tier_limit: tier_limit_account.tier_limit,
            tier_number: tier_num
        });
        msg!("Tier limit:{}",tier_limit_account.tier_limit);
        msg!("Tier number:{}",tier_num);
        Ok(())
    }

    pub fn get_tier_price(ctx: Context<GetTierPriceContext>,tier_number: String) -> Result<()>
    {
        let tier_price_account = &ctx.accounts.tier_price_account;
        let tier_num:u64 = match tier_number.as_str()
        {
            "one" => 1, 
            "two" => 2, 
            "three" => 3,
            "four" => 4,
            "five" => 5,
            "six" => 6,
            "seven" => 7,
            "eight" => 8,
            "nine" => 9,
            "ten" => 10,
            "eleven" => 11,
            _ => 69,    
        };
        emit!(TierPriceEvent{
            tier_price: tier_price_account.tier_price,
            tier_number: tier_num
        });
        msg!("Tier price:{}",tier_price_account.tier_price);
        msg!("Tier number:{}",tier_num);
        Ok(())
    }

    pub fn get_owner(ctx: Context<GetOwnerContext>) -> Result<()> 
    {
        let owner_account = &mut ctx.accounts.owner_account;
        emit!(OwnerEvent{
            owner: owner_account.owner_pubkey.key()
        });
        msg!("owner:getOwner: {}",owner_account.owner_pubkey);
        Ok(())
    }

    pub fn get_total_nodes_held(ctx: Context<GetTotalNodesHeldContext>, user: Pubkey) -> Result<()> 
    {
        let total_nodes_held_account = &ctx.accounts.total_nodes_held_account;
        emit!(TotalNodesHeldEvent{
            user: user,
            total_nodes_held: total_nodes_held_account.total_nodes_held
        });
        msg!("User:{}",user);
        msg!("Total nodes held:{}",total_nodes_held_account.total_nodes_held);
        Ok(())
    }

    pub fn get_discount_code_status(ctx: Context<GetDiscountCodeContext>, discount_code: String) -> Result<()>
    {
        let discount_code_account = &ctx.accounts.discount_code_account;
        emit!(DiscountCodeEvent{
            discount_code: discount_code,
            discount_code_status: discount_code_account.discount_code
        });
        msg!("Discount code status:{}", discount_code_account.discount_code);
        Ok(())
    }

    pub fn get_whitelist_user_status(ctx: Context<GetWhitelistContext>, user: Pubkey) -> Result<()>
    {
        let whitelist_account = &mut ctx.accounts.whitelist_account;
        emit!(WhitelistEvent{
            whitelist_address: user,
            in_early_sale: whitelist_account.in_early_sale
        });
        msg!("in early sale,{}",whitelist_account.in_early_sale); 
        Ok(())
    }

    pub fn get_current_tier_number(ctx: Context<GetCurrentTierNumberContext>) -> Result<()>
    {
        let current_tier_number_account = &ctx.accounts.current_tier_number_account;
        emit!(GetCurrentTierNumberEvent{
            current_tier_number: current_tier_number_account.current_tier_number
        });
        msg!("Current Tier Number:{}",current_tier_number_account.current_tier_number);
        Ok(())
    }
    
}

#[derive(Accounts)]
pub struct InitializeContext<'info> 
{
    #[account(
        init, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 8
    )]
    pub owner_account: Account<'info, Owner>,

    #[account(
        init, 
        payer = payer, 
        seeds = [b"owner_init_account"], 
        bump,
        space = size_of::<OwnerInit>() + 8
    )]
    pub owner_init_account: Account<'info, OwnerInit>, 

    #[account(
        init, 
        payer = payer, 
        seeds = [b"current_tier_number_account"], 
        bump,
        space = size_of::<CurrentTierNumber>() + 8
    )]
    pub current_tier_number_account: Account<'info, CurrentTierNumber>,  

    #[account(mut)]
    pub payer: Signer<'info>, 
    pub system_program: Program<'info, System>, 
}

#[derive(Accounts)]
#[instruction(user: Pubkey)]
pub struct AddWhitelistContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 8
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [user.key().as_ref(),b"whitelist_account"], 
        bump,
        space = size_of::<InEarlySale>() + 8
    )]
    pub whitelist_account: Account<'info, InEarlySale>, 

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(discount_code: String)]
pub struct DiscountCodeContext<'info> 
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 8
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed, 
        payer = payer,
        seeds = [discount_code.as_bytes()],
        bump,
        space = size_of::<DiscountCode>() + 8
    )]
    pub discount_code_account: Account<'info,DiscountCode>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)] 
#[instruction(tier_number:String, discount_code:String)]
pub struct BuyNodeContext<'info> 
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [tier_number.as_bytes(),b"tier_limit_account"], 
        bump,
        space = size_of::<TierLimit>() + 8
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"early_sale_status_account"], 
        bump,
        space = size_of::<EarlySaleStatus>() + 8
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>, 

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [tier_number.as_bytes(),b"tier_price_account"],
        bump,
        space = size_of::<TierPrice>() + 8
    )]
    pub tier_price_account: Account<'info,TierPrice>,

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [payer.key().as_ref(),b"whitelist_account"], 
        bump,
        space = size_of::<InEarlySale>() + 8
    )]
    pub whitelist_account: Account<'info, InEarlySale>,

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [payer.key.as_ref(),b"total_nodes_held_account"], 
        bump,
        space = size_of::<TotalNodesHeld>() + 8
    )]
    pub total_nodes_held_account: Account<'info, TotalNodesHeld>,

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"current_tier_number_account"], 
        bump,
        space = size_of::<CurrentTierNumber>() + 8
    )]
    pub current_tier_number_account: Account<'info, CurrentTierNumber>,

    #[account(mut)]
    pub funds_handler_account: SystemAccount<'info>,

    #[account(
        init_if_needed, 
        payer = payer,
        seeds = [discount_code.as_bytes()],
        bump,
        space = size_of::<DiscountCode>() + 8
    )]
    pub discount_code_account: Account<'info,DiscountCode>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SetEarlySaleContext<'info> 
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 8
    )]
    pub owner_account: Account<'info, Owner>,

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"early_sale_status_account"], 
        bump,
        space = size_of::<EarlySaleStatus>() + 8
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>,    

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(tier_number:String)]
pub struct SetTierLimitContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 8
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [tier_number.as_bytes(),b"tier_limit_account"],
        bump,
        space = size_of::<TierLimit>() + 8
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(tier_number:String)]
pub struct SetTierPriceContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 8
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [tier_number.as_bytes(),b"tier_price_account"],
        bump,
        space = size_of::<TierPrice>() + 8
    )]
    pub tier_price_account: Account<'info,TierPrice>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetEarlySaleStatusContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"early_sale_status_account"], 
        bump,
        space = size_of::<EarlySaleStatus>() + 8
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(tier_number:String)]
pub struct GetTierLimitContext<'info>
{ 
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [tier_number.as_bytes(),b"tier_limit_account"],
        bump,
        space = size_of::<TierLimit>() + 8
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(tier_number:String)]
pub struct GetTierPriceContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [tier_number.as_bytes(),b"tier_price_account"],
        bump,
        space = size_of::<TierPrice>() + 8
    )]
    pub tier_price_account: Account<'info,TierPrice>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetOwnerContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 8
    )]
    pub owner_account: Account<'info, Owner>, 

    #[account(mut)]
    pub payer: Signer<'info>, 
    pub system_program: Program<'info, System>, 
}

#[derive(Accounts)]
#[instruction(user: Pubkey)]
pub struct GetTotalNodesHeldContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [user.as_ref(),b"total_nodes_held_account"], 
        bump,
        space = size_of::<TotalNodesHeld>() + 8
    )]
    pub total_nodes_held_account: Account<'info, TotalNodesHeld>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(discount_code: String)]
pub struct GetDiscountCodeContext<'info> 
{
    #[account(
        init_if_needed, 
        payer = payer,
        seeds = [discount_code.as_bytes()],
        bump,
        space = size_of::<DiscountCode>() + 8
    )]
    pub discount_code_account: Account<'info,DiscountCode>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(user: Pubkey)]
pub struct GetWhitelistContext<'info>
{
    #[account(
        init_if_needed,
        payer = payer, 
        seeds = [user.key().as_ref(),b"whitelist_account"],
        bump,
        space = size_of::<InEarlySale>() + 8
    )]
    pub whitelist_account: Account<'info,InEarlySale>, 

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetCurrentTierNumberContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"current_tier_number_account"], 
        bump,
        space = size_of::<CurrentTierNumber>() + 8
    )]
    pub current_tier_number_account: Account<'info, CurrentTierNumber>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[account]
pub struct Owner 
{
    pub owner_pubkey: Pubkey,
}

#[account]
pub struct OwnerInit
{
    pub owner_initialized:bool
}

#[account]
pub struct EarlySaleStatus
{
    pub early_sale_status: bool,
}

#[account]
pub struct TotalNodesHeld
{
    pub total_nodes_held: u64
}

#[account]
pub struct InEarlySale
{
    pub in_early_sale: bool
}

#[account]
pub struct TierLimit
{
    pub tier_limit: u64
} 

#[account]
pub struct TierPrice
{
    pub tier_price: u64
}

#[account] 
pub struct DiscountCode
{
    pub discount_code: bool
}

#[account] 
pub struct CurrentTierNumber
{
    pub current_tier_number: u64
}

//EVENTS

#[event]
pub struct OwnerEvent
{
    pub owner: Pubkey
}

#[event]
pub struct WhitelistEvent
{
    pub whitelist_address: Pubkey, 
    pub in_early_sale: bool
}

#[event]
pub struct DiscountCodeEvent
{
    pub discount_code: String, 
    pub discount_code_status: bool
}

#[event]
pub struct NodeBoughtEvent
{
    pub user: Pubkey,
    pub quantity: u64, 
    pub amount: u64,
    pub tier_number: u64,
    pub total_nodes_held: u64,
    pub pending_tier_limit: u64,
    pub discount_code: String
}

#[event]
pub struct FundsHandlerEvent
{
    pub funds_handler: Pubkey
}

#[event]
pub struct EarlySaleStatusEvent
{
    pub early_sale_status: bool,
}

#[event]
pub struct TierLimitEvent
{
    pub tier_limit: u64,
    pub tier_number: u64
}

#[event]
pub struct TierPriceEvent
{
    pub tier_price:u64,
    pub tier_number: u64
}

#[event]
pub struct TotalNodesHeldEvent
{
    pub user: Pubkey,
    pub total_nodes_held: u64
}


#[event]
pub struct GetCurrentTierNumberEvent
{
    pub current_tier_number: u64
}

#[error_code]
pub enum ErrorCode 
{
    #[msg("Already initialized!")]
    AlreadyInitialized,

    #[msg("Not Authorized!")]
    NotAuthorized,

    #[msg("Out of tier limits!")]
    TierLimit, 

    #[msg("Quantity is more than the available nodes in the tier!")]
    QuantityOutOfBounds, 

    #[msg("Not part of early sale!")]
    EarlySale, 

    #[msg("Incorrect Amount!")]
    IncorrectAmount,

    #[msg("Insufficient Balance!")]
    InsufficientBalance,

    #[msg("Incorrect Tier!")]
    IncorrectTier,
}