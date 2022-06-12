--
-- Table Structure for Table 'Posts'
--

USE rsocial; 

CREATE TABLE Users(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    password varchar(250) NOT NULL,
    mail varchar(250) NOT NULL,
    photo varchar(250),
    admin BOOL NOT NULL,
    creationDate int NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO
    Users (
        name,
        surname,
        password,
        mail,
        photo,
        admin,
        creationDate
    )
VALUES
    (
        'Alberto',
        'Jimenez',
        -- password: pear
        "cGVhcg==",
        'alberto@mail.com',
        '/tmp/alberto.png',
        0,
        1653926628
    );

INSERT INTO
    Users (
        name,
        surname,
        password,
        mail,
        photo,
        admin,
        creationDate
    )
VALUES
    (
        'Petronio',
        'Arnaiz',
        -- password: coconut
        "Y29jb251dA==",
        'petronio@mail.com',
        '/tmp/petronio.png',
        0,
        1653931529
    );

--
-- Table Structure for Table 'Posts'
--
CREATE TABLE Posts(
    id int NOT NULL AUTO_INCREMENT,
    userId int NOT NULL,
    postType varchar(15) NOT NULL,
    path varchar(500) NOT NULL,
    creationDate int NOT NULL,
    text varchar(500),
    PRIMARY KEY(id),
    FOREIGN KEY (UserId) REFERENCES Users(id)
);

INSERT INTO
    Posts (userId, postType, path, creationDate, text)
VALUES
    (
        1,
        'text',
        "",
        1653926557,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante augue, tempor vitae dapibus vel, imperdiet eu tortor. Mauris at blandit lacus. In pretium eget ex eu laoreet.'
    );

INSERT INTO
    Posts (userId, postType, path, creationDate, text)
VALUES
    (
        1,
        'text',
        "",
        1653926628,
        'Fusce fermentum porta ex nec euismod. Integer justo enim, tempor in augue eu, ornare fringilla magna. Aliquam mollis felis purus, nec euismod nibh volutpat eu.'
    );

ALTER USER 'admin' IDENTIFIED WITH mysql_native_password BY 'Welcome1';

flush privileges;

SET SESSION sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';