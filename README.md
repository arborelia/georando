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
- Run `generate.bat` (Windows) or `generate.sh` (Linux), or `python3 georando/generate.py` on any platform
- It outputs an .apworld, which you should copy into Archipelago/custom_worlds
- An example .yaml template is in the main directory here. Put it in your Archipelago/Players folder and generate a world.
- Run the ArchipelagoLauncher and choose "Manual Client" to play the world

## Why do I need to generate a new .apworld every time?

Part of the fun of GeoRando is playing on different maps every time, which means that different locations and items are in the game each time. This is not easy to do in a Manual world.

I understand that I could use "hooks" in Manual for Archipelago to implement this, but I would rather spend that development time on making a full-fledged APWorld instead of making the Manual easier to generate.

## How to play GeoRando

Run the Manual Client from the Archipelago Launcher so you can see what you have unlocked and interact with your world.

If you don't have additional starting items, you will start with:

- Some number of GeoGuessr maps to play (default 2)
- 10 seconds per round
- No features unlocked -- no panning, zooming, or moving, no compass, and no car visibility

Choose a map, set up your browser extensions to block the compass and car (Shift+K hides the compass using the GeoNoCar script), set the settings to no pan/zoom/move, and set the timer to 10 seconds. Now you can play your first round. It'll probably be a bit hard.

### Scoring and achieving checks

Whenever you choose a location **in the correct country**, find that country in the "Correctly Identify Countries" category and unlock that check if you haven't already. For example, the first time you choose Kenya when the location is in Kenya, you will unlock **Identify Kenya**.

There are checks for exceeding score thresholds on a single location. If you get 4800 points for one location in Famous Places, check off **Famous Places: 2k location**, **Famous Places: 3k location**, **Famous Places: 4k location**, and **Famous Places: 4.5k location**.

When you play a round of 5 locations, look at your total score, and go to the category for that map. Click all the unlocks for score thresholds you exceeded.

For example, if you scored 11,000 on A Community World, you unlock **A Community World: 5k round**, **A Community World: 7.5k round**, and **A Community World: 10k round**.

On maps that are not localized to one country, you can get country streaks from correctly identifying the country N times in a row. The map category will have **3 Country Streak**, **4 Country Streak**, and **5 Country Streak** unlocks for when you accomplish this.

There are "Score +100" and "Score +10" items that add 100 to your round score (not location score) from here on. There are also items like "Country Score +100" that add to your score for the round if it's on a country-specific map, because those are usually harder.

### Sometimes checks are easy

You may ask yourself, "I just got the Serbia map. Am I allowed to play one location of it and then unlock **Identify Serbia**?" Yes. It's free and the logic expects you to do it.

### Notes on checks

Remember, Googling during a round is considered to be cheating at GeoGuessr. Set the difficulty level (see [Settings](#settings) below) so that you won't have to cheat.

The country checks are only in logic when you have a map that's likely to put you there. Countries with relatively few locations need a more specific map to be in logic. For example, you will not be expected to get Lesotho from a world map, but you will from an Africa map.

Some country checks just won't exist -- this particularly happens when it's a check that's unlikely no matter what you have unlocked. There won't be an "Identify Monaco" check, for example.

### Unlocking features

- Increase your time per round whenever you get a **+10 Seconds** item.
- **Pan** and **Zoom** are features that you unlock with checks. I know they're not configured separately in the GeoGuessr interface anymore -- if you don't have Pan, don't pan, and if you don't have Zoom, don't zoom.
- There are 3 **Progressive Move** items. The first one lets you move a single step from your starting location. The second one lets you move 10 steps. When you have all 3 of them, you can move as much as you want.
- When you get **Compass**, press Shift+K to un-hide the compass.
- When you get **Car visibility**, turn off the GeoNoCar script from the Tampermonkey menu, and reload the page. Incidentally, because of the way this is implemented, if you don't have Compass yet, this gives you the compass for free! You probably won't mind.
- When you get **Terrain Map View** or **Satellite Map View**, you can click the yellow sidebar button that the Unity script added and choose "Satellite" or "Terrain" as appropriate, to change your mini-map view. **Satellite Map View** also allows you to choose "Hybrid", to overlay roads on the satellite map.
- When you get **Show Author Names**, if you are using GeoGuessr Ultimate Script to block out the name of the location creator, you can unblock it. Otherwise, it's just a meaningless item.
- Some items name a new map that you're now allowed to play on -- you can choose that map and get unlocks on it from now on.

### Traps

- When you get a "Mega Plonk Trap", you have to click your next location while fully zoomed out on the mini-map.
- When you get a "20 Second Timer Trap", you have to play a round with a 20 second timer instead of the time amount you've unlocked.

### The goal

When you score 25k on a map, you can award yourself a Gold Medal! Some number of Gold Medals (specified in the settings) are required to win.

Of course, perfect 25k runs are very hard and require a lot of features unlocked, and are not even feasible on some maps. Fortunately, you have Score +100 items that are considered in logic (plus score +10 items that aren't). These score bonuses effectively decrease the actual target score you're going for.

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
