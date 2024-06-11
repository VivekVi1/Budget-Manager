package com.walletapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.walletapp.entity.Transaction;
import com.walletapp.entity.Wallet;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findByWallet(Wallet wallet);

	Optional<Transaction> findByIdAndWallet(Long id, Wallet wallet);
}
