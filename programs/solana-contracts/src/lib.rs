use anchor_lang::{prelude::*, solana_program::system_instruction};
use std::mem::size_of;

declare_id!("6kgSdKsaQGrWMVrCgp7RmXX7pnqVnDZ5JDJjTDvC2j62");

#[program]
pub mod solana_contracts 
{
    use super::*;

    pub fn initialize(ctx: Context<InitializeContext>, tier_number: u64, funds_handler: Pubkey) -> Result<()> 
    {
        let owner_account = &mut ctx.accounts.owner_account;
        let node_sale_account = &mut ctx.accounts.node_sale_account; 
        require! (!owner_account.owner_initialized, ErrorCode::AlreadyInitialized);
        owner_account.owner_pubkey = ctx.accounts.payer.key();
        owner_account.owner_initialized = true; 
        node_sale_account.current_tier_number = tier_number; 
        node_sale_account.funds_handler = funds_handler; 
        emit!(InitializeEvent{
            owner: owner_account.owner_pubkey.key(), 
            owner_initialized: owner_account.owner_initialized, 
            current_tier_number: node_sale_account.current_tier_number, 
            funds_handler: node_sale_account.funds_handler.key() 
        });
        msg!("Owner: {}",owner_account.owner_pubkey);
        msg!("Owner init status: {}",owner_account.owner_initialized);
        msg!("Current tier number: {}", node_sale_account.current_tier_number);
        msg!("Funds handler: {}", node_sale_account.funds_handler);
        Ok(())
    }

