use anchor_lang::prelude::*;
pub mod buy_node; 

declare_id!("6kgSdKsaQGrWMVrCgp7RmXX7pnqVnDZ5JDJjTDvC2j62");

#[program]
pub mod solana_contracts 
{
    use super::*;

    pub fn initialize(ctx: Context<InitializeContext>) -> Result<()> {
        let owner_account = &mut ctx.accounts.owner_account; 
        if owner_account.owner_pubkey == Pubkey::default() 
        {
            owner_account.owner_pubkey = ctx.accounts.caller.key();
        }
        else 
        {
            return Err(ProgramError::Custom(0).into());
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeContext<'info> 
{
    #[account(init, payer = caller, space = 8 + 32)]
    pub owner_account: Account<'info, Owner>, 

    #[account(mut)]
    pub caller: Signer<'info>, 
    pub system_program: Program<'info, System>, 
}

#[account]
pub struct Owner 
{
    pub owner_pubkey: Pubkey, 
}