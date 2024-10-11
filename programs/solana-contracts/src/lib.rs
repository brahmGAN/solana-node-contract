use anchor_lang::{prelude::*, solana_program::system_instruction};
use std::mem::size_of;

declare_id!("6kgSdKsaQGrWMVrCgp7RmXX7pnqVnDZ5JDJjTDvC2j62");

#[program]
pub mod solana_contracts 
{
    use super::*;

    pub fn initialize(ctx: Context<InitializeContext>) -> Result<()> 
    {
        let owner_account = &mut ctx.accounts.owner_account;
        let owner_init_account = &mut ctx.accounts.owner_init_account; 
        require! (!owner_init_account.owner_initialized, ErrorCode::AlreadyInitialized);
        msg!("Before:owner:initialize: {}",owner_account.owner_pubkey);
        owner_account.owner_pubkey = ctx.accounts.payer.key();
        msg!("Before:owner init status:initialize: {}",owner_init_account.owner_initialized);
        owner_init_account.owner_initialized = true; 
        emit!(OwnerEvent{
            owner: owner_account.owner_pubkey.key()
        });
        msg!("After:owner:initialize: {}",owner_account.owner_pubkey);
        msg!("After:owner init status:initialize: {}",owner_init_account.owner_initialized);
        Ok(())
    }

