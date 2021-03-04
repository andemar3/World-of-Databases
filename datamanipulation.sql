-- get all players, locations and items to populate the play game table
SELECT playerName, currentLocationID, itemID FROM Players, PlayersItems;

-- get all Quest, Location, Items to populate 2nd play game table
SELECT questRewardedFrom, questLocation, itemName FROM Items, Quests WHERE Quests.questID = Items.questRewardedFrom;

-- get all Quest, Items for search tab
SELECT questRewardedFrom, itemName FROM Items;

-- get all Players, Locations for search tab
SELECT playerName, currentLocationID FROM Players;

-- get locationID of current player for edit dropdown
-- somehow need a current_playerID
SELECT currentLocationID, FROM Players WHERE playerID = {{current_playerID}};

-- get quest of current player for edit dropdown
SELECT currentQuest FROM Players WHERE playerID = {{current_playerID}};

-- get items of current player for edit dropdown
SELECT itemID FROM PlayersItems where playerID = {{current_playerID}};

-- update/change location of current player
-- somehow make a newLocationID?
UPDATE Players SET {{currentLocationID}} = {{newLocationID}} WHERE playerID = {{current_playerID}};

-- update to mark quest as complete
UPDATE Players SET numberofQuestsCompleted = numberofQuestsCompleted + 1 WHERE playerID = {{current_playerID}};
UPDATE Players SET currentQuest = 0 WHERE playerID = current_playerID;
-- update to use items and add to player stats
-- trying to use the varible inside statBoosted ex. 'playerHealth'
UPDATE Players SET Players.statBoosted = Players.statBoosted + PlayerItems.statBoostAmount WHERE playerID = {{current_playerID}};

-- delete selected Player
DELETE Players WHERE playerID = {{selected_playerID}};
DELETE PlayersItems WHERE playerID = {{selected_playerID}};

--INSERT queries for making new entries
INSERT INTO Players (playerName) VALUES ({{new_playerName}});
INSERT INTO Locations (locationName) VALUES ({{new_locationName}});
INSERT INTO Quests (questName, questLocation, statRequired, statMinimum) VALUES ({{new_questName}}, {{selected_locationID}}, {{selected_statRequired}}, {{selected_statMinimum}});
INSERT INTO Items (itemName, statBoosted, statBoostAmount, questRewardedFrom) VALUES ({{new_itemName}}, {{selected_statBoosted}}, {{selected_statBoostAmount}}, {{selected_questID}});