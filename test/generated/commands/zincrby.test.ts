import { createHandyClient } from "../../../src";
import { override } from "../../_manual-overrides2";

const client = createHandyClient();

beforeAll(async () => {
    await client.ping();
});

beforeEach(async () => {
    await client.flushall();
});

test("scripts/redis-doc/commands/zincrby.md example 1", async () => {
    const outputs: Record<string, unknown> = {};

    outputs.r0 = await client.zadd("myzset", [1, "one"]);
    outputs.r1 = await client.zadd("myzset", [2, "two"]);
    outputs.r2 = await client.zincrby("myzset", 2, "one");
    outputs.r3 = await client.zrange("myzset", 0, -1, "WITHSCORES");

    expect(override(outputs, __filename)).toMatchInlineSnapshot(`
        Object {
          "r0": 1,
          "r1": 1,
          "r2": "3",
          "r3": Array [
            "two",
            "2",
            "one",
            "3",
          ],
        }
    `);
});