    pub fn add_whitelist_addresses(ctx: Context<AddWhitelistContext>, user:Pubkey) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require! (owner_account.owner_pubkey == ctx.accounts.payer.key(), ErrorCode::NotAuthorized);    
        let whitelist_account = &mut ctx.accounts.whitelist_account;
        whitelist_account.in_early_sale = true; 
        Ok(())
    }

    /// @dev Add and remove a discount code by switching the boolean 
    pub fn discount_code(ctx: Context<DiscountCodeContext>, discount_code: String, discount_code_status: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require! (owner_account.owner_pubkey == ctx.accounts.payer.key(), ErrorCode::NotAuthorized); 
        let discount_code_account = &mut ctx.accounts.discount_code_account; 
        discount_code_account.discount_code = discount_code_status;
        Ok(())
    }

    pub fn buy_node(ctx: Context<BuyNodeContext>, quantity:u64,amounts:u64, tier_number: u64, discount_code: String) -> Result<()>
    {
        let tier_limit_account = &mut ctx.accounts.tier_limit_account; 
        let early_sale_status_account = &ctx.accounts.early_sale_status_account; 
        let tier_price_account = &ctx.accounts.tier_price_account;
        let whitelist_account = &ctx.accounts.whitelist_account;
        let total_nodes_held_account = &mut ctx.accounts.total_nodes_held_account; 
        let funds_handler_account = &ctx.accounts.funds_handler_account;
        let discount_code_account = &ctx.accounts.discount_code_account;
        let amount = &mut amounts;

        if discount_code_account.discount_code == true 
        {
            amount = (amount * 10) / 100; 
        }

        require!(quantity <= tier_limit_account.tier_limit,ErrorCode::QuantityOutOfBounds);
        require!(tier_number < 12 && tier_number > 0,ErrorCode::TierLimit);   
            if early_sale_status_account.early_sale_status
            {
                require!(whitelist_account.in_early_sale,ErrorCode::EarlySale);
                require!(amount == ( quantity * tier_price_account.tier_price),ErrorCode::IncorrectAmount);
                let ix = system_instruction::transfer
                (   &ctx.accounts.payer.key(), 
                    &funds_handler_account.funds_handler.key(),
                    amount 
                );

                anchor_lang::solana_program::program::invoke
                (   &ix, 
                    &[
                        ctx.accounts.payer.to_account_info(),
                        funds_handler_account.to_account_info(),        
                     ],
                )?;

                total_nodes_held_account.total_nodes_held += 1;
                tier_limit_account.tier_limit -= 1;         
            }
            else
            {
                require!(amount == ( quantity * tier_price_account.tier_price),ErrorCode::IncorrectAmount);
                require!(tier_limit_account.tier_limit > 0,ErrorCode::TierLimit);
                let ix = system_instruction::transfer
                (   &ctx.accounts.payer.key(), 
                    &funds_handler_account.funds_handler.key(),
                    amount 
                );

                anchor_lang::solana_program::program::invoke
                (   &ix, 
                    &[
                        ctx.accounts.payer.to_account_info(),
                        funds_handler_account.to_account_info(),        
                     ],
                )?;

                total_nodes_held_account.total_nodes_held += 1;
                tier_limit_account.tier_limit -= 1;         
            }
        emit!(NodeBoughtEvent{
            payer: *ctx.accounts.payer.key,
            quantity: quantity,
            amount: amount,
            tier_number: tier_number,
            total_nodes_held: total_nodes_held_account.total_nodes_held,
            pending_tier_limit: tier_limit_account.tier_limit
        });
        Ok(())
    }

    /// @dev Setter functions
    pub fn set_funds_handler(ctx: Context<SetFundsHandlerContext>,new_funds_handler: Pubkey) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        msg!("owner:Set funds handler: {}",owner_account.owner_pubkey);
        require!(owner_account.owner_pubkey.key() == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let funds_handler_account = &mut ctx.accounts.funds_handler_account;
        funds_handler_account.funds_handler = new_funds_handler;
        msg!("New funds handler:{}",funds_handler_account.funds_handler.key()); 
        emit!(FundsHandlerEvent{
            funds_handler: funds_handler_account.funds_handler.key()
        });
        Ok(())
    }

    pub fn set_early_sale_status(ctx: Context<SetEarlySaleContext>, sale_status: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let early_sale_status_account = &mut ctx.accounts.early_sale_status_account;
        early_sale_status_account.early_sale_status = sale_status; 
        emit!(EarlySaleStatusEvent{
            early_sale_status: sale_status
        });
        Ok(())
    }

    pub fn set_tier_limit(ctx: Context<SetTierLimitContext>,new_tier_limit: u64,tier_number: u64) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let tier_limit_account = &mut ctx.accounts.tier_limit_account;
        require!(tier_number < 12 && tier_number > 0,ErrorCode::TierLimit);
        tier_limit_account.tier_limit = new_tier_limit;
        emit!(TierLimitEvent{
            tier_limit: new_tier_limit,
            tier_number: tier_number
        });
        Ok(())
    }

    pub fn set_tier_price(ctx: Context<SetTierPriceContext>,new_price:u64,tier_number: u64) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let tier_price_account = &mut ctx.accounts.tier_price_account; 
        tier_price_account.tier_price = new_price;
        emit!(TierPriceEvent{
            tier_price: new_price,
            tier_number: tier_number
        });
        Ok(())
    }

    /// @dev Getter functions 
    pub fn get_funds_handler(ctx: Context<GetFundsHandlerContext>) -> Result<()>
    {
        let funds_handler_account = &ctx.accounts.funds_handler_account;
        msg!("Funds handler:{}",funds_handler_account.funds_handler.key());
        emit!(FundsHandlerEvent{
            funds_handler: funds_handler_account.funds_handler.key()
        });
        Ok(())
    }

    pub fn get_early_sale_status(ctx: Context<GetEarlySaleStatusContext>) -> Result<()>
    {
        let early_sale_status_account = &ctx.accounts.early_sale_status_account;
        msg!("Early sale status:{}",early_sale_status_account.early_sale_status);
        emit!(EarlySaleStatusEvent{
            early_sale_status: early_sale_status_account.early_sale_status
        }); 
        Ok(())
    }

    pub fn get_tier_limit(ctx: Context<GetTierLimitContext>,tier_number: u64) -> Result<()>
    {
        let tier_limit_account = &ctx.accounts.tier_limit_account;
        msg!("Tier limit:{}\nTier number:{}",tier_limit_account.tier_limit,tier_number);
        emit!(TierLimitEvent{
            tier_limit: tier_limit_account.tier_limit,
            tier_number: tier_number
        });
        Ok(())
    }

    pub fn get_tier_price(ctx: Context<GetTierPriceContext>,tier_number: u64) -> Result<()>
    {
        let tier_price_account = &ctx.accounts.tier_price_account;
        msg!("Tier price:{}\nTier number:{}",tier_price_account.tier_price,tier_number);
        emit!(TierPriceEvent{
            tier_price: tier_price_account.tier_price,
            tier_number: tier_number
        });
        Ok(())
    }

    pub fn get_owner(ctx: Context<GetOwnerContext>) -> Result<()> 
    {
        let owner_account = &mut ctx.accounts.owner_account;
        msg!("owner:getOwner: {}",owner_account.owner_pubkey);
        emit!(OwnerEvent{
            owner: owner_account.owner_pubkey.key()
        });
        Ok(())
    }

    pub fn get_total_nodes_held(ctx: Context<GetTotalNodesHeldContext>) -> Result<()> 
    {
        let nodes_bought_account = &ctx.accounts.nodes_bought_account;
        msg!("Total nodes held:{}",nodes_bought_account.total_nodes_held);
        emit!(TotalNodesHeldEvent{
            total_nodes_held: nodes_bought_account.total_nodes_held
        });
        Ok(())
    }

    pub fn get_whitelist_user(ctx: Context<GetWhitelistContext>) -> Result<()>
    {
        let whitelist_account = &mut ctx.accounts.whitelist_account;
        msg!("Get in early sale,{}",whitelist_account.in_early_sale); 
        Ok(())
    }

    pub fn get_discount_code(ctx: Context<GetDiscountCodeContext>, discount_code: String) -> Result<()>
    {
        let discount_code_account = &ctx.accounts.discount_code_account;
        msg!("Discount code status:{}", discount_code_account.discount_code);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct GetWhitelistContext<'info>
{
    #[account(
        init_if_needed,
        payer = payer, 
        seeds = [payer.key().as_ref()],
        bump,
        space = size_of::<InEarlySale>() + 16
    )]
    pub whitelist_account: Account<'info,InEarlySale>, 

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct InitializeContext<'info> 
{
    #[account(
        init, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 32
    )]
    pub owner_account: Account<'info, Owner>,

    #[account(
        init, 
        payer = payer, 
        seeds = [b"owner_init_account"], 
        bump,
        space = size_of::<OwnerInit>() + 16
    )]
    pub owner_init_account: Account<'info, OwnerInit>,  

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
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [user.key().as_ref()], 
        bump,
        space = size_of::<InEarlySale>() + 16
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
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed, 
        payer = payer,
        seeds = [discount_code.as_bytes()],
        bump,
        space = size_of::<DiscountCode>() + 16
    )]
    pub discount_code_account: Account<'info,DiscountCode>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)] 
