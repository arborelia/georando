from dataclasses import dataclass
from typing import List, Optional
from georando.checks import (
    CONTINENT_CHECKS,
    COUNTRY_CHECKS_VERY_COMMON,
    EASY_SIGHTINGS,
    STOP,
    ULTRA_RARE_CHECK,
)


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


def official_country(
    name: str,
    difficulty: int = 4,
    tags: Optional[List[str]] = None,
    provides: Optional[List[str]] = None,
    may_provide: Optional[List[str]] = None,
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
        official_coverage=True,
        may_provide=may_provide or [],
        provides=provides,
        tags=tags or [],
    )


def community_map(
    name: str,
    creator: str,
    difficulty: int = 4,
    streakable: bool = True,
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
# - Country maps with an avg. score over 20k have difficulty 2
# - Country maps with an avg. score of 15k-20k have difficulty 3
# - Country maps with an avg. score of 11k-15k have difficulty 4
# - Country maps with an avg. score of 8k-11k have difficulty 5
# - Country maps with an avg. score under 8k have difficulty 6
#
# Countries are tagged as "small" if they have fewer than 10k locations
# on their GeoGuessr official map.
OFFICIAL_MAPS: List[GeoGuessrMap] = [
    official_country("Albania", provides=["Europe"]),
    official_country("American Samoa", tags=["small"], provides=["Oceania"]),
    official_country("Andorra", tags=["small"], provides=["Europe"]),
    official_country(
        "Argentina", provides=["South America"], may_provide=[STOP["pare"]]
    ),
    official_country("Australia", provides=["Oceania"]),
    official_country("Austria", provides=["Europe"], difficulty=3),
    official_country("Bangladesh", provides=["Asia"], difficulty=5),
    official_country("Belgium", provides=["Europe"]),
    official_country("Bhutan", provides=["Asia"]),
    official_country("Bolivia", provides=["South America"]),
    official_country("Botswana", provides=["Africa"], difficulty=5),
    official_country("Brazil", provides=["South America"], may_provide=[STOP["pare"]]),
    official_country("Bulgaria", provides=["Europe"], may_provide=["Cyrillic letters"]),
    official_country(
        "Cambodia",
        difficulty=6,
        provides=["Asia"],
        may_provide=["Khmer letters (Cambodia)"],
    ),
    official_country("Canada", provides=["North America"]),
    official_country(
        "Chile", difficulty=3, provides=["South America"], may_provide=[STOP["pare"]]
    ),
    official_country(
        "Colombia", provides=["South America"], may_provide=[STOP["pare"]]
    ),
    official_country("Croatia", provides=["Europe"]),
    official_country(
        "Curacao", provides=["South America"], tags=["small"], difficulty=3
    ),
    official_country("Czech Republic", provides=["Europe"]),
    official_country("Denmark", provides=["Europe"]),
    official_country("Dominican Republic", provides=["North America"], tags=["small"]),
    official_country("Ecuador", provides=["South America"], may_provide=[STOP["pare"]]),
    official_country("Estonia", provides=["Europe"]),
    official_country("Eswatini", provides=["Africa"], tags=["small"]),
    official_country(
        "Faroe Islands", provides=["Europe"], tags=["small"], difficulty=3
    ),
    official_country("Finland", provides=["Europe"]),
    official_country("France", provides=["Europe"]),
    official_country("Germany", provides=["Europe"]),
    official_country("Ghana", provides=["Africa"], difficulty=5),
    official_country("Greece", provides=["Greek letters", "Europe"]),
    official_country(
        "Greenland", provides=["North America"], tags=["small"], difficulty=5
    ),
    official_country("Guam", provides=["Oceania"], tags=["small"], difficulty=3),
    official_country(
        "Guatemala", provides=["North America"], may_provide=[STOP["alto"]]
    ),
    official_country(
        "Hong Kong",
        difficulty=3,
        tags=["small"],
        provides=["Asia", "Chinese (Han) characters"],
    ),
    official_country("Hungary", provides=["Europe"]),
    official_country("Iceland", provides=["Europe"]),
    official_country(
        "India",
        provides=[
            "Asia",
            "Devanagari letters (India)",
            "Tamil letters (India and Sri Lanka)",
        ],
    ),
    official_country("Indonesia", provides=["Asia"]),
    official_country("Ireland", provides=["Europe"]),
    official_country("Isle of Man", provides=["Europe"], tags=["small"]),
    official_country("Israel", provides=["Asia", "Hebrew letters"]),
    official_country("Italy", provides=["Europe"]),
    official_country(
        "Japan",
        difficulty=3,
        provides=["Asia", "Japanese kana characters", "Chinese (Han) characters"],
    ),
    official_country("Jersey", provides=["Europe"], tags=["small"]),
    official_country(
        "Jordan",
        tags=["small"],
        difficulty=3,
        provides=["Asia", "Arabic letters"],
        may_provide=[STOP["qif"]],
    ),
    official_country(
        "Kazakhstan",
        tags=["small"],
        difficulty=6,
        provides=["Asia", "Cyrillic letters"],
    ),
    official_country("Kenya", provides=["Africa"]),
    official_country("Kyrgyzstan", provides=["Asia", "Cyrillic letters"]),
    official_country("Laos", tags=["small"], difficulty=3),
    official_country("Latvia", provides=["Europe"]),
    official_country("Lesotho", difficulty=5, provides=["Africa"]),
    # Lithuania should be 'small' by my definition, but that feels wrong
    official_country("Lithuania", difficulty=5, provides=["Europe"]),
    official_country("Madagascar", tags=["small"], provides=["Africa"]),
    official_country("Malaysia", provides=["Asia"], may_provide=[STOP["berhenti"]]),
    official_country("Malta", provides=["Europe"], tags=["small"]),
    official_country("Mexico", provides=["North America"], may_provide=[STOP["alto"]]),
    official_country("Mongolia", provides=["Asia"]),
    official_country("Montenegro", provides=["Europe"], tags=["small"]),
    official_country("Netherlands", provides=["Europe"], may_provide=["a canal"]),
    official_country("New Zealand", provides=["Oceania"]),
    official_country("Nigeria", provides=["Africa"]),
    official_country("North Macedonia", provides=["Europe"], tags=["small"]),
    official_country("Northern Mariana Islands", provides=["Oceania"], tags=["small"]),
    official_country("Norway", provides=["Europe"]),
    official_country(
        "Panama", difficulty=5, provides=["South America"], tags=["small"]
    ),
    official_country(
        "Peru", difficulty=5, provides=["South America"], may_provide=[STOP["pare"]]
    ),
    official_country("Philippines", provides=["Asia"], difficulty=5),
    official_country("Poland", provides=["Europe"], difficulty=5),
    official_country("Portugal", provides=["Europe"], difficulty=3),
    official_country("Puerto Rico", provides=["North America"], difficulty=3),
    official_country(
        "Qatar",
        difficulty=3,
        tags=["small"],
        provides=["Asia"],
        may_provide=["Arabic letters"],
    ),
    official_country("Romania", provides=["Europe"], difficulty=5),
    official_country(
        "Russia", difficulty=5, may_provide=["Cyrillic letters", STOP["ctop"]]
    ),
    official_country("Rwanda", provides=["Africa"], difficulty=3, tags=["small"]),
    official_country("Senegal", provides=["Africa"], difficulty=5),
    official_country("Serbia", provides=["Europe"], may_provide=["Cyrillic letters"]),
    official_country(
        "Singapore",
        difficulty=3,
        tags=["small"],
        provides=["Asia"],
        may_provide=["Chinese (Han) characters"],
    ),
    official_country("Slovakia", provides=["Europe"]),
    official_country("Slovenia", provides=["Europe"]),
    official_country("South Africa", provides=["Africa"], difficulty=5),
    official_country("South Korea", provides=["Asia", "Korean hangul characters"]),
    official_country("Spain"),
    official_country(
        "Sri Lanka",
        difficulty=5,
        provides=["Asia", "Sinhala letters (Sri Lanka)"],
        may_provide=["Tamil letters (India and Sri Lanka)"],
    ),
    official_country("Sweden", provides=["Europe"]),
    official_country("Switzerland", provides=["Europe"]),
    official_country(
        "Taiwan",
        provides=["Asia"],
        may_provide=["Chinese (Han) characters", STOP["ting"]],
    ),
    official_country(
        "Thailand", provides=["Asia"], may_provide=["Thai letters", STOP["yud"]]
    ),
    official_country(
        "Tunisia", provides=["Africa"], may_provide=["Arabic letters", STOP["qif"]]
    ),
    official_country("Türkiye", may_provide=[STOP["dur"]]),
    official_country("Uganda", provides=["Africa"], difficulty=3, tags=["small"]),
    official_country(
        "Ukraine", difficulty=5, provides=["Europe"], may_provide=["Cyrillic letters"]
    ),
    official_country(
        "United Arab Emirates",
        difficulty=3,
        tags=["small"],
        provides=["Africa"],
        may_provide=["Arabic letters", STOP["qif"]],
    ),
    official_country(
        "United Kingdom", provides=["Europe"], may_provide=["a roundabout"]
    ),
    official_country("United States", provides=["North America"]),
    official_country(
        "Uruguay", difficulty=5, provides=["South America"], may_provide=[STOP["pare"]]
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
        tags=["popular", "world"],
    ),
    "100_cities_canada": community_map(
        "100 largest cities of Canada",
        "Simi",
        difficulty=2,
        provides=["Canada"],
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
        tags=["theme", "world_region"],
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
        tags=["world_region"],
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
        tags=["arbitrary", "world_region"],
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
        tags=["arbitrary", "world_region"],
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
        tags=["arbitrary", "world_region"],
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
        tags=["arbitrary", "world_region"],
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
        tags=["arbitrary", "world_region"],
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
        tags=["arbitrary", "world_region"],
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
        difficulty=4,
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
        difficulty=4,
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
    "complete_world": community_map(
        "A Complete World",
        "MatePotato",
        difficulty=5,
        official_coverage=False,
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
        tags=["world_region"],
    ),
    "diverse_complete_world": community_map(
        "A Diverse Complete World",
        "MatePotato",
        difficulty=5,
        official_coverage=False,
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
    "equidistant_world": community_map(
        "An Equidistant World",
        "Teloso",
        difficulty=4,
        # Countries large enough to be commonly represented on this map.
        # Should be already included in the may_provide of other world maps, though.
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
        tags=["balanced", "world"],
    ),
    "extraordinary_cow": community_map(
        "An Extraordinary Cow",
        "KingMoo92",
        url="https://www.geoguessr.com/maps/60bb6eb49541670001e935ba",
        difficulty=5,
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
    "i_saw_sign": community_map(
        "I Saw the Sign 2.0",
        "Kirsike",
        difficulty=2,
        streakable=True,
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
    "thrilling_world": community_map(
        "A Thrilling World",
        "Zem",
        url="https://www.geoguessr.com/maps/634266c98f0f00a7e457f4e9",
        difficulty=3,
        streakable=True,
        tags=["world", "theme"],
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
