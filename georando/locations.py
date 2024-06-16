from typing import List
from georando.checks import (
    CONTINENT_CHECKS,
    COUNTRY_CHECKS,
    MAP_GOALS,
)
from georando.maps import GeoGuessrMap

ZOOM = "Progressive Pan/Zoom/Move:2"
MOVE = "Progressive Pan/Zoom/Move:3"


def item(name: str) -> str:
    """
    Surround an item name in pipe characters, for use in a boolean 'requires' expression.
    """
    return f"|{name}|"


def format_logic(disjunction: List[List[str]]) -> list:
    """
    Convert a list of lists, representing an OR of AND requirements, into the idiosyncratic
    format that Manual requires. The first AND option is included directly in the list.
    All other options appear as dictionaries with an "or" key.
    """
    formatted = list(disjunction[0])
    for possibility in disjunction[1:]:
        formatted.append({"or": possibility})
    return formatted


def make_country_individual_goal(
    country: str, maps: List[GeoGuessrMap], skill_modifier: int = 0
) -> List[dict]:
    categories = ["Correctly identify countries"]
    logic_options = []
    if country in maps:
        categories.append(country)
    for map in maps:
        difficulty_logic = DIFFICULTY_LOGIC[map.difficulty - skill_modifier]
        if country in map.provides:
            # this is a freebie, like recognizing Albania on the Albania map
            difficulty_logic = [[]]
        if country in map.provides or country in map.may_provide:
            for diff_option in difficulty_logic:
                logic_options.append([map.name] + diff_option)

    if logic_options:
        return [
            {
                "name": f"Identify {country}",
                "category": categories,
                "requires": format_logic(logic_options),
            }
        ]
    else:
        return []


def make_country_goals(maps: List[GeoGuessrMap], skill_modifier: int = 0) -> List[dict]:
    goals = []
    for country in sorted(COUNTRY_CHECKS):
        goals.extend(make_country_individual_goal(country, maps, skill_modifier))
    return goals


