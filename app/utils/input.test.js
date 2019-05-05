const { expect } = require("chai");
const { asyncPrompt, rl } = require("./input");

describe("asyncPrompt", () => {
  it("resolves with input provided by user", async () => {
    const input = "answer!";

    setTimeout(() => rl.write(input + "\r"), 0);
    const answer = await asyncPrompt("question? \n");

    expect(input).to.equal(answer);
  });
});
