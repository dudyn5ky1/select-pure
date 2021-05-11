import "./../Option";
import { OptionPureElement } from "./../../models";

describe("Option component", () => {
  describe("render", () => {
    it("renders option", async() => {
      document.body.innerHTML = "<option-pure value='UA'>Ukraine</option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;

      await option.updateComplete;

      expect(option.shadowRoot?.querySelector(".option")?.textContent?.trim()).toEqual("Ukraine");
      expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option");
      expect(option.shadowRoot?.querySelector(".option")?.getAttribute("tabindex")).toEqual("0");
    });

    it("renders with label as an attribute", async() => {
      document.body.innerHTML = "<option-pure value='PL' label='Poland'></option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;

      await option.updateComplete;

      expect(option.shadowRoot?.querySelector(".option")?.textContent?.trim()).toEqual("Poland");
      expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option");
    });

    it("renders disabled", async() => {
      document.body.innerHTML = "<option-pure value='PL' label='Poland' disabled></option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;
      const mockedOnSelect = jest.fn();

      option.setOnSelectCallback(mockedOnSelect);

      await option.updateComplete;

      expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option disabled");
      expect(option.shadowRoot?.querySelector(".option")?.getAttribute("tabindex")).toEqual(null);

      const optionDiv = option.shadowRoot?.querySelector(".option");

      optionDiv?.dispatchEvent(new Event("click"));

      expect(mockedOnSelect).not.toHaveBeenCalled();
    });

    it("renders selected", async() => {
      document.body.innerHTML = "<option-pure value='PL' label='Poland' disabled selected></option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;
      const mockedOnSelect = jest.fn();

      option.setOnSelectCallback(mockedOnSelect);

      await option.updateComplete;

      expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option selected disabled");
    });
  });

  describe("callbacks", () => {
    it("fires onSelect callback", async() => {
      document.body.innerHTML = "<option-pure value='PL' label='Poland'></option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;
      const mockedOnSelect = jest.fn();

      option.setOnSelectCallback(mockedOnSelect);

      await option.updateComplete;

      const optionDiv = option.shadowRoot?.querySelector(".option");

      optionDiv?.dispatchEvent(new Event("click"));

      expect(mockedOnSelect).toHaveBeenCalledTimes(1);
      expect(mockedOnSelect).toHaveBeenCalledWith("PL");
    });

    it("fires onReady callback", async() => {
      document.body.innerHTML = "<option-pure value='PL'>Poland</option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;

      const mockedOnReady = jest.fn();
      // eslint-disable-next-line no-magic-numbers
      option.setOnReadyCallback(mockedOnReady, 177);

      await option.updateComplete;
      // :(
      option.connectedCallback();

      expect(mockedOnReady).toHaveBeenCalledTimes(1);
      expect(mockedOnReady.mock.calls).toMatchSnapshot();
    });

    it("fires onReady callback with selected, disabled, hidden attributes", async() => {
      document.body.innerHTML = "<option-pure value='PL' selected disabled hidden>Poland</option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;

      const mockedOnReady = jest.fn();
      // eslint-disable-next-line no-magic-numbers
      option.setOnReadyCallback(mockedOnReady, 177);

      await option.updateComplete;
      // :(
      option.connectedCallback();

      expect(mockedOnReady).toHaveBeenCalledTimes(1);
      expect(mockedOnReady.mock.calls).toMatchSnapshot();
    });
  });

  describe("public methods", () => {
    it("selects", async() => {
      document.body.innerHTML = "<option-pure value='PL'>Poland</option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;

      option.select();
      await option.updateComplete;

      expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option selected");
      expect(option.getOption()).toMatchSnapshot();
      expect(document.body.innerHTML).toMatchSnapshot();
    });

    it("unselects", async() => {
      document.body.innerHTML = "<option-pure value='PL'>Poland</option-pure>";
      const option = document.body.querySelector("option-pure") as OptionPureElement;

      option.select();
      await option.updateComplete;

      option.unselect();
      await option.updateComplete;

      expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option");
      expect(option.getOption()).toMatchSnapshot();
      expect(document.body.innerHTML).toMatchSnapshot();
    });
  });

  it("sets default value to empty string if not provided", () => {
    document.body.innerHTML = "<option-pure>Poland</option-pure>";
    const option = document.body.querySelector("option-pure") as OptionPureElement;
    expect(option.getOption()).toMatchSnapshot();
  });

  it("sets default value to empty string if it's an empty string attribute", () => {
    document.body.innerHTML = "<option-pure label=''></option-pure>";
    const option = document.body.querySelector("option-pure") as OptionPureElement;
    expect(option.getOption()).toMatchSnapshot();
  });
});
