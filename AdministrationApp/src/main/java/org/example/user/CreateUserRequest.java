package org.example.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public record CreateUserRequest(
        @NotBlank @Email String username,
        @NotBlank String fullName,
        @NotBlank String password,
        @NotBlank String rePassword,
        @NotBlank String name
        ) {

//    public CreateUserRequest(
//            String username,
//            String fullName,
//            String password,
//            String rePassword,
//            String name
//    ) {
//        this(username, fullName, password, rePassword, name);
//    }

//    public CreateUserRequest(
//            String username,
//            String fullName,
//            String password,
//            String name
//    ) {
//        this(username, fullName, password, password, name);
//    }
}