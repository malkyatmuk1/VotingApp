package org.example.vote;

import org.example.party.PartyOutputBean;
import org.example.party.VoteParty;
import org.example.party.VotePartyRepository;
import com.google.common.hash.Hashing;
import org.example.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class VoteServiceImpl implements VoteService{

    @Autowired
    VotingRepository votingRepository;
    @Autowired
    VotePartyRepository votePartyRepository;

    @Autowired
    UserService userService;

    @Override
    public VoteResults getVote(VoteGetInputBean voteInputBean) {
        String hash = getHash(voteInputBean.getPassword(), voteInputBean.getSalt());
        return votingRepository.getReferenceById(hash);
    }

    @Override
    public VoteResults addVote(VoteInputBean voteInputBean) {
        String hash = getHash(voteInputBean.getPassword(), voteInputBean.getSalt());
        VoteResults  voteResults = votingRepository.save(new VoteResults(hash, votePartyRepository.getReferenceById(voteInputBean.getPartyId())));
        return voteResults;
    }

    @Override
    public ResultBean getResults() {
        ResultBean resultBean = new ResultBean();

        List<VoteResults> all = votingRepository.findAll();
        resultBean.setTotalVote((long) all.size());
        Map<VoteParty, Long> dictionary = new HashMap<>();
        for (VoteResults element: all) {
            if(dictionary.get(element.getVote()) == null) dictionary.put(element.getVote(), 1L);
            else dictionary.put(element.getVote(), dictionary.get(element.getVote()) + 1);
        }
        List<VoteBean> voteBeanList = new ArrayList<>();
        for (VoteParty party: dictionary.keySet()) {
            Long totalForParty = dictionary.get(party);
            VoteBean voteBean = new VoteBean(new PartyOutputBean(party.getNameOfParty(), party.getNumber()),(long) (totalForParty*100)/all.size(), dictionary.get(party) );
            voteBeanList.add(voteBean);
        }
        resultBean.setVoteBeanList(voteBeanList);
        return resultBean;
    }

    private String getHash(String password, String salt) {
        return  Hashing.sha256()
                .hashString(password + salt, StandardCharsets.UTF_8)
                .toString();
    }
}
