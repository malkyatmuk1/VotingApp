package org.example.vote;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VoteGetInputBean {
    String salt;
    String password;
}
