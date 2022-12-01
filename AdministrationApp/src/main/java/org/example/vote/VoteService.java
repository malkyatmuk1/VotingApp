package org.example.vote;

public interface VoteService  {
    public VoteResults getVote(VoteGetInputBean voteInputBean);
    public VoteResults addVote(VoteInputBean voteInputBean);

    ResultBean getResults();
}
