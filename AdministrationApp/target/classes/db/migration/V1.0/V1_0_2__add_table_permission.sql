create table permission(
    permission_id int not null AUTO_INCREMENT,
    permission_name varchar(100) not null unique,
    constraint PK_Permission primary key (permission_id)
);