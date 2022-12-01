create table vote_party(
    id int not null AUTO_INCREMENT,
    name varchar(100) not null,
    number int not null,
    constraint PK_Vote_Party primary key (id)
);