use anchor_lang::{prelude::*, solana_program::system_instruction};
use std::mem::size_of;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{
        create_master_edition_v3,
        create_metadata_accounts_v3,
        mpl_token_metadata::types::DataV2,
        CreateMasterEditionV3,
        CreateMetadataAccountsV3,
        Metadata,
    },
    token::{ mint_to, Mint, MintTo, Token, TokenAccount }
};
use mpl_token_metadata::accounts::{ MasterEdition, Metadata as MetadataAccount };

declare_id!("CEgAFRtqR7jPeagKQuJyNGKtaMqtH1X4yL2JSyDmrjac");

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
    pub fn discount_code(ctx: Context<DiscountCodeContext>, discount_code: String, discount_code_status: bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require! (owner_account.owner_pubkey == ctx.accounts.payer.key(), ErrorCode::NotAuthorized);
        let discount_code_account = &mut ctx.accounts.discount_code_account;
        discount_code_account.discount_code = discount_code_status;
        msg!("Discount code:{}",discount_code);
        msg!("total_discount_code_usage:{}",discount_code_account.total_discount_code_usage);
        emit!(DiscountCodeEvent{
            discount_code: discount_code,
            discount_code_status: discount_code_account.discount_code,
            total_discount_code_usage: discount_code_account.total_discount_code_usage
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

    pub fn set_mint_status(ctx: Context<SetMintStatusContext>, status:bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let mint_status_account = &mut ctx.accounts.mint_status_account;
        mint_status_account.mint_status = status;  
        Ok(())
    }

    pub fn set_swap_status(ctx: Context<SetSwapStatusContext>, types:u8,status:bool) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(),ErrorCode::NotAuthorized);
        let swap_status_account = &mut ctx.accounts.swap_status_account;
        match types
        {
            0 => 
            {
                swap_status_account.credits_status = status;
            },

            1 => 
            {
                swap_status_account.queen_status = status;
            },

            2 => 
            {
                swap_status_account.validators_status = status;
            },

            3 => 
            {
                swap_status_account.king_status = status;
            },

            _ => 
            {
                return Err(ErrorCode::InvalidSwapStatus.into());   
            },
        }
        Ok(())
    }

    pub fn set_user_address(ctx: Context<SetUserAddressContext>, email:String, evm_address:String) -> Result<()>
    {
        let user_address_account = &mut ctx.accounts.user_address_account;
        require!(!user_address_account.status,ErrorCode::UserAddressAlreadySet);
        user_address_account.email = email; 
        user_address_account.evm_address = evm_address;
        user_address_account.status = true; 
        Ok(())
    }

    pub fn buy_node(ctx: Context<BuyNodeContext>, discount_code:String, quantity:u64) -> Result<()>
    {
        let node_sale_account = &mut ctx.accounts.node_sale_account;
        let user_account = &mut ctx.accounts.user_account;
        let discount_code_account = &mut ctx.accounts.discount_code_account;
        let funds_handler_pubkey = &ctx.accounts.funds_handler_pubkey;
        let amount:u64;
        let tier_price:u64;
        let current_tier_price:u64;
        let current_tier_number:u64;
        let mut nodes_bought: bool = false;
        let mut sale_type: String = String::new();

        require!(node_sale_account.early_sale_status || node_sale_account.gpu_net_sale, ErrorCode::SaleYetToBegin);
        require!(quantity <= 770, ErrorCode::ExceededMaxPurchaseLimit);
        require!(node_sale_account.funds_handler.key() == funds_handler_pubkey.key(), ErrorCode::UnauthorizedFundsHandler);

        current_tier_number = node_sale_account.current_tier_number;
        current_tier_price = node_sale_account.tier_price[current_tier_number as usize];

        let next_tier_price = node_sale_account.tier_price[(current_tier_number + 1) as usize];
        let price_1: u64; 
        let price_2: u64; 
        let amount_1: u64;
        let amount_2: u64; 
        let tier_spill: bool;  

        if quantity <= node_sale_account.tier_limit[current_tier_number as usize] 
        {
            if discount_code_account.discount_code == true
            {
                tier_price =  (current_tier_price * 90 ) / 100;
            }
            else
            {
                tier_price = current_tier_price;
            }

            amount = quantity * tier_price;

            tier_spill = false; 
        }
        else 
        {
            require!(current_tier_number != 11, ErrorCode::InsufficientTierLimit);

            //let allowed: bool; 

            // if current_tier_number == 1 
            // {
            //     require!(!node_sale_account.white_list_1_sale,ErrorCode::ReservedForNextSale);
            //     allowed = true; 
            // }
            // else if current_tier_number == 5 
            // {
            //     require!(!node_sale_account.early_sale_status,ErrorCode::ReservedForNextSale);
            //     allowed = true; 
            // }
            // else 
            // {
            //     allowed = true
            // }
            
            //require!(allowed,ErrorCode::ReservedForNextSale);
            if discount_code_account.discount_code == true
            {
                price_1 =  (current_tier_price * 90 ) / 100;
                price_2 =  (next_tier_price * 90 ) / 100;
            }
            else
            {
                price_1 = current_tier_price;
                price_2 = next_tier_price; 
            }
            amount_1 = node_sale_account.tier_limit[current_tier_number as usize] * price_1;
            amount_2 = (quantity-node_sale_account.tier_limit[current_tier_number as usize]) * price_2;

            amount = amount_1 + amount_2; 

            tier_spill = true; 
        }

        require!(ctx.accounts.payer.lamports() > amount, ErrorCode::InsufficientBalance);

        // @dev Turn this on to true at 2pm.Turn this off at 6pm.From 6pm the sale on magic eden happens for tier-5,6,7,8.
        if node_sale_account.early_sale_status
        {
            require!(user_account.in_early_sale,ErrorCode::EarlySale);
            // @dev Turn this on to true at 2pm. Switch this off to false at 3pm.
            if node_sale_account.white_list_1_sale
            {
                require!(user_account.in_white_list_1,ErrorCode::WhiteList);
                //require!(current_tier_number == 1, ErrorCode::ReservedForNextSale);
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

                // user_account.total_nodes_held += quantity;
                nodes_bought = true;
                sale_type = "White list-1 sale".to_string();
            }
            else
            {
                //require!(current_tier_number < 6, ErrorCode::ReservedForNextSale);
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

                //user_account.total_nodes_held += quantity;
                //node_sale_account.tier_limit[current_tier_number as usize] -= quantity;
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

            //user_account.total_nodes_held += quantity;
            //node_sale_account.tier_limit[current_tier_number as usize] -= quantity;
            nodes_bought = true;
            sale_type = "GPU sale".to_string();
        }

        if nodes_bought
        {
            if tier_spill 
            {
                let current_tier_limit = node_sale_account.tier_limit[current_tier_number as usize];
                node_sale_account.tier_limit[current_tier_number as usize] = 0;
                node_sale_account.tier_limit[(current_tier_number + 1) as usize] -= quantity - current_tier_limit;
            }
            else 
            {
                node_sale_account.tier_limit[current_tier_number as usize] -= quantity;
            }

            if node_sale_account.tier_limit[current_tier_number as usize] == 0
            {
                node_sale_account.current_tier_number += 1;
            }

            user_account.total_nodes_held += quantity;
            discount_code_account.total_discount_code_usage += quantity; 
            discount_code_account.total_amount += amount;  
            
            msg!("discount_code:{}",discount_code);
            msg!("total_discount_code_usage:{}",discount_code_account.total_discount_code_usage);
            msg!("total_discount_code_amount:{}",discount_code_account.total_amount);
            msg!("sale_type:{}",sale_type);
            emit!(NodeBoughtEvent{
                user: *ctx.accounts.payer.key,
                quantity: quantity,
                amount: amount,
                tier_number: current_tier_number,
                total_nodes_held: user_account.total_nodes_held,
                pending_tier_limit: node_sale_account.tier_limit[current_tier_number as usize],
                discount_code: discount_code,
                sale_type: sale_type, 
                total_discount_code_usage: discount_code_account.total_discount_code_usage, 
                total_discount_code_amount: discount_code_account.total_amount 
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

    pub fn swap_barrels(ctx: Context<SwapBarrelsContext>, role:u8, quantity:u64) -> Result<()>
    {
        let user_address_account = &mut ctx.accounts.user_address_account;
        let swap_status_account = &ctx.accounts.swap_status_account;
        require!(!user_address_account.email.is_empty(),ErrorCode::UserEmailEvmNotFound);
        require!(!user_address_account.evm_address.is_empty(),ErrorCode::UserEmailEvmNotFound);
        match role 
        {
            0 => 
            {
                require!(swap_status_account.credits_status,ErrorCode::CreditsSwapNotYetAvailable);
                require!(user_address_account.total_nodes_burnt > 0,ErrorCode::InsufficientNodesBurntForCredits);
                let credits_to_be_claimed = (user_address_account.total_nodes_burnt) * 500; 
                user_address_account.total_nodes_burnt = 0; 
                user_address_account.total_credits_claimed += credits_to_be_claimed; 
                emit!(SwapBarrelsEvent{
                    user_pubkey: *ctx.accounts.payer.key,
                    user_email: user_address_account.email.clone(),
                    evm_address: user_address_account.evm_address.clone(),
                    role: role,
                    credits_to_be_claimed: credits_to_be_claimed,
                    queen_to_be_claimed: 0,
                    validators_to_be_claimed: 0, 
                    king_to_be_claimed: 0, 
                    quantity: 0,
                });
            },

            1 => 
            {
                require!(swap_status_account.queen_status,ErrorCode::QueenSwapNotYetAvailable);
                require!(user_address_account.total_nodes_burnt >= 33*quantity ,ErrorCode::InsufficientNodesBurntForQueen);
                user_address_account.total_nodes_burnt -= 33 * quantity;
                user_address_account.total_queens_held += quantity;
                emit!(SwapBarrelsEvent{
                    user_pubkey: *ctx.accounts.payer.key,
                    user_email: user_address_account.email.clone(),
                    evm_address: user_address_account.evm_address.clone(),
                    role: role,
                    credits_to_be_claimed: 0,
                    queen_to_be_claimed: quantity,
                    validators_to_be_claimed: 0, 
                    king_to_be_claimed: 0, 
                    quantity: quantity,
                });
            },

            2 => 
            {
                require!(swap_status_account.validators_status,ErrorCode::ValidatorSwapNotYetAvailable);
                require!(user_address_account.total_nodes_burnt >= 66*quantity ,ErrorCode::InsufficientNodesBurntForValidators);
                user_address_account.total_nodes_burnt -= 66 * quantity;
                user_address_account.total_validators_held += quantity * 6;
                emit!(SwapBarrelsEvent{
                    user_pubkey: *ctx.accounts.payer.key,
                    user_email: user_address_account.email.clone(),
                    evm_address: user_address_account.evm_address.clone(),
                    role: role,
                    credits_to_be_claimed: 0,
                    queen_to_be_claimed: 0,
                    validators_to_be_claimed: quantity * 6, 
                    king_to_be_claimed: 0, 
                    quantity: quantity,
                });
            },

            3 => 
            {
                require!(swap_status_account.king_status,ErrorCode::KingSwapNotYetAvailable);
                require!(user_address_account.total_nodes_burnt >= 99*quantity ,ErrorCode::InsufficientNodesBurntForQueen);
                user_address_account.total_nodes_burnt -= 99 * quantity;
                user_address_account.total_kings_held += quantity;
                emit!(SwapBarrelsEvent{
                    user_pubkey: *ctx.accounts.payer.key,
                    user_email: user_address_account.email.clone(),
                    evm_address: user_address_account.evm_address.clone(),
                    role: role,
                    credits_to_be_claimed: 0,
                    queen_to_be_claimed: 0,
                    validators_to_be_claimed: 0, 
                    king_to_be_claimed: quantity, 
                    quantity: quantity,
                });
            },

            _ => 
            {
                return Err(ErrorCode::InvalidSwapRole.into());
            }
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
        msg!("total_discount_code_usage:{}",discount_code_account.total_discount_code_usage);
        emit!(DiscountCodeEvent{
            discount_code: discount_code,
            discount_code_status: discount_code_account.discount_code,
            total_discount_code_usage: discount_code_account.total_discount_code_usage
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

    pub fn init_nft(ctx: Context<InitNFTContext>,) -> Result<()> 
    {

        //vipin
        let mint_status_account = &ctx.accounts.mint_status_account;

        require!(mint_status_account.mint_status, ErrorCode::MintNotAvailable);

        let  user=&mut ctx.accounts.user_account;

        if user.total_nodes_held > 0
        {

                let name="Gpu.net".into();
                let symbol="GPU".into();
                let uri= "https://raw.githubusercontent.com/687c/solana-nft-native-client/main/metadata.json".into();

            // create mint account
            let cpi_context = CpiContext::new(ctx.accounts.token_program.to_account_info(), MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.associated_token_account.to_account_info(),
                authority: ctx.accounts.signer.to_account_info(),
            });

            mint_to(cpi_context, 1)?;

            // create metadata account
            let cpi_context = CpiContext::new(
                ctx.accounts.token_metadata_program.to_account_info(),
                CreateMetadataAccountsV3 {
                    metadata: ctx.accounts.metadata_account.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    mint_authority: ctx.accounts.signer.to_account_info(),
                    update_authority: ctx.accounts.signer.to_account_info(),
                    payer: ctx.accounts.signer.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                }
            );

            let data_v2 = DataV2 {
                name: name,
                symbol: symbol,
                uri: uri,
                seller_fee_basis_points: 0,
                creators: None,
                collection: None,    // create metadata account
                uses: None,
            };

            create_metadata_accounts_v3(cpi_context, data_v2, false, true, None)?;

            //create master edition account
            let cpi_context = CpiContext::new(
                ctx.accounts.token_metadata_program.to_account_info(),
                CreateMasterEditionV3 {
                    edition: ctx.accounts.master_edition_account.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    update_authority: ctx.accounts.signer.to_account_info(),
                    mint_authority: ctx.accounts.signer.to_account_info(),
                    payer: ctx.accounts.signer.to_account_info(),
                    metadata: ctx.accounts.metadata_account.to_account_info(),
                    token_program: ctx.accounts.token_program.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                }
            );

            create_master_edition_v3(cpi_context, None)?;

            user.total_nodes_held -=1;
        }
        Ok(())
    }

    pub fn set_total_nodes_burnt(ctx: Context<SetTotalNodesBurntcontext>, user: Pubkey, quantity: u64) -> Result<()>
    {
        let owner_account = &ctx.accounts.owner_account;
        require!(owner_account.owner_pubkey == ctx.accounts.payer.key(), ErrorCode::NotAuthorized);
        let user_address_account = &mut ctx.accounts.user_address_account;
        user_address_account.total_nodes_burnt += quantity; 
        msg!("User:{}",user.key());
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
pub struct SetMintStatusContext<'info>
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
        seeds = [b"mint_status_account"],
        bump,
        space = size_of::<MintStatus>() + 8 
    )]
    pub mint_status_account: Account<'info, MintStatus>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SetSwapStatusContext<'info>
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
        seeds = [b"swap_status_account"],
        bump,
        space = size_of::<SwapStatus>() + 8
    )]
    pub swap_status_account: Account<'info, SwapStatus>,

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

#[derive(Accounts)]
pub struct InitNFTContext<'info> 
{
    //vipin
    #[account(
        init_if_needed,
        payer = signer,
        seeds = [b"mint_status_account"],
        bump,
        space = size_of::<MintStatus>() + 8
    )]
    pub mint_status_account: Account<'info, MintStatus>,

    #[account(
        init_if_needed,
        payer = signer,
        seeds = [signer.key.as_ref()],
        bump,
        space = size_of::<User>() + 8 
    )]
    pub user_account: Account<'info, User>,

    /// CHECK: ok, we are passing in this account ourselves
    #[account(mut, signer)]
    pub signer: AccountInfo<'info>,

    #[account(
        init,
        payer = signer,
        mint::decimals = 0,
        mint::authority = signer.key(),
        mint::freeze_authority = signer.key()
    )]
    pub mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = mint,
        associated_token::authority = signer
    )]
    pub associated_token_account: Account<'info, TokenAccount>,

    /// CHECK - address
    #[account(
        mut,
        address = MetadataAccount::find_pda(&mint.key()).0,
    )]
    pub metadata_account: AccountInfo<'info>,

    /// CHECK: address
    #[account(
        mut,
        address = MasterEdition::find_pda(&mint.key()).0,
    )]
    pub master_edition_account: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_metadata_program: Program<'info, Metadata>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(user: Pubkey)]
