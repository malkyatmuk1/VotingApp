package org.example.token;

import org.example.user.User;

public interface TokenService {
    public String saveToken(User user);

    Token getToken(User user);
}
