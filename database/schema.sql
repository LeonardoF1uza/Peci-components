DROP TABLE IF EXISTS `families`;
CREATE TABLE `families` (
    `family_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `family_name` varchar(50) NOT NULL
);

DROP TABLE IF EXISTS `components`;
CREATE TABLE `components` (
    `component_id` INT NOT NULL AUTO_INCREMENT,
    `family_id` INT NOT NULL,
    `name` varchar(255) UNIQUE NOT NULL,
    `reference` varchar(50) UNIQUE NOT NULL,
    `position` varchar(50) NOT NULL,
    `quantity` INT NOT NULL,
    `price` DECIMAL(10,2),
    `description` TEXT,
    PRIMARY KEY (`component_id`),
    FOREIGN KEY (`family_id`) REFERENCES families(`family_id`)
);

INSERT INTO `families` (`family_name`) VALUES
    ('RASPBERRY PI'),
    ('FONTEALIMENTAÇÃO'),
    ('MEMÓRIA'),
    ('CONSUMIVÉIS 3D'),
    ('MICROCOMPUTADOR')
;

INSERT INTO `components`
    (`family_id`,`name`,`reference`,`position`,`quantity`,`price`,`description`) VALUES
    (1, 'RASPBERRY PI3 MODELO B 1GB RAM', '640522710850', 'Arm121', 2, 31.41, NULL),
    (2, 'RASPBERRY PI3/BEAGLEBONE BLACK ADAPTADA FONTE ALIMENTAÇÃO 5.1V 2.5A', 'QR025', 'Arm063', 23, 8.91, NULL),
    (3, 'MICRO SD 16GB PARA RASPBERRY PI3', '640522710904', 'Arm061', 0, 8.89, NULL),
    (5, 'BEAGLEBONE BLACK C/ CABO MINI USB/USB', '640522710690', 'Arm121', 20, 43.07, NULL),
    (4, 'BEESUPPLY FILAMENTO SIGNAL BLACK (PRETO) PLA 1,75MM 330G', '5600881930387', 'Arm062', 16, 9.90, NULL)
;