DIFFICULTY_LOGIC = {
    # Difficulty <= 2 has no requirements
    -9: [[]],
    -8: [[]],
    -7: [[]],
    -6: [[]],
    -5: [[]],
    -4: [[]],
    -3: [[]],
    -2: [[]],
    -1: [[]],
    0: [[]],
    1: [[]],
    2: [[]],
    # Difficulty 3
    # Examples:
    # - 7.5k round on A Speedrun World
    # - 5k round on A Pinpointable World
    # - 4k location on an urban map
    3: [
        ["Compass"],
        ["+10 seconds:2"],
    ],
    # Difficulty 4
    # Examples:
    # - 10k round on A Speedrun World
    # - 4k location on Chile or Japan
    4: [
        ["Progressive Pan/Zoom/Move", "+10 seconds:2"],
        ["Compass", "+10 seconds:3"],
    ],
    # Difficulty 5
    # Examples:
    # - 10k round on A Linguistic World
    # - 5k round on An Arbitrary Asia
    5: [
        ["Progressive Pan/Zoom/Move", "Compass", "+10 seconds:4"],
    ],
    # Difficulty 6
    # Examples:
    # - 15k round on A Speedrun World
    # - 10k round on A Mural World
    # - 3k location on A Soiled World
    # - 3 country streak on Attractive Bollards of the Universe
    6: [
        [ZOOM, "Compass", "+10 seconds:4"],
        ["Progressive Pan/Zoom/Move", "Compass", "+10 seconds:9"],
    ],
    # Difficulty 7
    # Examples:
    # - 4 country streak on A Speedrun World
    # - 10k round on Chile or Japan
    # - 4k location on A Soiled World
    # - 3k location on a troll map
    7: [
        [MOVE, "Compass", "+10 seconds:3"],
        [ZOOM, "Compass", "+10 seconds:6", "Satellite Map View"],
        [
            "Progressive Pan/Zoom/Move",
            "Compass",
            "+10 seconds:12",
            "Terrain Map View",
        ],
        [
            "Progressive Pan/Zoom/Move",
            "Compass",
            "+10 seconds:15",
        ],
    ],
    # Difficulty 8
    # Examples:
    # - 10k round on most countries
    # - 15k round on A Community World
    # - 20k round on A Speedrun World
    # - 5k location on A Speedrun World
    8: [
        [MOVE, "Compass", "+10 seconds:8"],
        [ZOOM, "Compass", "+10 seconds:12", "Satellite Map View", "Car visibility"],
        [ZOOM, "Compass", "+10 seconds:15", "Terrain Map View", "Car visibility"],
    ],
    # Difficulty 9
    # Examples:
    # - 10k round in Bangladesh
    # - 10k round on A Soiled World
    # - 4 country streak on A Community World
    # - 5k location on I Saw the Sign
    9: [
        [MOVE, "Compass", "+10 seconds:12"],
        [ZOOM, "Compass", "+10 seconds:18", "Satellite Map View", "Car visibility"],
        [ZOOM, "Compass", "+10 seconds:21", "Terrain Map View", "Car visibility"],
    ],
    # Difficulty 10
    # Examples:
    # - 5k location on A Community World
    # - 20k round on A Community World
    # - 10k round on A World of Waterfalls
    # - 4 country streak on An Arbitrary Asia
    # - 15k round on A Rural World
    # - 22.5k (gold medal) on I Saw the Sign
    10: [
        [
            ZOOM,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:48",
        ],
        [MOVE, "Compass", "+10 seconds:24"],
    ],
    11: [[MOVE, "Compass", "+10 seconds:32"]],
    12: [[MOVE, "Compass", "+10 seconds:40"]],
    13: [[MOVE, "Compass", "+10 seconds:48"]],
    # Difficulty 14+
    # Examples:
    # - 22.5k round on A World of Plants
    # - 20k round on A World of Waterfalls (not considered possible because you won't have Move)
    14: [
        [
            MOVE,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:60",
        ]
    ],
    15: [
        [
            MOVE,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:60",
        ]
    ],
    16: [
        [
            MOVE,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:60",
        ]
    ],
    17: [
        [
            MOVE,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:60",
        ]
    ],
    18: [
        [
            MOVE,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:60",
        ]
    ],
    19: [
        [
            MOVE,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:60",
        ]
    ],
    20: [
        [
            MOVE,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:60",
        ]
    ],
}


def make_map_goals(
    map: GeoGuessrMap, settings: dict, skill_modifier: int = 0
) -> List[dict]:
    goals = []
    for goal in MAP_GOALS:
        if "streak" in goal["name"] and not map.streakable:
            continue
        if "streak" in goal["name"] and not settings["streaks"]:
            continue
        difficulty = map.difficulty + goal["difficulty"] - skill_modifier
        goal_name = goal["name"]
        if map.official_coverage:
            # Streaks are easier if they're narrowed down to a continent
            if (set(map.provides) & set(CONTINENT_CHECKS)) and "streak" in goal:
                difficulty -= 1
            base_logic_options = DIFFICULTY_LOGIC[difficulty]
        else:
            # Streaks are harder when there's unofficial coverage
            if "streak" in goal["name"]:
                difficulty += 1
            # "Move" can't be relied on when there's unofficial coverage
            base_logic_options = [
                option for option in DIFFICULTY_LOGIC[difficulty] if MOVE not in option
            ]

        logic_options = [([map.name] + option) for option in base_logic_options]

        if logic_options:
            goal_data = {
                "name": f"{map.name}: {goal_name}",
                "category": [map.name],
                "requires": format_logic(logic_options),
            }
            if goal_name == "22.5k round":
                goal_data["place_item"] = ["Gold Medal"]
                goal_data["category"].append("Gold Medals")
            goals.append(goal_data)
    return goals


def make_goals(
    maps: List[GeoGuessrMap],
    settings: dict,
) -> List[dict]:
    skill_modifier = settings["skill_level"] - 5
    familiar = settings["familiar"]
    goals = []
    goals.extend(make_country_goals(maps, skill_modifier))
    for map in maps:
        map_skill_mod = skill_modifier
        if map.name in familiar or (set(familiar) & set(map.provides)):
            map_skill_mod += 1
        goals.extend(make_map_goals(map, settings, map_skill_mod))
    return goals
