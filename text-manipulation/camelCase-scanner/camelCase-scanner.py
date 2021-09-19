import re
import shutil
from glob import glob
from typing import Match

dir_in = "tests"
dir_out = "tests-output"
unescaped_quote = re.compile(r'[^\\]"')


def word_is_inside_string(line: str, startInd: int, wordInd: int):
    firstQuoteInd = line.find('"', startInd)
    if(firstQuoteInd < 0):
        return False

    secondQuoteMatch = unescaped_quote.search(line, pos=firstQuoteInd+1)
    if(secondQuoteMatch == None):
        return False

    secondQuoteInd = secondQuoteMatch.endpos
    if firstQuoteInd < wordInd and wordInd < secondQuoteInd:
        return True

    return word_is_inside_string(line, secondQuoteInd+1, wordInd)


def to_snake_case(match: Match):
    return "_" + match.group(1).lower()


just_len = 15
for file in glob(dir_in + '/*.java'):
    print()
    print("File:".ljust(just_len) + file)

    file_out = dir_out + file.removeprefix(dir_in)
    print("File-out:".ljust(just_len) + file_out)
    with open(file) as file_in:
        line_num = 0
        any_matches = False
        with open(file_out, 'w') as file_out:
            for line in file_in:
                line_num += 1

                # matches camelCase variables
                matches = re.findall(
                    r"\b([$a-z0-9]+[A-Z][a-zA-Z0-9$]*)\b[^(]", line)
                if matches == []:
                    file_out.write(line)
                    continue

                any_matches = True
                words = "'" + ', '.join(matches) + "'"
                print(
                    f"Camel-case words detected in line {line_num}:   {words}")
                print(f"Line: '{line.strip()}'")
                print()

                # if match is in string
                for match in matches:
                    matchInd = line.index(match)
                    if word_is_inside_string(line, 0, matchInd):
                        continue

                    snake_case_match = re.sub(r"([A-Z])", to_snake_case, match)
                    line = line.replace(match, snake_case_match, 1)
                    print(line)

                file_out.write(line)

        if not any_matches:
            continue

        # ans = input("Do you want to replace these matches? (y/n): ")
        # if(ans == "n"):
        #     shutil.copyfile(file_in, file_out)
