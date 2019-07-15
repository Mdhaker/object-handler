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
/** return
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
let obj2 = {
   "key1":{
      "key11":{
         "key111":"foo",
         "key112":"baz",
         "key113" : {
             "key1131" : {"key11311":"value11311"}
         }
      }
};

aoh.deepAssign(obj,obj2);
/** return
{
   "key1":{
      "key11":{
         "key111":"foo",
         "key112":"baz",
         "key113" : {
             "key1131" : {"key11311":"value11311"}
         }
      },
      "key12":"lorem"
   },
   "key2":"value2",
   "key3":"value3"
};
**/

/** This is the key function to all the package **/

aoh.mapObject(obj);
/** return
{
   "key1.key11.key111":"foo",
   "key1.key11.key112":"bar",
    "key1.key12":"lorem",
    "key2":"value2",
    "key3":"value3"
};
**/
aoh.unMapObject(obj);
/**
return the same obj structure mentioned before
**/

```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JSON-LD.svg/512px-JSON-LD.svg.png
[npm-url]: https://www.npmjs.com/package/anonymous-object-handler
