-- CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';

-- GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;

DROP DATABASE IF EXISTS picr_development;

CREATE DATABASE picr_development;

USE picr_development;

-- Stores all pictures
-- Pictures will be stored in multiple directories: original, scaled
CREATE TABLE IF NOT EXISTS picture (
	_id			INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name		VARCHAR(255),
    created_on	DATETIME NOT NULL,
    PRIMARY KEY(_id)
) ENGINE=InnoDB;

-- Primary user table for basic user information
CREATE TABLE IF NOT EXISTS user (
	_id				INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name		VARCHAR(35) NOT NULL,
    last_name		VARCHAR(35) NOT NULL,
    sex				CHAR(1) NOT NULL,
    birthday		DATE NOT NULL,
    PRIMARY KEY(_id)
) ENGINE=InnoDB;

-- Role types will be defined for each employee roles such as 'administrator'
CREATE TABLE IF NOT EXISTS role_type (
	_id					SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name				VARCHAR(35) NOT NULL,
    description			VARCHAR(35) NOT NULL,
    created_on			DATETIME NOT NULL,
    PRIMARY KEY(_id),
    CONSTRAINT u_role UNIQUE(name)
) ENGINE=InnoDB;

-- Roles will only be defined for employees.
-- Regular users will not have a record in this table.
CREATE TABLE IF NOT EXISTS user_role (
	_id				INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id			INT UNSIGNED NOT NULL,
    role_type_id	SMALLINT UNSIGNED NOT NULL,
    created_on		DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(user_id) REFERENCES user(_id),
    FOREIGN KEY(role_type_id) REFERENCES role_type(_id),
    CONSTRAINT u_user_role UNIQUE(user_id, role_type_id)
) ENGINE=InnoDB;

-- Stores user credentials for logging in.
CREATE TABLE IF NOT EXISTS user_credentials (
	_id				INT UNSIGNED NOT NULL,
    email			VARCHAR(254) NOT NULL,
    password		VARCHAR(254) NOT NULL,
    salt			VARCHAR(32) NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(_id) REFERENCES user(_id),
    CONSTRAINT u_user_credentials UNIQUE (email)
) ENGINE=InnoDB;

-- This is used purely for verifying initial registration.
-- User will register with an e-mail and password.
-- A link will be sent to the user's e-mail address that contains
-- the verification code. The user must login using the right e-mail
-- and password to complete the verification.
-- A new verification should be sent if the user requests it.
-- If the user is unable to verify within a certain amount of days,
-- an e-mail will be sent out that the user must register again.
-- Upon registration, this record will be deleted.
CREATE TABLE IF NOT EXISTS user_verification (
	_id				INT UNSIGNED NOT NULL,
    code			VARCHAR(32) NOT NULL,
    verified		BOOL NOT NULL,
    created_on		DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(_id) REFERENCES user(_id),
    CONSTRAINT u_user_verification UNIQUE (_id)
) ENGINE=InnoDB;

-- Stores user account state information
CREATE TABLE IF NOT EXISTS user_account (
	_id			INT UNSIGNED NOT NULL,
    locked		BOOL NOT NULL,
    closed		BOOL NOT NULL,
    verified	BOOL NOT NULL,
    locked_on	DATETIME,
    closed_on	DATETIME,
    verified_on	DATETIME,
    created_on	DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(_id) REFERENCES user(_id)
) ENGINE=InnoDB;

-- Stores all login attempts, pass or fail.
-- This table will also help to determine if the
-- user should be locked out for a duration of
-- time due to too many failed login attempts.
-- Should prompt a user to reset their password.
CREATE TABLE IF NOT EXISTS user_login_attempts (
	_id		INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id	INT UNSIGNED NOT NULL,
    success	BOOL NOT NULL,
    created_on	DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(user_id) REFERENCES user(_id)
) ENGINE=InnoDB;

-- This table tracks user sessions.
-- Initially this will only track single sessions
-- based on a user_id. Later this will track
-- user sessions based on the device and user_id
CREATE TABLE IF NOT EXISTS user_session (
	_id			INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id		INT UNSIGNED NOT NULL,
    uuid		VARCHAR(36) NOT NULL,
    created_on	DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(user_id) REFERENCES user(_id),
    CONSTRAINT u_user_session UNIQUE (uuid)
) ENGINE=InnoDB;

-- Different user connections such as friends, brother, sister, etc...
CREATE TABLE IF NOT EXISTS connection_type (
	_id			SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name		VARCHAR(35) NOT NULL,
    description	VARCHAR(35) NOT NULL,
	PRIMARY KEY(_id),
    CONSTRAINT u_connection_type UNIQUE(name)
) ENGINE=InnoDB;

