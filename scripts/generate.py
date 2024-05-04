#!/usr/bin/env python3
from operator import itemgetter
import random
import json

START_MAP = "A Community World"
START_MAP_AUTHOR = "MatePotato"

# official maps with 50k+ locations, in popularity order.
# 3 of these will be selected.

regional_maps = [
    "United States",
    "Japan",
    "European Union",
    "United Kingdom",
    "France",
    "Spain",
    "Russia",
    "Italy",
    "Netherlands",
    "Brazil",
    "Germany",
    "Poland",
    "Turkey",
    "Sweden",
    "Norway",
    "Argentina",
    "Ukraine",
    "Switzerland",
    "New Zealand",
    "Portugal",
    "Finland",
    "Denmark",
    "Indonesia",
    "Ireland",
    "Romania",
    "Belgium",
    "Serbia",
    "Mexico",
    "Greece",
    "Paris",
    "London",
    "Bulgaria",
    "Chile",
    "Croatia",
    "Czech Republic",
    "Hungary",
    "Israel",
    "Austria",
    "Slovakia",
    "Colombia",
    "Taiwan",
    "Philippines",
    "Singapore",
    "Lithuania",
    "Estonia",
    "South Africa",
    "Slovenia",
    "South Korea",
    "Iceland",
    "Latvia",
    "Thailand",
    "Malaysia",
    "Peru",
    "Ecuador",
    "Uruguay",
    "Mongolia",
    "Botswana",
    "Sri Lanka",
    "Ghana",
    "Kenya",
    "Senegal",
    "Tunisia",
    "Uganda",
    "Bangladesh",
    "Bhutan",
    "Cambodia",
    "Hong Kong",
    "Jordan",
    "Kyrgyzstan",
    "United Arab Emirates",
    "Albania",
    "Malta",
    "Dominican Republic",
]

