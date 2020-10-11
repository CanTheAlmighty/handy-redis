import { createHandyClient } from "../../../src";
import { override } from "../../_manual-overrides2";

const client = createHandyClient();

beforeAll(async () => {
    await client.ping();
});

beforeEach(async () => {
    await client.flushall();
});

test("scripts/redis-doc/commands/lpos.md example 1", async () => {
    const outputs: Record<string, unknown> = {};

    outputs.r0 = await client.rpush("mylist", "a", "b", "c", "d", "1", "2", "3", "4", "3", "3", "3");
    outputs.r1 = await client.lpos("mylist", "3");
    outputs.r2 = await client.lpos("mylist", "3", ["RANK", 2], ["COUNT", 0]);

    expect(override(outputs, __filename)).toMatchInlineSnapshot();
});