import Boilerplate from "./../src/index.js";

describe("Boilerplate component", () => {
  test("adds 'str' and 'ing'", () => {
    const boilerplate = new Boilerplate();
    expect(boilerplate.add("str", "ing")).toBe("string");
  });
});
