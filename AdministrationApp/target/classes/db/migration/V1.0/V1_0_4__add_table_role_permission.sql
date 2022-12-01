create table role_permission(
    permission_id int not null,
    role_id int not null,
    constraint PK_Permission primary key (role_id, permission_id),
    CONSTRAINT FK_Row_Permission_Perm foreign key (permission_id) references permission(permission_id),
    CONSTRAINT FK_Row_Permission_Rol foreign key (role_id) references role(role_id)
);