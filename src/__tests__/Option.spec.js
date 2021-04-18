import { render, fireEvent } from "@testing-library/svelte";

import Option from "./../Option.svelte";
import { selected } from "./../store";

jest.mock("./../store", () => ({
  selected: {
    update: jest.fn(),
    subscribe: jest.fn(() => ({
      unsubscribe: jest.fn(),
    })),
  },
}));

describe("Option component", () => {
  it("renders option", async() => {
    // Mocks
    global.$selected = { value: null };

    const { container } = render(Option, {
      value: "NY",
    });
    expect(container).toMatchSnapshot();
  });

  it("updates store on click", async() => {
    // Mocks
    global.$selected = { value: null };

    render(Option, {
      value: "LA",
    });

    const option = document.querySelector(".option");
    Object.assign(option.parentNode, {
      host: {
        textContent: "Los Angeles",
      },
    });

    expect(selected.update).not.toHaveBeenCalled();

    await fireEvent.click(option);

    expect(selected.update).toHaveBeenCalledTimes(1);
    expect(selected.update.mock.calls[0][0]()).toEqual({
      label: "Los Angeles",
      value: "LA",
    });
  });
});
