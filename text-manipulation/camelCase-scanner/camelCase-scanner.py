from glob import glob

dir_in = "tests"

for file in glob(dir_in + '/*.java'):
    print(file)
