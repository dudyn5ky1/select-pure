import { render, fireEvent } from "@testing-library/svelte";

import Select from "./../Select.svelte";

describe("Select component", () => {
  it("renders empty select", () => {
    const { container } = render(Select, {
      name: "select",
    });
    expect(container).toMatchSnapshot();
  });

  it("opens dropdown", async() => {
    const { container } = render(Select, {
      name: "select",
    });

    const selectWrapper = document.querySelector(".select");
    await fireEvent.click(selectWrapper);

    expect(container).toMatchSnapshot();
  });

  it("closes dropdown", async() => {
    const { container } = render(Select, {
      name: "select",
    });

    const selectWrapper = document.querySelector(".select");

    await fireEvent.click(selectWrapper);
    await fireEvent.click(selectWrapper);

    expect(container).toMatchSnapshot();
  });

  it("closes dropdown on click outside", async() => {
    const { container } = render(Select, {
      name: "select",
    });

    const selectWrapper = document.querySelector(".select");

    await fireEvent.click(selectWrapper);
    await fireEvent.click(document.body);

    expect(container).toMatchSnapshot();
  });
});

