package com.walletapp.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.walletapp.entity.User;
import com.walletapp.entity.UserModel;
import com.walletapp.exception.ItemExistsException;
import com.walletapp.exception.ResourceNotFoundException;
import com.walletapp.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private UserRepository userRepository;

	public User createUser(UserModel user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new ItemExistsException("User is already register with email:" + user.getEmail());
		}
		User newUser = new User();	
		BeanUtils.copyProperties(user, newUser);
		newUser.setPassword(bcryptEncoder.encode(newUser.getPassword()));
		return userRepository.save(newUser);
	}

	public User readUser() {
		Long userId = getLoggedInUser().getId();
		return userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for the id:" + userId));
	}

	public User updateUser(UserModel user) {
		User existingUser = readUser();
		existingUser.setName(user.getName() != null ? user.getName() : existingUser.getName());
		existingUser.setEmail(user.getEmail() != null ? user.getEmail() : existingUser.getEmail());
		existingUser.setPassword(
				user.getPassword() != null ? bcryptEncoder.encode(user.getPassword()) : existingUser.getPassword());
		return userRepository.save(existingUser);
	}

	public void deleteUser() {
		User existingUser = readUser();
		userRepository.delete(existingUser);
	}
																																											
	public User getLoggedInUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found for the email" + email));
	}

}
