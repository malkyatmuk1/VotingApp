package org.example.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserView{
        Long id;
        String username;
        String fullName;
}
