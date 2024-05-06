# A half-baked idea of having checks that can be unlocked when you encounter a
# particular thing in your GeoGuessr run, with logic for where you're likely to
# encounter them.

STOP = {
    "alto": "a stop sign that says ALTO",
    "arret": "a stop sign that says ARRÊT",
    "berhenti": "a stop sign that says BERHENTI",
    "dur": "a stop sign that says DUR",
    "ctop": "a stop sign that says СТОП",  # I know my label sucks
    "jeongji": "a stop sign that says 정지 (jeongji)",
    "pare": "a stop sign that says PARE",
    "qif": "a stop sign that says قف (qif)",
    "ting": "a stop sign that says 停 (tíng)",
    "tomare": "a stop sign that says とまれ (tomare)",
    "yud": "a stop sign that says หยุด (yùd)",
}

EASY_SIGHTINGS = ["a flag", "a domain name", "a satellite dish", "Cyrillic letters"]


SIGHTINGS = (
    EASY_SIGHTINGS
    + [
        "a train",
        "a boat or ship",
        "a flag",
        "a domain name",
        "a bus",
        "a bicycle",
        "a rickshaw",
        "a dog",
        "a cow",
        "a horse",
        "a national border",
        "an airport",
        "a metro/subway/light rail station",
        "a museum",
        "a mural",
        "a roundabout",
        "a river",
        "a canal",
        "a tunnel",
        "a map",
        "snow",
        "corn (maize)",
        "rice",
        "a satellite dish",
        "a bollard with a red reflector",
        "the Google car's reflection",
        "a US interstate sign",
        "a European E route sign",
        "an A road sign",
        "an M road sign",
        "an N road sign",
        "the trans-Canada highway",
        "an M-PESA shop",
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
        "Google coverage in an ULTRA RARE country",
    ]
    + list(STOP.keys())
)
