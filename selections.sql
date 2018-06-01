-- select everything inside of the backpack
SELECT I.name FROM item I
INNER JOIN item_container IC ON I.item_id=IC.contained_item_id
WHERE IC.container_item_id=1;

-- select everything inside of the cooler
SELECT I.name FROM item I
INNER JOIN item_container IC ON I.item_id=IC.contained_item_id
WHERE IC.container_item_id=2;

-- select everything inside of the pelican case
SELECT I.name FROM item I
INNER JOIN item_container IC ON I.item_id=IC.contained_item_id
WHERE IC.container_item_id=3;

-- find the weight of a specific item

-- find the weight of the contents of an item

-- find the sum of the weight of contents of an item

-- find the sum plus the weight of an item and its contents

-- find the above, nested

-- find the weight of all items inside of the bakcpack, including the backpack


-- find the weight of all items inside of the pelican case, including nested containers and including the pelican case

-- select only food items: The id,name, weight, protein, carbs, calories
SELECT I.item_id, I.name, I.weight, F.calories, F.fat, F.protein FROM item I
INNER JOIN item_food F ON I.item_id=F.item_id;

-- select only equipment items: The id, name, weight, manufacture date, expiration date, and description
SELECT I.item_id, I.name, I.weight, I.manufactureDate, I.expirationDate, E.description FROM item I
INNER JOIN item_equipment E ON I.item_id=E.item_id;

-- select only container names
SELECT I.item_id, I.name FROM item I
INNER JOIN item_container C ON I.item_id=C.container_item_id;
-- select contained names from containers
SELECT I.item_id, I.name FROM item I
INNER JOIN item_container_contents C ON I.item_id=C.container_item_id;

-- select names of containers and their contents
SELECT CTR.name AS "container", CTD.name AS "contents" FROM
(SELECT I1.item_id, I1.name, IC1.container_item_id FROM item I1 INNER JOIN item_container_contents IC1 ON I1.item_id=IC1.container_item_id) as CTR
INNER JOIN
(SELECT I2.item_id, I2.name, IC2.container_item_id, IC2.contained_item_id FROM item I2 INNER JOIN item_container_contents IC2 ON I2.item_id=IC2.contained_item_id) as CTD ON CTR.container_item_id=CTD.container_item_id
GROUP BY CTD.item_id
ORDER BY CTR.item_id;

-- MANY TO MANY: select names of containers and their contents
SELECT I1.name AS "container", I2.name AS "contents" FROM item_container_contents ICC 
INNER JOIN item I1 ON ICC.container_item_id=I1.item_id
INNER JOIN item I2 ON ICC.contained_item_id=I2.item_id;

-- select names of backpackers and what they carry
SELECT B.fName AS "First Name", B.lName AS "Last Name", I.name AS "Item" FROM backpacker_carry BC 
INNER JOIN backpacker B ON BC.backpacker_id=B.backpacker_id
INNER JOIN item I ON BC.carry_item_id=I.item_id;

-- select names of backpackers and their carry capacity
SELECT fName AS "First Name", lName AS "Last Name", carryCapacity AS "Carry Capacity" FROM backpacker;

INSERT INTO item_container (container_item_id) VALUES ((SELECT MAX(item_id) FROM item));

INSERT INTO item (name, weight) VALUES ("test food", 2); INSERT INTO item_food ( item_id, calories, fat, protein) VALUES ((SELECT MAX(item_id) FROM item), 2, 2, 2);

-- Removing containers and contents
DELETE FROM item_container_contents WHERE container_item_id = 1 AND contained_item_id = 4

------------------------------------------------------------------------------------------------------

-- getItem
SELECT item_id, name, weight, manufactureDate, expirationDate FROM item WHERE item_id = [item_id_input]

-- getBackpacker
SELECT backpacker_id, fName, lName, carryCapacity FROM backpacker WHERE backpacker_id = [backpacker_id_input]

-- getBackpackerCarry (get everything a specific backpacker is carrying)
SELECT B.fName AS "First Name", B.lName AS "Last Name", I.name AS "Item" FROM backpacker_carry BC 
INNER JOIN backpacker B ON BC.backpacker_id=B.backpacker_id
INNER JOIN item I ON BC.carry_item_id=I.item_id
WHERE B.backpacker_id=[backpacker_id_input];

-- addFood
INSERT INTO item (name, weight) VALUES ([foodName_input], [foodWeight_input])
INSERT INTO item_food ( item_id, calories, fat, protein) VALUES ((SELECT MAX(item_id) FROM item), [calories_input], [fat_input], [protein_input])

-- addBackPacker
INSERT INTO backpacker (fName, lName, carryCapacity) VALUES ([fName_input], [lName_input], [carryCapacity_input])

-- addEquipment
INSERT INTO item (name, weight, manufactureDate, expirationDate) VALUES ([name_input], [weight_input], [manufactureDate_input], [expirationDate_input])
INSERT INTO item_equipment (item_id, description) VALUES ((SELECT MAX(item_id) FROM item), [description_input])

-- tag an equipment item as a container
INSERT INTO item_container (container_item_id) VALUES ((SELECT MAX(item_id) FROM item))

-- packItem
INSERT INTO item_container_contents (container_item_id, contained_item_id) VALUES ([container_item_input], [contained_item_input])

-- update backpacker
UPDATE backpacker SET fName=[fname_input], lName=[lName_input], carryCapacity=[carryCapacity_input] WHERE backpacker_id=[backpacker_id_input]

-- update item
UPDATE item SET name=[name_input], weight=[weight_input] WHERE item_id=[item_id_input]

-- delete backpacker
DELETE FROM backpacker WHERE backpacker_id = [backpacker_id_input]

-- delete item
DELETE FROM item WHERE item_id = [item_id_input]

-- remove item from container
DELETE FROM item_container_contents WHERE rel_id = [rel_id_input]