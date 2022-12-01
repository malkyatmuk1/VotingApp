package org.example.token;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.party.PartyOutputBean;
import org.example.user.User;
import org.example.user.UserRepository;
import org.example.user.UserService;
import org.example.vote.VoteGetInputBean;
import org.example.vote.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Token")
@RestController
@RequestMapping(path = "/token")
@RequiredArgsConstructor
public class TokenApi {
    @Autowired
    UserService userService;
    @Autowired 
    TokenService tokenService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    VoteService voteService;
    @GetMapping("/{userId}")
    public TokenBean getToken(@PathVariable Long userId){
        Token token = null;
        TokenBean tokenBean = new TokenBean();
        User user = userService.getUser(userId);
        if(user != null) {
            token = tokenService.getToken(userRepository.getReferenceById(userId));
        }
        if(token != null) {
            tokenBean.setToken(token.getToken());
            tokenBean.setIsVoted(user.getIsVoted());
        }
        return tokenBean;
    }
}
