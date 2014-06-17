Create Database picr_01;

USE picr_01;


################################################
## USER TABLES
################################################

# This table will be used to store all pictures
# Including the avatar and poll pictures
# This table must be created prior to the user table
CREATE TABLE IF NOT EXISTS picture (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	name		VARCHAR(255),
	timestamp	DATETIME NOT NULL,
	PRIMARY KEY (_id)
) ENGINE=InnoDB;

# This table stores all user related info
# This table must be
CREATE TABLE IF NOT EXISTS user (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	first_name	VARCHAR(35) NOT NULL,
	last_name	VARCHAR(35) NOT NULL,
	sex		CHAR(1) NOT NULL,
	birthday	DATE NOT NULL,
	avatar_id	 BIGINT NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (avatar_id) REFERENCES picture(_id)
) ENGINE=InnoDB;


# This table stores basic poll information
CREATE TABLE IF NOT EXISTS poll (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	user_id		 BIGINT NOT NULL,
	question	VARCHAR(35),
	picture_1_id	 BIGINT NOT NULL,
	picture_2_id	 BIGINT NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (user_id) REFERENCES user(_id),
	FOREIGN KEY (picture_1_id) REFERENCES picture(_id),
	FOREIGN KEY (picture_2_id) REFERENCES picture(_id)
) ENGINE=InnoDB;

# This table stores user credentials
# The salt value is used to has the members password
# The salt value is created when the member registers
# or changes their password.
# We take the passed in password, add the salt to it, hash it
# then verify the hashed password that was passed in matches
# the one in the table.
CREATE TABLE IF NOT EXISTS user_credentials (
	_id		 BIGINT NOT NULL,
	email		VARCHAR(254) NOT NULL,
	password	VARCHAR(254) NOT NULL,
	salt		VARCHAR(32) NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (_id) REFERENCES user(_id)
) ENGINE=InnoDB;

# This table stores whether or not the user verified
# Their e-mail after registration
# If the user tries to verify their e-mail after a
# certain amount of days after the verification e-mail
# is sent out, the verification becomes invalidated and
# a new code should be created and sent out with a new
# timestamp
CREATE TABLE IF NOT EXISTS user_verification (
	_id		 BIGINT NOT NULL,
	code		VARCHAR(32) NOT NULL,
	verified	BOOLEAN NOT NULL,
	timestamp	DATETIME NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (_id) REFERENCES user(_id)
) ENGINE=InnoDB;

# This table stores user account properties.
# The locked flag is when someone fails to login after
# 3-5 attempts. When this flag is set, an e-mail should
# be sent out with directions on how to reset their password.
# The closed flag is set when a user decides to close their
# account.
CREATE TABLE IF NOT EXISTS user_account (
	_id			 BIGINT NOT NULL,
	locked			BOOLEAN NOT NULL,
	closed			BOOLEAN NOT NULL,
	created_timestamp	DATETIME NOT NULL,
	locked_timestamp	DATETIME,
	closed_timestamp	DATETIME,
	PRIMARY KEY (_id),
	FOREIGN KEY (_id) REFERENCES user(_id)
) ENGINE=InnoDB;

# This table stores a users login attempts
# To determine if they have unsuccessfully logged in 3-5 times
# select the login attemps since their last successful
# login and count them. If the number is > 3-5 then lock
# the account.
CREATE TABLE IF NOT EXISTS user_login (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	user_id		 BIGINT NOT NULL,
	success		BOOLEAN NOT NULL,
	timestamp	DATETIME,
	PRIMARY KEY (_id),
	FOREIGN KEY (_id) REFERENCES user(_id)
) ENGINE=InnoDB;

# This table stores a user's friend list.
CREATE TABLE IF NOT EXISTS user_friend (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	user_id		 BIGINT NOT NULL,
	friend_id	 BIGINT NOT NULL,
	timestamp	DATETIME NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (user_id) REFERENCES user(_id),
	FOREIGN KEY (friend_id) REFERENCES user(_id),
	CONSTRAINT uc_user_friend UNIQUE (user_id, friend_id)
) ENGINE=InnoDB;

