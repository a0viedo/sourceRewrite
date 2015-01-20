# Source Rewrite

**Warning: this tool will delete your inline comments and spaces between lines of code.**


## Install

Execute `npm install source-rewrite -g` in your favourite shell.


## Rewrite your source code

Use the following convention to rewrite your JavaScript files:

```
sr -f file.js -i '  ' -q single
```

meaning that `file.js` will be overwritten with the new generated code with two spaces for indentation and using single quotes. The available options are:

- -f --file : Specify the input file 
- -i --indent : Specify the indentation of your choice
- -q --quotes : Specify the type of quotes you precise
- -o --output : Specify the output file of the generated code ( same as the input by default)
