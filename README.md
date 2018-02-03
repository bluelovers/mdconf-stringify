# mdconf-stringify

> stringify data to markdown/mdconf style

`npm install mdconf-stringify`

## demo

### Mdconf.stringify

```js
var stringify = require("node-novel-info");
var moment = require("moment");
console.log(stringify({
	novel: {
		test: true,
	},

	options: {

		textlayout: {
			lf: true,
		},

		data: moment(),

	}
}));
```

#### output

```markdown
#novel

- test: true

#options

- data: 2018-02-04T02:48:24+08:00

##textlayout

- lf: true
```

## links

- [node-novel-info](https://www.npmjs.com/package/node-novel-info)
- [mdconf2](https://www.npmjs.com/package/mdconf2)
- [mdconf-stringify](https://www.npmjs.com/package/mdconf-stringify)

