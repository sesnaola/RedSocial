--
-- Table Structure for Table 'Posts'
--
CREATE TABLE Users(
    ID int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    password BLOB NOT NULL,
    mail varchar(250) NOT NULL,
    photo varchar(250),
    admin BOOL NOT NULL,
    creationDate int NOT NULL,
    PRIMARY KEY(ID)
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
        "pear",
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
        "coconut",
        'patronio@mail.com',
        '/tmp/petronio.png',
        0,
        1653931529
    );