package com.walletapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.walletapp.entity.Transaction;
import com.walletapp.entity.Wallet;
import com.walletapp.exception.WalletException;
import com.walletapp.repository.TransactionRepository;
import com.walletapp.repository.WalletRepository;
import com.walletapp.service.UserService;

@Service
public class TransactionService {
	
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private WalletRepository walletRepository;
    
    @Autowired
    private UserService userService;
    
    public List<Transaction> getAll(Long walletId){
        Optional<Wallet> wallet = walletRepository.findByIdAndUserId(walletId, userService.getLoggedInUser().getId());
        if(wallet.isPresent()){
            return transactionRepository.findByWallet(wallet.get());
        }
        throw new WalletException("Wallet with "+walletId+" does not exists!");
    }
    
    public Transaction getById(Long wallet_id,Long id){
        Optional<Wallet> wallet = walletRepository.findByIdAndUserId(wallet_id, userService.getLoggedInUser().getId());
        if(wallet.isPresent()) {
            Optional<Transaction> transaction = transactionRepository.findByIdAndWallet(id, wallet.get());
            if (transaction.isPresent()) {
                return transaction.get();
            }
        }
        throw new WalletException("Transaction with "+id+" does not exists!");
    }
    
    public Transaction createOrUpdate(Long walletId, Transaction transaction){
        Optional<Wallet> wallet = walletRepository.findByIdAndUserId(walletId, userService.getLoggedInUser().getId());
        if(wallet.isPresent()){
            transaction.setWallet(wallet.get());
            transactionRepository.save(transaction);
            return transaction;
        }
        throw new WalletException("Wallet with "+walletId+" does not exists!");
    }
    
    public boolean delete(Long wallet_id,Long id){
        Optional<Wallet> wallet = walletRepository.findByIdAndUserId(wallet_id, userService.getLoggedInUser().getId());
        if(wallet.isPresent()) {
            Optional<Transaction> transaction = transactionRepository.findByIdAndWallet(id, wallet.get());
            if (transaction.isPresent()) {
                transactionRepository.delete(transaction.get());
                return true;
            }
        }
        throw new WalletException("Transaction with "+id+" does not exists!");
    }
}