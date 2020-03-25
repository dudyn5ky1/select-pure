import Element from "./../Element.js";

describe("Element component", () => {
  const defaultAttributes = {
    value: "input_name",
    class: "this_is_class",
    fakeAttribute: "fake fake",
  };
  const modifiedAttributes = {
    value: "another_input_name",
    class: "this_is_class_for_sure",
  };

  test("creates input element", () => {
    const input = new Element("input", defaultAttributes).get();
    expect(input).toBeInstanceOf(HTMLElement);
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("data-value")).toBe("input_name");
    expect(input.getAttribute("class")).toBe("this_is_class");
    expect(input.getAttribute("fakeAttribute")).toBe(null);
  });

  test("creates textarea element", () => {
    const textarea = new Element("textarea", modifiedAttributes).get();
    expect(textarea).toBeInstanceOf(HTMLElement);
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea.getAttribute("data-value")).toBe("another_input_name");
    expect(textarea.getAttribute("class")).toBe("this_is_class_for_sure");
  });

  test("creates element from existing element", () => {
    const existing = document.createElement("span");
    existing.setAttribute("id", "some_id");

    const newElement = new Element(existing, modifiedAttributes).get();

    expect(newElement).toBe(existing);
  });

  test("appends child", () => {
    const div = new Element("div");

    expect(div.get().childNodes.length).toBe(0);

    const span = document.createElement("span");

    const newDiv = div.append(span);

    expect(div.get().childNodes.length).toBe(1);
    expect(div.get().childNodes[0]).toBe(span);

    expect(newDiv).toBeInstanceOf(Element);
  });

  test("sets textContent", () => {
    const span = new Element("span", { textContent: "Hello, world!" }).get();

    expect(span.textContent).toBe("Hello, world!");
  });

  test("adds class", () => {
    const span = new Element("span");

    expect(span.get().classList.contains("new_class")).toBe(false);

    const newElement = span.addClass("new_class");

    expect(newElement).toBeInstanceOf(Element);

    expect(span.get().classList.contains("new_class")).toBe(true);
  });

  test("removes class", () => {
    const span = new Element("span");

    expect(span.get().classList.contains("new_class")).toBe(false);

    span.addClass("new_class");

    expect(span.get().classList.contains("new_class")).toBe(true);

    const newElement = span.removeClass("new_class");

    expect(newElement).toBeInstanceOf(Element);

    expect(span.get().classList.contains("new_class")).toBe(false);
  });

  test("toggles class", () => {
    const span = new Element("span");

    expect(span.get().classList.contains("new_class")).toBe(false);

    const toggled1 = span.toggleClass("new_class");

    expect(toggled1).toBeInstanceOf(Element);

    expect(span.get().classList.contains("new_class")).toBe(true);

    const toggled2 = span.toggleClass("new_class");

    expect(toggled2).toBeInstanceOf(Element);

    expect(span.get().classList.contains("new_class")).toBe(false);
  });

  test("adds event listener", () => {
    const span = new Element("span");
    const callback = jest.fn();

    span.addEventListener("click", callback);

    expect(callback.mock.calls.length).toBe(0);

    span.get().click();

    expect(callback.mock.calls.length).toBe(1);
  });

  test("removes event listener", () => {
    const span = new Element("span");
    const callback = jest.fn();

    span.addEventListener("click", callback);

    expect(callback.mock.calls.length).toBe(0);

    span.get().click();

    expect(callback.mock.calls.length).toBe(1);

    span.removeEventListener("click", callback);

    callback.mockClear();

    span.get().click();

    expect(callback.mock.calls.length).toBe(0);
  });

  test("sets text content", () => {
    const span = new Element("span");

    expect(span.get().textContent).toBe("");

    const newSpan = span.setText("mock text");

    expect(newSpan).toBeInstanceOf(Element);

    expect(span.get().textContent).toBe("mock text");
  });

  test("returns height", () => {
    const span = new Element("span");

    span.get().style.height = "29px";
    span.get().style.padding = "5px";

    const height = span.getHeight();

    expect(height).toBe("29px");
  });

  test("sets top", () => {
    const span = new Element("span");

    expect(span.get().style.top).toBe("");
    // eslint-disable-next-line no-magic-numbers
    const newSpan = span.setTop(100);

    expect(newSpan).toBeInstanceOf(Element);

    expect(span.get().style.top).toBe("100px");
  });

  test("focuses", () => {
    const focusSpy = jest.fn();
    HTMLElement.prototype.focus = focusSpy;

    const input = new Element("input");

    expect(focusSpy).toHaveBeenCalledTimes(0);

    input.focus();

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });
});
