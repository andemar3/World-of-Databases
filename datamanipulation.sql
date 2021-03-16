-- Select Quests and Items for search table --
SELECT Quests.questName, Items.itemName 
	FROM Quests JOIN Items on Items.questRewardedFrom = Quests.questID;

-- Select Players and Locations for search table --
SELECT Players.playerName, Locations.locationName 
	FROM Players JOIN Locations on Players.currentLocationID = Locations.locationID

-- Select Player for Play Game page --
SELECT Players.playerName, Players.playerID, Locations.locationName, Items.itemName, Quests.questName FROM Players
        LEFT JOIN PlayersItems on PlayersItems.playerID = Players.playerID\
        LEFT JOIN Locations on Locations.locationID = Players.currentLocationID\
        LEFT JOIN Items on Items.itemID = PlayersItems.itemID\
        LEFT JOIN Quests on Quests.questID = Players.currentQuest
		
-- Select all Quests for dropdown --
SELECT questID, questName FROM Quests;

-- Select Quests without reward Items for dropdown--
SELECT Quests.questID, Quests.questName 
	FROM Quests WHERE Quests.questID NOT IN 
	(SELECT Items.questRewardedFrom FROM Items JOIN Quests ON Quests.questID = Items.questRewardedFrom)

-- Select all Locations for dropdown --
SELECT locationID, locationName FROM Locations

-- Select all Items for dropdown--
SELECT itemID, itemName FROM Items

-- Select all players for table --
SELECT playerID, playerName FROM Players

-- Select a Player's Items --
SELECT Items.itemID, Items.itemName 
	FROM (PlayersItems JOIN Items ON PlayersItems.itemID = Items.itemID) 
	WHERE PlayersItems.playerID = ?

-- Select single Player for updateplayer --
SELECT Players.playerID, Players.playerName, Players.currentQuest, Players.currentLocationID, Players.playerHealth, Players.playerMagic, Players.strengthStat, Players.intelligenceStat, Players.defenceStat 
	FROM Players WHERE Players.playerID = ?
	
-- Get a Player's current Location --
SELECT Locations.locationName, Locations.locationID 
	FROM Locations JOIN Players ON Players.currentLocationID = Locations.locationID 
	WHERE Players.playerID = ?
	
-- Get a Player's current Quest --
SELECT Quests.questName, Quests.questID 
	FROM Quests JOIN Players ON Players.currentQuest = Quests.questID 
	WHERE Players.playerID = ?
	
-- Get a Player's Items --
SELECT Items.itemName, Items.itemID 
	FROM Items JOIN PlayersItems ON Items.itemID = PlayersItems.itemID JOIN Players ON Players.playerID = PlayersItems.playerID 
	WHERE Players.playerID = ?

-- Update a Player's Location --
UPDATE Players SET currentLocationID =? WHERE playerID =?

-- Add Item rewarded from Quest to PlayerItems --
INSERT INTO PlayersItems SELECT Players.playerID, Items.itemID 
	FROM Players JOIN Quests ON Players.currentQuest = Quests.questID JOIN Items ON Items.questRewardedFrom = Quests.questID 
	WHERE Players.playerID = ?
	
-- Remove Quest from Player -- 
UPDATE Players SET currentQuest = NULL WHERE playerID = ?

-- Add Quest to Player --
UPDATE Players SET currentQuest = ? WHERE playerID =?

-- Insert a Location --
INSERT INTO Locations (locationName) VALUES (?)

-- Insert a Quest --
INSERT INTO Quests (questName, questLocation, statRequired, statMinimum) VALUES (?, ?, ?, ?)

-- Insert an Item --
INSERT INTO Items (itemName, questRewardedFrom, statBoosted, statBoostAmount) VALUES (?, ?, ?, ?)

-- Insert a Player --
INSERT INTO Players (playerName) VALUES (?)

-- Delete a Location --
DELETE FROM Locations WHERE locationID = ?

-- Delete a Quest --
DELETE FROM Quests WHERE questID = ?

-- Delete an Item --
DELETE FROM Items WHERE itemID = ?

-- Delete a Player --
DELETE FROM Players WHERE playerID = ?

-- Delete from PlayersItems --
DELETE FROM PlayersItems WHERE playerID = ? AND itemID = ?

