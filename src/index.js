import Element from "./components/Element";

class SelectPure {
  constructor(element, config) {
    this._config = { ...config };

    this._create(element);
  }

  _create(_element) {
    const element = typeof _element === "string" ? document.querySelector(_element) : _element;

    this._parent = new Element(element);
    this._select = new Element("div", { class: "select-pure__select" });
    this._select.addEventListener("click", this._toggleVisibility.bind(this));
    this._optionsWrapper = new Element("div", { class: "select-pure__options" });
    this._options = this._generateOptions();
    this._select.append(this._optionsWrapper.get());
    this._parent.append(this._select.get());
  }

  _generateOptions() {
    return this._config.options.map(_option => {
      const option = new Element("div", {
        class: "select-pure__option",
        value: _option.value,
        textContent: _option.label,
        disabled: _option.disabled,
      });
      this._optionsWrapper.append(option.get());
      return option;
    });
  }

  _toggleVisibility() {
    this._select.toggleClass("select-pure__select--opened");
  }
}

export default SelectPure;