    pub fn set_tier_limit(ctx: Context<SetNodeSaleContext>, tier_limit: Vec<u64>) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let node_sale_account = &mut ctx.accounts.node_sale_account;
        node_sale_account.tier_limit = tier_limit;
        emit!(SetTierLimitEvent{
            tier_limit: node_sale_account.tier_limit.clone(),
        });
        msg!("tier_limit:{:#?}",node_sale_account.tier_limit);
        Ok(())
    }

    pub fn set_tier_price(ctx: Context<SetNodeSaleContext>, tier_price:Vec<u64>) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let node_sale_account = &mut ctx.accounts.node_sale_account; 
        node_sale_account.tier_price = tier_price;
        emit!(SetTierPriceEvent{
            tier_price: node_sale_account.tier_price.clone(),
        });
        msg!("tier_price:{:#?}",node_sale_account.tier_price);
        Ok(())
    }

    pub fn set_funds_handler(ctx: Context<SetNodeSaleContext>, funds_handler: Pubkey) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(), ErrorCode::NotAuthorized); 
        let node_sale_account = &mut ctx.accounts.node_sale_account; 
        node_sale_account.funds_handler = funds_handler; 
        emit!(FundsHandlerEvent{
            funds_handler: node_sale_account.funds_handler
        });
        msg!("Funds handler:{}",node_sale_account.funds_handler);
        Ok(())
    }

    pub fn set_sale_status(ctx: Context<SetNodeSaleContext>, sale_type:u8, sale_status: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account; 
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let sale_type_str: String;
        let node_sale_account = &mut ctx.accounts.node_sale_account;
        if sale_type == 0 
        {
            node_sale_account.early_sale_status = sale_status; 
            sale_type_str = "Early sale".to_string();
        }
        else if sale_type == 1 
        {
            node_sale_account.white_list_1_sale = sale_status;
            sale_type_str = "White list-1 sale".to_string();
        }
        else 
        {
            node_sale_account.gpu_net_sale = sale_status;
            sale_type_str = "GPU net sale".to_string();
        } 
        msg!("sale_type:{}",sale_type_str);
        msg!("sale_status:{}",sale_status);
        emit!(SaleStatusEvent{
            sale_type: sale_type_str,
            sale_status: sale_status
        });
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

    pub fn add_whitelist_addresses(ctx: Context<SetUserContext>, user: Pubkey, list_number: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(), ErrorCode::NotAuthorized);    
        let user_account = &mut ctx.accounts.user_account;
        user_account.in_early_sale = true;
        // @dev if list_number = true then the user is part of whitelist 1,else they're part of whitelist 2
        if list_number 
        {
            user_account.in_white_list_1 = true; 
        }
        emit!(WhitelistEvent{
            whitelist_address: user.key(), 
            in_early_sale: user_account.in_early_sale, 
            in_white_list_1: user_account.in_white_list_1
        });
        msg!("Whitelist address:{}",user.key());
        msg!("In early sale:{}",user_account.in_early_sale); 
        msg!("Whitelist number:{}",user_account.in_white_list_1); 
        Ok(())
    }

    pub fn buy_node(ctx: Context<BuyNodeContext>, discount_code:String, quantity:u64) -> Result<()>
    {
        let node_sale_account = &mut ctx.accounts.node_sale_account; 
        let user_account = &mut ctx.accounts.user_account; 
        let discount_code_account = &ctx.accounts.discount_code_account;
        let funds_handler_pubkey = &ctx.accounts.funds_handler_pubkey; 
        let amount:u64;
        let tier_price:u64;
        let current_tier_price:u64; 
        let current_tier_number:u64;
        let mut nodes_bought: bool = false;
        let mut sale_type: String = String::new();
        
        require!(node_sale_account.early_sale_status || node_sale_account.gpu_net_sale, ErrorCode::SaleYetToBegin);

        current_tier_number = node_sale_account.current_tier_number; 
        current_tier_price = node_sale_account.tier_price[current_tier_number as usize];

        if discount_code_account.discount_code == true 
        {
            tier_price =  (current_tier_price * 90 ) / 100; 
        }
        else
        {
            tier_price = current_tier_price;
        }

        amount = quantity * tier_price;

        require!(quantity <= node_sale_account.tier_limit[current_tier_number as usize], ErrorCode::QuantityOutOfBounds);
        require!(node_sale_account.funds_handler.key() == funds_handler_pubkey.key(), ErrorCode::UnauthorizedFundsHandler);
        require!(ctx.accounts.payer.lamports() > amount, ErrorCode::InsufficientBalance);
        // @dev Turn this on to true at 2pm.Turn this off at 6pm.From 6pm the sale on magic eden happens for tier-5,6,7,8.  
        if node_sale_account.early_sale_status
        {
            require!(user_account.in_early_sale,ErrorCode::EarlySale);
            // @dev Turn this on to true at 2pm. Switch this off to false at 3pm.  
            if node_sale_account.white_list_1_sale  
            {
                require!(user_account.in_white_list_1,ErrorCode::WhiteList);
                require!(current_tier_number == 1, ErrorCode::ReservedForNextSale);  
                let ix = system_instruction::transfer
                (   
                    &ctx.accounts.payer.key(), 
                    &ctx.accounts.funds_handler_pubkey.key(), 
                    amount 
                );

                anchor_lang::solana_program::program::invoke
                (   
                    &ix, 
                    &[
                        ctx.accounts.payer.to_account_info(),
                        ctx.accounts.funds_handler_pubkey.to_account_info(), 
                    ],
                )?;
                
                user_account.total_nodes_held += quantity;
                node_sale_account.tier_limit[current_tier_number as usize] -= quantity;
                nodes_bought = true; 
                sale_type = "White list-1 sale".to_string();
            }
            else 
            {
                require!(current_tier_number < 5, ErrorCode::ReservedForNextSale); 
                let ix = system_instruction::transfer
                (   
                    &ctx.accounts.payer.key(), 
                    &ctx.accounts.funds_handler_pubkey.key(), 
                    amount 
                );

                anchor_lang::solana_program::program::invoke
                (   
                    &ix, 
                    &[
                        ctx.accounts.payer.to_account_info(),
                        ctx.accounts.funds_handler_pubkey.to_account_info(), 
                    ],
                )?;
                
                user_account.total_nodes_held += quantity;
                node_sale_account.tier_limit[current_tier_number as usize] -= quantity;
                nodes_bought = true;
                sale_type = "White list-2 sale".to_string();
            }
                  
        }
        // @dev Turn this on to true at next day 6pm. This is never turned off
        else if node_sale_account.gpu_net_sale
        {
            let ix = system_instruction::transfer
            (   
                &ctx.accounts.payer.key(), 
                &ctx.accounts.funds_handler_pubkey.key(), 
                amount 
            );

            anchor_lang::solana_program::program::invoke
            (   
                &ix, 
                &[
                    ctx.accounts.payer.to_account_info(),
                    ctx.accounts.funds_handler_pubkey.to_account_info(),        
                 ],
            )?;

            user_account.total_nodes_held += quantity;
            node_sale_account.tier_limit[current_tier_number as usize] -= quantity;
            nodes_bought = true;
            sale_type = "GPU sale".to_string();
        } 

        if node_sale_account.tier_limit[current_tier_number as usize] == 0
        {
            // @dev Use this if-else block if Magic eden handles sale of Tier-5,6,7,8
            if current_tier_number == 4
            {
                node_sale_account.current_tier_number = 9;
            }
            else 
            {
                node_sale_account.current_tier_number += 1;
            }

            // @dev Use this block if GPU.net handles sale of Tier 5 6 7 8 
            //node_sale_account.current_tier_number += 1;
        }

        if nodes_bought 
        {
            msg!("discount_code:{}",discount_code);
            msg!("sale_type:{}",sale_type);
            emit!(NodeBoughtEvent{
                user: *ctx.accounts.payer.key,
                quantity: quantity,
                amount: amount,
                tier_number: current_tier_number,
                total_nodes_held: user_account.total_nodes_held,
                pending_tier_limit: node_sale_account.tier_limit[current_tier_number as usize],
                discount_code: discount_code, 
                sale_type: sale_type
            });
            msg!("user:{}",*ctx.accounts.payer.key);
            msg!("quantity:{}",quantity);
            msg!("amount:{}",amount);
            msg!("tier_number:{}",current_tier_number);
            msg!("total_nodes_held:{}",user_account.total_nodes_held);
            msg!("pending_tier_limit:{}",node_sale_account.tier_limit[current_tier_number as usize]); 
        }
        Ok(())
    }

    /// @dev Getter functions 

    pub fn get_early_sale_status(ctx: Context<GetNodeSaleContext>) -> Result<()>
    {
        let node_sale_account = &ctx.accounts.node_sale_account;
        msg!("Early sale status:{}",node_sale_account.early_sale_status);
        emit!(SaleStatusEvent{
            sale_type: "Early sale".to_string(),
            sale_status: node_sale_account.early_sale_status
        }); 
        Ok(())
    }

    pub fn get_white_list_one_sale(ctx: Context<GetNodeSaleContext>) -> Result<()>
    {
        let node_sale_account = &ctx.accounts.node_sale_account;
        msg!("White list 1 sale status:{}",node_sale_account.white_list_1_sale);
        emit!(SaleStatusEvent{
            sale_type: "Whitelist-1 sale".to_string(),
            sale_status: node_sale_account.white_list_1_sale
        }); 
        Ok(())
    }

    pub fn get_gpu_net_sale(ctx: Context<GetNodeSaleContext>) -> Result<()>
    {
        let node_sale_account = &ctx.accounts.node_sale_account;
        msg!("GPU Net sale status:{}",node_sale_account.gpu_net_sale);
        emit!(SaleStatusEvent{
            sale_type: "GPU net sale".to_string(),
            sale_status: node_sale_account.gpu_net_sale
        }); 
        Ok(())
    }

    pub fn get_tier_limit(ctx: Context<GetNodeSaleContext>, tier_number:u64) -> Result<()>
    {
        let node_sale_account = &ctx.accounts.node_sale_account;
        emit!(GetTierLimitEvent{
            tier_number: tier_number,
            tier_limit: node_sale_account.tier_limit[tier_number as usize]
        });
        msg!("Tier number:{}",tier_number);
        msg!("tier_limit:{}",node_sale_account.tier_limit[tier_number as usize]);
        Ok(())
    }

    pub fn get_tier_price(ctx: Context<GetNodeSaleContext>, tier_number:u64) -> Result<()>
    {
        let node_sale_account = &ctx.accounts.node_sale_account;
        emit!(GetTierPriceEvent{
            tier_number: tier_number,
            tier_price: node_sale_account.tier_price[tier_number as usize],
        });
        msg!("Tier number:{}",tier_number);
        msg!("Tier price:{}",node_sale_account.tier_price[tier_number as usize]);
        Ok(())
    }

    pub fn get_owner(ctx: Context<GetOwnerContext>) -> Result<()> 
    {
        let owner_account = &mut ctx.accounts.owner_account;
        emit!(OwnerEvent{
            owner: owner_account.owner_pubkey.key(),
            owner_init_status: owner_account.owner_initialized 
        });
        msg!("Owner: {}",owner_account.owner_pubkey);
        msg!("Owner init status: {}",owner_account.owner_initialized);
        Ok(())
    }

    pub fn get_funds_handler(ctx: Context<GetNodeSaleContext>) -> Result<()> 
    {
        let node_sale_account = &ctx.accounts.node_sale_account; 
        emit!(FundsHandlerEvent{
            funds_handler: node_sale_account.funds_handler.key() 
        });
        msg!("Funds handler: {}",node_sale_account.funds_handler.key());
        Ok(())
    }

    pub fn get_total_nodes_held(ctx: Context<GetUserContext>, user: Pubkey) -> Result<()> 
    {
        let user_account = &ctx.accounts.user_account;
        emit!(TotalNodesHeldEvent{
            user: user,
            total_nodes_held: user_account.total_nodes_held
        });
        msg!("User:{}",user);
        msg!("Total nodes held:{}",user_account.total_nodes_held);
        Ok(())
    }

    pub fn get_discount_code_status(ctx: Context<GetDiscountCodeContext>, discount_code: String) -> Result<()>
    {
        let discount_code_account = &ctx.accounts.discount_code_account;
        msg!("Discount code:{}",discount_code);
        emit!(DiscountCodeEvent{
            discount_code: discount_code,
            discount_code_status: discount_code_account.discount_code
        });
        msg!("Discount code status:{}", discount_code_account.discount_code);
        Ok(())
    }

    pub fn get_whitelist_user_status(ctx: Context<GetUserContext>, user: Pubkey) -> Result<()>
    {
        let user_account = &mut ctx.accounts.user_account;
        emit!(WhitelistEvent{
            whitelist_address: user,
            in_early_sale: user_account.in_early_sale, 
            in_white_list_1: user_account.in_white_list_1
        });
        msg!("Address:{}",user.key());
        msg!("In early sale:{}",user_account.in_early_sale); 
        msg!("In whitelist 1:{}",user_account.in_white_list_1); 
        Ok(())
    }

    pub fn get_current_tier_number(ctx: Context<GetNodeSaleContext>) -> Result<()>
    {
        let node_sale_account = &ctx.accounts.node_sale_account;
        emit!(GetCurrentTierNumberEvent{
            current_tier_number: node_sale_account.current_tier_number
        });
        msg!("Current Tier Number:{}",node_sale_account.current_tier_number);
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
        seeds = [b"node_sale_account"],
        bump,
        space = size_of::<NodeSale>() + 8 + 240
    )]
    pub node_sale_account: Account<'info,NodeSale>,

    #[account(mut)]
    pub payer: Signer<'info>, 
    pub system_program: Program<'info, System>, 
}

