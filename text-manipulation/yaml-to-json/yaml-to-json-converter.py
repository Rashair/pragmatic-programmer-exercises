import json
from os import listdir, name, path

from ruamel.yaml import YAML

dir_in = "./yaml-files"
dir_out = "./json-files"

curr_file = None

yaml = YAML(typ='safe')

for file in listdir(dir_in):
    print(file)
    with open(path.join(dir_in, file)) as file_in:
        file = file.removesuffix("yaml") + "json"
        curr_file = open(path.join(dir_out, file), 'w')
        yaml_obj = yaml.load(file_in)

        print(json.dumps(yaml_obj, indent=4), file=curr_file)

        curr_file.close()
