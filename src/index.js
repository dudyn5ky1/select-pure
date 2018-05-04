import Element from "./components/Element";

class SelectPure {
  constructor(element, config) {
    this._config = { ...config };
    this._state = {
      opened: false,
    };

    this._boundHandleClick = this._handleClick.bind(this);
    this._body = new Element(document.body);

    this._create(element);
    this._setValue();
  }

  _create(_element) {
    const element = typeof _element === "string" ? document.querySelector(_element) : _element;

    this._parent = new Element(element);
    this._select = new Element("div", { class: "select-pure__select" });
    this._label = new Element("span", { class: "select-pure__label" });
    this._optionsWrapper = new Element("div", { class: "select-pure__options" });

    if (this._config.multiple) {
      this._select.addClass("select-pure__select--multiple");
    }

    this._options = this._generateOptions();

    this._select.addEventListener("click", this._boundHandleClick);
    this._select.append(this._label.get());
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

  _handleClick(event) {
    event.stopPropagation();

    if (this._state.opened) {
      const option = this._options.find(_option => _option.get() === event.target);

      if (option) {
        this._setValue(option.get().getAttribute("data-value"), true);
      }

      this._select.removeClass("select-pure__select--opened");
      this._body.removeEventListener("click", this._boundHandleClick);
      this._select.addEventListener("click", this._boundHandleClick);

      this._state.opened = false;
      return;
    }

    this._select.addClass("select-pure__select--opened");
    this._body.addEventListener("click", this._boundHandleClick);
    this._select.removeEventListener("click", this._boundHandleClick);

    this._state.opened = true;
  }

  _setValue(value, selected) {
    if (value) {
      this._config.value = value;
    }

    this._options.forEach(_option => {
      _option.removeClass("select-pure__option--selected");
    });

    if (this._config.multiple) {
      const options = this._config.value.map(_value => {
        const option = this._config.options.find(_option => _option.value === _value)
        const optionNode = this._options.find(_option => _option.get().getAttribute("data-value") === option.value);

        optionNode.addClass("select-pure__option--selected");

        return option;
      });

      this._selectOptions(options);

      return;
    }

    const option = this._config.value ?
      this._config.options.find(_option => _option.value === this._config.value) :
      this._config.options[0];
    const optionNode = this._options.find(_option => _option.get().getAttribute("data-value") === option.value);

    optionNode.addClass("select-pure__option--selected");
    this._selectOption(option, selected);
  }

  _selectOption(option, selected) {
    this._selectedOption = option;

    this._label.setText(option.label);

    if (this._config.onChange && selected) {
      this._config.onChange(option.value);
    }
  }

  _selectOptions(options) {
    this._label.innetHTML = "";

    options.forEach(_option => {
      const selectedLabel = new Element("span", {
        class: "select-pure__selected-label",
        textContent: _option.label,
      });

      this._label.append(selectedLabel.get());
    });
  }
}

export default SelectPure;
