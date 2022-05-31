--
-- Table Structure for Table 'Posts'
--
CREATE TABLE Posts(
    ID int NOT NULL AUTO_INCREMENT,
    userID int NOT NULL,
    postType varchar(15) NOT NULL,
    path varchar(500) NOT NULL,
    creationDate int NOT NULL,
    text BLOB,
    PRIMARY KEY(ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

INSERT INTO
    Posts (userID, postType, path, creationDate, text)
VALUES
    (
        1,
        'text',
        "",
        1653926557,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante augue, tempor vitae dapibus vel, imperdiet eu tortor. Mauris at blandit lacus. In pretium eget ex eu laoreet.'
    );

INSERT INTO
    Posts (userID, postType, path, creationDate, text)
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