pub struct SetTotalNodesBurntcontext<'info>
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
        seeds = [payer.key().as_ref(), 
                b"user_address_account"],
        bump,
        space = size_of::<UserAddress>() + 8
    )]
    pub user_address_account: Account<'info, UserAddress>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SetUserAddressContext<'info>
{
    #[account(
        init_if_needed,
        payer = payer,
        seeds = [payer.key().as_ref(), 
                b"user_address_account"],
        bump,
        space = size_of::<UserAddress>() + 8
    )]
    pub user_address_account: Account<'info, UserAddress>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

#[derive(Accounts)]
pub struct SwapBarrelsContext<'info>
{
    #[account(
        init_if_needed,
        payer = payer,
        seeds = [payer.key().as_ref(),
                b"user_address_account"],
        bump,
        space = size_of::<UserAddress>() + 8
    )]
    pub user_address_account: Account<'info, UserAddress>,

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [payer.key().as_ref()],
        bump,
        space = size_of::<UserAddress>() + 8
    )]
    pub user_account: Account<'info, UserAddress>,

    #[account(
        init_if_needed,
        payer = payer,
        seeds = [b"swap_status_account"],
        bump,
        space = size_of::<SwapStatus>() + 8
    )]
    pub swap_status_account: Account<'info, SwapStatus>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info,System>,
}

