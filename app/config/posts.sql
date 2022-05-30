--
-- Table Structure for Table 'Posts'
--
CREATE TABLE Posts(
    ID int NOT NULL AUTO_INCREMENT,
    UserID int NOT NULL,
    PostType varchar(15) NOT NULL,
    Path varchar(500) NOT NULL,
    CreationDate int NOT NULL,
    Text varchar(MAX),
    PRIMARY KEY(ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID)
)
INSERT INTO
    Posts
VALUES
    (
        1,
        1,
        'text',
        "",
        1653926557,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante augue, tempor vitae dapibus vel, imperdiet eu tortor. Mauris at blandit lacus. In pretium eget ex eu laoreet.'
    )
INSERT INTO
    Posts
VALUES
    (
        2,
        1,
        'text',
        "",
        1653926628,
        'Fusce fermentum porta ex nec euismod. Integer justo enim, tempor in augue eu, ornare fringilla magna. Aliquam mollis felis purus, nec euismod nibh volutpat eu.'
    )
INSERT INTO
    Posts
VALUES
    (
        3,
        1,
        'text',
        "",
        1653926687,
        'Fusce porta, dolor eu pretium pharetra, sem ipsum cursus massa, non varius tellus ex non tortor. Nam commodo, lorem vitae varius iaculis, ipsum augue euismod eros, ut ullamcorper tellus velit at lacus.

'
    )