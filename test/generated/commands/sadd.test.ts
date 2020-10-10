import { createHandyClient } from "../../../src";
import { override } from "../../_manual-overrides2";

const client = createHandyClient();

beforeAll(async () => {
    await client.ping();
});

beforeEach(async () => {
    await client.flushall();
});

test("scripts/redis-doc/commands/sadd.md example 1", async () => {
    const outputs: Record<string, unknown> = {};

    outputs.r0 = await client.sadd("myset", "Hello");
    outputs.r1 = await client.sadd("myset", "World");
    outputs.r2 = await client.sadd("myset", "World");
    outputs.r3 = await client.smembers("myset");

    expect(override(outputs, __filename)).toMatchInlineSnapshot(`
        Object {
          "r0": 1,
          "r1": 1,
          "r2": 0,
          "r3": "sortArrays => [ 'Hello', 'World' ]",
        }
    `);
});
