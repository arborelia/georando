# GeoRando alpha

## Requirements

You need:

- A [GeoGuessr](https://www.geoguessr.com/) account, which costs $2/month
- [Tampermonkey](https://www.tampermonkey.net/), a browser extension that lets you mess with web pages
- [GeoGuessr Unity Script](https://greasyfork.org/en/scripts/436813-geoguessr-unity-script), a Tampermonkey script which provides various view options to GeoGuessr
- [GeoNoCar](https://openuserjs.org/scripts/drparse/GeoNoCar), a Tampermonkey script that you can use to hide the car and compass until you unlock them

Optionally, set up [GeoGuessr Ultimate Script](https://greasyfork.org/en/scripts/406060-geoguessr-ultimate-script), a script that does way too many things and you'll want to turn most of them off by editing the script.

## Setting up a manual GeoRando world

GeoRando, so far, is only implemented as a kind of janky "Manual" world. One day, I hope for it to be a real APWorld with a browser extension that connects you to Archipelago.

Here are instructions for how to get an APworld:

- Install Python 3.8 or later
- Check out this git repository
- Edit `georando/settings.py` with the settings that you want. This is where you can change things like the difficulty of the logic based on how good you are at GeoGuessr. See [Settings](#settings) below for more information.
- Run `python3 georando/generate.py` from the root of the repository
- It outputs an .apworld, which you can copy into Archipelago/lib/worlds
- An example .yaml template is in the main directory here. Put it in your Archipelago/Players folder and generate a world.
- Run the ArchipelagoLauncher and choose "Manual Client" to play the world

## Why do I need to generate a new .apworld every time?

Part of the fun of GeoRando is playing on different maps every time, which means that different locations and items are in the game each time. This is not easy to do in a Manual world.

I understand that I could use "hooks" in Manual for Archipelago to implement this, but I would rather spend that development time on making a full-fledged APWorld instead of making the Manual easier to generate.


## How to play GeoRando

Run the Manual Client from the Archipelago Launcher so you can see what you have unlocked and interact with your world.

You will start with:

- Some number of GeoGuessr maps to play (default 3)
- 10 seconds per round
- No features unlocked -- no panning, zooming, or moving, no compass, and no car visibility

Choose a map, set up your browser extensions to block the compass and car (Shift+K hides the compass using the GeoNoCar script), set the settings to no pan/zoom/move, and set the timer to 10 seconds. Now you can play your first round. It'll probably be a bit hard.

### Scoring and achieving checks

Whenever you choose a location **in the correct country**, find that country in the "Correctly Identify Countries" category and unlock that check if you haven't already. For example, the first time you choose Kenya when the location is in Kenya, you will unlock **Identify Kenya**.

When you play a round of 5 locations, look at your total score, and go to the category for that map. Click all the unlocks for score thresholds you exceeded.

For example, if you scored 11,000 on A Community World, you unlock **A Community World 5k**, **A Community World 7.5k**, and **A Community World 10k**.

On maps that are not localized to one country, you can get country streaks from correctly identifying the country N times in a row. The map category will have **3 Country Streak**, **4 Country Streak**, and **5 Country Streak** unlocks for when you accomplish this.

Continent checks are a bit more complex. Look at your score summary for the game. Add up your total score for locations that were _within each continent_. Choose the unlocks for scores you exceeded within a continent from the **Continent checks** category -- for example, if there were two locations in Europe and you got 9,000 total on them, unlock **5k within Europe**.

Some of the filler items are "Score Boost +100" and "Score Boost +500" items. You can consume these to add to your score when you get close to a target score.

### Arbitrary decisions about continents

When adding up your score for a continent:

- Europe meets Asia at the Ural mountains, and at the Bosphorus Strait that goes through Istanbul. If you're in the Ural mountains, use your best judgment.
- Greenland is in North America.
- Iceland is in Europe.
- Hawaii and Midway Atoll are in Oceania.
- The Philippines are in Asia.
- Réunion is in Africa.

### Sometimes checks are easy

You may ask yourself, "I just got the Serbia map. Am I allowed to play one location of it and then unlock **Identify Serbia**?" Yes. It's free and the logic expects you to do it.

Most country-specific maps also give you easy continent checks, like a United States map lets you count your score toward North America unlocks as well. The only countries where you'd have to count it up differently are those on multiple continents, like Russia, Türkiye, or technically the United States.

### Notes on checks

Remember, Googling during a round is considered to be cheating at GeoGuessr. Set the difficulty level (see [Settings](#settings) below) so that you won't have to cheat.

The country and continent checks are only in logic when you have a map that's likely to put you there. Countries with relatively few locations need a more specific map to be in logic. For example, you will not be expected to get Lesotho from a world map, but you will from an Africa map.

Some country checks just won't exist -- this particularly happens when it's a check that's unlikely no matter what you have unlocked. There won't be an "Identify Monaco" check, for example.

### Unlocking features

- Increase your time per round whenever you get a **+10 Seconds** item.
- The first time you get a **Progressive Pan/Zoom/Move** item, enable the Pan ability. The second time, enable Zoom, and the third time, enable Move.
- When you get the **Compass**, press Shift+K to un-hide the compass.
- When you get **Car visibility**, turn off the GeoNoCar script from the Tampermonkey menu, and reload the page. Incidentally, because of the way this is implemented, if you don't have Compass yet, this gives you the compass for free! You probably won't mind.
- When you get **Terrain Map View** or **Satellite Map View**, you can click the yellow sidebar button that the Unity script added and choose "Satellite" or "Terrain" as appropriate, to change your mini-map view. **Satellite Map View** also allows you to choose "Hybrid", to overlay roads on the satellite map.
- When you get **Show Author Names**, if you are using GeoGuessr Ultimate Script to block out the name of the location creator, you can unblock it. Otherwise, it's just a meaningless item.
- If you have Move unlocked and you get **Fast Driving**, you're now allowed to press "4" to go forward 100 meters using the GeoGuessr Unity Script.
- Some items name a new map that you're now allowed to play on -- you can choose that map and get unlocks on it from now on.


### The goal

When you score 22,500 or more on a GeoGuessr map, choose the appropriate 22.5k unlock to get a Gold Medal. You have to get that score naturally, without using Score Boosts.

Score some number of Gold Medals (default 3) on different maps to win.

## Settings

Settings that affect the logic of the APWorld are in `georando/settings.py`.

I know that a "real" APworld would encompass all possible settings, and let you choose them in your YAML. I haven't gotten there yet.

Here are the settings you can change in `georando/settings.py`:

- `player_name`: This goes into the name of the manual APworld, and distinguishes it from other people's settings. It doesn't have to be the same name you use in your YAML, but it makes sense if it is.
- `num_official`: How many official GeoGuessr maps to include. These maps are harder than most community maps and the locations are not curated, but you get official GeoGuessr achievements for playing them.
- `num_community`: How many community maps to include. These will be chosen randomly from a selection of maps that arborelia curated.
- `num_starting_maps`: How many maps should be unlocked at the start of the game.
- `familiar`: A list of map names or countries that you find easier. This will put them earlier in the logic and expect you to get higher scores on them. For example, if you live in the United States and think you will be better at recognizing US locations than most other countries, set this to `["United States"]`.
- `guaranteed_official_maps`: names of official maps to definitely include.
- `guaranteed_community_maps`: names of community maps to definitely include.
- `allow_small_official`: Should maps with relatively few locations, such as Andorra or Guam, be included in the official map pool?
- `allow_unofficial_coverage`: Should community maps be allowed to include locations with photospheres or cameras that aren't operated by Google? This gives you broader coverage, but you may not be able to move the camera in these locations, and the logic will not expect you to.
- `max_troll`: Some maps are tagged as "troll" because they're deliberately frustrating to play. This determines the maximum number of troll maps that will be chosen.
- `medals_to_win`: How many Gold Medal items you need to achieve victory.
- `skill_level`: Changes the logic of what checks you're expected to do.

There are 10 difficulty levels to the logic.

- 1: I'm new to GeoGuessr -- easy maps and goals, start with Pan and Compass, get Zoom and Move early in the logic
- 2: Include more maps, expected goals are mostly easy, start with Pan and Compass, get Zoom and Move early in the logic
- 3: Include some hard maps, start with Pan, get Zoom and Move early in the logic
- 4: Include most hard maps, with generous logic
- 5: Default skill level, the one arborelia tested based on her own skill. All maps included.
- 6: I'd defeat arborelia in a GeoGuessr duel
- 7: I'm a GeoGuessr expert
- 8: I'm a GeoGuessr expert and I want to suffer
- 9: I'm a world class GeoGuessr player
- 10: Just put everything conceivably possible in logic. Show me a fern and I'll tell you its latitude and longitude.
