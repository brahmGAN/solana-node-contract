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
        owner_account.owner_pubkey = ctx.accounts.caller.key();
        owner_init_account.owner_initialized = true; 
        Ok(())
    }

    pub fn add_early_sale_addresses(ctx: Context<AddEarlySaleContext>, addresses: Vec<Pubkey>) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require! (owner_account.owner_pubkey == ctx.accounts.caller.key(), ErrorCode::NotAuthorized);    
            for user in addresses 
            {
                let in_early_sale_account = &mut ctx.accounts.in_early_sale_account;
                in_early_sale_account.in_early_sale = true; 
            }
        Ok(())
    }

    pub fn buy_node(ctx: Context<BuyNodeContext>, quantity:u64, amount:u64,tier_number: u64) -> Result<()>
    {
        let tier_limit_account = &mut ctx.accounts.tier_limit_account; 
        let early_sale_status_account = &ctx.accounts.early_sale_status_account; 
        let tier_price_account = &ctx.accounts.tier_price_account;
        let in_early_sale_account = &ctx.accounts.in_early_sale_account;
        let total_nodes_held_account = &mut ctx.accounts.total_nodes_held_account; 
        let funds_handler_account = &ctx.accounts.funds_handler_account;

        require!(quantity <= tier_limit_account.tier_limit[tier_number as usize],ErrorCode::QuantityOutOfBounds);
        require!(tier_number < 12 && tier_number > 0,ErrorCode::TierLimit);   
            if early_sale_status_account.early_sale_status
            {
                require!(in_early_sale_account.in_early_sale,ErrorCode::EarlySale);
                require!(amount == ( quantity * tier_price_account.tier_price[tier_number as usize]),ErrorCode::IncorrectAmount);
                let ix = system_instruction::transfer
                (   &ctx.accounts.caller.key(), 
                    &funds_handler_account.funds_handler.key(),
                    amount 
                );

                anchor_lang::solana_program::program::invoke
                (   &ix, 
                    &[
                        ctx.accounts.caller.to_account_info(),
                        funds_handler_account.to_account_info(),        
                     ],
                )?;

                total_nodes_held_account.total_nodes_held += 1;
                tier_limit_account.tier_limit[tier_number as usize] -= 1;         
            }
            else
            {
                require!(amount == ( quantity * tier_price_account.tier_price[tier_number as usize]),ErrorCode::IncorrectAmount);
                require!(tier_limit_account.tier_limit[tier_number as usize] > 0,ErrorCode::TierLimit);
                let ix = system_instruction::transfer
                (   &ctx.accounts.caller.key(), 
                    &funds_handler_account.funds_handler.key(),
                    amount 
                );

                anchor_lang::solana_program::program::invoke
                (   &ix, 
                    &[
                        ctx.accounts.caller.to_account_info(),
                        funds_handler_account.to_account_info(),        
                     ],
                )?;

                total_nodes_held_account.total_nodes_held += 1;
                tier_limit_account.tier_limit[tier_number as usize] -= 1;         
            }
        emit!(NodeBoughtEvent{
            caller: *ctx.accounts.caller.key,
            quantity: quantity,
            amount: amount,
            tier_number: tier_number,
            total_nodes_held: total_nodes_held_account.total_nodes_held,
            pending_tier_limit: tier_limit_account.tier_limit[tier_number as usize] 
        });
        Ok(())
    }

    /// @dev Setter functions
    pub fn set_funds_handler(ctx: Context<SetFundsHandlerContext>,new_funds_handler: Pubkey) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.caller.key(),ErrorCode::NotAuthorized);
        let funds_handler_account = &mut ctx.accounts.funds_handler_account;
        funds_handler_account.funds_handler = new_funds_handler; 
        emit!(FundsHandlerEvent{
            funds_handler: new_funds_handler
        });
        Ok(())
    }

    pub fn set_early_sale_status(ctx: Context<SetEarlySaleContext>, sale_status: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.caller.key(),ErrorCode::NotAuthorized);
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
        require!(owner_account.owner_pubkey == ctx.accounts.caller.key(),ErrorCode::NotAuthorized);
        let tier_limit_account = &mut ctx.accounts.tier_limit_account;
        require!(tier_number < 12 && tier_number > 0,ErrorCode::TierLimit);
        tier_limit_account.tier_limit[tier_number as usize] = new_tier_limit;
        emit!(TierLimitEvent{
            tier_limit: new_tier_limit,
            tier_number: tier_number
        });
        Ok(())
    }

    pub fn set_tier_price(ctx: Context<SetTierPriceContext>,new_price:u64,tier_number: u64) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.caller.key(),ErrorCode::NotAuthorized);
        let tier_price_account = &mut ctx.accounts.tier_price_account; 
        tier_price_account.tier_price[tier_number as usize] = new_price;
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
        emit!(FundsHandlerEvent{
            funds_handler: funds_handler_account.funds_handler.key()
        });
        Ok(())
    }

    pub fn get_early_sale_status(ctx: Context<GetEarlySaleStatusContext>) -> Result<()>
    {
        let early_sale_status_account = &ctx.accounts.early_sale_status_account;
        emit!(EarlySaleStatusEvent{
            early_sale_status: early_sale_status_account.early_sale_status
        }); 
        Ok(())
    }

    pub fn get_tier_limit(ctx: Context<GetTierLimitContext>,tier_number: u64) -> Result<()>
    {
        let tier_limit_account = &ctx.accounts.tier_limit_account;
        emit!(TierLimitEvent{
            tier_limit: tier_limit_account.tier_limit[tier_number as usize],
            tier_number: tier_number
        });
        Ok(())
    }

    pub fn get_tier_price(ctx: Context<GetTierPriceContext>,tier_number: u64) -> Result<()>
    {
        let tier_price_account = &ctx.accounts.tier_price_account;
        emit!(TierPriceEvent{
            tier_price: tier_price_account.tier_price[tier_number as usize],
            tier_number: tier_number
        });
        Ok(())
    }

    pub fn get_owner(ctx: Context<GetOwnerContext>) -> Result<()> 
    {
        let owner_account = &ctx.accounts.owner_account;
        emit!(OwnerEvent{
            owner: owner_account.owner_pubkey.key()
        });
        Ok(())
    }

    pub fn get_total_nodes_held(ctx: Context<GetTotalNodesHeldContext>) -> Result<()> 
    {
        let nodes_bought_account = &ctx.accounts.nodes_bought_account;
        emit!(TotalNodesHeldEvent{
            total_nodes_held: nodes_bought_account.total_nodes_held
        });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeContext<'info> 
{
    #[account(
        init, 
        payer = caller, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,

    #[account(
        init, 
        payer = caller, 
        seeds = [b"owner_init_account"], 
        bump,
        space = size_of::<OwnerInit>() + 16
    )]
    pub owner_init_account: Account<'info, OwnerInit>,  

    #[account(mut)]
    pub caller: Signer<'info>, 
    pub system_program: Program<'info, System>, 
}

