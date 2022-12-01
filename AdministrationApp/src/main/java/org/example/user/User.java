package org.example.user;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.example.Role;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue
    private Long userId;

    private LocalDateTime createdOn;
    private String username;
    private String password;

    private String fullName;

    private String name;

    private Boolean isVoted;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}