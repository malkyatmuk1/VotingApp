package org.example.user;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.xml.bind.ValidationException;
import java.util.Optional;

@Service
public interface UserService extends UserDetailsService {

    public User getUser(Long id);
    public CustomUserDetail getByUserName(String username);

    UserView create(CreateUserRequest request) throws ValidationException;

    void setIsVoted(Long userId);
}
