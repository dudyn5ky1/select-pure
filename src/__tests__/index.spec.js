import SelectPure from "./../index.js";

describe("SelectPure V2", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("Initial", () => {
    expect(SelectPure).toBeDefined();
  });
});
