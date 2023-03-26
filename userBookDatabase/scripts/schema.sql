USE bookuser;
CREATE TABLE Saves (
	id VARCHAR(36) PRIMARY KEY,
	username VARCHAR(100),
	bookTitle VARCHAR(200),
	rating INT,
	totalReads INT,
	UNIQUE KEY unique_bookpost (username, bookTitle) 
);
