package com.hcmute.sneakerstore.DTOs;

import com.hcmute.sneakerstore.model.Account;
import com.hcmute.sneakerstore.model.User;

import lombok.Data;

@Data
public class SignUpReqDto {
	private User user;
	private Account account;
}
