package org.example.token;

import com.google.common.hash.Hashing;
import org.example.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class TokenServiceImpl implements TokenService{
    @Autowired
    private TokenRepository tokenRepository;
    @Override
    public String saveToken(User user) {
        Token token = new Token();
        token.setToken(createToken(user));
        token.setUser(user);
        tokenRepository.save(token);
        return token.getToken();
    }

    @Override
    public Token getToken(User user) {
        return tokenRepository.getByUser(user);
    }

    private String createToken(User user) {
        return Hashing.sha256()
                .hashString(user.getFullName() + user.getUsername() + user.getUserId(), StandardCharsets.UTF_8)
                .toString();
    }
}
