# complex check names that we should not have to repeat
ULTRA_RARE_CHECK = "Correctly identify an ULTRA RARE country"


CONTINENT_CHECKS = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "Oceania",
    "South America",
]


# Countries with over 1000 locations on ACW. In these locations, "get a correct
# location in this country" is a sphere 1 check, in logic from the start.
COUNTRY_CHECKS_VERY_COMMON = [
    "Argentina",
    "Australia",
    "Bolivia",
    "Brazil",
    "Cambodia",
    "Canada",
    "Chile",
    "Colombia",
    "Ecuador",
    "Finland",
    "France",
    "Germany",
    "Ghana",
    "Greece",
    "India",
    "Indonesia",
    "Italy",
    "Japan",
    "Kenya",
    "Malaysia",
    "Mexico",
    "New Zealand",
    "Norway",
    "Peru",
    "Philippines",
    "Poland",
    "Romania",
    "Russia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Thailand",
    "Türkiye",
    "Ukraine",
    "United Kingdom",
    "United States",
]

# Countries with over 400 locations on ACW. If you get a regional map (like a
# continent map) that contains these countries, they're in logic.

COUNTRY_CHECKS_COMMON = [
    "Albania",
    "Austria",
    "Bangladesh",
    "Belgium",
    "Bhutan",
    "Botswana",
    "Bulgaria",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Guatemala",
    "Hungary",
    "Iceland",
    "Ireland",
    "Israel",
    "Jordan",
    "Kyrgyzstan",
    "Latvia",
    "Lithuania",
    "Netherlands",
    "Nigeria",
    "Portugal",
    "Senegal",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Sri Lanka",
    "Switzerland",
    "Taiwan",
    "Tunisia",
    "United Arab Emirates",
    "Uruguay",
]

# Countries with 100-399 locations on ACW. Most likely, you get these by being
# given a map specific to the country. You could also get a specific regional
# map, such as North Sea countries, that puts some of these in logic.
COUNTRY_CHECKS_RARE = [
    "Andorra",
    "Curaçao",
    "Dominican Republic",
    "Eswatini",
    "Faroe Islands",
    "Greenland",
    "Hong Kong",
    "Isle of Man",
    "Kazakhstan",
    "Laos",
    "Lesotho",
    "Luxembourg",
    "Malta",
    "Mongolia",
    "Montenegro",
    "North Macedonia",
    "Panama",
    "Puerto Rico",
    "Qatar",
    "Réunion",
    "Rwanda",
    "San Marino",
    "Singapore",
    "Uganda",
    "United States Virgin Islands",
    "West Bank",
]

COUNTRY_CHECKS = (
    COUNTRY_CHECKS_VERY_COMMON + COUNTRY_CHECKS_COMMON + COUNTRY_CHECKS_RARE
)

# Countries with _fewer than 100_ locations on ACW. These are not individual checks.
# You can claim the "Ultra Rare Country" check for getting any one of them.
COUNTRY_CHECKS_ULTRA_RARE = [
    "American Samoa",
    "Angola",  # future coverage
    "Antarctica",
    "Belarus",
    "Bermuda",
    "Bosnia",  # future coverage
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Costa Rica",
    "Egypt",
    "Gibraltar",
    "Golan Heights",
    "Guam",
    "Guyana",
    "Jersey",
    "Lebanon",
    "Liechtenstein",
    "Macau",
    "Madagascar",
    "Mali",
    "Martinique",
    "Monaco",
    "Myanmar",
    "Nepal",
    "Northern Mariana Islands",
    "Pakistan",
    "Paraguay",
    "Pitcairn Islands",
    "Somalia",  # future coverage
    "South Georgia and the South Sandwich Islands",
    "Tanzania",
    "The Gambia",
    "United States Minor Outlying Islands",
    "Vanuatu",
    "Venezuela",
]


MAP_GOALS = [
    {"name": "3k location", "difficulty": 0},
    {"name": "4k location", "difficulty": 1},
    {"name": "4.5k location", "difficulty": 3},
    {"name": "5k location", "difficulty": 7},
    {"name": "3 country streak", "difficulty": 3},
    {"name": "4 country streak", "difficulty": 6},
    {"name": "5 country streak", "difficulty": 7},
    {"name": "5k round", "difficulty": 1},
    {"name": "7.5k round", "difficulty": 2},
    {"name": "10k round", "difficulty": 3},
    {"name": "12.5k round", "difficulty": 4},
    {"name": "15k round", "difficulty": 5},
    {"name": "17.5k round", "difficulty": 6},
    {"name": "20k round", "difficulty": 7},
    {"name": "22.5k round", "difficulty": 8},
]

CONTINENT_GOALS = [
    {"name": "5k total within", "difficulty": 1},
    {"name": "7.5k total within", "difficulty": 2},
    {"name": "10k total within", "difficulty": 3},
    {"name": "12.5k total within", "difficulty": 4},
    {"name": "15k total within", "difficulty": 5},
    {"name": "17.5k total within", "difficulty": 6},
    {"name": "20k total within", "difficulty": 7},
]
