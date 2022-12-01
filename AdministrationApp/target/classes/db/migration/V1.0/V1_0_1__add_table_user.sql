create table user(
    user_id int not null AUTO_INCREMENT,
    name varchar(100) not null,
    username varchar(20) not null,
    password varchar(64) not null,
    created_on date not null,
    constraint PK_User primary key (user_id)
);