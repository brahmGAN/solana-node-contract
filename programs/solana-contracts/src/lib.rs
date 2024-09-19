use anchor_lang::{prelude::*, solana_program::{program::invoke_signed, system_instruction}};
use std::mem::size_of;

declare_id!("6kgSdKsaQGrWMVrCgp7RmXX7pnqVnDZ5JDJjTDvC2j62");

#[program]
pub mod solana_contracts 
{
    use super::*;

    pub fn initialize(ctx: Context<InitializeContext>) -> Result<()> {
        let owner_account = &mut ctx.accounts.owner_account; 
        require! (!owner_account.lock, ErrorCode::AlreadyInitialized);
        
            owner_account.owner_pubkey = ctx.accounts.caller.key();
            owner_account.lock = true; 
        
        Ok(())
    }

    pub fn add_early_sale_addresses(ctx: Context<BuyNodeContext>, addresses: Vec<Pubkey>) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        if owner_account.owner_pubkey == ctx.accounts.caller.key()
        { 
            for user in addresses 
            {
                let (pda, bump) = Pubkey::find_program_address(
                    &[user.key().as_ref()], 
                    &ID,                         
                );
                invoke_signed(
                    &system_instruction::create_account(
                        &ctx.accounts.caller.key, 
                        &pda.key(), 
                        1000000000,
                        10000,
                        &ID 
                    ),
                    &[
                        ctx.accounts.caller.to_account_info().clone(),
                        ctx.accounts.set_pda_account.to_account_info().clone()
                    ],
                    &[&[&user.key().as_ref(), &[bump]]]
                )?;
            }
        }
        Ok(())  
    }

    pub fn buy_node(ctx: Context<BuyNodeContext>, quantity:u64, amount:u64) -> Result<()>
    {
        let buy_node_account = &mut ctx.accounts.buy_node_account;
        if buy_node_account.early_sale_status 
        {
            let (pda, _bump) = Pubkey::find_program_address(
                &[ctx.accounts.caller.key.as_ref()], 
                &ID,
            );

            let check_pda_account = &ctx.accounts.check_pda_account; 

            if check_pda_account.key() == pda
            {
                if amount == ( quantity * buy_node_account.//node_price) 
                {
                    let ix = system_instruction::transfer
                    (   &ctx.accounts.caller.key(), 
                        &buy_node_account.funds_handler.key(),
                        amount
                    );

                    anchor_lang::solana_program::program::invoke
                    (   &ix, 
                        &[
                            ctx.accounts.caller.to_account_info(),
                            buy_node_account.to_account_info(),        
                        ],
                    )?;
                } 
            }
        }
        else
        {
            if amount == ( quantity * buy_node_account.//node_price) 
                {
                    let ix = system_instruction::transfer
                    (   &ctx.accounts.caller.key(), 
                        &buy_node_account.funds_handler.key(), 
                        amount
                    );

                    anchor_lang::solana_program::program::invoke
                    (   &ix, 
                        &[
                            ctx.accounts.caller.to_account_info(),
                            buy_node_account.to_account_info(),          
                        ],
                    )?;
                } 
        }
        emit!(NodeBought{
            caller: *ctx.accounts.caller.key,
            quantity: quantity,
            amount: amount
        });
        Ok(())
    }

    /// @dev Setter functions
    pub fn set_funds_handler(ctx: Context<BuyNodeContext>,new_funds_handler: Pubkey) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        if owner_account.owner_pubkey == ctx.accounts.caller.key()
        {
            let buy_node_account = &mut ctx.accounts.buy_node_account;
            buy_node_account.funds_handler = new_funds_handler; 
            
        }
        else 
        {
            return Err(ProgramError::Custom(0).into());
        }
        Ok(())
    }

    pub fn set_early_sale_status(ctx: Context<BuyNodeContext>, sale_type: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        if owner_account.owner_pubkey == ctx.accounts.caller.key()
        {
            let buy_node_account = &mut ctx.accounts.buy_node_account;
            buy_node_account.early_sale_status = sale_type; 
        }
        else
        {
            return Err(ProgramError::Custom(0).into());
        }
        Ok(())
    }

    pub fn set_tier_limit(ctx: Context<TierContext>,new_tier_limit: u64,tier_number: u64) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        if owner_account.owner_pubkey == ctx.accounts.caller.key()
        {
            let tier_account = &ctx.accounts.tier_account; 
            let buy_node_account = &mut ctx.accounts.buy_node_account;
            buy_node_account.//node_tier_limit = new_tier_limit; 
        }
        else
        {
            return Err(ProgramError::Custom(0).into());
        }
        Ok(())
    }

    pub fn set_//node_price(ctx: Context<BuyNodeContext>,price:u64) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        // if owner_account.owner_pubkey == ctx.accounts.caller.key()
        // {
            let buy_node_account = &mut ctx.accounts.buy_node_account; 
            buy_node_account.//node_price = price; 
        //}
        Ok(())
    }

    /// @dev Getter functions 
    pub fn get_funds_handler(ctx: Context<BuyNodeContext>) -> Result<Pubkey>
    {
        let buy_node_account = &ctx.accounts.buy_node_account;
        Ok(buy_node_account.funds_handler)
    }

    pub fn get_//node_tier_limit(ctx: Context<BuyNodeContext>) -> Result<u64>
    {
        let buy_node_account = &ctx.accounts.buy_node_account;
        Ok(buy_node_account.//node_tier_limit)
    }

    pub fn get_early_sale_status(ctx: Context<BuyNodeContext>) -> Result<bool>
    {
        let buy_node_account = &ctx.accounts.buy_node_account; 
        Ok(buy_node_account.early_sale_status)
    }

    pub fn get_//node_price(ctx: Context<BuyNodeContext>) -> Result<u64>
    {
        let buy_node_account = &ctx.accounts.buy_node_account;
        Ok(buy_node_account.//node_price)
    }

    pub fn get_owner(ctx: Context<BuyNodeContext>) -> Result<Pubkey> {
        let owner_account = &ctx.accounts.owner_account;
        Ok(owner_account.owner_pubkey)
    }
}

#[derive(Accounts)]
pub struct InitializeContext<'info> 
{
    #[account(
        init, 
        payer = caller, 
        seeds = [caller.key.as_ref()], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(mut)]
    pub caller: Signer<'info>, 
    pub system_program: Program<'info, System>, 
}

