SETTINGS = {
    # This is used to identify a manual APWorld. If multiple people are playing different GeoGuessr runs,
    # the player_name needs to be different.
    "player_name": "arborelia",
    # How many official (country) maps to use. These maps are harder than most community maps.
    "num_official": 3,
    # How many community maps to use.
    "num_community": 12,
    # How many random maps to start with
    "num_starting_maps": 2,
    # Names of maps or countries you find easier, and which should be earlier in logic, because you're
    # particularly familiar with them. For example, you might want to put the country you live in here.
    "familiar": ["United States"],
    # Include streaks of 3/4/5 countries on a world map as checks?
    "streaks": False,
    # Official maps that should be in the pool.
    "guaranteed_official_maps": [],
    # Community maps that should be in the pool.
    "guaranteed_community_maps": [],
    # Should maps with relatively few locations, such as Andorra or Guam, be included in the official
    # map pool?
    "allow_small_official": True,
    # Should maps be allowed to include locations with photospheres or street cameras that aren't
    # operated by Google? The logic for these maps will never require you to have Move unlocked, because
    # Move doesn't work in most of these locations.
    "allow_unofficial_coverage": False,
    # This number changes the logic, and at the low end it also changes which maps are available.
    # Here's my estimation of what the skill levels mean:
    #
    #  1: I'm new to GeoGuessr -- easy maps and goals, start with Pan and Compass, get Zoom and Move early in the logic
    #  2: Include more maps, expected goals are mostly easy, start with Pan and Compass, get Zoom and Move early in the logic
    #  3: Include some hard maps, start with Pan, get Zoom and Move early in the logic
    #  4: Include most hard maps, with generous logic
    #  5: Default skill level. All maps included. arborelia's skill level that she designed the rando around
    #  6: I'd defeat arborelia (currently Gold 1) in a GeoGuessr duel
    #  7: I'm a GeoGuessr expert
    #  8: I'm a GeoGuessr expert and I want to suffer
    #  9: I'm a world class GeoGuessr player
    # 10: Just put everything conceivably possible in logic
    "skill_level": 5,
    # You get a Gold Medal for scoring 25k on a map, including boosts. The victory condition
    # is getting some number of them. Choose that number here.
    "medals_to_win": 5,
    # Maximum number of community maps that are allowed to have the "troll" tag.
    "max_troll": 0,
    # Maximum number of very easy maps (difficulty 1)
    "max_easy": 1,
}
