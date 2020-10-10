import { createHandyClient } from "../../../src";
import { override } from "../../_manual-overrides2";

const client = createHandyClient();

beforeAll(async () => {
    await client.ping();
});

beforeEach(async () => {
    await client.flushall();
});

test("scripts/redis-doc/commands/setbit.md example 1", async () => {
    const outputs: Record<string, unknown> = {};

    outputs.r0 = await client.setbit("mykey", 7, 1);
    outputs.r1 = await client.setbit("mykey", 7, 0);
    outputs.r2 = await client.get("mykey");

    expect(override(outputs, __filename)).toMatchInlineSnapshot(`
        Object {
          "r0": 0,
          "r1": 1,
          "r2": " ",
        }
    `);
});
