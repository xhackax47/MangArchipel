insert into mangarchipel_user(id,username,password) values (1,'ADMIN','ADMIN');
insert into mangarchipel_user(id,username,password) values (2,'USER','USER');
insert into role(id,name) values (1,'ROLE_ADMIN');
insert into role(id,name) values (2,'ROLE_USER');
insert into user_roles(userid,role_id) values (1,1);
insert into user_roles(userid,role_id) values (2,2);