import Element from "./components/Element";

class SelectPure {
  constructor(element, config) {
    this._config = { ...config };
    this._state = {
      opened: false,
    };

    this._boundToggleVisibility = this._toggleVisibility.bind(this);

    this._create(element);
  }

  _create(_element) {
    const element = typeof _element === "string" ? document.querySelector(_element) : _element;

    this._parent = new Element(element);
    this._select = new Element("div", { class: "select-pure__select" });
    this._body = new Element(document.body);
    this._select.addEventListener("click", this._boundToggleVisibility);
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

  _toggleVisibility(event) {
    event.stopPropagation();

    if (this._state.opened) {
      this._select.removeClass("select-pure__select--opened");
      this._body.removeEventListener("click", this._boundToggleVisibility);
      this._select.addEventListener("click", this._boundToggleVisibility);
      this._state.opened = false;
      return;
    }
    
    this._select.addClass("select-pure__select--opened");
    this._body.addEventListener("click", this._boundToggleVisibility);
    this._select.removeEventListener("click", this._boundToggleVisibility);
    this._state.opened = true;
  }
}

export default SelectPure;
