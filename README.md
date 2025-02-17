# glossary

glossary is a JavaScript module that extracts keywords from text (aka "term extraction" or "auto tagging"). It takes a string of text and returns an array of terms that are relevant to the content:

```javascript
var glossary = require("glossary");

var keywords = glossary.extract("Her cake shop is the best in the business");

console.log(keywords)  // ["cake", "shop", "cake shop", "business"]
```

`glossary` is standalone and uses part-of-speech analysis to extract the relevant terms.


# API

#### blacklisting

Use `blacklist` to remove unwanted terms from any extraction:

```javascript
var glossary = require("glossary")({
   blacklist: ["library", "script", "api", "function"]
});

var keywords = glossary.extract("JavaScript color conversion library");

console.log(keywords); // ["color", "conversion"]
```

#### blacklisting with Regular Exprssions

Use `regExs` to remove unwanted terms from any extraction:

```javascript
var glossary = require("glossary")({
   regExs: [/(^|\s)@(\w+)/g , /(^|\s)#(\w+)/g]
});

var keywords = glossary.extract("#JavaScript color conversion @library");

console.log(keywords); // ["color", "conversion"]
```

#### minimum frequency

Use `minFreq` to limit the terms to only those that occur with a certain frequency:

```javascript
var glossary = require("glossary")({ minFreq: 2 });

var keywords = glossary.extract("Kasey's pears are the best pears in Canada");

console.log(keywords); // ["pears"]
```

#### sub-terms

Use `collapse` to remove terms that are sub-terms of other terms:

```javascript
var glossary = require("glossary")({ collapse: true });

var keywords = glossary.extract("The Middle East crisis is getting worse");

console.log(keywords); // ["Middle East crisis"]
```

#### verbose output

Use `verbose` to also get the count of each term:

```javascript
var glossary = require("./glossary")({ verbose: true });

var keywords = glossary.extract("The pears from the farm are good");

console.log(keywords); // [ { word: 'pears', count: 1 }, { word: 'farm', count: 1 } ]
```

#### change options per extraction

You can also pass options as a second parameter to the extract function. 

```javascript
var glossary = require("./glossary");

var keywords = glossary.extract("The pears from the farm are good",{ verbose: true });

console.log(keywords); // [ { word: 'pears', count: 1 }, { word: 'farm', count: 1 } ]
```

# Keywords
This is just a little extension it add language detection via [node-language-detect](https://github.com/FGRibreau/node-language-detect) 
and filters out some stopwords (from [ranks.nl](http://www.ranks.nl/resources/stopwords.html) ) 
to improve non English results. 

```javascript
var keywords = require("./keywords");

var terms = keywords.extract("Die letzten paar Auswertungen der Evaluationen finden statt und werden eingearbeitet");

console.log(terms); // { terms: [ 'Auswertungen','Evaluationen','Die letzten paar Auswertungen der Evaluationen finden statt', 'eingearbeitet' ], language: 'german' }

//instead of [ 'Die', 'letzten', 'paar', 'Auswertungen', 'der', 'Evaluationen', 'finden', 'statt', 'Die letzten paar Auswertungen der Evaluationen finden statt', 'werden', 'eingearbeitet' ]
```

# propers

`glossary` Uses [jspos](http://code.google.com/p/jspos/) for POS tagging. It's inspired by the python module [topia.termextract](http://pypi.python.org/pypi/topia.termextract/).


