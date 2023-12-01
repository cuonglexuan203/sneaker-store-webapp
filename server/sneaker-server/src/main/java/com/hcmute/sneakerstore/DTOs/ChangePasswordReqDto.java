package com.hcmute.sneakerstore.DTOs;

import lombok.Data;

@Data
public class ChangePasswordReqDto {
	private long userId;
	private String currentPassword;
	private String newPassword;
}