#[derive(Accounts)]
pub struct SetNodeSaleContext<'info>
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
        seeds = [b"node_sale_account"],
        bump,
        space = size_of::<NodeSale>() + 8 + 240
    )]
    pub node_sale_account: Account<'info,NodeSale>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(user: Pubkey)]
pub struct SetUserContext<'info>
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
        seeds = [user.key().as_ref()], 
        bump,
        space = size_of::<User>() + 8
    )]
    pub user_account: Account<'info, User>, 

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
#[instruction(discount_code:String)]
pub struct BuyNodeContext<'info> 
{
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"node_sale_account"],
        bump,
        space = size_of::<NodeSale>() + 8 + 240
    )]
    pub node_sale_account: Account<'info,NodeSale>,

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [payer.key.as_ref()], 
        bump,
        space = size_of::<User>() + 8
    )]
    pub user_account: Account<'info, User>,

    #[account(
        init_if_needed, 
        payer = payer,
        seeds = [discount_code.as_bytes()],
        bump,
        space = size_of::<DiscountCode>() + 8
    )]
    pub discount_code_account: Account<'info,DiscountCode>,

    #[account(mut)]
    pub funds_handler_pubkey: SystemAccount<'info>,

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
pub struct GetNodeSaleContext<'info>
{ 
    #[account(
        init_if_needed, 
        payer = payer, 
        seeds = [b"node_sale_account"],
        bump,
        space = size_of::<NodeSale>() + 8 + 240
    )]
    pub node_sale_account: Account<'info,NodeSale>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
