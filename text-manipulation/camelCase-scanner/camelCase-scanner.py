import re
from glob import glob

dir_in = "tests"

for file in glob(dir_in + '/*.java'):
    print("\n" + file)
    with open(file) as file_in:
        line_num = 0
        for line in file_in:
            line_num += 1
            matches = re.findall(" ([$a-z0-9]+[A-Z][a-zA-Z0-9$]*)", line)
            if matches == []:
                continue

            words = "'" + ', '.join(matches) + "'"
            print(
                f"Camel-case words detected in line {line_num}:   {words}")
            print(f"Line: '{line.strip()}'")
            print()