#[account]
pub struct Owner 
{
    pub owner_pubkey: Pubkey,
    pub lock:bool
}

#[derive(Accounts)] 
#[instruction(user: Pubkey)]
pub struct BuyNodeContext<'info> 
{
    #[account(init, payer = caller, space = 8 + 32)]
    pub buy_node_account: Account<'info,BuyNode>,

    #[account(mut)]
    pub owner_account: Account<'info,Owner>,

    #[account(
        init,
        payer = caller,
        seeds = [user.key().as_ref()], 
        bump,
        space = size_of::<BuyNode>() + 16
    )]
    pub set_pda_account: Account<'info, BuyNode>,  

    #[account(
        init,
        payer = caller,
        seeds = [caller.key().as_ref()], 
        bump,
        space = size_of::<BuyNode>() + 16
    )]
    pub check_pda_account: Account<'info, BuyNode>,  

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[account]
pub struct BuyNode
{
    pub funds_handler: Pubkey,
    pub early_sale_status: bool,
}

#[derive(Accounts)]
pub struct TierContext<'info>
{
    #[account(
        init, 
        payer = caller, 
        seeds = [b"tier_account"], 
        bump,space = size_of::<Tier>() + 16
    )]
    pub tier_account: Account<'info,Tier>,

    #[account(
        init, 
        payer = caller, 
        seeds = [caller.key.as_ref()], 
        bump,
        space = size_of::<Owner>() + 16
    )]
    pub owner_account: Account<'info, Owner>,  

    #[account(mut)]
    pub caller: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[account]
pub struct Tier
{
    pub tier_limit: Vec<u128>,
    pub tier_price: Vec<u128>
}

#[event]
pub struct NodeBought
{
    pub caller: Pubkey,
    pub quantity: u64, 
    pub amount: u64
}

#[error_code]
pub enum ErrorCode 
{
    #[msg("Alreay initialized!")]
    AlreadyInitialized
}