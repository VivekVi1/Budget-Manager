package com.walletapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.walletapp.entity.Wallet;
import com.walletapp.exception.WalletException;
import com.walletapp.repository.WalletRepository;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;
    
    @Autowired
    private UserService userService;
    
    public List<Wallet> getAllWallets(){
    	 return walletRepository.findByUserId(userService.getLoggedInUser().getId());
    }
    
    public Wallet getById(Long id){
    	Optional<Wallet> wallet = walletRepository.findByIdAndUserId(id, userService.getLoggedInUser().getId());
        if(wallet.isPresent()){
            return wallet.get();
        }
        throw new WalletException("Wallet with "+id+" does not exists!");
    }
    
    public Wallet createOrUpdate(Wallet wallet){
        wallet.setUser(userService.getLoggedInUser());
        walletRepository.save(wallet);
        return wallet;
    }
    
    public boolean delete(Long id){
    	Optional<Wallet> wallet = walletRepository.findByIdAndUserId(id, userService.getLoggedInUser().getId());
        if(wallet.isPresent()){
            walletRepository.delete(wallet.get());
            return true;
        }
        throw new WalletException("Wallet with "+id+" does not exists!");
    }
}
