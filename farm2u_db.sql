-- ACCT TABLE

DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account` (
    `a_acct_id` int PRIMARY KEY AUTO_INCREMENT,
    `username` varchar(10) NOT NULL,
    `password` varchar(20) NOT NULL,
    `acct_type` varchar(10) NOT NULL,
    CONSTRAINT `acct_username` UNIQUE(`username`),
    CONSTRAINT `accts_username` UNIQUE(`a_acct_id`, `username`)
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
    `it_item_id` int PRIMARY KEY AUTO_INCREMENT,
    `it_name` varchar(255) NOT NULL,
    `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Item` WRITE;
INSERT INTO `Item` (`it_name`, `price`)
VALUES  ("Lettuce", 1.50), -- it_item_id = 01
        ("Tomato", 2.00), -- it_item_id = 02
        ("Zucchini", 2.50), -- it_item_id = 03
        ("Spinach", 3.00), -- it_item_id = 04
        ("Cauliflower", 3.50), -- it_item_id = 05
        ("Cabbage", 4.00), -- it_item_id = 06
        ("Garlic", 4.50), -- it_item_id = 07
        ("Broccoli", 5.00), -- it_item_id = 08
        ("Basil", 5.50), -- it_item_id = 09
        ("Strawberries", 6.00), -- it_item_id = 10
        ("Peaches", 6.50), -- it_item_id = 11
        ("Blueberries", 7.00), -- it_item_id = 12
        ("Snap Peas", 7.50), -- it_item_id = 13
        ("Watermelon", 8.00); -- it_item_id = 14
UNLOCK TABLES;


DROP TABLE IF EXISTS `Inventory`;
CREATE TABLE `Inventory` (
    `inv_id` int PRIMARY KEY AUTO_INCREMENT,  
    `inv_acct_id` int(11) NOT NULL,
    `inv_item_id` int(11) NOT NULL,
    `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `Inventory` WRITE;
INSERT INTO `Inventory` (`inv_acct_id`, `inv_item_id`, `quantity`)
VALUES
-- farm1
      (01, 01, 10), -- farm1, Lettuce, 10
      (01, 02, 8), -- farm1, Tomato
      (01, 04, 5), -- farm1, Spinach
      (01, 08, 23), -- farm1, Broccoli
      (01, 14, 2345), -- farm1, Watermelon

-- farm2
      (02, 01, 22), -- farm2, Lettuce
      (02, 02, 5), -- farm2, Tomato
      (02, 04, 700), -- farm2, Spinach
      (02, 06, 53), -- farm2, Cabbage
      (02, 09, 200), -- farm2, Basil
      (02, 13, 24), -- farm2, Snap Peas

-- farm3
      (03, 13, 30); -- farm3, Snap Peas, 30
UNLOCK TABLES;