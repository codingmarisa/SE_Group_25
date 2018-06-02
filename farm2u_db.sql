-- ACCT TABLE

DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account` (
    `a_acct_id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(10) NOT NULL,
    `password` varchar(20) NOT NULL,
    `acct_type` varchar(10) NOT NULL,
    CONSTRAINT `acct_username` UNIQUE(`username`),
    CONSTRAINT `accts_username` UNIQUE(`a_acct_id`, `username`),
    PRIMARY KEY (`a_acct_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Account` WRITE;
INSERT INTO `Account` (`username`, `password`, `acct_type`)
VALUES  ("farm1", "abcd1234", "Farm"),
      ("farm2", "abcd1234", "Farm"),
      ("farm3", "abcd1234", "Farm"),
      ("customer1", "abcd1234", "Customer"),
      ("customer2", "abcd1234", "Customer"),
      ("customer3", "abcd1234", "Customer"),
      ("rabbit1", "abcd1234", "Rabbit"),
      ("rabbit2", "abcd1234", "Rabbit"),
      ("rabbit3", "abcd1234", "Rabbit");
UNLOCK TABLES;

DROP TABLE IF EXISTS `Item`;
CREATE TABLE `Item` (
    `it_item_id` int(11) NOT NULL AUTO_INCREMENT,
    `it_name` varchar(255) NOT NULL,
    `qty` int(11) NOT NULL,
    `price` int(11) NOT NULL,
    PRIMARY KEY (`it_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Item` WRITE;
INSERT INTO `Item` (`it_name`, `qty`, `price`)
VALUES  ("Lettuce", 10, 1.50), -- it_item_id = 01
      ("Tomato", 15, 2.00), -- it_item_id = 02
      ("Zucchini", 20, 2.50), -- it_item_id = 03
      ("Spinach", 25, 3.00), -- it_item_id = 04
      ("Cauliflower", 30, 3.50), -- it_item_id = 05
      ("Cabbage", 35, 4.00), -- it_item_id = 06
      ("Garlic", 40, 4.50), -- it_item_id = 07
      ("Broccoli", 45, 5.00), -- it_item_id = 08
      ("Basil", 50, 5.50), -- it_item_id = 09
      ("Strawberries", 55, 6.00), -- it_item_id = 10
      ("Peaches", 60, 6.50), -- it_item_id = 11
      ("Blueberries", 65, 7.00), -- it_item_id = 12
      ("Snap Peas", 70, 7.50), -- it_item_id = 13
      ("Watermelon", 75, 8.00); -- it_item_id = 14
UNLOCK TABLES;


DROP TABLE IF EXISTS `Inventory`;
CREATE TABLE `Inventory` (
    `inv_acct_id` int(11) NOT NULL,
    `inv_item_id` int(11) NOT NULL,
    PRIMARY KEY (`inv_acct_id`, `inv_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Inventory` WRITE;
INSERT INTO `Inventory` (`inv_acct_id`, `inv_item_id`)
VALUES
-- farm1
      (01, 01), -- farm1, Lettuce
      (01, 01), -- farm1, Lettuce
      (01, 01), -- farm1, Lettuce
      (01, 01), -- farm1, Lettuce
      (01, 01), -- farm1, Lettuce
      (01, 01), -- farm1, Lettuce
      (01, 01), -- farm1, Lettuce

      (01, 02), -- farm1, Tomato
      (01, 02), -- farm1, Tomato
      (01, 02), -- farm1, Tomato
      (01, 02), -- farm1, Tomato
      (01, 02), -- farm1, Tomato
      (01, 02), -- farm1, Tomato
      (01, 02), -- farm1, Tomato
      (01, 02), -- farm1, Tomato
      (01, 02), -- farm1, Tomato

      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach
      (01, 04), -- farm1, Spinach

      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli
      (01, 08), -- farm1, Broccoli

      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon
      (01, 14), -- farm1, Watermelon

-- farm2
      (02, 01), -- farm2, Lettuce
      (02, 01), -- farm2, Lettuce
      (02, 01), -- farm2, Lettuce
      (02, 01), -- farm2, Lettuce
      (02, 01), -- farm2, Lettuce
      (02, 01), -- farm2, Lettuce

      (02, 02), -- farm2, Tomato
      (02, 02), -- farm2, Tomato
      (02, 02), -- farm2, Tomato
      (02, 02), -- farm2, Tomato
      (02, 02), -- farm2, Tomato
      (02, 02), -- farm2, Tomato

      (02, 04), -- farm2, Spinach
      (02, 04), -- farm2, Spinach
      (02, 04), -- farm2, Spinach
      (02, 04), -- farm2, Spinach
      (02, 04), -- farm2, Spinach
      (02, 04), -- farm2, Spinach
      (02, 04), -- farm2, Spinach
      (02, 04), -- farm2, Spinach
      (02, 04), -- farm2, Spinach

      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage
      (02, 06), -- farm2, Cabbage

      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil
      (02, 09), -- farm2, Basil

      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas
      (02, 13), -- farm2, Snap Peas

-- farm3
      (03, 03), -- farm3
      (03, 13), -- farm3, Snap Peas
      (03, 13), -- farm3, Snap Peas
      (03, 13), -- farm3, Snap Peas
      (03, 13), -- farm3, Snap Peas
      (03, 13), -- farm3, Snap Peas
      (03, 13), -- farm3, Snap Peas
      (03, 13), -- farm3, Snap Peas
      (03, 13), -- farm3, Snap Peas
      (03, 13), -- farm3, Snap Peas
      (03, 13); -- farm3, Snap Peas
UNLOCK TABLES;






-- ORIGINAL CODE FROM TUCKER'S PROJECT
/*
DROP TABLE IF EXISTS `item`;
CREATE TABLE item (
    `item_id` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `weight` int,
    `manufactureDate` date,
    `expirationDate` date
) ENGINE=InnoDB;

-- insert into item table
LOCK TABLES `item` WRITE;
INSERT INTO `item` (`name`, `weight`, `manufactureDate`, `expirationDate`)
VALUES  ("Backpack", 5, NULL, NULL),						-- 1
    	("Cooler", 10, NULL, NULL),							-- 2
    	("Pelican Case", 7, NULL, NULL),					-- 3
    	("Harness", 1, "2011-01-01", "2016-01-01"),			-- 4
    	("Climbing Shoes", 5, "2017-01-01", "2017-02-01"),	-- 5
    	("Helmet", 1, "2017-02-22", "2018-08-13"),			-- 6
    	("Potatos", 5, NULL, NULL),							-- 7
    	("Clif Bars", 1, NULL, NULL);						-- 8
UNLOCK TABLES;

-- FOOD TABLE

DROP TABLE IF EXISTS `item_food`;
CREATE TABLE item_food (
  `item_id` int PRIMARY KEY NOT NULL,
  `calories` int,
  `fat` int,
  `protein` int,
  FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- insert food item information
LOCK TABLES `item_food` WRITE;
INSERT INTO `item_food` (`item_id`, `calories`, `fat`, `protein`)
VALUES  (7, 100, 200, 0), (8, 150, 70, 30);
UNLOCK TABLES;

-- EQUIPMENT TABLE

DROP TABLE IF EXISTS `item_equipment`;
CREATE TABLE item_equipment (
  `item_id` int PRIMARY KEY NOT NULL,
  `description` varchar(255),
  FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- insert equipment item information
LOCK TABLES `item_equipment` WRITE;
INSERT INTO `item_equipment` (`item_id`, `description`)
VALUES  (1, "carry stuff!"), (2, "keep stuff cool"), (3, "storage"), (4, "holding you as you climb"), (5, "sticking to the wall"), (6, "protect your noggin");
UNLOCK TABLES;

-- CONTAINER TABLE

DROP TABLE IF EXISTS `item_container`;
CREATE TABLE item_container (
  `container_item_id` int,
  `contained_item_id` int PRIMARY KEY,
  FOREIGN KEY (`container_item_id`) REFERENCES `item`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`contained_item_id`) REFERENCES `item`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- insert contents into container items
LOCK TABLES `item_container` WRITE;
INSERT INTO `item_container` (`container_item_id`, `contained_item_id`)
VALUES  (1, 4), (1, 5), (1, 6), (2, 7), (3, 1);
UNLOCK TABLES;

*/
