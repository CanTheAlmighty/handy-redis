# handy-redis
A wrapper around [node_redis](https://npmjs.com/package/redis) with Promise and TypeScript support.

[![Build Status](https://travis-ci.org/mmkal/handy-redis.svg?branch=master)](https://travis-ci.org/mmkal/handy-redis)

## Why

[node_redis](https://npmjs.com/package/redis) doesn't support Promises out-of-the-box - you have to use bluebird's `promisifyAll`, which has the side effect of removing all TypeScript/intellisense support from the package.

This package is a wrapper around node_redis and exclusively uses Promises It publishes TypeScript types generated from the official redis documentation and examples, so it's much easier to know what parameters a command expects.

## Usage

```cli
npm install --save handy-redis
```

ES6/TypeScript:
```JavaScript
import { createHandyClient } from 'handy-redis';

(async function() {
    const client = createHandyClient();
    // or, call createHandyClient(opts) using opts for https://npmjs.com/package/redis
    // or, call createHandyClient(oldClient) where oldClient is an existing node_redis client.

    await client.set('foo', 'bar');
    const foo = await client.get('foo');
    console.log(foo);
})();
```

Vanilla JS:
```JavaScript
const handyRedis = require('handy-redis');

const client = handyRedis.createHandyClient();

client
    .set('foo', 'bar')
    .then(() => client.get('foo'))
    .then(foo => console.log(foo));
```

The package is published with TypeScript types, with the redis documentation and response type attached to each command:
![](./docs/intellisense.png)

## Development

Most of the package is generated by running sample commands from the redis documentation repo.

```cli
git clone https://github.com/mmkal/handy-redis --recursive
cd handy-redis
npm install
npm test
```

`npm test` triggers `npm run build` before running the tests - and the `build` script generates the client before using TypeScript to compile it.

If you cloned without `--recursive` you'll need to run `git submodule update --init` to get the redis-doc repo locally.

### Testing

If a snapshot test fails, it's possible it just needs to be updated. Make sure your git status is clean and run `npm test -- -u`.