# THis table stores the type of friends
CREATE TABLE IF NOT EXISTS friend_type (
	_id		 SMALLINT NOT NULL AUTO_INCREMENT,
	type		VARCHAR(15),
	description	VARCHAR(50),
	PRIMARY KEY (_id)
) ENGINE=InnoDB;

# This table stores what kind of friend a user is.
# This is a one to many table (one user_friend, many user_friend_types)
CREATE TABLE IF NOT EXISTS user_friend_type (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	user_friend_id	 BIGINT NOT NULL,
	friend_type	 SMALLINT NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (user_friend_id) REFERENCES user_friend(_id),
	CONSTRAINT uc_user_friend_type UNIQUE (user_friend_id, friend_type)
) ENGINE=InnoDB;

# This table stores the user's vote history
# vote will be 1 or 2 for which picture they voted for
CREATE TABLE IF NOT EXISTS user_vote_history (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	user_id		 BIGINT NOT NULL,
	poll_id		 BIGINT NOT NULL,
	vote		 TINYINT NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (user_id) REFERENCES user(_id),
	FOREIGN KEY (poll_id) REFERENCES poll(_id),
	CONSTRAINT uc_user_vote_history UNIQUE (user_id, poll_id)
) ENGINE=InnoDB;


################################################
## POLL TABLES
################################################

# This table stores poll state.
# vote_# are how many votes per picture
# close_on_vote tells you how many votes are needed to close. If it's
# null then it's not used.
# close_on_time tells you when it will close. If it's null then it's
# not used.
# share_type determines who or how the poll is shared
CREATE TABLE IF NOT EXISTS poll_state (
	_id		 BIGINT NOT NULL,
	closed		BOOLEAN NOT NULL,
	vote_1		 INT NOT NULL,
	vote_2		 INT NOT NULL,
	close_on_vote	 INT,
	close_on_time	DATETIME,
	share_type_id	 SMALLINT NOT NULL,
	open_timestamp	DATETIME NOT NULL,
	close_timestamp	DATETIME NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (_id) REFERENCES poll(_id)
) ENGINE=InnoDB;

# This table stores the different share types
CREATE TABLE IF NOT EXISTS share_type (
	_id		 SMALLINT NOT NULL AUTO_INCREMENT,
	name		VARCHAR(15) NOT NULL,
	description	VARCHAR(50) NOT NULL,
	PRIMARY KEY (_id)
) ENGINE=InnoDB;

# This table stores which user is following which poll
CREATE TABLE IF NOT EXISTS poll_follow (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	user_id		 BIGINT NOT NULL,
	poll_id		 BIGINT NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (user_id) REFERENCES user(_id),
	FOREIGN KEY (poll_id) REFERENCES poll(_id),
	CONSTRAINT uc_poll_follow UNIQUE (user_id, poll_id)
) ENGINE=InnoDB;

# This table stores 'tags' (like hash tags) that can be used to
# find the poll. Also can be used to specify the category the poll
# goes in.
CREATE TABLE IF NOT EXISTS tag (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	name		VARCHAR(15),
	PRIMARY KEY (_id),
	CONSTRAINT uc_tag UNIQUE (name)
) ENGINE=InnoDB;

# This table correlates polls with tags.
# There can be one poll with many tags or one poll with one tag.
CREATE TABLE IF NOT EXISTS poll_tag (
	_id		 BIGINT NOT NULL AUTO_INCREMENT,
	poll_id		 BIGINT NOT NULL,
	tag_id		 BIGINT NOT NULL,
	PRIMARY KEY (_id),
	FOREIGN KEY (poll_id) REFERENCES poll(_id),
	FOREIGN KEY (tag_id) REFERENCES tag(_id),
	CONSTRAINT uc_poll_tag UNIQUE (poll_id, tag_id)
) ENGINE=InnoDB;