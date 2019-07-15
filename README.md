# Object handler

> This package is made to handle JS objects without knowing their structure, you perform actions such assign, getting and setting values without knowing their paths.

[![1.1.1][npm-image]][npm-url]

## Install

```bash
npm i -S anonymous-object-handler
```

## Usage

```javascript
var aoh = require('anonymous-object-handler');
let obj = {
   "key1":{
      "key11":{
         "key111":"foo",
         "key112":"bar"
      },
      "key12":"lorem"
   },
   "key2":"value2",
   "key3":"value3"
};

aoh.getValueByPath(obj,"key1.key11.key112")  // returns "bar"
aoh.setValueBypath(obj,"key1.key11.key113.key1131","baz"); 
/**
{
   "key1":{
      "key11":{
         "key111":"foo",
         "key112":"bar",
         "key113" : {
             "key1131" : "baz"
         }
      },
      "key12":"lorem"
   },
   "key2":"value2",
   "key3":"value3"
};
**/


```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://www.npmjs.com/package/anonymous-object-handler
[travis-image]: https://img.shields.io/travis/live-js/live-xxx/master.svg
[travis-url]: https://travis-ci.org/live-js/live-xxx
[coveralls-image]: https://img.shields.io/coveralls/live-js/live-xxx/master.svg
[coveralls-url]: https://coveralls.io/r/live-js/live-xxx?branch=master
