package org.example.vote;

import lombok.Data;

@Data
public class VoteInputBean {
    String password;
    String salt;
    Integer partyId;
}
