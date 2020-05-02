# simple-slugify

[![Build Status](https://travis-ci.org/up9cloud/simple-slugify.svg?branch=master)](https://travis-ci.org/up9cloud/simple-slugify)
[![Coverage Status](https://coveralls.io/repos/github/up9cloud/simple-slugify/badge.svg?branch=master)](https://coveralls.io/github/up9cloud/simple-slugify?branch=master)

Slugify a string, simply replace "Reserved characters", and "Unsafe characters" to "-".

## Usage

```js
const { slugify } = require('simple-slugify')
slugify('I ♥')
// i-♥
slugify('大好き ♥', '_')
// 大好き_♥
```

```html
<!-- browser side -->
<script src="https://unpkg.com/simple-slugify/dist/simple-slugify.min.js"></script>
<script>
  console.log(simpleSlugify.slugify('I ♥'))
</script>
```

## Options

```js
slugify(' A?#  b ')
// a---b
slugify(' A?#  b ', { space: false })
// a-- b
slugify(' A?#  b ', {
  lowercase: false,
  replacement: '_',
  trim: false,
  spaceLess: false,
  space: '-'
})
// -A__--b-
```

See more options and details at `./src/index.js` `const defaultOptions`

## Advanced Usage

```js
const { Slugify } = require('simple-slugify')
const s = new Slugify // memorize slug, make sure the returning slug is unique
s.slug('大好き ♥')
// 大好き-♥
s.slug('大好き ♥')
// 大好き-♥.1
s.reset()
s.slug('大好き ♥')
// 大好き-♥
s.slug('大好き ♥', { space: '_' }, '_')
// 大好き_♥
s.slug('大好き ♥', { space: '_' }, '_')
// 大好き_♥_1
s.slug('大好き ♥ 1', { space: '_' }, '_')
// 大好き_♥_1_1
```

```html
<!-- browser side -->
<script src="https://unpkg.com/simple-slugify/dist/simple-slugify.min.js"></script>
<script>
  var s = new simpleSlugify.Slugify()
  console.log(s.slug('I ♥'))
</script>
```

## Why

This lib focus on world wide human readable url, doesn't translate things to English. The non-english native people actually don't know too much English as programmers thought. So this lib converts characters only if necessary, only cover [reserved, unsafe characters](https://perishablepress.com/stop-using-unsafe-characters-in-urls/).

If you are looking for lib translating characters, please consider [https://github.com/simov/slugify](https://github.com/simov/slugify).
