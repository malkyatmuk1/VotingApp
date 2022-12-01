create table role(
    role_id int not null AUTO_INCREMENT,
    role_name varchar(100) not null unique,
    constraint PK_Role primary key (role_id)
);