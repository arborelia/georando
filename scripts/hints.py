import sys
import random


def is_good_item(item: str) -> bool:
    return False  # don't hint good items
    if "Trap" in item:
        return False
    if item == "More Time" or "+" in item:
        return False
    return True


def is_hint_line(line: str) -> bool:
    if line.startswith(" "):
        return False
    if "Start Inventory" in line or "Seed" in line or "__" in line:
        return False
    if len(line.strip()) <= 10:
        return False
    if "     " in line:
        return False
    loc, _, item = line.strip().partition(": ")
    if not loc or not item:
        return False
    return (
        "20k" in loc
        or is_good_item(item)
    )


def run(filename: str) -> None:
    with open(filename) as spoiler_file:
        hint_lines = [
            line.strip() for line in spoiler_file
            if is_hint_line(line)
        ]
        random.shuffle(hint_lines)
        for hint in hint_lines:
            print(hint)


if __name__ == "__main__":
    run(sys.argv[1])