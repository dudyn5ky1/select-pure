import Boilerplate from "./../src/index.js";

describe("Boilerplate component", () => {
  test("adds 1 and 2", () => {
    const boilerplate = new Boilerplate();
    expect(boilerplate.add(1, 2)).toBe(3);
  });
});
