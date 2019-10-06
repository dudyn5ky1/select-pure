import SelectPure from "./../src/index.js";

describe("SelectPure component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("renders select with options", () => {
    const div = document.createElement("div");
    div.classList.add("my-div");
    document.body.appendChild(div);

    new SelectPure(".my-div", {
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
    // eslint-disable-next-line no-magic-numbers
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

    new SelectPure(div, {
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
    // eslint-disable-next-line no-magic-numbers
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

    new SelectPure(div, {
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

    new SelectPure(div, {
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

    new SelectPure(div, {
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

    new SelectPure(div, {
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

    new SelectPure(div, {
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

    new SelectPure(div, {
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

  test("calls onChange callback on click when multiple is true", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const mockedOnChange = jest.fn();

    new SelectPure(div, {
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
      value: ["UA"],
      multiple: true,
      onChange: mockedOnChange,
    });

    const selectNode = document.querySelector(".select-pure__select");
    const options = document.querySelectorAll(".select-pure__select .select-pure__option");

    expect(mockedOnChange.mock.calls.length).toBe(0);

    selectNode.click();

    expect(mockedOnChange.mock.calls.length).toBe(0);

    options[0].click();

    expect(mockedOnChange.mock.calls.length).toBe(1);
    expect(mockedOnChange.mock.calls[0][0]).toEqual(["UA", "PL"]);
  });

  test("properly renderd multiselect", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    new SelectPure(div, {
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
      icon: "mocked-icon",
    });

    const selectNode = document.querySelector(".select-pure__select");

    expect(selectNode.classList.contains("select-pure__select--multiple")).toBe(true);

    const options = document.querySelectorAll(".select-pure__select--multiple .select-pure__option");

    // eslint-disable-next-line no-magic-numbers
    expect(options.length).toBe(5);

    expect(options[0].classList.contains("select-pure__option--selected")).toBe(true);
    expect(options[1].classList.contains("select-pure__option--selected")).toBe(false);
    expect(options[2].classList.contains("select-pure__option--selected")).toBe(true);
    expect(options[3].classList.contains("select-pure__option--selected")).toBe(false);
    expect(options[4].classList.contains("select-pure__option--selected")).toBe(false);

    const label = document.querySelector(".select-pure__select .select-pure__label");

    const selectedLabels = label.querySelectorAll(".select-pure__selected-label");

    // eslint-disable-next-line no-magic-numbers
    expect(selectedLabels.length).toBe(2);

    const label0 = selectedLabels[0];
    expect(label0.textContent).toBe("New York");

    const icon0 = label0.querySelectorAll("i");
    expect(icon0.length).toBe(1);
    expect(icon0[0].classList.contains("mocked-icon")).toBe(true);

    const label1 = selectedLabels[1];
    expect(label1.textContent).toBe("California");

    const icon1 = label1.querySelectorAll("i");
    expect(icon1.length).toBe(1);
    expect(icon1[0].classList.contains("mocked-icon")).toBe(true);
  });

  test("selects new option on click (multiselect)", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    new SelectPure(div, {
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
      value: ["NY"],
      multiple: true,
      icon: "mocked-icon",
    });

    const selectNode = document.querySelector(".select-pure__select");

    const options = document.querySelectorAll(".select-pure__select--multiple .select-pure__option");

    selectNode.click();

    options[4].click();

    const label = document.querySelector(".select-pure__select .select-pure__label");

    const selectedLabels = label.querySelectorAll(".select-pure__selected-label");

    // eslint-disable-next-line no-magic-numbers
    expect(selectedLabels.length).toBe(2);

    const label0 = selectedLabels[0];
    expect(label0.textContent).toBe("New York");

    const icon0 = label0.querySelectorAll("i");
    expect(icon0.length).toBe(1);
    expect(icon0[0].classList.contains("mocked-icon")).toBe(true);

    const label1 = selectedLabels[1];
    expect(label1.textContent).toBe("North Carolina");

    const icon1 = label1.querySelectorAll("i");
    expect(icon1.length).toBe(1);
    expect(icon1[0].classList.contains("mocked-icon")).toBe(true);
  });

  test("sets position of dropdown according to the height of select", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    new SelectPure(div, {
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
      value: ["NY"],
      multiple: true,
      icon: "mocked-icon",
    });

    const selectNode = document.querySelector(".select-pure__select");
    const options = document.querySelectorAll(".select-pure__select--multiple .select-pure__option");
    const dropdown = document.querySelector(".select-pure__options");

    selectNode.style.height = "24px";

    selectNode.click();

    expect(dropdown.style.top).toBe("");

    options[3].click();

    expect(window.getComputedStyle(dropdown).top).toBe("29px");
  });

  test("unselects new option on icon click (multiselect)", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    new SelectPure(div, {
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
      value: ["NY"],
      multiple: true,
      icon: "mocked-icon",
    });

    const selectNode = document.querySelector(".select-pure__select");

    const options = document.querySelectorAll(".select-pure__select--multiple .select-pure__option");

    selectNode.click();

    options[4].click();

    const label = document.querySelector(".select-pure__select .select-pure__label");

    let selectedLabels = label.querySelectorAll(".select-pure__selected-label");

    // eslint-disable-next-line no-magic-numbers
    expect(selectedLabels.length).toBe(2);

    selectedLabels[0].querySelector("i").click();

    selectedLabels = label.querySelectorAll(".select-pure__selected-label");

    expect(selectedLabels.length).toBe(1);
    expect(selectedLabels[0].textContent).toBe("North Carolina");

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(false);

    selectedLabels[0].querySelector("i").click();

    selectedLabels = label.querySelectorAll(".select-pure__selected-label");

    expect(selectedLabels.length).toBe(0);

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(false);
  });

  test("properly renderd autocomplete select", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    new SelectPure(div, {
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
      autocomplete: true,
      icon: "mocked-icon",
    });

    const selectNode = document.querySelector(".select-pure__select");

    expect(selectNode.classList.contains("select-pure__select--multiple")).toBe(true);

    const options = document.querySelectorAll(".select-pure__select--multiple .select-pure__option");

    // eslint-disable-next-line no-magic-numbers
    expect(options.length).toBe(5);

    const autocomplete = document.querySelectorAll(".select-pure__select--multiple .select-pure__options input");

    expect(autocomplete.length).toBe(1);
    expect(autocomplete[0].classList.contains("select-pure__autocomplete")).toBe(true);
  });

  test("doesn't close dropdown on input click", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    new SelectPure(div, {
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
      autocomplete: true,
      icon: "mocked-icon",
    });

    const selectNode = document.querySelector(".select-pure__select");
    const autocomplete = document.querySelector(".select-pure__select--multiple .select-pure__options input");

    selectNode.click();

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(true);

    autocomplete.click();

    expect(selectNode.classList.contains("select-pure__select--opened")).toBe(true);
  });

  test("focuses autocomplete input on dropdown opening", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    new SelectPure(div, {
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
      autocomplete: true,
      icon: "mocked-icon",
    });

    const selectNode = document.querySelector(".select-pure__select");
    const autocomplete = document.querySelector(".select-pure__select--multiple .select-pure__options input");
    const options = document.querySelectorAll(".select-pure__select--multiple .select-pure__option");

    expect(document.activeElement).not.toEqual(autocomplete);

    selectNode.click();

    expect(document.activeElement).toEqual(autocomplete);

    options[1].click();

    selectNode.click();

    expect(document.activeElement).toEqual(autocomplete);
  });

  test("hides not matching options on input change", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    new SelectPure(div, {
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
      autocomplete: true,
      icon: "mocked-icon",
    });

    const selectNode = document.querySelector(".select-pure__select");
    const autocomplete = document.querySelector(".select-pure__select--multiple .select-pure__options input");

    selectNode.click();

    const event = new MouseEvent("input", {
      bubbles: true,
      cancelable: true,
    });

    autocomplete.value = "new";
    autocomplete.dispatchEvent(event);

    let hiddenOptions = document.querySelectorAll(".select-pure__select--multiple .select-pure__option--hidden");

    // eslint-disable-next-line no-magic-numbers
    expect(hiddenOptions.length).toEqual(3);
    expect(hiddenOptions[0].textContent).toBe("Washington");
    expect(hiddenOptions[1].textContent).toBe("California");
    expect(hiddenOptions[2].textContent).toBe("North Carolina");

    autocomplete.value = "North";
    autocomplete.dispatchEvent(event);

    hiddenOptions = document.querySelectorAll(".select-pure__select--multiple .select-pure__option--hidden");

    // eslint-disable-next-line no-magic-numbers
    expect(hiddenOptions.length).toEqual(4);
    expect(hiddenOptions[0].textContent).toBe("New York");
    expect(hiddenOptions[1].textContent).toBe("Washington");
    expect(hiddenOptions[2].textContent).toBe("California");
    expect(hiddenOptions[3].textContent).toBe("New Jersey");
  });

  test("properly handles values as numbers", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    expect(() => {
      new SelectPure(div, {
        options: [
          {
            label: "New York",
            value: 1,
          },
          {
            label: "Washington",
            value: 2,
          },
        ],
      });
    }).not.toThrow();

    const selectNode = document.querySelector(".select-pure__select");

    selectNode.click();

    const options = document.querySelectorAll(".select-pure__select .select-pure__option");

    expect(() => {
      options[0].click();
    }).not.toThrow();
  });

  test("doesn't throw an error when options are empty", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    expect(() => {
      new SelectPure(div, {
        options: [],
      });
    }).not.toThrow();
  });
});
