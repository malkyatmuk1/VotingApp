create table user_token(
    user_token_id int not null AUTO_INCREMENT,
    user_id int not null unique ,
    token varchar(64) not null,
    constraint PK_Vote_Party primary key (user_token_id),
    constraint FK_User_Token foreign key (user_id) references user(user_id)
);