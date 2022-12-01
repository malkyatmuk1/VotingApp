package org.example.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User")
@RestController
@RequestMapping(path = "/user")
@RequiredArgsConstructor
public class UserApi {
    @Autowired
    UserService userService;
    @PutMapping("/voted/{userId}")
    public void setVoted(@PathVariable Long userId){
        userService.setIsVoted(userId);
    }
}
