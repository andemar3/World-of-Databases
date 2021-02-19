SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Locations;
DROP TABLE IF EXISTS Quests;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS PlayersItems;
SET FOREIGN_KEY_CHECKS = 1;

-- get all players, locations and items to populate the play game table
SELECT playerName, currentLocationID, itemID FROM Players, PlayersItems;

-- get all Quest, Location, Items to populate 2nd play game table
SELECT questRewardedFrom, questLocation, itemName FROM Items, Quests WHERE Quests.questName = Items.questRewardedFrom;

-- get all Quest, Items for search tab
SELECT questRewardedFrom, itemName FROM Items;

-- get all Players, Locations for search tab
SELECT playerName, currentLocationID FROM Players;

-- get locationID of current player for edit dropdown
-- somehow need a current_playerID
SELECT currentLocationID, FROM Players WHERE playerID = current_playerID;

-- get quest of current player for edit dropdown
SELECT currentQuest FROM Players WHERE playerID = current_playerID;

-- get items of current player for edit dropdown
SELECT itemID FROM PlayersItems where playerID = current_playerID;

-- update/change location of current player
-- somehow make a newLocationID?
UPDATE Players SET currentLocationID = newLocationID WHERE playerID = current_playerID;

-- update to mark quest as complete
UPDATE Players SET numberofQuestsCompleted = numberofQuestsCompleted + 1 WHERE playerID = current_playerID;
UPDATE Players SET currentQuest = 0 WHERE playerID = current_playerID;
-- update to use items and add to player stats
-- trying to use the varible inside statBoosted ex. 'playerHealth'
UPDATE Players SET Players.statBoosted = Players.statBoosted + PlayerItems.statBoostAmount WHERE playerID = current_playerID;

CREATE TABLE Locations (
	locationID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
	locationName varchar(255) UNIQUE NOT NULL,
	PRIMARY KEY (locationID)
);

CREATE TABLE Quests (
	questID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
	questName varchar(255) UNIQUE NOT NULL,
	questLocation int NOT NULL,
	statRequired varchar(25) NOT NULL,
	statMinimum int NOT NULL,
	statBoostAmount int,
	PRIMARY KEY (questID),
	FOREIGN KEY (questLocation) REFERENCES Locations(locationID)
);

CREATE TABLE Players (
	playerID int(11) AUTO_INCREMENT NOT NULL,
	playerName varchar(255) UNIQUE NOT NULL,
	numberOfQuestsCompleted int DEFAULT 0,
	currentQuest int,
	currentLocationID int NOT NULL DEFAULT 0,
	playerHealth int DEFAULT 5,
	playerMagic int DEFAULT 5,
	strengthStat int DEFAULT 5,
	intelligenceStat int DEFAULT 5,
	defenceStat int DEFAULT 5,
	PRIMARY KEY(playerID),
	FOREIGN KEY(currentQuest) REFERENCES Quests(questID),
	FOREIGN KEY(currentLocationID) REFERENCES Locations(locationID)
);

CREATE TABLE Items (
	itemID int(11) AUTO_INCREMENT UNIQUE NOT NULL,
	itemName varchar(255) UNIQUE NOT NULL,
	statBoosted varchar(25) NOT NULL,
	statBoostAmount int NOT NULL,
	questRewardedFrom int UNIQUE NOT NULL,
	PRIMARY KEY(itemID),
	FOREIGN KEY(questRewardedFrom) REFERENCES Quests(questID)
);

CREATE TABLE PlayersItems (
	playerID int NOT NULL,
	itemID int NOT NULL,
	FOREIGN KEY (playerID) REFERENCES Players(playerID),
	FOREIGN KEY (itemID) REFERENCES Items(itemID)
);


INSERT INTO Players (playerID, playerName, numberOfQuestsCompleted, currentQuest, currentLocationID, playerHealth, playerMagic, strengthStat, intelligenceStat, defenceStat) VALUES
(0, 'Default Player', 0, NULL, 0, 5, 5, 5, 5, 5),
(1, 'Player 1', 2, 3, 1, 5, 5, 6, 5, 7),
(2, 'Player 2', 1, 2, 3, 3, 5, 5, 5, 5);

INSERT INTO Items (itemID, itemName, statBoosted, statBoostAmount, questRewardedFrom) VALUES
(0, 'Defence Booster', 'defenceStat', 2, 1),
(1, 'Strength +1', 'strengthStat', 1, 2),
(2, 'Cursed Item', 'playerHealth', -2, 3);

INSERT INTO Quests (questID, questName, questLocation, statRequired, statMinimum) VALUES
(0, 'Flavor Quest', 0, 'playerMagic', 0),
(1, 'Quest 1', 1, 'intelligenceStat', 3),
(2, 'Quest 2', 3, 'playerHealth', 5),
(3, 'Quest 3', 1, 'defenceStat', 6);

INSERT INTO Locations (locationID, locationName) VALUES
(0, 'Starting Area'),
(1, 'Location 1'),
(2, 'Location 2'),
(3, 'Location 3');

INSERT INTO PlayersItems (playerID, itemID) VALUES
(1, 0),
(1, 1),
(2, 2);