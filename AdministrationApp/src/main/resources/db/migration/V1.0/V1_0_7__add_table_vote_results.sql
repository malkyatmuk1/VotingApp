create table vote_results(
    hash_code varchar(64) not null,
    vote_id int not null,
    constraint PK_Vote_Result primary key (hash_code),
    CONSTRAINT FK_Vote_Result foreign key (vote_id) references vote_party(id)
);