from dataclasses import dataclass
from typing import List, Optional
from georando.checks import (
    CONTINENT_CHECKS,
    COUNTRY_CHECKS_VERY_COMMON,
    ULTRA_RARE_CHECK,
)
from georando.sightings import EASY_SIGHTINGS, STOP


@dataclass
class GeoGuessrMap:
    name: str
    creator: str
    # suggested difficulty range: 1-7
    difficulty: int
    # streakable: whether the map covers a reasonable number of countries, so that country streaks
    # are meaningfule
    streakable: bool
    # True (default) for maps that only contain official Google coverage, False when there are
    # photospheres or unofficial street cams
    official_coverage: bool
    # Features you will definitely get when you play this map
    provides: List[str]
    # Features that you will probably get from playing this map repeatedly, such as countries that it
    # includes more than 1% of the time
    may_provide: List[str]
    # Tags that help describe and classify the map
    tags: List[str]
    # I want to store the URL on every map but I haven't gone back and looked most of them up yet
    url: Optional[str] = None

    def as_item(self):
        return {"name": self.name, "progression": True, "category": ["Maps"]}


def official_map(
    name: str,
    difficulty: int = 5,
    tags: Optional[List[str]] = None,
    provides: Optional[List[str]] = None,
    may_provide: Optional[List[str]] = None,
    official_coverage: bool = True,
) -> GeoGuessrMap:
    if provides is None:
        provides = []
    # A country provides its own checks in logic
    provides.append(name)
    return GeoGuessrMap(
        name=name,
        creator="GeoGuessr",
        difficulty=difficulty,
        streakable=False,
        official_coverage=official_coverage,
        may_provide=may_provide or [],
        provides=provides,
        tags=tags or [],
    )


def community_map(
    name: str,
    creator: str,
    difficulty: int = 4,
    streakable: bool = False,
    official_coverage: bool = True,
    may_provide: Optional[List[str]] = None,
    provides: Optional[List[str]] = None,
    tags: Optional[List[str]] = [],
    url: Optional[str] = None,
):
    return GeoGuessrMap(
        name=name,
        creator=creator,
        difficulty=difficulty,
        streakable=streakable,
        official_coverage=official_coverage,
        may_provide=may_provide or [],
        provides=provides or [],
        tags=tags or [],
        url=url,
    )