# Choose 20 of these
user_maps = [
    {"name": "100 largest cities of Canada", "author": "Simi", "difficulty": 2},
    {
        "name": "100 Longest Rivers in Europe",
        "author": "maccem",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "198 Capitals Of The World",
        "author": "1OfTheseDoves",
        "streakable": True,
        "difficulty": 4,
        "unofficial": True,
    },
    {
        "name": "An Amaizing World of Corn",
        "author": "Cinnamonique",
        "streakable": True,
    },
    {
        "name": "Attractive Bollards of the Universe",
        "author": "GeoPeter",
        "streakable": True,
    },
    {
        "name": "An Arbitrary Asia",
        "author": "slashP",
        "difficulty": 4,
        "streakable": True,
    },
    {
        "name": "An Arbitrary Africa",
        "author": "slashP",
        "streakable": True,
    },
    {
        "name": "An Arbitrary Oceania",
        "author": "slashP",
        "difficulty": 4,
        "streakable": True,
    },
    {
        "name": "An Arbitrary North America",
        "author": "slashP",
        "streakable": True,
    },
    {
        "name": "An Arbitrary South America",
        "author": "slashP",
        "streakable": True,
    },
    {
        "name": "An Arbitrary Europe",
        "author": "slashP",
        "streakable": True,
    },
    {
        "name": "A Community Europe",
        "author": "Simi",
        "streakable": True,
    },
    {
        "name": "A Balanced Canada",
        "author": "slashP",
    },
    {
        "name": "A Balanced Japan",
        "difficulty": 4,
        "author": "Kodiak",
    },
    {
        "name": "A Balanced Panama",
        "author": "Milanomaster",
    },
    {
        "name": "A Balanced Urban World",
        "author": "TunaJoe74",
        "difficulty": 2,
        "streakable": True,
    },
    # {
    #     "name": "Michigan, The Great Lakes State",
    #     "author": "Matt Maillard",
    # },
    {
        "name": "A Balanced Canada",
        "author": "slashP",
    },
    {
        "name": "A Complete World",
        "author": "MatePotato",
        "difficulty": 3,
        "unofficial": True,
    },
    {
        "name": "A Diverse Complete World",
        "author": "MatePotato",
        "difficulty": 3,
        "unofficial": True,
    },
    {
        "name": "A Diverse USA",
        "author": "Das Schnootz",
    },
    {
        "name": "A Drone World",
        "author": "Armire",
        "unofficial": True,
        "satellite": True,
    },
    {
        "name": "Aesthetic World",
        "author": "baszmania",
        "unofficial": True,
    },
    {
        "name": "A Linguistic World",
        "author": "nuujaku",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "All about the North",
        "author": "Frímann Stefánsson",
        "difficulty": 4,
        "streakable": True,
    },
    {
        "name": "A Mural World",
        "author": "Hugo",
        "streakable": True,
    },
    {
        "name": "An Equidistant World",
        "author": "Teloso",
        "streakable": True,
    },
    {
        "name": "An Extraordinary Cow",
        "author": "KingMoo92",
        "streakable": True,
    },
    {
        "name": "An Extraordinary World",
        "author": "Alok",
        "unofficial": True,
        "difficulty": 4,
    },
    {
        "name": "An Improved World",
        "author": "Wolftrekker",
        "streakable": True,
    },
    {
        "name": "A Meta World",
        "author": "Quix2k",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "A Thrilling World",
        "author": "Zem",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "Animals of the World",
        "author": "Rhiannonfuller",
        "streakable": True,
    },
    {
        "name": "An Unofficial Street World",
        "author": "David Walker",
        "difficulty": 4,
        "unofficial": True,
    },
    {
        "name": "An Urban Argentina",
        "author": "Lautaro Ruffinengo",
        "difficulty": 2,
    },
    {
        "name": "An Urban Australia",
        "author": "Gertie Goo Goo",
        "difficulty": 2,
    },
    {
        "name": "A Pinpointable World",
        "difficulty": 1,
        "pinpointable": True,
        "streakable": True,
    },
    {
        "name": "A Pinpointable Mongolia",
        "difficulty": 2,
        "author": "Kuriputonaito",
        "pinpointable": True,
    },
    {
        "name": "A pinpointable New Zealand",
        "difficulty": 1,
        "author": "Kodiak",
        "pinpointable": True,
    },
    {
        "name": "A Rural World",
        "author": "Topotic",
        "difficulty": 4,
        "streakable": True,
    },
    # {
    #    "name": "A Speedrun World",
    #    "author": "Scribbles",
    #    "difficulty": 1,
    #    "pinpointable": True,
    #    "streakable": True,
    # },
    {
        "name": "A Soiled World",
        "author": "Havrd",
        "unofficial": True,
        "streakable": True,
    },
    {
        "name": "A Well-Covered World",
        "author": "0xGG",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "A World of Hats",
        "author": "LawnLaw",
        "difficulty": 4,
        "streakable": True,
    },
    {
        "name": "A World of Plants",
        "author": "atillandsia",
        "difficulty": 5,
        "streakable": True,
    },
    {
        "name": "A World of Waterfalls",
        "author": "CelestialDalek",
        "difficulty": 5,
        "streakable": True,
    },
    {
        "name": "Border Control",
        "author": "0321654",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "Boston/Cambridge/Somerville/Allston/Dorchester",
        "author": "Cole Perkinson",
        "difficulty": 1,
    },
    {
        "name": "Brutalist Architecture",
        "author": "GeoFred",
        "difficulty": 3,
        "streakable": True,
    },
    {"name": "California Cities", "author": "Brooklyn 1125", "difficulty": 4},
    {
        "name": "Chicago and the Suburbs",
        "author": "Chicago Geographer",
    },
    {
        "name": "Camera Obscura - An Interesting World",
        "author": "Souvlaki Zeitgeist",
        "difficulty": 3,
        "streakable": True,
    },
    {
        "name": "CityGuessr",
        "author": "BOKSA",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "Cities in Bold",
        "author": "maccem",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "Ciudades España",
        "author": "ItsMoler",
        "difficulty": 2,
    },
    {
        "name": "International Airports",
        "author": "Niccy94",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "City Skylines",
        "author": "Radu C",
        "streakable": True,
    },
    {
        "name": "Coastal Cities 100K+",
        "author": "Scribbles",
        "streakable": True,
    },
    {
        "name": "Dads of the World",
        "author": "Arsemann",
        "unofficial": True,
        "streakable": True,
    },
    {
        "name": "DistanceGuessr",
        "author": "Scribbles",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "European Diversity",
        "author": "Biquette",
        "streakable": True,
    },
    {
        "name": "Extreme Regionguessing",
        "author": "BarrBarrBinks",
        "difficulty": 3,
        "streakable": True,
    },
    {"name": "Every US Train Station", "author": "ACELA2163", "difficulty": 2},
    {
        "name": "Fun with Flags",
        "author": "Cinnamonique",
        "unofficial": True,
        "streakable": True,
    },
    {
        "name": "GeoDetective Africa",
        "author": "Hamfrags",
        "difficulty": 2,
        "unofficial": True,
        "pinpointable": True,
        "streakable": True,
    },
    {"name": "Japan Railway Stations", "author": "depra95", "difficulty": 2},
    {
        "name": "GeoDetective World",
        "author": "A little Eileen",
        "difficulty": 1,
        "unofficial": True,
        "pinpointable": True,
        "streakable": True,
    },
    {
        "name": "Detective Japan",
        "author": "工藤新一",
        "difficulty": 2,
    },
    {
        "name": "GeoGuessr in 2069",
        "author": "J I G E N",
        "difficulty": 4,
        "unofficial": True,
        "streakable": True,
    },
    {
        "name": "Här råder stillhet och frid",
        "author": "0xGG",
        "difficulty": 4,
        "streakable": True,
    },
    {
        "name": "I Like Trains",
        "author": "baszmania",
        "difficulty": 2,
        "streakable": True,
    },
    # {
    #     "name": "Indigenous Languages of the Americas",
    #     "author": "Shapirod91",
    #     "difficulty": 3,
    #     "streakable": True,
    # },
    {
        "name": "Intersectionguessr North America",
        "author": "PastequeHachee",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "I Saw the Sign",
        "author": "Kirsike",
        "difficulty": 3,
        "streakable": True,
    },
    {"name": "Lakes of the World", "author": "Alok", "unofficial": True},
    {
        "name": "La Diversite Francaise",
        "author": "La Commu GeoFrance",
        "difficulty": 4,
    },
    {
        "name": "Latin America (Balanced Distribution)",
        "author": "Radu C",
        "streakable": True,
    },
    {"name": "Les iles de la Mediterranee", "author": "TPIETAV", "streakable": True},
    {
        "name": "Look at dem mountains tho",
        "author": "傻乎乎",
        "streakable": True,
    },
    {
        "name": "Major Russian Cities",
        "author": "Maritsanya",
        "difficulty": 4,
        "streakable": True,
    },
    {
        "name": "Masterpieces of the Earth",
        "author": "0xGG",
        "difficulty": 3,
        "streakable": True,
    },
    {
        "name": "McDonald's Worldwide",
        "author": "aurahack",
        "difficulty": 2,
        "streakable": True,
    },
    {"name": "New York City", "author": "GeoGuessr", "difficulty": 2},
    {
        "name": "No Roads Mission",
        "author": "Lyphoon",
        "difficulty": 5,
        "streakable": True,
    },
    {
        "name": "Oops! All Islands",
        "author": "Hindemith",
        "difficulty": 4,
        "streakable": True,
    },
    {
        "name": "Out-of-car experience",
        "author": "maccem",
        "difficulty": 3,
        "streakable": True,
    },
    {
        "name": "Pain and Suffering",
        "author": "0xGG",
        "difficulty": 6,
        "streakable": True,
    },
    {
        "name": "Perfect Detective Map",
        "author": "giuros",
        "difficulty": 1,
        "unofficial": True,
        "pinpointable": True,
        "streakable": True,
    },
    {
        "name": "Plonk It Panama",
        "author": "icepelican",
        "difficulty": 4,
    },
    {
        "name": "Public Transit of the World",
        "author": "Tino",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "Less-Extreme Regionguessing",
        "author": "BarrBarrBinks",
        "difficulty": 3,
        "streakable": True,
    },
    {"name": "Remote Locations of Canada", "difficulty": 4, "author": "amerain1729"},
    {
        "name": "An Arbitrary Southeast Asia",
        "author": "John Harvey Kellogg",
        "difficulty": 4,
        "streakable": True,
    },
    {
        "name": "Southwest and Central Asia",
        "author": "Tanderson",
        "difficulty": 5,
        "streakable": True,
    },
    {
        "name": "Terminus",
        "author": "RollinHill",
        "difficulty": 3,
        "streakable": True,
    },
    {"name": "THIS IS EUROPE (EXTREME)", "author": "vpp", "difficulty": 2},
    {
        "name": "The Fog",
        "author": "Illusion",
        "difficulty": 3,
        "streakable": True,
    },
    {
        "name": "The Sea Claims Too",
        "author": "OxGG",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "Town Squares of the World",
        "author": "Hugocl",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "Turkey Trash Can Practice",
        "author": "Konanchguessr",
        "difficulty": 3,
        "streakable": False,
    },
    {
        "name": "UNESCO World Heritage Sites",
        "author": "Simi",
        "difficulty": 2,
        "streakable": True,
    },
    {
        "name": "Unexplored World",
        "author": "Lect3R",
        "difficulty": 5,
        "pinpointable": True,
        "unofficial": True,
    },
    {
        "name": "US Cities population 150k+",
        "author": "RadoX1988",
    },
    {
        "name": "Tokyo 23 wards",
        "author": "Phrost",
    },
    {
        "name": "USOBBTCFUCITCCAKF",
        "author": "0xGG",
        "difficulty": 3,
        "streakable": True,
    },
    {
        "name": "World",
        "author": "GeoGuessr",
        "streakable": True,
    },
    {
        "name": "you will NOT have fun",
        "difficulty": 6,
        "author": "desirepath",
        "streakable": True,
    },
]

