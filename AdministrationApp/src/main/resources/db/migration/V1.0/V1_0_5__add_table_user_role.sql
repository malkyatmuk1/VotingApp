create table user_role(
    user_id int not null,
    role_id int not null,
    constraint PK_Permission primary key (role_id, user_id),
    CONSTRAINT FK_User_Role_User foreign key (user_id) references user(user_id),
    CONSTRAINT FK_User_Role_Role foreign key (role_id) references role(role_id)
);