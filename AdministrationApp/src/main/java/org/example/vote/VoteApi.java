package org.example.vote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VoteApi {

    @Autowired
    VoteService voteService;
    @GetMapping("/vote")
    public VoteOutputBean getVote( VoteGetInputBean voteInputBean) {
        VoteResults voteResult = voteService.getVote(voteInputBean);
    if (voteResult != null) {
      return convertToVoteOutputBean(voteService.getVote(voteInputBean), voteInputBean.getPassword());
    }
        return null;
    }

    @PutMapping("/add/vote")
    public VoteOutputBean addVote(@RequestBody VoteInputBean voteInputBean) {
        VoteResults voteResult = voteService.addVote(voteInputBean);
        if (voteResult != null) {
            return convertToVoteOutputBean(voteService.getVote(new VoteGetInputBean(voteInputBean.getSalt(), voteInputBean.getPassword())), voteInputBean.getPassword());
        }
        return  null;
    }

    @GetMapping("/results")
    public ResultBean getResults(){
        return voteService.getResults();
    }

    private VoteOutputBean convertToVoteOutputBean(VoteResults vote, String password) {
        VoteOutputBean voteOutputBean = new VoteOutputBean();
        voteOutputBean.setParty(vote.getVote().getNameOfParty());
        voteOutputBean.setPassword(password);
        return voteOutputBean;
    }
}
