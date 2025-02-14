package com.walletapp.ServiceTest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.walletapp.entity.User;
import com.walletapp.entity.Wallet;
import com.walletapp.repository.WalletRepository;
import com.walletapp.service.UserService;
import com.walletapp.service.WalletService;

@ExtendWith(MockitoExtension.class)
public class WalletTest {

	@InjectMocks
	WalletService walletService;

	@Mock
	WalletRepository walletRepository;

	@Mock
	UserService userService;

	@Test
	public void testCreateOrUpdate() {
		Wallet wallet = Wallet.builder().id(1l).name("Test").accountNumber("12345678").description("description")
				.build();

		User user = User.builder().id(1l).build();

		when(userService.getLoggedInUser()).thenReturn(user);
		when(walletRepository.save(any(Wallet.class))).thenReturn(wallet);

		Wallet result = walletService.createOrUpdate(wallet);

		Assertions.assertThat(result).isNotNull();

	}

}
