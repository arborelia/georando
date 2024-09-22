from typing import List, Sequence
from georando.checks import (
    CONTINENT_CHECKS,
    COUNTRY_CHECKS,
    MAP_GOALS,
)
from georando.maps import GeoGuessrMap

ZOOM = "Progressive Pan/Zoom/Move:2"
MOVE = "Progressive Pan/Zoom/Move:3"
CONJUNCTION_LOGIC_CUTOFF = 10


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


def switch_conjunction(conjunction: List[Sequence[Sequence[str]]]) -> List[List[str]]:
    """
    Convert a list of lists, representing an OR of AND requirements, into the idiosyncratic
    format that Manual requires. The first AND option is included directly in the list.
    All other options appear as dictionaries with an "or" key.
    """
    print("Conjunction:")
    print(" AND ".join(str(d) for d in conjunction))
    # The first disjunction in the list is our starting options
    options = list(conjunction[0])
    for disjunction in conjunction[1:]:
        new_options = [tuple(sorted(set(list(option) + list(req_list))))
                       for option in options
                       for req_list in disjunction]
        new_options = [list(option) for option in sorted(set(new_options))]
        new_options.sort(key=len)
        options = []
        subsumed = False
        for newopt in new_options:
            for opt in options:
                if set(opt) <= set(newopt):
                    subsumed = True
                    break
            if not subsumed:
                options.append(newopt)

    options.sort(key=len)
    options = options[:CONJUNCTION_LOGIC_CUTOFF]
    print("Disjunction:")
    print(" OR ".join(str(c) for c in options))
    print()
    return options


def make_country_goals(maps: List[GeoGuessrMap], skill_modifier: int = 0) -> List[dict]:
    goals = []
    country_difficulty = {}
    country_logic = {}
    for idx, country in enumerate(sorted(COUNTRY_CHECKS)):
        categories = ["Unique countries"]
        logic_options = []
        if country in maps:
            categories.append(country)
        for map in maps:
            difficulty = map.difficulty + 1
            if "world" in map.tags:
                difficulty += 1
            if not map.official_coverage:
                difficulty += 1
            difficulty_logic = DIFFICULTY_LOGIC[difficulty - skill_modifier]
            if country in map.provides:
                # this is a freebie, like recognizing Albania on the Albania map
                difficulty_logic = [[]]
                difficulty = 0

            if country in map.provides or country in map.may_provide:
                for diff_option in difficulty_logic:
                    logic_options.append([map.name] + diff_option)

                if country not in country_difficulty:
                    country_difficulty[country] = difficulty
                else:
                    country_difficulty[country] = min(country_difficulty[country], difficulty)
        if logic_options and (country in country_difficulty):
            country_logic[country] = [tuple(logic) for logic in logic_options]
            country_difficulty[country] += min(len(opt) for opt in country_logic[country]) * 0.01

    by_difficulty = []
    for country in country_logic:
        by_difficulty.append(
            (country_difficulty[country], country_logic[country], country)
        )
    accumulated_logic = set()
    by_difficulty.sort()
    for idx, (difficulty, logic_options, country) in enumerate(by_difficulty):
        accumulated_logic.add(tuple(logic_options))
        goals.append({
            "name": f"Unique country {idx+1}",
            "category": categories,
            "requires": format_logic(switch_conjunction(list(accumulated_logic))),
        })
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
    11: [
        [
            ZOOM,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:52",
        ],
        [MOVE, "Compass", "+10 seconds:32"]
    ],
    12: [
        [
            ZOOM,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:56",
        ],
        [MOVE, "Compass", "+10 seconds:40"]
    ],
    13: [
        [
            ZOOM,
            "Compass",
            "Car visibility",
            "Terrain Map View",
            "Satellite Map View",
            "+10 seconds:61",
        ],
        [MOVE, "Compass", "+10 seconds:48"]
    ],
    # Difficulty 14+
    # Examples:
    # - 22.5k round on A World of Plants
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
        base_logic_options = DIFFICULTY_LOGIC[difficulty]
        if map.official_coverage:
            # Streaks are easier if they're narrowed down to a continent
            if (set(map.provides) & set(CONTINENT_CHECKS)) and "streak" in goal:
                difficulty -= 1
        else:
            # Streaks are harder when there's unofficial coverage
            if "streak" in goal["name"]:
                difficulty += 1
            # "Move" can't be relied on when there's unofficial coverage
            # base_logic_options = [
            #     option for option in DIFFICULTY_LOGIC[difficulty] if MOVE not in option
            # ]

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
