## Grammar.cf

The `grammar.cf` file contains bnf grammar for time syntax parsing.

Supported examples: "4pm", "7:38pm", "23:42", "3:16", "3:16am".

Playground link:
[bnfplayground.pauliankline.com/...](
https://bnfplayground.pauliankline.com/?bnf=%3Ctime%3E%20%3A%3A%3D%20%20%3Chour12%3E%20%22%3A%22%20%3Cminute%3E%20%3Cperiod_abbr%3E%20%0A%09%09%09%7C%20%3Chour24%3E%20%22%3A%22%20%3Cminute%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%7C%20%3Chour12%3E%20%3Cperiod_abbr%3E%0A%3Chour12%3E%20%3A%3A%3D%20(%221%22%20%5B0-2%5D)%20%7C%20(%220%22%20%3Cdigit%3E)%20%20%20%7C%20%3Cdigit%3E%0A%3Chour24%3E%20%3A%3A%3D%20(%222%22%20%5B0-3%5D)%20%7C%20(%5B0-1%5D%20%3Cdigit%3E)%20%7C%20%3Cdigit%3E%20%0A%3Cminute%3E%20%3A%3A%3D%20(%5B0-5%5D%20%3Cdigit%3E)%0A%3Cdigit%3E%20%20%3A%3A%3D%20%5B0-9%5D%0A%3Cperiod_abbr%3E%20%3A%3A%3D%20%22am%22%20%7C%20%22pm%22&name=Time%20grammar)


## Parser.pegjs


The `Parser.cf` file contains parser for bnf-grammar for time syntax parsing.
It returns number of minutes passed since midnight.

Check at: [pegjs.org](https://pegjs.org/online)
