package com.walletapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.walletapp.entity.Transaction;
import com.walletapp.service.TransactionService;
import com.walletapp.service.ValidationErrorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "*")
public class TransactionController {
	
    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private ValidationErrorService validationService;
    
    @GetMapping("/{wallet_id}")
    public ResponseEntity<?> getAll(@PathVariable Long wallet_id){
        return new ResponseEntity<>(transactionService.getAll(wallet_id), HttpStatus.OK);
    }
    
    @GetMapping("/{wallet_id}/{id}")	
    public ResponseEntity<?> getById(@PathVariable Long wallet_id,@PathVariable Long id){
        return new ResponseEntity<>(transactionService.getById(wallet_id,id),HttpStatus.OK);
    }
    
    @PostMapping("/{wallet_id}")
    public ResponseEntity<?> create(@PathVariable Long wallet_id, @Valid @RequestBody Transaction transaction, BindingResult result){
        ResponseEntity errors = validationService.validate(result);
        if(errors != null) return errors;
        Transaction transactionSaved = transactionService.createOrUpdate(wallet_id,transaction);
        return new ResponseEntity<Transaction>(transaction,HttpStatus.CREATED);
    }
    @PutMapping("/{wallet_id}/{id}")
    public ResponseEntity<?> update(@PathVariable Long wallet_id,@PathVariable Long id,@Valid @RequestBody Transaction transaction, BindingResult result){
        ResponseEntity errors = validationService.validate(result);
        if(errors != null) return errors;
        transaction.setId(id);
        Transaction transactionSaved = transactionService.createOrUpdate(wallet_id,transaction);
        return new ResponseEntity<Transaction>(transactionSaved,HttpStatus.OK);
    }
    
    @DeleteMapping("/{wallet_id}/{id}")
    public ResponseEntity<?> delete(@PathVariable Long wallet_id,@PathVariable Long id){
        transactionService.delete(wallet_id,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    	
}
