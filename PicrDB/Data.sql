USE PICR_01;

#insert into Picture table;
INSERT INTO picture(name, timestamp) values('Default_Image', now());
INSERT INTO picture(name, timestamp) values('Default_Image_1', now());
INSERT INTO picture(name, timestamp) values('Default_Image_2', now());
INSERT INTO picture(name, timestamp) values('Default_Image_3', now());

#insert into User table;
INSERT INTO User(first_name, last_name, sex, birthday, avatar_id) values
('Jerum', 'Hubbert', 1, STR_TO_DATE('01-09-1982', '%d-%m-%Y'),1);
INSERT INTO User(first_name, last_name, sex, birthday, avatar_id) values
('Joe', 'Doe', 1, STR_TO_DATE('01-09-1982', '%d-%m-%Y'),1);
INSERT INTO User(first_name, last_name, sex, birthday, avatar_id) values
('John', 'Smith', 1, STR_TO_DATE('01-09-1982', '%d-%m-%Y'),1);
INSERT INTO User(first_name, last_name, sex, birthday, avatar_id) values
('Jane', 'Doe', 0, STR_TO_DATE('01-09-1982', '%d-%m-%Y'),2);