#[instruction(user: Pubkey)]
pub struct GetUserContext<'info>
{
    #[account(
        init_if_needed,
        payer = payer,
        seeds = [user.key().as_ref()], 
        bump,
        space = size_of::<User>() + 8
    )]
    pub user_account: Account<'info, User>, 

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

#[account]
pub struct Owner 
{
    pub owner_pubkey: Pubkey,
    pub owner_initialized:bool
}

#[account]
pub struct User
{
    pub total_nodes_held: u64,
    pub in_early_sale: bool,
    pub in_white_list_1: bool
}

#[account] 
pub struct DiscountCode
{
    pub discount_code: bool
}

#[account] 
pub struct NodeSale
{
    pub tier_limit: Vec<u64>,
    pub tier_price: Vec<u64>,
    pub funds_handler: Pubkey,
    pub early_sale_status: bool,
    pub current_tier_number: u64,
    pub white_list_1_sale: bool,
    pub gpu_net_sale: bool, 
}

//EVENTS

#[event] 
pub struct InitializeEvent 
{
    pub owner: Pubkey, 
    pub owner_initialized: bool, 
    pub current_tier_number: u64, 
    pub funds_handler: Pubkey 
}

#[event]
pub struct OwnerEvent
{
    pub owner: Pubkey, 
    pub owner_init_status: bool
}

#[event]
pub struct FundsHandlerEvent
{
    pub funds_handler: Pubkey
}

#[event]
pub struct WhitelistEvent
{
    pub whitelist_address: Pubkey, 
    pub in_early_sale: bool, 
    pub in_white_list_1:bool 
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
    pub discount_code: String, 
    pub sale_type: String,
}

#[event]
pub struct SaleStatusEvent
{
    pub sale_type: String, 
    pub sale_status: bool,
}

#[event]
pub struct SetTierLimitEvent
{
    pub tier_limit: Vec<u64>,
}

#[event]
pub struct GetTierLimitEvent
{
    pub tier_number: u64,
    pub tier_limit: u64,
}

#[event]
pub struct SetTierPriceEvent
{
    pub tier_price:Vec<u64>
}

#[event]
pub struct GetTierPriceEvent
{
    pub tier_number: u64,
    pub tier_price:u64
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

    #[msg("Unauthorized Funds Handler!")]
    UnauthorizedFundsHandler,

    #[msg("WhiteList-1 sale yet to complete!")]
    WhiteList,

    #[msg("Current tier onwards are reserved for next sale!")]
    ReservedForNextSale,

    #[msg("Sale is yet to begin!")]
    SaleYetToBegin,
}