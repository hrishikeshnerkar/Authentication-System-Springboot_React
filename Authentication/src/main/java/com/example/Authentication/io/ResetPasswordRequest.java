package com.example.Authentication.io;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {

    @NotBlank(message = "New password must not be blank")
    @Size(min = 6, max = 64, message = "Password must be between 6 and 64 characters")
    private String newPassword;

    @NotBlank(message = "OTP must not be blank")
    private String otp;

    @NotBlank(message = "Email must not be blank")
    private String email;

}
