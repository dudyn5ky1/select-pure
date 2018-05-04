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
    const optionsWrapper = selectNode[0].querySelectorAll(".select-pure__options");
    expect(optionsWrapper.length).toBe(1);
    const options = optionsWrapper[0].querySelectorAll(".select-pure__option");
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
    const optionsWrapper = selectNode[0].querySelectorAll(".select-pure__options");
    expect(optionsWrapper.length).toBe(1);
    const options = optionsWrapper[0].querySelectorAll(".select-pure__option");
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

  test("toggles on click", () => {
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

    const selectNode = document.querySelector(".select-pure__select");

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(false);

    selectNode.click();

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(true);

    selectNode.click();

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(false);
  });

  test("closes on outside element click", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const targetSpan = document.createElement("span");
    document.body.appendChild(targetSpan);

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

    const selectNode = document.querySelector(".select-pure__select");

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(false);

    selectNode.click();

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(true);

    targetSpan.click();

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(false);
  });

  test("sets first option as selected when value is not provided", () => {
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

    const selectedOption = document.querySelectorAll(".select-pure__select .select-pure__label");
    expect(selectedOption.length).toBe(1);
    expect(selectedOption[0].textContent).toBe("Poland");

    const options = document.querySelectorAll(".select-pure__select .select-pure__option");
    expect(options[0].classList.contains("select-pure__option--selected")).toBe(true);
    expect(options[1].classList.contains("select-pure__option--selected")).toBe(false);
  });

  test("sets option when value is provided", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const select = new SelectPure(div, {
      options: [
        {
          label: "Poland",
          value: "PL",
        },
        {
          label: "Ukraine",
          value: "UA",
        },
      ],
      value: "UA",
    });

    const selectedOption = document.querySelectorAll(".select-pure__select .select-pure__label");
    expect(selectedOption.length).toBe(1);
    expect(selectedOption[0].textContent).toBe("Ukraine");

    const options = document.querySelectorAll(".select-pure__select .select-pure__option");
    expect(options[0].classList.contains("select-pure__option--selected")).toBe(false);
    expect(options[1].classList.contains("select-pure__option--selected")).toBe(true);
  });

  test("selects another value", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const select = new SelectPure(div, {
      options: [
        {
          label: "Poland",
          value: "PL",
        },
        {
          label: "Ukraine",
          value: "UA",
        },
      ],
      value: "UA",
    });

    const selectNode = document.querySelector(".select-pure__select");
    const options = document.querySelectorAll(".select-pure__select .select-pure__option");

    selectNode.click();

    options[0].click();

    expect(options[0].classList.contains("select-pure__option--selected")).toBe(true);
    expect(options[1].classList.contains("select-pure__option--selected")).toBe(false);
    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(false);
  });

  test("calls onChange callback on click", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const mockedOnChange = jest.fn();

    const select = new SelectPure(div, {
      options: [
        {
          label: "Poland",
          value: "PL",
        },
        {
          label: "Ukraine",
          value: "UA",
        },
      ],
      value: "UA",
      onChange: mockedOnChange,
    });

    const selectNode = document.querySelector(".select-pure__select");
    const options = document.querySelectorAll(".select-pure__select .select-pure__option");

    expect(mockedOnChange.mock.calls.length).toBe(0);

    selectNode.click();

    expect(mockedOnChange.mock.calls.length).toBe(0);

    options[0].click();

    expect(mockedOnChange.mock.calls.length).toBe(1);
    expect(mockedOnChange.mock.calls[0][0]).toBe("PL");
  });

  test("properly renderd multiselect", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const select = new SelectPure(div, {
      options: [
        {
          label: "New York",
          value: "NY",
        },
        {
          label: "Washington",
          value: "WA",
        },
        {
          label: "California",
          value: "CA",
        },
        {
          label: "New Jersey",
          value: "NJ",
        },
        {
          label: "North Carolina",
          value: "NC",
        },
      ],
      value: ["NY", "CA"],
      multiple: true,
    });

    const selectNode = document.querySelector(".select-pure__select");

    expect(selectNode.classList.contains("select-pure__select--multiple")).toBe(true);

    const options = document.querySelectorAll(".select-pure__select--multiple .select-pure__option");

    expect(options.length).toBe(5);

    expect(options[0].classList.contains("select-pure__option--selected")).toBe(true);
    expect(options[1].classList.contains("select-pure__option--selected")).toBe(false);
    expect(options[2].classList.contains("select-pure__option--selected")).toBe(true);
    expect(options[3].classList.contains("select-pure__option--selected")).toBe(false);
    expect(options[4].classList.contains("select-pure__option--selected")).toBe(false);

    const label = document.querySelector(".select-pure__select .select-pure__label");

    const selectedLabels = label.querySelectorAll(".select-pure__selected-label");

    expect(selectedLabels.length).toBe(2);

    expect(selectedLabels[0].textContent).toBe("New York");
    expect(selectedLabels[1].textContent).toBe("California");
  });
});