#[instruction(tier_number:u64, discount_code:String)]
pub struct BuyNodeContext<'info> 
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [&tier_number.to_le_bytes()], 
        bump,
        space = size_of::<TierLimit>() + 16
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"early_sale_status_account"], 
        bump,
        space = size_of::<EarlySaleStatus>() + 16
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>, 

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [&tier_number.to_le_bytes()], 
        bump,
        space = size_of::<TierPrice>() + 16
    )]
    pub tier_price_account: Account<'info,TierPrice>,

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [payer.key().as_ref()], 
        bump,
        space = size_of::<InEarlySale>() + 16
    )]
    pub whitelist_account: Account<'info, InEarlySale>,

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [payer.key.as_ref()], 
        bump,
        space = size_of::<TotalNodesHeld>() + 16
    )]
    pub total_nodes_held_account: Account<'info, TotalNodesHeld>,

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"funds_handler_account"], 
        bump,
        space = size_of::<FundsHandler>() + 16
    )]
    pub funds_handler_account: Account<'info,FundsHandler>,

    #[account(
        init_if_needed, 
        payer = payer,
        seeds = [discount_code.as_bytes()],
        bump,
        space = size_of::<DiscountCode>() + 16
    )]
    pub discount_code_account: Account<'info,DiscountCode>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SetFundsHandlerContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"funds_handler_account"], 
        bump,
        space = size_of::<FundsHandler>() + 16
    )]
    pub funds_handler_account: Account<'info,FundsHandler>,

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

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
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"early_sale_status_account"], 
        bump,
        space = size_of::<EarlySaleStatus>() + 16
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>,    

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(tier_number:u64)]
pub struct SetTierLimitContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [&tier_number.to_le_bytes()], 
        bump,
        space = size_of::<TierLimit>() + 16
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(tier_number:u64)]
pub struct SetTierPriceContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [&tier_number.to_le_bytes()], 
        bump,
        space = size_of::<TierPrice>() + 16
    )]
    pub tier_price_account: Account<'info,TierPrice>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetFundsHandlerContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"funds_handler_account"], 
        bump,
        space = size_of::<FundsHandler>() + 16
    )]
    pub funds_handler_account: Account<'info,FundsHandler>,

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
        space = size_of::<EarlySaleStatus>() + 16
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(tier_number:u64)]
pub struct GetTierLimitContext<'info>
{ 
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [&tier_number.to_le_bytes()], 
        bump,
        space = size_of::<TierLimit>() + 16
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(tier_number:u64)]
pub struct GetTierPriceContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [&tier_number.to_le_bytes()], 
        bump,
        space = size_of::<TierPrice>() + 16
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
        space = size_of::<Owner>() + 32
    )]
    pub owner_account: Account<'info, Owner>, 

    #[account(mut)]
    pub payer: Signer<'info>, 
    pub system_program: Program<'info, System>, 
}

#[derive(Accounts)]
pub struct GetTotalNodesHeldContext<'info>
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [payer.key.as_ref()], 
        bump,
        space = size_of::<TotalNodesHeld>() + 16
    )]
    pub nodes_bought_account: Account<'info, TotalNodesHeld>,

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
        space = size_of::<DiscountCode>() + 16
    )]
    pub discount_code_account: Account<'info,DiscountCode>,

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
pub struct FundsHandler
{
    pub funds_handler: Pubkey
}

#[account] 
pub struct DiscountCode
{
    pub discount_code: bool
}

//EVENTS
#[event]
pub struct NodeBoughtEvent
{
    pub payer: Pubkey,
    pub quantity: u64, 
    pub amount: u64,
    pub tier_number: u64,
    pub total_nodes_held: u64,
    pub pending_tier_limit: u64
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
pub struct OwnerEvent
{
    pub owner: Pubkey
}

#[event]
pub struct TotalNodesHeldEvent
{
    pub total_nodes_held: u64
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
}