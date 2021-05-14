import "./../Select";
import { LitElement } from "lit";
// import { OptionPureElement } from "./../../models";
// import { KEYS } from "./../constants";

describe("Select component", () => {
  beforeAll(() => {
    class MockedOption extends LitElement {
      setOnSelectCallback = jest.fn();

      getOption = jest.fn(() => ({
        // eslint-disable-next-line
        value: this.getAttribute("value"),
        // eslint-disable-next-line
        label: this.getAttribute("label"),
        select: jest.fn(),
        unselect: jest.fn(),
      }));
    }
    customElements.define("option-pure", MockedOption);
  });

  describe("render", () => {
    it("renders native select", async() => {
      document.body.innerHTML = `
        <select-pure>
          <option-pure value='mocked-UA' label='mocked-Ukraine'></option-pure>
          <option-pure value='mocked-PL' label='mocked-Poland'></option-pure>
        </select-pure>
      `;
      const select = document.querySelector("select-pure") as LitElement;

      await select.updateComplete;
      select.connectedCallback();
      await select.updateComplete;

      const options = select.shadowRoot?.querySelectorAll("select option");
      expect(options).toHaveLength(2);
      // @ts-ignore
      expect(options[0].getAttribute("value")).toEqual("mocked-UA");
      // @ts-ignore
      expect(options[0].getAttribute("selected")).toEqual("");
      // @ts-ignore
      expect(options[1].getAttribute("value")).toEqual("mocked-PL");
      // @ts-ignore
      expect(options[1].getAttribute("selected")).toEqual(null);
    });

    it("renders custom select", async() => {
      document.body.innerHTML = `
        <select-pure>
          <option-pure value='mocked-PL' label='mocked-Poland'></option-pure>
          <option-pure value='mocked-UA' label='mocked-Ukraine'></option-pure>
        </select-pure>
      `;
      const select = document.querySelector("select-pure") as LitElement;

      await select.updateComplete;
      select.connectedCallback();
      await select.updateComplete;

      const label = select.shadowRoot?.querySelector(".select .label");

      expect(label?.getAttribute("class")).toEqual("label");

      const slot = select.shadowRoot?.querySelector(".dropdown slot");

      expect(slot).toBeTruthy();
    });
    // renders selected option when selected is provided
    // renders disabled
  });

  describe("select", () => {
    // selects an option on click
    // updates native select
  });

  describe("multiselect", () => {
    // renders a multiselect
    // ability to select multiple options
    // ability to remove selected options
  });

  describe("API methods", () => {
    // disables
    // enables
    // selects an option
  });
});
