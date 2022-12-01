package org.example.party;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PartyApi {

    @Autowired
    VotePartyRepository votePartyRepository;

    @PutMapping("/add/party")
    public VoteParty addParty(@RequestBody PartyInputBean partyInputBean){
       return votePartyRepository.save(new VoteParty(partyInputBean.getName(), partyInputBean.getNumber()));
    }

    @GetMapping("/parties")
    public List<VoteParty> getAllParties(){
        return votePartyRepository.findAll();
    }
}
