package org.example.party;

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
@Table(name = "vote_party")
public class VoteParty {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vote_sequence"
    )
    @SequenceGenerator(
            name = "vote_sequence",
            sequenceName = "vote_sequence",
            allocationSize = 1
    )
    Integer id;
    @Column(name = "name")
    String nameOfParty;
    Long number;

    public VoteParty(String nameOfParty, Long number) {
        this.nameOfParty = nameOfParty;
        this.number = number;
    }
}
