import SelectPure from "./../index.js";

const mockedClassNames = {
  select: "select",
  dropdownShown: "select-dropdownShown",
  multiselect: "select-multiselect",
  label: "select-label",
  placeholder: "select-placeholder",
  dropdown: "select-dropdown",
  option: "select-option",
  optionDisabled: "select-option__disabled",
  autocompleteInput: "select-autocomplete",
  selectedLabel: "select-selected-label",
  selectedOption: "select-selected-option",
  placeholderHidden: "select-placeholder",
  optionHidden: "select-option-hidden",
};

describe("SelectPure component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("basic", () => {
    it("renders select with options", () => {
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
        classNames: mockedClassNames,
      });

      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("renders select with disabled option", () => {
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
        classNames: mockedClassNames,
      });

      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("toggles on click", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);

      expect(selectNode).toMatchSnapshot();

      selectNode.click();

      expect(selectNode).toMatchSnapshot();

      selectNode.click();

      expect(selectNode).toMatchSnapshot();
    });

    it("closes on outside element click", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);

      expect(selectNode).toMatchSnapshot();

      selectNode.click();

      expect(selectNode).toMatchSnapshot();

      targetSpan.click();

      expect(selectNode).toMatchSnapshot();
    });

    it("displays placeholder when value is not provided", () => {
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
        classNames: mockedClassNames,
        placeholder: "placeholder text",
      });

      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("sets option when value is provided", () => {
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
        classNames: mockedClassNames,
      });

      expect(select.value()).toEqual("UA");
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("selects another value", () => {
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
        classNames: mockedClassNames,
      });

      expect(select.value()).toEqual("UA");

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      selectNode.click();

      options[0].click();

      expect(select.value()).toEqual("PL");
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("doesn't select disabled option", () => {
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
        value: "UA",
        classNames: mockedClassNames,
      });

      expect(select.value()).toEqual("UA");

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      selectNode.click();

      options[0].click();

      expect(select.value()).toEqual("UA");
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("calls onChange callback on click", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      expect(mockedOnChange.mock.calls.length).toBe(0);

      selectNode.click();

      expect(mockedOnChange.mock.calls.length).toBe(0);

      options[0].click();

      expect(mockedOnChange.mock.calls.length).toBe(1);
      expect(mockedOnChange.mock.calls[0][0]).toBe("PL");
    });

    it("sets position of dropdown according to the height of select", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );
      const dropdown = document.querySelector(`.${mockedClassNames.dropdown}`);

      selectNode.style.height = "24px";

      selectNode.click();

      expect(dropdown.style.top).toBe("");

      options[3].click();

      expect(window.getComputedStyle(dropdown).top).toBe("29px");
    });

    it("properly handles values as numbers", () => {
      const div = document.createElement("div");
      document.body.appendChild(div);

      const method = () => new SelectPure(div, {
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
        classNames: mockedClassNames,
      });

      expect(method).not.toThrow();

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);

      selectNode.click();

      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      expect(() => {
        options[0].click();
      }).not.toThrow();
    });

    it("doesn't throw an error when options are empty", () => {
      const div = document.createElement("div");
      document.body.appendChild(div);

      expect(() => {
        new SelectPure(div, {
          options: [],
        });
      }).not.toThrow();
    });

    it("resets selected value", () => {
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
        value: "NY",
        icon: "mocked-icon",
        classNames: mockedClassNames,
      });

      expect(select.value()).toEqual("NY");

      select.reset();

      expect(select.value()).toEqual(null);
      expect(document.body.innerHTML).toMatchSnapshot();
    });
  });

  describe("multiselect", () => {
    it("calls onChange callback on click when multiple is true", () => {
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
        multiple: true,
        onChange: mockedOnChange,
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      expect(mockedOnChange.mock.calls.length).toBe(0);

      selectNode.click();

      expect(mockedOnChange.mock.calls.length).toBe(0);

      options[0].click();

      expect(mockedOnChange.mock.calls.length).toBe(1);
      expect(mockedOnChange.mock.calls[0][0]).toEqual(["PL"]);
    });

    it("doesn't select disabled option", () => {
      const div = document.createElement("div");
      document.body.appendChild(div);

      const mockedOnChange = jest.fn();

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
        multiple: true,
        onChange: mockedOnChange,
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      expect(mockedOnChange.mock.calls.length).toBe(0);

      selectNode.click();

      expect(mockedOnChange.mock.calls.length).toBe(0);
      options[0].click();

      expect(mockedOnChange.mock.calls.length).toBe(0);
      expect(select.value()).toEqual();
    });

    it("properly renders", () => {
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
        classNames: mockedClassNames,
      });

      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("selects new option on click", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      selectNode.click();

      options[4].click();

      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("unselects new option on icon click", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      selectNode.click();
      options[4].click();

      expect(document.body.innerHTML).toMatchSnapshot();

      const label = document.querySelector(
        `.${mockedClassNames.select} .${mockedClassNames.label}`,
      );
      const selectedLabels = label.querySelectorAll(`.${mockedClassNames.selectedLabel}`);

      selectedLabels[0].querySelector("i").click();

      expect(document.body.innerHTML).toMatchSnapshot();

      selectedLabels[0].querySelector("i").click();

      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("properly renders with custom icon", () => {
      const div = document.createElement("div");
      document.body.appendChild(div);

      const inlineIcon = document.createElement("img");
      inlineIcon.src = "/icon.svg";
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
        ],
        value: ["NY", "CA"],
        multiple: true,
        inlineIcon,
        classNames: mockedClassNames,
      });

      expect(document.body.innerHTML).toMatchSnapshot();
    });
  });

  describe("autocomplete", () => {
    it("properly renders autocomplete select", () => {
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
        classNames: mockedClassNames,
      });

      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("doesn't close dropdown on input click", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const autocomplete = document.querySelector(
        `.${mockedClassNames.autocompleteInput}`,
      );

      selectNode.click();

      expect(selectNode).toMatchSnapshot();

      autocomplete.click();

      expect(selectNode).toMatchSnapshot();
    });

    it("focuses autocomplete input on dropdown opening", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const autocomplete = document.querySelector(
        `.${mockedClassNames.autocompleteInput}`,
      );
      const options = document.querySelectorAll(
        `.${mockedClassNames.select} .${mockedClassNames.option}`,
      );

      expect(document.activeElement).not.toEqual(autocomplete);

      selectNode.click();

      expect(document.activeElement).toEqual(autocomplete);

      options[1].click();

      selectNode.click();

      expect(document.activeElement).toEqual(autocomplete);
    });

    it("resets selected state", () => {
      const div = document.createElement("div");
      document.body.appendChild(div);

      const select = new SelectPure(div, {
        options: [
          {
            label: "New York",
            value: "NY",
          },
          {
            label: "California",
            value: "CA",
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
        classNames: mockedClassNames,
      });

      expect(select.value()).toEqual(["NY", "CA"]);

      select.reset();

      expect(select.value()).toEqual([]);
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("hides not matching options on input change", () => {
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
        classNames: mockedClassNames,
      });

      const selectNode = document.querySelector(`.${mockedClassNames.select}`);
      const autocomplete = document.querySelector(
        `.${mockedClassNames.autocompleteInput}`,
      );

      selectNode.click();

      const event = new MouseEvent("input", {
        bubbles: true,
        cancelable: true,
      });

      autocomplete.value = "new";
      autocomplete.dispatchEvent(event);

      expect(selectNode).toMatchSnapshot();

      autocomplete.value = "North";
      autocomplete.dispatchEvent(event);

      expect(selectNode).toMatchSnapshot();
    });
  });
});
