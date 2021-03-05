-- get all players, locations and items to populate the play game table
SELECT Players.playerName, Locations.locationName, Items.itemName FROM Players
JOIN PlayersItems on PlayersItems.playerID = Players.playerID
JOIN Locations on Locations.locationID = Players.currentLocationID
JOIN Items on Items.itemID = PlayersItems.itemID;

-- get all Quest, Location, Items to populate 2nd play game table
SELECT Quests.questName, Locations.locationName, Items.itemName FROM Quests
JOIN Items on Items.questRewardedFrom = Quests.questID
JOIN Locations on Locations.locationID = Quests.questLocation;

-- get all Quest, Items for search tab
SELECT Quests.questName, Items.itemName FROM Quests
JOIN Items on Items.questRewardedFrom = Quests.questID;

-- get all Players, Locations for search tab
SELECT Players.playerName, Locations.locationName FROM Players
JOIN Locations on Players.currentLocationID = Locations.locationID;

-- get locationName for edit dropdown
SELECT Locations.locationName FROM Locations
JOIN Players on Players.currentLocationID = Locations.locationID

-- get quest of current player for edit dropdown
SELECT Quests.questName FROM Quests
JOIN Players on Players.currentQuest = Quests.questID;

-- get items of current player for edit dropdown
SELECT Items.itemName FROM Items
JOIN PlayersItems on PlayersItems.playerID = Players.playerID
JOIN Items on Items.itemID = PlayersItems.itemID;

-- update/change location of current player
UPDATE Players SET {{currentLocationID}} = {{newLocationID}} WHERE playerID = {{current_playerID}};

-- update to mark quest as complete
UPDATE Players SET numberofQuestsCompleted = numberofQuestsCompleted + 1 WHERE playerID = {{current_playerID}};
UPDATE Players SET currentQuest = NULL WHERE playerID = {{current_playerID}};
-- update to use items and add to player stats
UPDATE Players SET Players.playerHealth = Players.playerHealth + Items.statBoostAmount WHERE playerID = {{current_playerID}};
UPDATE Players SET Players.playerMagic = Players.playerMagic + Items.statBoostAmount WHERE playerID = {{current_playerID}};
UPDATE Players SET Players.strengthStat = Players.strengthStat + Items.statBoostAmount WHERE playerID = {{current_playerID}};
UPDATE Players SET Players.intelligenceStat = Players.intelligenceStat + Items.statBoostAmount WHERE playerID = {{current_playerID}};
UPDATE Players SET Players.defenceStat = Players.defenceStat + Items.statBoostAmount WHERE playerID = {{current_playerID}};

-- delete selected Player
DELETE Players WHERE playerID = {{selected_playerID}};
DELETE PlayersItems WHERE playerID = {{selected_playerID}};

--INSERT queries for making new entries
INSERT INTO Players (playerName) VALUES ({{new_playerName}});
INSERT INTO Locations (locationName) VALUES ({{new_locationName}});
INSERT INTO Quests (questName, questLocation, statRequired, statMinimum) VALUES ({{new_questName}}, {{selected_locationID}}, {{selected_statRequired}}, {{selected_statMinimum}});
INSERT INTO Items (itemName, statBoosted, statBoostAmount, questRewardedFrom) VALUES ({{new_itemName}}, {{selected_statBoosted}}, {{selected_statBoostAmount}}, {{selected_questID}});