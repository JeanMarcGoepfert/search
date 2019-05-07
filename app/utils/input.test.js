const { expect } = require("chai");
const sinon = require("sinon");
const { exitablePrompt, rl } = require("./input");

describe("exitablePrompt", () => {
  before(() => {
    sinon.stub(process, "exit");
  });

  after(() => {
    process.exit.restore();
  });

  it("resolves with input provided by user", async () => {
    const input = "answer!";

    setTimeout(() => rl.write(input + "\r"), 0);

    const answer = await exitablePrompt("question? \n");

    expect(input).to.equal(answer);
  });

  it("trims the user input", async () => {
    const input = "answer!";

    setTimeout(() => rl.write(" " + input + " " + "\r"), 0);

    const answer = await exitablePrompt("question? \n");

    expect(input).to.equal(answer);
  });

  it("should exit on exit on exit command", async () => {
    setTimeout(() => rl.write("exit" + "\r"), 0);

    await exitablePrompt("question? \n");

    expect(process.exit.called).to.be.true;
  });
});