# There are 100 points-based unlocks and 3 extras
non_map_items = [
    {
        "name": "Progressive Pan/Zoom/Move",
        "progression": True,
        "count": 3,
        "category": ["Features"],
    },
    {
        "name": "Progressive Compass/Car",
        "progression": True,
        "count": 2,
        "category": ["Features"],
    },
    {"name": "Terrain Map View", "progression": True, "category": ["Features"]},
    {"name": "Satellite Map View", "progression": True, "category": ["Features"]},
    {"name": "OpenStreetMap View", "useful": True, "category": ["Features"]},
    {"name": "Time machine", "useful": True, "category": ["Features"]},
    {"name": "Fast driving", "useful": True, "category": ["Features"]},
    {"name": "Show Author Names", "useful": True, "category": ["Features"]},
    {"name": "Map Score +1000", "useful": True, "count": 12, "category": ["Boosts"]},
    {
        "name": "Map Score +5000",
        "useful": True,
        "count": 9,
        "progression": True,
        "category": ["Boosts"],
    },
    {"name": "+20 Seconds", "progression": True, "count": 31, "category": ["Features"]},
    {"name": "+1 Point", "useful": True, "count": 5, "category": ["Boosts"]},
    {"name": "20 Second Timer Trap", "count": 1, "trap": True, "category": ["Traps"]},
    {"name": "Death Metal Map Trap", "count": 1, "trap": True, "category": ["Traps"]},
    {"name": "Labelless Trap", "count": 1, "trap": True, "category": ["Traps"]},
    {
        "name": "Mega Plonk Trap",
        "count": 3,
        "trap": True,
        "category": ["Traps"],
        # all the remaining items will be this too
    },
    {"name": "Space Plonk Trap", "count": 1, "trap": True, "category": ["Traps"]},
]