# With a few exceptions based on my judgement:
# - Country maps with an avg. score over 20k have difficulty 3
# - Country maps with an avg. score of 15k-20k have difficulty 4
# - Country maps with an avg. score of 11k-15k have difficulty 5
# - Country maps with an avg. score of 8k-11k have difficulty 6
# - Country maps with an avg. score under 8k have difficulty 7
#
# Countries are tagged as "small" if they have fewer than 10k locations
# on their GeoGuessr official map.
#
# In may_provide, in addition to countries, I tag "sightings" that maps might
# provide, though that feature isn't currently used. It doesn't affect the
# logic, so don't worry about it right now.
OFFICIAL_MAPS: List[GeoGuessrMap] = [
    official_map("Albania", provides=["Europe"]),
    official_map("American Samoa", tags=["small"], provides=["Oceania"]),
    official_map("Andorra", tags=["small"], provides=["Europe"]),
    official_map("Argentina", provides=["South America"], may_provide=[STOP["pare"]]),
    official_map("Australia", provides=["Oceania"]),
    official_map("Austria", provides=["Europe"], difficulty=4),
    official_map("Bangladesh", provides=["Asia"], difficulty=6),
    official_map("Belgium", provides=["Europe"]),
    official_map("Bhutan", provides=["Asia"]),
    official_map("Bolivia", provides=["South America"]),
    official_map("Botswana", provides=["Africa"], difficulty=6),
    official_map("Brazil", provides=["South America"], may_provide=[STOP["pare"]]),
    official_map("Bulgaria", provides=["Europe"], may_provide=["Cyrillic letters"]),
    official_map(
        "Cambodia",
        difficulty=6,
        provides=["Asia"],
        may_provide=["Khmer letters (Cambodia)"],
    ),
    official_map("Canada", provides=["North America"]),
    official_map(
        "Chile", difficulty=3, provides=["South America"], may_provide=[STOP["pare"]]
    ),
    official_map("Colombia", provides=["South America"], may_provide=[STOP["pare"]]),
    official_map("Croatia", provides=["Europe"]),
    official_map("Curacao", provides=["South America"], tags=["small"], difficulty=4),
    official_map("Czech Republic", provides=["Europe"]),
    official_map("Denmark", provides=["Europe"]),
    official_map("Dominican Republic", provides=["North America"], tags=["small"]),
    official_map("Ecuador", provides=["South America"], may_provide=[STOP["pare"]]),
    official_map("Estonia", provides=["Europe"]),
    official_map("Eswatini", provides=["Africa"], tags=["small"]),
    official_map("Faroe Islands", provides=["Europe"], tags=["small"], difficulty=4),
    official_map("Finland", provides=["Europe"]),
    official_map("France", provides=["Europe"]),
    official_map("Germany", provides=["Europe"]),
    official_map("Ghana", provides=["Africa"], difficulty=6),
    official_map("Greece", provides=["Greek letters", "Europe"]),
    official_map("Greenland", provides=["North America"], tags=["small"], difficulty=6),
    official_map("Guam", provides=["Oceania"], tags=["small"], difficulty=4),
    official_map("Guatemala", provides=["North America"], may_provide=[STOP["alto"]]),
    official_map(
        "Hong Kong",
        difficulty=4,
        tags=["small"],
        provides=["Asia", "Chinese (Han) characters"],
    ),
    official_map("Hungary", provides=["Europe"]),
    official_map("Iceland", provides=["Europe"]),
    official_map(
        "India",
        provides=[
            "Asia",
            "Devanagari letters (India)",
            "Tamil letters (India and Sri Lanka)",
        ],
    ),
    official_map("Indonesia", provides=["Asia"]),
    official_map("Ireland", provides=["Europe"]),
    official_map("Isle of Man", provides=["Europe"], tags=["small"]),
    official_map("Israel", provides=["Asia", "Hebrew letters"]),
    official_map("Italy", provides=["Europe"]),
    official_map(
        "Japan",
        difficulty=4,
        provides=["Asia", "Japanese kana characters", "Chinese (Han) characters"],
    ),
    official_map("Jersey", provides=["Europe"], tags=["small"]),
    official_map(
        "Jordan",
        tags=["small"],
        difficulty=4,
        provides=["Asia", "Arabic letters"],
        may_provide=[STOP["qif"]],
    ),
    official_map(
        "Kazakhstan",
        tags=["small"],
        difficulty=7,
        provides=["Asia", "Cyrillic letters"],
    ),
    official_map("Kenya", provides=["Africa"]),
    official_map("Kyrgyzstan", provides=["Asia", "Cyrillic letters"]),
    official_map("Laos", tags=["small"], difficulty=4),
    official_map("Latvia", provides=["Europe"]),
    official_map("Lesotho", difficulty=6, provides=["Africa"]),
    # Lithuania should be 'small' by my definition, but that feels wrong
    official_map("Lithuania", difficulty=6, provides=["Europe"]),
    official_map("Madagascar", tags=["small"], provides=["Africa"]),
    official_map("Malaysia", provides=["Asia"], may_provide=[STOP["berhenti"]]),
    official_map("Malta", provides=["Europe"], tags=["small"]),
    official_map("Mexico", provides=["North America"], may_provide=[STOP["alto"]]),
    official_map("Mongolia", provides=["Asia"]),
    official_map("Montenegro", provides=["Europe"], tags=["small"]),
    official_map("Netherlands", provides=["Europe"], may_provide=["a canal"]),
    official_map("New Zealand", provides=["Oceania"]),
    official_map("Nigeria", provides=["Africa"]),
    official_map("North Macedonia", provides=["Europe"], tags=["small"]),
    official_map("Northern Mariana Islands", provides=["Oceania"], tags=["small"]),
    official_map("Norway", provides=["Europe"]),
    official_map("Panama", difficulty=5, provides=["South America"], tags=["small"]),
    official_map(
        "Peru", difficulty=5, provides=["South America"], may_provide=[STOP["pare"]]
    ),
    official_map("Philippines", provides=["Asia"], difficulty=6),
    official_map("Poland", provides=["Europe"], difficulty=6),
    official_map("Portugal", provides=["Europe"], difficulty=4),
    official_map("Puerto Rico", provides=["North America"], difficulty=6),
    official_map(
        "Qatar",
        difficulty=4,
        tags=["small"],
        provides=["Asia"],
        may_provide=["Arabic letters"],
    ),
    official_map("Romania", provides=["Europe"], difficulty=6),
    official_map(
        "Russia", difficulty=5, may_provide=["Cyrillic letters", STOP["ctop"]]
    ),
    official_map("Rwanda", provides=["Africa"], difficulty=4, tags=["small"]),
    official_map("Senegal", provides=["Africa"], difficulty=6),
    official_map("Serbia", provides=["Europe"], may_provide=["Cyrillic letters"]),
    official_map(
        "Singapore",
        difficulty=4,
        tags=["small"],
        provides=["Asia"],
        may_provide=["Chinese (Han) characters"],
    ),
    official_map("Slovakia", provides=["Europe"]),
    official_map("Slovenia", provides=["Europe"]),
    official_map("South Africa", provides=["Africa"], difficulty=5),
    official_map("South Korea", provides=["Asia", "Korean hangul characters"]),
    official_map("Spain"),
    official_map(
        "Sri Lanka",
        difficulty=6,
        provides=["Asia", "Sinhala letters (Sri Lanka)"],
        may_provide=["Tamil letters (India and Sri Lanka)"],
    ),
    official_map("Sweden", provides=["Europe"]),
    official_map("Switzerland", provides=["Europe"]),
    official_map(
        "Taiwan",
        provides=["Asia"],
        may_provide=["Chinese (Han) characters", STOP["ting"]],
    ),
    official_map(
        "Thailand", provides=["Asia"], may_provide=["Thai letters", STOP["yud"]]
    ),
    official_map(
        "Tunisia", provides=["Africa"], may_provide=["Arabic letters", STOP["qif"]]
    ),
    official_map("Türkiye", may_provide=[STOP["dur"]]),
    official_map("Uganda", provides=["Africa"], difficulty=4, tags=["small"]),
    official_map(
        "Ukraine", difficulty=6, provides=["Europe"], may_provide=["Cyrillic letters"]
    ),
    official_map(
        "United Arab Emirates",
        difficulty=4,
        tags=["small"],
        provides=["Africa"],
        may_provide=["Arabic letters", STOP["qif"]],
    ),
    official_map("United Kingdom", provides=["Europe"], may_provide=["a roundabout"]),
    official_map("United States", provides=["North America"]),
    official_map(
        "Uruguay", difficulty=6, provides=["South America"], may_provide=[STOP["pare"]]
    ),
    # Non-countries that are official maps
    official_map(
        "European Union",
        difficulty=4,
        provides=["Europe"],
        may_provide=[
            "Austria",
            "Belgium",
            "Bulgaria",
            "Croatia",
            # Cyprus has too low a proportion of locations
            "Czech Republic",
            "Denmark",
            "Estonia",
            "Finland",
            "France",
            "Germany",
            "Greece",
            "Hungary",
            "Ireland",
            "Italy",
            "Latvia",
            # Lithuania has an unusually low proportion of locations, I think
            # Luxembourg is too small to be promised by the logic
            # Malta is too small to be promised by the logic
            "Netherlands",
            "Poland",
            "Portugal",
            "Romania",
            "Slovakia",
            "Slovenia",
            "Spain",
            "Sweden",
        ],
    ),
    official_map(
        "Famous Places",
        difficulty=1,
        official_coverage=False,
        tags=["popular", "world", "theme"],
    ),
    official_map(
        "World",
        difficulty=3,
        official_coverage=False,
        may_provide=CONTINENT_CHECKS + COUNTRY_CHECKS_VERY_COMMON + EASY_SIGHTINGS,
        tags=["world", "starter"],
    ),
]

