package org.example.user;
import static java.lang.String.format;

import org.checkerframework.checker.units.qual.C;
import org.example.token.TokenService;
import org.example.token.TokenServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.bind.ValidationException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();



    @Override
    public User getUser(Long id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    public CustomUserDetail getByUserName(String username) {
        return null;
    }

    @Override
    public CustomUserDetail loadUserByUsername(String username) {
        CustomUserDetail customUserDetail = new CustomUserDetail();
        customUserDetail.setUser(userRepository.getByUsername(username));
        return customUserDetail;
    }

    @Override
    public UserView create(CreateUserRequest request) throws ValidationException {
        if (userRepository.getByUsername(request.username()) != null) {
            throw new ValidationException("Username exists!");
        }
        if (!request.password().equals(request.rePassword())) {
            throw new ValidationException("Passwords don't match!");
        }

        var user = new User();
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setCreatedOn(LocalDateTime.now());
        user.setUsername(request.username());
        user.setFullName(request.fullName());
        user.setName(request.name());
        user.setIsVoted(false);
        user = userRepository.save(user);

        tokenService.saveToken(user);
        return new UserView(user.getUserId(), user.getUsername(), user.getFullName());
    }

    @Override
    public void setIsVoted(Long userId) {
        User user = userRepository.getReferenceById(userId);
        user.setIsVoted(true);
        userRepository.save(user);
    }

//    @Override
//    public CustomUserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
//        return (UserDetails) userRepository
//                .getByUsername(username)
//                .orElseThrow(
//                        () ->
//                                new UsernameNotFoundException(
//                                        format("User with username - %s, not found", username)));
//    }
}