//Variables structs

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
    pub in_white_list_1: bool,
}

#[account]
pub struct UserAddress
{
    pub email: String,
    pub evm_address: String,
    pub status: bool, 
    pub total_nodes_burnt: u64,
    pub total_credits_claimed: u64, 
    pub total_queens_held: u64, 
    pub total_validators_held: u64, 
    pub total_kings_held: u64 
}

#[account]
pub struct DiscountCode
{
    pub discount_code: bool,
    pub total_discount_code_usage: u64, 
    pub total_amount: u64 
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

#[account]
pub struct MintStatus
{
    pub mint_status: bool,
}

#[account]
pub struct SwapStatus
{
    pub credits_status: bool,
    pub queen_status: bool,
    pub validators_status: bool,
    pub king_status: bool,
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
    pub discount_code_status: bool, 
    pub total_discount_code_usage:u64 
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
    pub total_discount_code_usage: u64, 
    pub total_discount_code_amount: u64 
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

#[event]
pub struct SwapBarrelsEvent
{
    pub user_pubkey: Pubkey,
    pub user_email: String,
    pub evm_address: String,
    pub role: u8, 
    pub credits_to_be_claimed: u64, 
    pub queen_to_be_claimed: u64, 
    pub validators_to_be_claimed: u64, 
    pub king_to_be_claimed: u64, 
    pub quantity: u64 
}

#[error_code]
pub enum ErrorCode
{
    #[msg("Already initialized!")]
    AlreadyInitialized,