non_map_goals = [
    {
        "name": "Perfect score on 1 map",
        "requires": [
            "Progressive Compass/Car",
            "Progressive Pan/Zoom/Move:3",
            "+20 Seconds:15",
        ],
        "victory": True,
    },
    # {
    #    "name": "Perfect score on 2 maps",
    #    "requires": [
    #        "Progressive Compass/Car:2",
    #        "Progressive Pan/Zoom/Move:3",
    #        "+20 Seconds:20",
    #        "Terrain Map View",
    #        "Satellite Map View",
    #    ],
    #    "victory": True,
    # },
    {
        "name": "Confetti #1",
        "requires": [
            "Progressive Compass/Car",
            "Progressive Pan/Zoom/Move:2",
            "+20 Seconds:2",
        ],
    },
    {
        "name": "Confetti #2",
        "requires": [
            "Progressive Compass/Car",
            "Progressive Pan/Zoom/Move:2",
            "+20 Seconds:4",
        ],
    },
    {
        "name": "Confetti #3",
        "requires": [
            "Progressive Compass/Car",
            "Progressive Pan/Zoom/Move:2",
            "+20 Seconds:6",
        ],
    },
    {
        "name": "Confetti #4",
        "requires": [
            "Progressive Compass/Car",
            "Progressive Pan/Zoom/Move:2",
            "+20 Seconds:8",
        ],
    },
    {
        "name": "Confetti #5",
        "requires": [
            "Progressive Compass/Car",
            "Progressive Pan/Zoom/Move:2",
            "+20 Seconds:10",
        ],
    },
]