-- Links the user to their connection and specifies the connection type
CREATE TABLE IF NOT EXISTS user_connection (
	_id			INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id		INT UNSIGNED NOT NULL,
    conn_id		INT UNSIGNED NOT NULL,
    created_on	DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(user_id) REFERENCES user(_id),
    FOREIGN KEY(conn_id) REFERENCES user(_id),
    CONSTRAINT u_user_conn UNIQUE (user_id, conn_id)
) ENGINE=InnoDB;

-- A user can have multiple connection types for a single connection
-- For example: A connection can be both a friend and a coworker
CREATE TABLE IF NOT EXISTS user_connection_type (
	_id				INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_conn_id	INT UNSIGNED NOT NULL,
    conn_type		SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(user_conn_id) REFERENCES user_connection(_id),
    CONSTRAINT u_user_conn_type UNIQUE(user_conn_id, conn_type)
) ENGINE=InnoDB;

-- Stores the history of picks a user has participated in and
-- what they picked.
CREATE TABLE IF NOT EXISTS user_pick_history (
	_id			INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id		INT UNSIGNED NOT NULL,
    pick_id		INT UNSIGNED NOT NULL,
    picture_id	INT UNSIGNED NOT NULL,
    created_on	DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(user_id) REFERENCES user(_id),
    FOREIGN KEY(picture_id) REFERENCES picture(_id),
    CONSTRAINT u_user_pick_history UNIQUE(user_id, pick_id)
) ENGINE=InnoDB;

-- The pick created by a user
CREATE TABLE IF NOT EXISTS pick (
	_id				INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id			INT UNSIGNED NOT NULL,
	question		VARCHAR(35),
    picture_1_id	INT UNSIGNED NOT NULL,
    picture_2_id	INT UNSIGNED NOT NULL,
    created_on		DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(user_id) REFERENCES user(_id),
    FOREIGN KEY(picture_1_id) REFERENCES picture(_id),
    FOREIGN KEY(picture_2_id) REFERENCES picture(_id)
) ENGINE=InnoDB;

-- The share type is who the pick will be shared to.
CREATE TABLE IF NOT EXISTS pick_share_type (
	_id			SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name		VARCHAR(35),
    description	VARCHAR(35),
    created_on	DATETIME NOT NULL,
    PRIMARY KEY(_id),
    CONSTRAINT u_pick_share_type UNIQUE(name)
) ENGINE=InnoDB;

-- This is the state of the pick.
CREATE TABLE IF NOT EXISTS pick_state (
	_id				INT UNSIGNED NOT NULL,
    closed			BOOL NOT NULL,
    pick_1			MEDIUMINT UNSIGNED NOT NULL,
    pick_2			MEDIUMINT UNSIGNED NOT NULL,
    close_on_pick	MEDIUMINT UNSIGNED,
    close_on_time	DATETIME,
    share_type_id	SMALLINT UNSIGNED NOT NULL,
    open_on			DATETIME NOT NULL,
    close_on		DATETIME,
    created_on		DATETIME NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(_id) REFERENCES pick(_id),
    CONSTRAINT u_pick_state UNIQUE(_id)
) ENGINE=InnoDB;

-- This stores the list of users following a particular pick.
CREATE TABLE IF NOT EXISTS pick_follow (
	_id		INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id	INT UNSIGNED NOT NULL,
    pick_id	INT UNSIGNED NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(user_id) REFERENCES user(_id),
    FOREIGN KEY(pick_id) REFERENCES pick(_id),
    CONSTRAINT u_pick_follow UNIQUE(user_id, pick_id)
) ENGINE=InnoDB;

-- These tags will act as "hashtags" for the application and
-- can and will correspond with real hashtags.
CREATE TABLE IF NOT EXISTS tag (
	_id		INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name	VARCHAR(140), -- HASHTAG MAX SIZE
    PRIMARY KEY(_id),
    CONSTRAINT u_tag UNIQUE(name)
) ENGINE=InnoDB;

-- This will connect picks and tags
CREATE TABLE IF NOT EXISTS pick_tag (
	_id	INT UNSIGNED NOT NULL AUTO_INCREMENT,
    tag_id	INT UNSIGNED NOT NULL,
    pick_id	INT UNSIGNED NOT NULL,
    PRIMARY KEY(_id),
    FOREIGN KEY(tag_id) REFERENCES tag(_id),
    FOREIGN KEY(pick_id) REFERENCES pick(_id),
    CONSTRAINT u_pick_tag UNIQUE(tag_id, pick_id)
) ENGINE=InnoDB;

-- Settings used for the backend application
CREATE TABLE IF NOT EXISTS settings (
	_id				INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name			VARCHAR(35) NOT NULL,
    value			VARCHAR(35) NOT NULL,
    active			BOOL,
    created_on		DATETIME NOT NULL,
    PRIMARY KEY(_id)
) ENGINE=InnoDB;