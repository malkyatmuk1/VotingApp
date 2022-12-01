package org.example.token;

import lombok.Getter;
import lombok.Setter;
import org.example.user.User;

import javax.persistence.*;

@Table(name = "user_token")
@Entity
@Getter
@Setter
public class Token {

    @Id
    @Column(name = "user_token_id")
    @GeneratedValue
    private Long userTokenId;
    @OneToOne
    @JoinColumn(name = "user_id")
    User user;
    String token;
}
