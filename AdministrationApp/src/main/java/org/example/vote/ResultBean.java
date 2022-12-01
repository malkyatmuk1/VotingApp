package org.example.vote;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultBean {
    List<VoteBean> voteBeanList;
    Long totalVote;
}
