from typing import List
from georando.checks import (
    CONTINENT_CHECKS,
    SIGHTINGS,
    ULTRA_RARE_CHECK,
    COUNTRY_CHECKS,
)
from georando.maps import COMMUNITY_MAPS, OFFICIAL_MAPS, GeoGuessrMap


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
    formatted = disjunction[0]
    for possibility in disjunction[1:]:
        formatted.append(
            {"or": possibility}
        )
    return formatted


def make_country_individual_goal(country: str, maps: list[GeoGuessrMap]) -> dict:
    categories = ["Correctly identify countries"]
    logic = []
    if country in maps:
        categories.append(country)
    for map in maps:
        if country in map.provides or country in map.may_provide:
            logic.append([map.name])

    return {
        "name": f"Identify {country}",
        "category": categories,
        "requires": format_logic(logic)
    }
