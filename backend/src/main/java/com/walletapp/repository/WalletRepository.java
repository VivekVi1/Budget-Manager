package com.walletapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.walletapp.entity.User;
import com.walletapp.entity.Wallet;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {
    
    List<Wallet> findByUserId(Long id);
    
    List<Wallet> findWalletsByUserId(long id);

	Optional<Wallet> findByIdAndUserId(Long id, Long id2);
}