    #[msg("Not Authorized!")]
    NotAuthorized,

    #[msg("Quantity exceedes available tier limtits!")]
    InsufficientTierLimit,

    #[msg("Cannot purchase more than 770 nodes in one single Tx!")]
    ExceededMaxPurchaseLimit,

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

    #[msg("You aren't a part of whitelist-1 sale!")]
    WhiteList,

    #[msg("Current tier onwards are reserved for next sale!")]
    ReservedForNextSale,

    #[msg("Sale is yet to begin!")]
    SaleYetToBegin,

    #[msg("Invalid role provided!")]
    InvalidRole,

    #[msg("Exceeded Max Quantity of nodes that can be bought!")]
    ExceededMaxQuantity,

    #[msg("Cannot mint the NFT's yet!")]
    MintNotAvailable,

    #[msg("User address already set!")]
    UserAddressAlreadySet,

    #[msg("Register your email and evm address!")]
    UserEmailEvmNotFound,

    #[msg("Credits Swap Not Yet Available!")]
    CreditsSwapNotYetAvailable,

    #[msg("Queen Swap Not Yet Available!")]
    QueenSwapNotYetAvailable,

    #[msg("Validator Swap Not Yet Available!")]
    ValidatorSwapNotYetAvailable,

    #[msg("King Swap Not Yet Available!")]
    KingSwapNotYetAvailable,

    #[msg("Insufficient Nodes Burnt for credits!")]
    InsufficientNodesBurntForCredits,

    #[msg("Insufficient Nodes Burnt for queen!")]
    InsufficientNodesBurntForQueen,

    #[msg("Insufficient Nodes Burnt for validators!")]
    InsufficientNodesBurntForValidators,

    #[msg("Insufficient Nodes Burnt for king!")]
    InsufficientNodesBurntForking,

    #[msg("Invalid Type of swap status!")]
    InvalidSwapStatus,

    #[msg("Invalid swap role!")]
    InvalidSwapRole,
}