# Snapshot report for `test\generated\commands\hlen.test.js`

The actual snapshot is saved in `hlen.test.js.snap`.

Generated by [AVA](https://ava.li).

## scripts/redis-doc/commands/hlen.md example 1

> Snapshot 1

    [
      'await handy.hset("myhash", "field1", "Hello")  => 1',
      'await handy.hset("myhash", "field2", "World")  => 1',
      'await handy.hlen("myhash")                     => 2',
    ]