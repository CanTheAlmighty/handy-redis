import { createHandyClient } from "../../../src";
import { override } from "../../_manual-overrides2";

const client = createHandyClient();

beforeAll(async () => {
    await client.ping();
});

beforeEach(async () => {
    await client.flushall();
});

test("scripts/redis-doc/commands/setrange.md example 1", async () => {
    const outputs: Record<string, unknown> = {};

    outputs.r0 = await client.set("key1", "Hello World");
    outputs.r1 = await client.setrange("key1", 6, "Redis");
    outputs.r2 = await client.get("key1");

    expect(override(outputs, __filename)).toMatchInlineSnapshot(`
        Object {
          "r0": "OK",
          "r1": 11,
          "r2": "Hello Redis",
        }
    `);
});

test("scripts/redis-doc/commands/setrange.md example 2", async () => {
    const outputs: Record<string, unknown> = {};

    outputs.r0 = await client.setrange("key2", 6, "Redis");
    outputs.r1 = await client.get("key2");

    expect(override(outputs, __filename)).toMatchInlineSnapshot(`
        Object {
          "r0": 11,
          "r1": "      Redis",
        }
    `);
});