base_difficulty = {"5k": 1, "10k": 2, "15k": 3, "20k": 5, "20k or 5 countries": 5}


def make_json():
    selected_maps = [
        {"name": START_MAP, "author": START_MAP_AUTHOR, "streakable": True},
    ]
    for mapname in random.sample(regional_maps, 4):
        mapdata = {"name": mapname, "author": "GeoGuessr", "difficulty": 4}
        selected_maps.append(mapdata)

    for mapdata in random.sample(user_maps, 20):
        selected_maps.append(mapdata)

    selected_maps.sort(key=itemgetter("name"))

    locations = non_map_goals[:]
    items = non_map_items[:]
    regions = {}
    for mapdata in selected_maps:
        mapname = mapdata["name"]
        items.append({"name": mapname, "progression": True, "category": ["Maps"]})
        region_info = {"requires": [mapname]}
        if mapname == START_MAP:
            region_info["starting"] = True
        goals = ["5k", "10k", "15k", "20k"]
        if mapdata.get("streakable"):
            goals[3] = "20k or 5 countries"
        for goal in goals:
            requires = [mapname]
            difficulty = base_difficulty[goal] + mapdata.get("difficulty", 3)
            if difficulty >= 9:
                requires.append("Progressive Pan/Zoom/Move:3")
                requires.append("Progressive Compass/Car:2")
                requires.append("+20 Seconds:12")
                requires.append("Satellite Map View")
                requires.append("Show Author Names")
                requires.append("Map Score +5000:4")
            elif difficulty >= 8:
                requires.append("Progressive Pan/Zoom/Move:2")
                requires.append("Progressive Compass/Car")
                requires.append("+20 Seconds:6")
                requires.append("Terrain Map View")
                requires.append("Map Score +5000:4")
            elif difficulty >= 7:
                requires.append("Progressive Pan/Zoom/Move")
                requires.append("Progressive Compass/Car")
                requires.append("+20 Seconds:4")
                requires.append("Map Score +5000:2")
            elif difficulty >= 6:
                requires.append("Progressive Pan/Zoom/Move")
                requires.append("Progressive Compass/Car")
                requires.append("+20 Seconds:3")
            elif difficulty >= 5:
                requires.append("Progressive Compass/Car")
                requires.append("+20 Seconds:2")
            elif difficulty >= 4:
                requires.append("+20 Seconds:1")
            locations.append(
                {
                    "name": f"{mapname} {goal}",
                    "requires": requires,
                    "category": [mapname],
                }
            )

    with open("data/items.json", "w") as out:
        print(json.dumps(items, indent=4), file=out)

    with open("data/locations.json", "w") as out:
        print(json.dumps(locations, indent=4), file=out)

    with open("data/regions.json", "w") as out:
        print(json.dumps(regions, indent=4), file=out)


if __name__ == "__main__":
    make_json()
