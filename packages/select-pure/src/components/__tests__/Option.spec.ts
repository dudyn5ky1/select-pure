import "./../Option";
import { OptionPureElement } from "./../../models";

describe("Option component", () => {
  it("renders option", async() => {
    document.body.innerHTML = "<option-pure value='UA'>Ukraine</option-pure>";
    const option = document.body.querySelector("option-pure") as OptionPureElement;

    await option.updateComplete;

    expect(option.shadowRoot?.querySelector(".option")?.textContent?.trim()).toEqual("Ukraine");
    expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option");
  });

  it("renders with label as an attribute", async() => {
    document.body.innerHTML = "<option-pure value='PL' label='Poland'></option-pure>";
    const option = document.body.querySelector("option-pure") as OptionPureElement;

    await option.updateComplete;

    expect(option.shadowRoot?.querySelector(".option")?.textContent?.trim()).toEqual("Poland");
    expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option");
  });

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

  it("renders disabled", async() => {
    document.body.innerHTML = "<option-pure value='PL' label='Poland' disabled></option-pure>";
    const option = document.body.querySelector("option-pure") as OptionPureElement;
    const mockedOnSelect = jest.fn();

    option.setOnSelectCallback(mockedOnSelect);

    await option.updateComplete;

    expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option disabled");

    const optionDiv = option.shadowRoot?.querySelector(".option");

    optionDiv?.dispatchEvent(new Event("click"));

    expect(mockedOnSelect).not.toHaveBeenCalled();
  });

  // eslint-disable-next-line
  it("renders selected", () => {});
  // eslint-disable-next-line
  it("renders selected", () => {});

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
    expect(option.shadowRoot?.querySelector(".option")?.textContent?.trim()).toEqual("Poland");
    expect(option.shadowRoot?.querySelector(".option")?.getAttribute("class")).toEqual("option");
  });
});
