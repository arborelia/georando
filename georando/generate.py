import json
import random
from pathlib import Path
import zipfile
from georando.maps import COMMUNITY_MAPS, OFFICIAL_MAPS
from georando.items import NON_MAP_ITEMS
from georando.locations import make_goals
from georando.settings import SETTINGS


# settings have moved to settings.py


def run():
    player_name = SETTINGS["player_name"]
    world_name = f"manual_geoguessr_{player_name}"
    map_pool_official = [
        map
        for map in OFFICIAL_MAPS
        if map.difficulty - SETTINGS["skill_level"] <= 3
        and ("small" not in map.tags or SETTINGS["allow_small_official"])
    ]
    map_pool_community = [
        map
        for map in COMMUNITY_MAPS.values()
        if map.difficulty - SETTINGS["skill_level"] <= 2
        and (map.official_coverage or SETTINGS["allow_unofficial_coverage"])
    ]
    skill_modifier = SETTINGS["skill_level"] - 5

    guaranteed_community_names = SETTINGS["guaranteed_community_maps"]
    guaranteed_community_maps = [
        map for map in map_pool_community if map.name in guaranteed_community_names
    ]
    num_random_community_maps = SETTINGS["num_community"] - len(
        guaranteed_community_maps
    )
    for iter in range(10):
        # Try hard not to pick too many troll maps
        random_community_maps = [
            map
            for map in map_pool_community
            if map.name not in guaranteed_community_names
        ]
        n_troll = len([map for map in random_community_maps if "troll" in map.tags])
        n_easy = len([map for map in random_community_maps if map.difficulty == 1])
        if n_troll <= SETTINGS["max_troll"] and n_easy <= SETTINGS["max_easy"]:
            # keep it
            break
    selected_community_maps = guaranteed_community_maps + random.sample(
        random_community_maps, num_random_community_maps
    )

    guaranteed_official_names = SETTINGS["guaranteed_official_maps"]
    guaranteed_official_maps = [
        map for map in map_pool_official if map.name in guaranteed_official_names
    ]
    num_random_official_maps = SETTINGS["num_official"] - len(guaranteed_official_maps)
    random_official_maps = [
        map for map in map_pool_official if map.name not in guaranteed_official_names
    ]
    selected_official_maps = guaranteed_official_maps + random.sample(
        random_official_maps, num_random_official_maps
    )

    selected_maps = selected_community_maps + selected_official_maps

    locations = make_goals(selected_maps, SETTINGS)
    n_medals_total = len([loc for loc in locations if "Gold Medals" in loc["category"]])
    n_medals_to_win = SETTINGS["medals_to_win"]
    locations.append(
        {
            "name": f"Victory ({n_medals_to_win} gold medals)",
            "requires": [f"Gold Medal:{n_medals_to_win}"],
            "victory": True,
        }
    )
    items = (
        NON_MAP_ITEMS
        + [map.as_item() for map in selected_maps]
        + [
            {
                "name": "Gold Medal",
                "progression": ["True"],
                "category": ["Medals"],
                "count": n_medals_total,
            }
        ]
    )
    possible_starter_maps = [
        map.item_name() for map in selected_maps if "starter" in map.tags
    ]
    starting_items = [
        {"items": possible_starter_maps, "random": 1},
        {"item_categories": ["Maps"], "random": SETTINGS["num_starting_maps"] - 1},
    ]
    if skill_modifier == -4:
        starting_items.append({"items": ["Pan"], "random": 1})
        starting_items.append({"items": ["Compass"]})
        starting_items.append({"items": ["+10 seconds"], "random": 6})
    elif skill_modifier == -3:
        starting_items.append({"items": ["Pan"], "random": 1})
        starting_items.append({"items": ["Compass"]})
        starting_items.append({"items": ["+10 seconds"], "random": 3})
    elif skill_modifier == -2:
        starting_items.append({"items": ["Pan"], "random": 1})
        starting_items.append({"items": ["+10 seconds"], "random": 2})
    else:
        starting_items.append({"items": ["+10 seconds"], "random": 1})

    game_data = {
        "game": "GeoGuessr",
        "player": player_name,
        "filler_item_name": "Score +10",
        "starting_items": starting_items,
    }
    region_data = {}
    world_name = f"manual_geoguessr_{player_name}"
    with zipfile.ZipFile(f"{world_name}.apworld", "w") as the_zip:
        world_template = Path("world")
        for path in world_template.rglob("*"):
            path_str = str(path)
            path_in_zip = world_name + path_str[5:]
            the_zip.write(path_str, arcname=path_in_zip)

        with the_zip.open(f"{world_name}/data/game.json", "w") as out:
            out.write(json.dumps(game_data, indent=4).encode("utf-8"))

        with the_zip.open(f"{world_name}/data/items.json", "w") as out:
            out.write(json.dumps(items, indent=4).encode("utf-8"))

        with the_zip.open(f"{world_name}/data/locations.json", "w") as out:
            out.write(json.dumps(locations, indent=4).encode("utf-8"))

        with the_zip.open(f"{world_name}/data/regions.json", "w") as out:
            out.write(json.dumps(region_data, indent=4).encode("utf-8"))
    print(f"wrote {world_name}.apworld")


if __name__ == "__main__":
    run()
