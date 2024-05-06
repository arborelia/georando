import pprint
import json
import random
from pathlib import Path
import zipfile
from georando.maps import COMMUNITY_MAPS, OFFICIAL_MAPS
from georando.items import NON_MAP_ITEMS
from georando.locations import make_goals

SETTINGS = {
    # This is used to identify a manual APWorld.
    "player_name": "arborelia",
    # How many official (country) maps to use. These maps are harder than most community maps.
    "num_official": 5,
    # How many community maps to use.
    "num_community": 15,
    # How many maps to start with
    "num_starting_maps": 3,
    # Names of maps or countries you find easier, and which should be earlier in logic, because you're
    # particularly familiar with them. For example, you might want to put the country you live in here.
    "familiar": ["United States"],
    # Official maps that should always be in the pool.
    "guaranteed_official_maps": ["United States"],
    # Community maps that should always be in the pool.
    "guaranteed_community_maps": ["A Community World"],
    # Should maps with relatively few locations, such as Andorra or Guam, be included in the official
    # map pool?
    "allow_small_official": False,
    # Should maps be allowed to include locations with photospheres or street cameras that aren't
    # operated by Google? The logic for these maps will never require you to have Move unlocked, because
    # Move doesn't work in most of these locations.
    "allow_unofficial_coverage": True,
    # This number changes the logic, and at the low end it also changes which maps are available.
    # Here's my estimation of what the skill levels mean:
    #
    #  1: I'm new to GeoGuessr -- all maps are easy to average difficulty, hard goals are never expected
    #  2: Include more maps, expected goals are mostly easy, get Move early in the logic
    #  3: Include all but the hardest maps, goals have lots of requirements before they're expected by logic
    #  4: All maps are in logic, but the logic for which goals are required is generous
    #  5: Default skill level. arborelia's skill level that she designed the rando around
    #  6: I'd defeat arborelia in a GeoGuessr duel
    #  7: I'm a GeoGuessr expert
    #  8: I'm a GeoGuessr expert and I want to suffer
    #  9: I'm a world class GeoGuessr player
    # 10: Just put everything conceivably possible in logic
    "skill_level": 4,
    # You get a Gold Medal for scoring 22.5k on a map (probably adjustable later). The victory condition
    # is getting some number of them. Choose that number here.
    "medals_to_win": 10,
}


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
        if map.difficulty - SETTINGS["skill_level"] <= 3
        and (map.official_coverage or SETTINGS["allow_unofficial_coverage"])
    ]
    skill_modifier = SETTINGS["skill_level"] - 5

    guaranteed_community_names = SETTINGS["guaranteed_community_maps"]
    guaranteed_community_maps = [map for map in map_pool_community if map.name in guaranteed_community_names]
    num_random_community_maps = SETTINGS["num_community"] - len(guaranteed_community_maps)
    random_community_maps = [map for map in map_pool_community if map.name not in guaranteed_community_names]
    selected_community_maps = guaranteed_community_maps + random.sample(random_community_maps, num_random_community_maps)

    guaranteed_official_names = SETTINGS["guaranteed_official_maps"]
    guaranteed_official_maps = [map for map in map_pool_official if map.name in guaranteed_official_names]
    num_random_official_maps = SETTINGS["num_official"] - len(guaranteed_official_maps)
    random_official_maps = [map for map in map_pool_official if map.name not in guaranteed_official_names]
    selected_official_maps = guaranteed_official_maps + random.sample(random_official_maps, num_random_official_maps)

    selected_maps = selected_community_maps + selected_official_maps

    locations = make_goals(selected_maps, SETTINGS["familiar"], skill_modifier)
    pprint.pprint(locations)
    n_medals = SETTINGS["medals_to_win"]
    locations.append(
        {
            "category": "Victory",
            "name": f"Victory ({n_medals} gold medals)",
            "requires": [f"Gold Medal:{n_medals}"],
        }
    )
    items = NON_MAP_ITEMS + [
        {
            "name": map.name,
            "progression": True,
            "category": ["Maps"]
        } for map in selected_maps
    ]
    game_data = {
        "game": "GeoGuessr",
        "player": "arborelia",
        "filler_item_name": "Score Boost +200",
        "starting_items": [
            {
                "items": [
                    "+10 seconds"
                ]
            },
            {
                "item_categories": [
                    "Maps"
                ],
                "random": SETTINGS["num_starting_maps"]
            }
        ]
    }
    region_data = {}
    world_name = f"manual_geoguessr_{player_name}"
    with zipfile.ZipFile(f"{world_name}.apworld", "w") as the_zip:
        world_template = Path("world")
        for path in world_template.rglob("*"):
            path_str = str(path)
            assert path_str.startswith("world/")
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

    pprint.pprint(locations)


if __name__ == "__main__":
    run()
