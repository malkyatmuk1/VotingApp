package org.example.vote;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.party.PartyOutputBean;
import org.example.party.VoteParty;

@Data
@AllArgsConstructor

public class VoteBean {
    PartyOutputBean voteParty;
    Long percent;
    Long total;

}
