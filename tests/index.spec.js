import SelectPure from "./../src/index.js";

describe("SelectPure component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("renders select with options", () => {
    const div = document.createElement("div");
    div.classList.add("my-div");
    document.body.appendChild(div);

    const select = new SelectPure(".my-div", {
      options: [
        {
          label: "Ukraine",
          value: "UA",
          disabled: true,
        },
        {
          label: "Poland",
          value: "PL",
        },
      ],
    });

    const selectNode = document.querySelectorAll(".select-pure__select");
    expect(selectNode.length).toBe(1);
    const options = selectNode[0].querySelectorAll(".select-pure__option");
    expect(options.length).toBe(2);
    const option0 = options[0];
    expect(option0.textContent).toEqual("Ukraine");
    expect(option0.getAttribute("data-value")).toBe("UA");
    expect(option0.getAttribute("data-disabled")).toBe("true");
    const option1 = options[1];
    expect(option1.textContent).toEqual("Poland");
    expect(option1.getAttribute("data-value")).toBe("PL");
    expect(option1.getAttribute("data-disabled")).toBe(null);
  });

  test("renders select with options", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const select = new SelectPure(div, {
      options: [
        {
          label: "Poland",
          value: "PL",
          disabled: true,
        },
        {
          label: "Ukraine",
          value: "UA",
        },
      ],
    });

    const selectNode = document.querySelectorAll(".select-pure__select");
    expect(selectNode.length).toBe(1);
    const options = selectNode[0].querySelectorAll(".select-pure__option");
    expect(options.length).toBe(2);
    const option0 = options[0];
    expect(option0.textContent).toEqual("Poland");
    expect(option0.getAttribute("data-value")).toBe("PL");
    expect(option0.getAttribute("data-disabled")).toBe("true");
    const option1 = options[1];
    expect(option1.textContent).toEqual("Ukraine");
    expect(option1.getAttribute("data-value")).toBe("UA");
    expect(option1.getAttribute("data-disabled")).toBe(null);
  });
});