COMMUNITY_MAPS = {
    # The default starting map
    "acw": community_map(
        "A Community World",
        "MatePotato",
        difficulty=3,
        provides=[],
        may_provide=CONTINENT_CHECKS + COUNTRY_CHECKS_VERY_COMMON + EASY_SIGHTINGS,
        tags=["popular", "world", "starter"],
    ),
    "100_cities_canada": community_map(
        "100 largest cities of Canada",
        "Simi",
        difficulty=2,
        provides=["Canada"],
        streakable=False,
        may_provide=[
            "a mural",
            "a bus",
            STOP["arret"],
            "the trans-Canada highway",
        ],
        tags=["country", "urban"],
    ),
    "100_rivers_europe": community_map(
        "100 Longest Rivers in Europe",
        "Simi",
        difficulty=2,
        provides=["a river"],
        streakable=True,
        tags=["theme"],
        # could this be a starter? we need country stats if so
    ),
    "aesthetic_world": community_map(
        "Aesthetic World",
        "baszmania",
        difficulty=3,
        streakable=True,
        tags=["theme", "world"],
    ),
    "all_about_north": community_map(
        "All about the North",
        "Frímann Stefánsson",
        difficulty=3,
        streakable=True,
        may_provide=[
            "snow",
            "Iceland",
            "Greenland",
            "Faroe Islands",
            "Canada",
            "United States",
            "Norway",
            "Sweden",
            "Finland",
            "Russia",
            "United Kingdom",
        ],
        tags=["world_region", "starter"],
    ),
    "amaizing_corn": community_map(
        "An Amaizing World of Corn",
        "Cinnamonique",
        difficulty=3,
        streakable=True,
        provides=["corn (maize)"],
        tags=["theme", "world"],
    ),
    "animals_world": community_map(
        "Animals of the World",
        "Rhiannonfuller",
        difficulty=4,
        official_coverage=False,
        streakable=True,
        tags=["world"],
        may_provide=["a dog", "a cow", "a horse"],
    ),
    "arbitrary_asia": community_map(
        "An Arbitrary Asia",
        "slashP",
        difficulty=4,
        streakable=True,
        provides=["Asia"],
        may_provide=[
            "rice",
            STOP["ting"],
            STOP["qif"],
            STOP["tomare"],
            STOP["berhenti"],
            "Cyrillic letters",
            "Arabic letters",
            "Chinese (Han) characters",
            "Japanese kana characters",
            "Korean hangul characters",
            "Thai letters",
            "Hebrew letters",
            "Bengali letters",
            "Devanagari letters (India)",
            "Tamil letters (India and Sri Lanka)",
            "Khmer letters (Cambodia)",
            "Sinhala letters (Sri Lanka)",
            "United Arab Emirates",
            "Bangladesh",
            "Bhutan",
            "Hong Kong",
            "Indonesia",
            "Israel",
            "India",
            "Jordan",
            "Japan",
            "Kyrgyzstan",
            "Laos",
            "Sri Lanka",
            "Mongolia",
            "Malaysia",
            "Qatar",
            "Russia",
            "Singapore",
            "Thailand",
            "Turkey",
            "Taiwan",
        ],
        tags=["arbitrary", "world_region", "starter"],
    ),
    "arbitrary_africa": community_map(
        "An Arbitrary Africa",
        "slashP",
        difficulty=4,
        streakable=True,
        provides=["Africa"],
        may_provide=[
            "Arabic letters",
            "Botswana",
            "Eswatini",
            "Ghana",
            "Kenya",
            "Lesotho",
            "Nigeria",
            "Réunion",
            "Rwanda",
            "Senegal",
            "Lesotho",
            "Eswatini",
            "Tunisia",
            "Uganda",
            "South Africa",
            "an M-PESA shop",
            "an N road sign",
        ],
        tags=["arbitrary", "world_region", "starter"],
    ),
    "arbitrary_oceania": community_map(
        "An Arbitrary Oceania",
        "slashP",
        difficulty=4,
        streakable=True,
        provides=["Oceania"],
        may_provide=[
            "American Samoa",
            "Australia",
            "Guam",
            "Northern Mariana Islands",
            "New Zealand",
            "United States",
        ],
        tags=["arbitrary", "world_region", "starter"],
    ),
    "arbitrary_north_america": community_map(
        "An Arbitrary North America",
        "slashP",
        difficulty=4,
        streakable=True,
        provides=["North America"],
        may_provide=[
            "Canada",
            "Dominican Republic",
            "Guatemala",
            "Mexico",
            "Panama",
            "Puerto Rico",
            "United States",
            "United States Virgin Islands",
            STOP["alto"],
        ],
        tags=["arbitrary", "world_region", "starter"],
    ),
    "arbitrary_south_america": community_map(
        "An Arbitrary South America",
        "slashP",
        difficulty=4,
        provides=["South America"],
        may_provide=[
            "Argentina",
            "Bolivia",
            "Brazil",
            "Chile",
            "Colombia",
            "Ecuador",
            "Peru",
            "Uruguay",
            STOP["pare"],
        ],
        tags=["arbitrary", "world_region", "starter"],
    ),
    "arbitrary_europe": community_map(
        "An Arbitrary Europe",
        "slashP",
        difficulty=4,
        streakable=True,
        provides=["Europe"],
        may_provide=[
            "Albania",
            "Austria",
            "Belgium",
            "Bulgaria",
            "Switzerland",
            "Czech Republic",
            "Germany",
            "Denmark",
            "Estonia",
            "Spain",
            "Finland",
            "France",
            "United Kingdom",
            "Greece",
            "Hungary",
            "Ireland",
            "Iceland",
            "Italy",
            "Lithuania",
            "Latvia",
            "Montenegro",
            "North Macedonia",
            "Netherlands",
            "Norway",
            "Poland",
            "Portugal",
            "Romania",
            "Russia",
            "Sweden",
            "Slovenia",
            "Slovakia",
            "Turkey",
            "Ukraine",
            STOP["ctop"],
            "a European E route sign",
            "an A road sign",
            "an M road sign",
            "Greek letters",
            "Cyrillic letters",
        ],
        tags=["arbitrary", "world_region", "starter"],
    ),
    "architecture_world": community_map(
        "Architecture around the World",
        "Souvlaki Zeitgeist",
        url="https://www.geoguessr.com/maps/60e8914babf0b400014428b2",
        difficulty=3,
        streakable=True,
        tags=["theme", "world"],
    ),
    "attractive_bollards": community_map(
        "Attractive Bollards of the Universe",
        "GeoPeter",
        difficulty=3,
        streakable=True,
        provides=["a bollard with a red reflector"],
        tags=["theme", "world"],
    ),
    "balanced_canada": community_map(
        "A Balanced Canada",
        "slashP",
        difficulty=5,
        provides=["Canada", "North America"],
        may_provide=[
            STOP["arret"],
            "the trans-Canada highway",
        ],
        tags=["country", "balanced"],
    ),
    "balanced_japan": community_map(
        "A Balanced Japan",
        "Kodiak",
        difficulty=5,
        provides=["Japan", "Asia"],
        may_provide=[
            STOP["tomare"],
            "Japanese kana characters",
        ],
        tags=["country", "balanced"],
    ),
    "balanced_urban_world": community_map(
        "A Balanced Urban World",
        "TunaJoe74",
        difficulty=4,
        may_provide=[
            "a bus",
            "a train",
            "a bicycle",
            "a rickshaw",
            "a metro/subway/light rail station",
            "a museum",
            "a mural",
            "a roundabout",
            "a tunnel",
            STOP["tomare"],
            "Japanese kana characters",
        ],
        streakable=True,
        tags=["world", "balanced"],
    ),
    "balanced_malaysia": community_map(
        "A Balanced Malaysia",
        "Souvlaki Zeitgeist",
        url="https://www.geoguessr.com/maps/634050c7fc09dbb1e6c107c6",
        difficulty=5,
        provides=["Malaysia"],
        tags=["country", "balanced"],
    ),
    "border_control": community_map(
        "Border Control",
        "0321654",
        difficulty=2,
        streakable=True,
        may_provide=["a national border"],
        tags=["world", "theme"],
    ),
    "camera_obscura": community_map(
        "Camera Obscura - An Interesting World",
        "Souvlaki Zeitgeist",
        url="https://www.geoguessr.com/maps/60f43c5a93939800017c7c38",
        difficulty=4,
        streakable=True,
        tags=["world", "theme"],
    ),
    "cities_bold": community_map(
        "Cities in Bold",
        "maccem",
        url="https://www.geoguessr.com/maps/5f11cfe50364e52c9c5d0bd8",
        difficulty=3,
        streakable=True,
        tags=["world", "urban"],
    ),
    "ciudades": community_map(
        "Ciudades España",
        "ItsMoler",
        url="https://www.geoguessr.com/maps/6556049158779239445cb36b",
        difficulty=4,
        provides=["Spain"],
        tags=["country", "urban"],
    ),
    "cityguessr": community_map(
        "CityGuessr",
        "BOKSA",
        difficulty=2,
        streakable=True,
        tags=["world", "urban"],
    ),
    "city_skylines": community_map(
        "City Skylines",
        "Radu C",
        url="https://www.geoguessr.com/maps/5dd60f7a44d2a445e4ae6171",
        difficulty=3,
        streakable=True,
        official_coverage=False,
        tags=["world", "urban"],
    ),
    "coastal_cities": community_map(
        "Coastal Cities 100K+",
        "Scribbles",
        url="https://www.geoguessr.com/maps/60ea152d6228100001e6e0ee",
        difficulty=2,
        streakable=True,
        tags=["world", "urban"],
    ),
    "complete_world": community_map(
        "A Complete World",
        "MatePotato",
        difficulty=5,
        official_coverage=False,
        streakable=True,
        may_provide=[ULTRA_RARE_CHECK],
        tags=["world"],
    ),
    "community_europe": community_map(
        "A Community Europe",
        "Simi",
        difficulty=4,
        streakable=True,
        provides=["Europe"],
        may_provide=[
            "Albania",
            "Austria",
            "Belgium",
            "Bulgaria",
            "Switzerland",
            "Czech Republic",
            "Germany",
            "Denmark",
            "Estonia",
            "Spain",
            "Finland",
            "France",
            "United Kingdom",
            "Greece",
            "Hungary",
            "Ireland",
            "Iceland",
            "Italy",
            "Lithuania",
            "Latvia",
            "Luxembourg",
            "Montenegro",
            "North Macedonia",
            "Netherlands",
            "Norway",
            "Poland",
            "Portugal",
            "Romania",
            "Russia",
            "Sweden",
            "Slovenia",
            "Slovakia",
            "Turkey",
            "Ukraine",
            STOP["ctop"],
            "a European E route sign",
            "an A road sign",
            "an M road sign",
            "Greek letters",
            "Cyrillic letters",
        ],
        tags=["world_region", "starter"],
    ),
    "community_usa": community_map(
        "A Community USA",
        "UltraTech66",
        url="https://www.geoguessr.com/maps/635c797dac045a96b9333016",
        difficulty=4,
        provides=["United States"],
        tags=["country"],
    ),
    "dads_world": community_map(
        "Dads of the World",
        "Arsemann",
        url="https://www.geoguessr.com/maps/6090566301041a000178572e",
        difficulty=4,
        streakable=True,
        official_coverage=False,
        tags=["world", "theme"],
    ),
    "detective_japan": community_map(
        "Detective Japan",
        "工藤新一",
        url="https://www.geoguessr.com/maps/6041f0c5af90ab00018f5fbe",
        difficulty=3,
        provides=["Japan"],
        tags=["country", "pinpointable"],
    ),
    "distanceguessr": community_map(
        "DistanceGuessr",
        "Scribbles",
        difficulty=2,
        streakable=True,
        tags=["world", "pinpointable"],
    ),
    "diverse_complete_world": community_map(
        "A Diverse Complete World",
        "MatePotato",
        difficulty=5,
        official_coverage=False,
        streakable=True,
        may_provide=[ULTRA_RARE_CHECK],
        tags=["world", "balanced"],
    ),
    "diverse_usa": community_map(
        "A Diverse USA",
        "Das Schnootz",
        difficulty=3,
        provides=["United States", "North America"],
        tags=["balanced", "country"],
    ),
    "diversite_francaise": community_map(
        "La Diversité Française",
        "La Commu GeoFrance",
        url="https://www.geoguessr.com/maps/5eb5ea048734a02c543f2ae1",
        difficulty=5,
        tags=["balanced", "country", "pinpointable"],
    ),
    "empty_world": community_map(
        "An Empty World",
        "Souvlaki Zeitgeist",
        url="https://www.geoguessr.com/maps/64d02e3339429d08f644e153",
        difficulty=7,
        streakable=True,
        may_provide=["United States", "Turkey", "Mongolia", "Russia", "Australia"],
        tags=["rural", "world"],
    ),
    "equidistant_world": community_map(
        "An Equidistant World",
        "Teloso",
        difficulty=4,
        # Countries large enough to be commonly represented on this map.
        # Should be already included in the may_provide of other world maps, though.
        streakable=True,
        may_provide=[
            "Brazil",
            "Argentina",
            "United States",
            "Canada",
            "Mexico",
            "South Africa",
            "Australia",
            "India",
            "Russia",
        ],
        tags=["balanced", "world", "starter"],
    ),
    "extraordinary_cow": community_map(
        "An Extraordinary Cow",
        "KingMoo92",
        url="https://www.geoguessr.com/maps/60bb6eb49541670001e935ba",
        difficulty=5,
        streakable=True,
        provides=["a cow"],
        tags=["theme", "world"],
    ),
    "extraordinary_world": community_map(
        "An Extraordinary World",
        "Alok",
        difficulty=6,
        official_coverage=False,
        streakable=True,
        tags=["theme", "world"],
    ),
    "every_us_train": community_map(
        "Every US Train Station",
        "Acela2163",
        url="https://www.geoguessr.com/maps/65976dd83835e9e68d393f8d",
        difficulty=3,
        provides=["United States"],
        may_provide=["a train"],
        tags=["country", "theme"],
    ),
    "extreme_regionguessing": community_map(
        "Extreme Regionguessing",
        "Finbarr",
        url="https://www.geoguessr.com/maps/63cfd5ba9512ebc734807d3d",
        difficulty=6,
        streakable=True,
        may_provide=[
            "Russia",
            "USA",
            "Brazil",
            "Canada",
            "Australia",
            "Indonesia",
            "Mexico",
        ],
        tags=["world", "starter"],
    ),
    "fun_flags": community_map(
        "Fun with Flags",
        "Cinnamonique",
        difficulty=2,
        streakable=True,
        official_coverage=False,
        provides=["a national flag"],
        tags=["world", "theme"],
    ),
    "geodetective_world": community_map(
        "GeoDetective World",
        "A little Eileen",
        url="https://www.geoguessr.com/maps/61c1d9be6f87f70001eb6055",
        difficulty=2,
        streakable=True,
        official_coverage=False,
        tags=["world", "pinpointable"]
    ),
    "geoguessr_in_2069": community_map(
        "GeoGuessr in 2069 - IMPROVED",
        "Eurowizard",
        url="https://www.geoguessr.com/maps/651d58531b658d68817f566d",
        difficulty=5,
        streakable=True,
        official_coverage=False,
        may_provide=[ULTRA_RARE_CHECK],
        tags=["world"],
    ),
    "haer_raader": community_map(
        "Här råder stillhet och frid",
        "0xGG",
        url="https://www.geoguessr.com/maps/64c9fb867300eb4ceb521520",
        difficulty=7,
        streakable=True,
        # _technically_ it's all official coverage. but it's all trekkers. You cannot find a road.
        official_coverage=False,
        tags=["theme", "world", "rural"],
    ),
    "i_like_trains": community_map(
        "I Like Trains",
        "baszmania",
        url="https://www.geoguessr.com/maps/62e402e93b3df96f2e031afc",
        difficulty=3,
        provides=["a train"],
        streakable=True,
        tags=["theme", "world"],
    ),
    "international_airports": community_map(
        "International Airports",
        "0321654",
        difficulty=1,
        streakable=True,
        provides=["an airport"],
        # fill more of these in based on observation:
        may_provide=[
            "United States",
            "Mexico",
            "France",
            "Argentina",
            "Indonesia",
            "United Kingdom",
        ],
        tags=["theme", "world"],
    ),
    "i_saw_sign": community_map(
        "I Saw the Sign 2.0",
        "Kirsike",
        difficulty=2,
        streakable=True,
        tags=["world"],
    ),
    "learning_world": community_map(
        "A Learning World",
        "GeoPeter (YT)",
        url="https://www.geoguessr.com/maps/6078c830e945e900015f4a64",
        difficulty=2,
        tags=["world"],
    ),
    "linguistic_world": community_map(
        "A Linguistic World",
        "nuujaku",
        may_provide=[
            "Cyrillic letters",
            "Arabic letters",
            "Greek letters",
            "Thai letters",
            "Hebrew letters",
            "Bengali letters",
            "Devanagari letters (India)",
            "Tamil letters (India and Sri Lanka)",
            "Khmer letters (Cambodia)",
            "Sinhala letters (Sri Lanka)",
            "Chinese (Han) characters",
            "Japanese kana characters",
            "Korean hangul characters",
            "Canadian Aboriginal syllabics",
        ],
        difficulty=2,
        tags=["world", "theme"],
    ),
    "mural_world": community_map(
        "A Mural World",
        "Hugo",
        difficulty=3,
        streakable=True,
        provides=["a mural"],
        tags=["theme", "world", "urban"],
    ),
    "pinpointable_mongolia": community_map(
        "A Pinpointable Mongolia",
        "クリプトナイト",
        url="https://www.geoguessr.com/maps/655f6d7e812a91133b381b53",
        difficulty=3,
        provides=["Mongolia", "Asia"],
        tags=["pinpointable", "country"],
    ),
    "pinpointable_world": community_map(
        "A Pinpointable World",
        "ttv.Sverre",
        url="https://www.geoguessr.com/maps/6029991c5048850001d572a9",
        difficulty=2,
        streakable=True,
        tags=["pinpointable", "world"],
    ),
    "pro_world": community_map(
        "A Pro World",
        "slashP",
        difficulty=4,
        streakable=True,
        tags=["world"],
    ),
    "rural_world": community_map(
        "A Rural World",
        "Topotic (YT)",
        url="https://www.geoguessr.com/maps/5be0de51fe3a84037ca36447",
        difficulty=5,
        tags=["rural", "world"],
        may_provide=[
            "France",
            "Germany",
            "Italy",
            "Norway",
            "Poland",
            "Russia",
            "Spain",
            "Sweden",
            "Türkiye",
            "Ukraine",
            "United Kingdom",
            "Canada",
            "Mexico",
            "Guatemala",
            "United States",
            "Panama",
            "Argentina",
            "Brazil",
            "Chile",
            "Colombia",
            "Peru",
            "Botswana",
            "Kenya",
            "Nigeria",
            "Senegal",
            "South Africa",
            "Bangladesh",
            "Cambodia",
            "Indonesia",
            "Japan",
            "Malaysia",
            "Philippines",
            "Sri Lanka",
            "Thailand",
            "Australia",
            "New Zealand",
            "a cow",
            "corn",
            "rice",
        ],
    ),
    "soiled_world": community_map(
        "A Soiled World",
        "Havrd",
        url="https://www.geoguessr.com/maps/607d8ba950996a00015439cc",
        difficulty=6,
        streakable=True,
        tags=["world", "rural"],
        may_provide=[
            "Kenya",
            "South Africa",
            "Senegal",
            "Ghana",
            "Nigeria",
            "Botswana",
            "Uganda",
            "Australia",
            "New Zealand",
            "Poland",
            "United States",
            "Indonesia",
            "Peru",
            "Argentina",
            "Uruguay",
            "Brazil",
            "Chile",
            "Iceland",
            "Cambodia",
            "Bolivia",
            "Colombia",
            "Russia",
            "Kyrgyzstan",
            "Faroe Islands",
        ],
    ),
    "speedrun_world": community_map(
        "A Speedrun World",
        "Scribbles",
        difficulty=1,
        streakable=True,
        tags=["world", "pinpointable", "urban"],
    ),
    "terminus": community_map(
        "Terminus",
        "RollinHill",
        difficulty=4,
        streakable=True,
        may_provide=[
            "Russia",
            "Turkey",
            "France",
            "Spain",
            "Italy",
            "Sweden",
            "Norway",
            "Romania",
            "Poland",
            "Bulgaria",
            "Japan",
            "Thailand",
            "Philippines",
            "Indonesia",
            "Malaysia",
            "Brazil",
            "Argentina",
            "Colombia",
            "Peru",
            "Chile",
            "South Africa",
            "United States",
            "Mexico",
            "Canada",
            "Australia"
        ],
        tags=["world", "theme"],
    ),
    "thrilling_world": community_map(
        "A Thrilling World",
        "Zem",
        url="https://www.geoguessr.com/maps/634266c98f0f00a7e457f4e9",
        difficulty=3,
        streakable=True,
        tags=["world", "theme"],
    ),
    "uk_railway_stations": community_map(
        "UK Railway Stations",
        "TheMatty",
        url="https://www.geoguessr.com/maps/5ed2f830282ad28b94ff17d6/play",
        difficulty=3,
        streakable=True,
        provides=["United Kingdom"],
        may_provide=["a train"],
        tags=["country", "theme"]
    ),
    "unesco_world_heritage": community_map(
        "UNESCO World Heritage Sites",
        "Simi",
        difficulty=5,
        streakable=True,
        official_coverage=False,
        tags=["theme", "world"],
    ),
    "unofficial_street_world": community_map(
        "An Unofficial Street World",
        "David Walker",
        difficulty=5,
        official_coverage=False,
        tags=["world"],
    ),
    "urban_argentina": community_map(
        "An Urban Argentina",
        "Lautaro Ruffinengo",
        difficulty=4,
        tags=["country", "urban"],
        provides=["Argentina", "South America"],
        may_provide=[STOP["pare"]],
    ),
    "urban_australia": community_map(
        "An Urban Australia",
        "Gertie Goo Goo",
        difficulty=3,
        tags=["country", "urban"],
        provides=["Australia", "Oceania"],
    ),
    "well_covered_world": community_map(
        "A Well-Covered World",
        "0xGG",
        url="https://www.geoguessr.com/maps/64d8c5ec3a31de27be286d6c",
        difficulty=3,
        streakable=True,
        may_provide=[
            "United States",
            "Brazil",
            "Canada",
            "Russia",
            "Indonesia",
            "South Africa",
            "Japan",
            "Australia",
            "Mexico",
            "Thailand",
            "France",
            "Bangladesh",
            "Spain",
            "Germany",
            "Malaysia",
            "Philippines",
            "Sweden",
            "Argentina",
            "Türkiye",
            "Nigeria",
            "United Kingdom",
            "Italy",
            "Poland",
            "Colombia",
            "Kenya",
            "Finland",
        ],
        tags=["starter"],
    ),
    "world_plants": community_map(
        "A World of Plants",
        "atillandsia",
        url="https://www.geoguessr.com/maps/630ccd1d612a29ef2a3913a2",
        difficulty=6,
        streakable=True,
        tags=["world", "theme", "rural"],
    ),
    "world_waterfalls": community_map(
        "A World of Waterfalls",
        "CelestialDalek",
        url="https://www.geoguessr.com/maps/5fa2fa8ee27b4900014dde81",
        official_coverage=False,
        difficulty=7,
        streakable=True,
        tags=["world", "theme"],
    ),
}
