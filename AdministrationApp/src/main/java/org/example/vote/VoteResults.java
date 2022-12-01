package org.example.vote;

import org.example.party.VoteParty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "vote_results")
public class VoteResults {
    @Id
    @Column(name = "hash_code")
    String hashCode;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    VoteParty vote;

    public VoteResults(String hashCode, VoteParty vote) {
        this.hashCode = hashCode;
        this.vote = vote;
    }
}
