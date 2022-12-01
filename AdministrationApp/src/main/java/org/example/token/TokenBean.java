package org.example.token;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.party.PartyOutputBean;

@Data
@NoArgsConstructor
public class TokenBean {
    String token;
    Boolean isVoted;
}
