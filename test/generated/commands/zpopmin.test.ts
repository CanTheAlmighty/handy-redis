import { createHandyClient } from "../../../src";
import { override } from "../../_manual-overrides2";

const client = createHandyClient();

beforeAll(async () => {
    await client.ping();
});

beforeEach(async () => {
    await client.flushall();
});

test("scripts/redis-doc/commands/zpopmin.md example 1", async () => {
    const outputs: Record<string, unknown> = {};

    outputs.r0 = await client.zadd("myzset", [1, "one"]);
    outputs.r1 = await client.zadd("myzset", [2, "two"]);
    outputs.r2 = await client.zadd("myzset", [3, "three"]);
    outputs.r3 = await client.zpopmin("myzset");

    expect(override(outputs, __filename)).toMatchInlineSnapshot(`
        Object {
          "r0": 1,
          "r1": 1,
          "r2": 1,
          "r3": Array [
            "one",
            "1",
          ],
        }
    `);
});
