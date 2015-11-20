CREATE DATABASE chat;

USE chat;

-- CREATE TABLE messages (
--    Describe your table here.

-- );

/* Create other tables and define schemas for them here! */

CREATE TABLE `Users` (
  `user_id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` CHAR(20) NOT NULL,
  PRIMARY KEY (`user_id`)
);


CREATE TABLE `Messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `text` CHAR(160) NOT NULL,
  `room_id` INT NOT NULL,
  `user_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `Rooms` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `roomname` CHAR(20) NOT NULL,
  PRIMARY KEY (`room_id`)
);


ALTER TABLE `Messages` ADD FOREIGN KEY (room_id) REFERENCES `Rooms` (`room_id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`user_id`);

