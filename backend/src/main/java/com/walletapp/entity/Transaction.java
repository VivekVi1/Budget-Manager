package com.walletapp.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Min(1)
    @NotNull(message = "amount cann't be null")
    private Double amount;
    
    private String description;
    
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date transactionDate;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "wallet_id", nullable = false)
    @JsonIgnore
    private Wallet wallet;

//    @PrePersist
//    public void setTransactionDate(){ this.transactionDate = new Date(); }
}