#[derive(Accounts)]
#[instruction(user: Pubkey)]
pub struct AddEarlySaleContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed,
        payer = caller,
        seeds = [user.key().as_ref()], 
        bump,
        space = size_of::<InEarlySale>() + 16
    )]
    pub in_early_sale_account: Account<'info, InEarlySale>, 

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)] 
pub struct BuyNodeContext<'info> 
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"tier_limit_account"], 
        bump,
        space = size_of::<TierLimit>() + 16
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"early_sale_status_account"], 
        bump,
        space = size_of::<EarlySaleStatus>() + 16
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>, 

    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"tier_price_account"], 
        bump,
        space = size_of::<TierPrice>() + 16
    )]
    pub tier_price_account: Account<'info,TierPrice>,

    #[account(
        init_if_needed,
        payer = caller,
        seeds = [caller.key().as_ref()], 
        bump,
        space = size_of::<InEarlySale>() + 16
    )]
    pub in_early_sale_account: Account<'info, InEarlySale>,

    #[account(
        init_if_needed,
        payer = caller,
        seeds = [caller.key.as_ref()], 
        bump,
        space = size_of::<TotalNodesHeld>() + 16
    )]
    pub total_nodes_held_account: Account<'info, TotalNodesHeld>,

    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"funds_handler_account"], 
        bump,
        space = size_of::<FundsHandler>() + 16
    )]
    pub funds_handler_account: Account<'info,FundsHandler>,

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SetFundsHandlerContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"funds_handler_account"], 
        bump,
        space = size_of::<FundsHandler>() + 16
    )]
    pub funds_handler_account: Account<'info,FundsHandler>,

    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SetEarlySaleContext<'info> 
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,

    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"early_sale_status_account"], 
        bump,
        space = size_of::<EarlySaleStatus>() + 16
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>,    

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SetTierLimitContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"tier_limit_account"], 
        bump,
        space = size_of::<TierLimit>() + 16
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SetTierPriceContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"tier_price_account"], 
        bump,
        space = size_of::<TierPrice>() + 16
    )]
    pub tier_price_account: Account<'info,TierPrice>,

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetFundsHandlerContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"funds_handler_account"], 
        bump,
        space = size_of::<FundsHandler>() + 16
    )]
    pub funds_handler_account: Account<'info,FundsHandler>,

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetEarlySaleStatusContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"early_sale_status_account"], 
        bump,
        space = size_of::<EarlySaleStatus>() + 16
    )]
    pub early_sale_status_account: Account<'info, EarlySaleStatus>,

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetTierLimitContext<'info>
{ 
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"tier_limit_account"], 
        bump,
        space = size_of::<TierLimit>() + 16
    )]
    pub tier_limit_account: Account<'info,TierLimit>,

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetTierPriceContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"tier_limit_account"], 
        bump,
        space = size_of::<TierPrice>() + 16
    )]
    pub tier_price_account: Account<'info,TierPrice>,

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetOwnerContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [b"owner"], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct GetTotalNodesHeldContext<'info>
{
    #[account(
        init_if_needed, 
        payer = caller, 
        seeds = [caller.key.as_ref()], 
        bump,
        space = size_of::<TotalNodesHeld>() + 16
    )]
    pub nodes_bought_account: Account<'info, TotalNodesHeld>,

    #[account(mut)]
    pub caller: Signer<'info>,
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
    pub tier_limit: Vec<u64>
} 

#[account]
pub struct TierPrice
{
    pub tier_price: Vec<u64>
}

#[account]
pub struct DiscountTierPrice
{
    pub discount_tier_price: Vec<u64>
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
    pub caller: Pubkey,
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