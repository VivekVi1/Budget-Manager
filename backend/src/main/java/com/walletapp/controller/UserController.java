package com.walletapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.walletapp.entity.User;
import com.walletapp.entity.UserModel;
import com.walletapp.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;

	@GetMapping("/profile")
	public ResponseEntity<User> readUser() {
		return new ResponseEntity<User>(userService.readUser(), HttpStatus.OK);
	}
	@PutMapping("/profile")
	public ResponseEntity<User> updateUser(@RequestBody UserModel user) {
		return new ResponseEntity<User>(userService.updateUser(user), HttpStatus.OK);
	}
}
