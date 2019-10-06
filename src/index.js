import Element from "./components/Element";

class SelectPure {
  constructor(element, config) {
    this._config = { ...config };
    this._state = {
      opened: false,
    };
    this._icons = [];

    this._boundHandleClick = this._handleClick.bind(this);
    this._boundUnselectOption = this._unselectOption.bind(this);
    this._boundSortOptions = this._sortOptions.bind(this);

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
    if (this._config.autocomplete) {
      this._autocomplete = new Element("input", { class: "select-pure__autocomplete", type: "text" });
      this._autocomplete.addEventListener("input", this._boundSortOptions);

      this._optionsWrapper.append(this._autocomplete.get());
    }

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

    if (event.target.className === "select-pure__autocomplete") {
      return;
    }

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

    if (event.target.className === this._config.icon) {
      return;
    }

    this._select.addClass("select-pure__select--opened");
    this._body.addEventListener("click", this._boundHandleClick);
    this._select.removeEventListener("click", this._boundHandleClick);

    this._state.opened = true;

    if (this._autocomplete) {
      this._autocomplete.focus();
    }
  }

  _setValue(value, manual, unselected) {
    if (value && !unselected) {
      this._config.value = this._config.multiple ? this._config.value.concat(value) : value;
    }
    if (value && unselected) {
      this._config.value = value;
    }

    this._options.forEach(_option => {
      _option.removeClass("select-pure__option--selected");
    });

    if (this._config.multiple) {
      const options = this._config.value.map(_value => {
        const option = this._config.options.find(_option => _option.value === _value);
        const optionNode = this._options.find(
          _option => _option.get().getAttribute("data-value") === option.value.toString()
        );

        optionNode.addClass("select-pure__option--selected");

        return option;
      });

      this._selectOptions(options, manual);

      return;
    }

    if (!this._config.options.length) {
      return;
    }

    const option = this._config.value ?
      this._config.options.find(_option => _option.value.toString() === this._config.value) :
      this._config.options[0];

    const optionNode = this._options.find(
      _option => _option.get().getAttribute("data-value") === option.value.toString()
    );

    optionNode.addClass("select-pure__option--selected");
    this._selectOption(option, manual);
  }

  _selectOption(option, manual) {
    this._selectedOption = option;

    this._label.setText(option.label);

    if (this._config.onChange && manual) {
      this._config.onChange(option.value);
    }
  }

  _selectOptions(options, manual) {
    this._label.setText("");

    this._icons = options.map(_option => {
      const selectedLabel = new Element("span", {
        class: "select-pure__selected-label",
        textContent: _option.label,
      });
      const icon = new Element("i", {
        class: this._config.icon,
        value: _option.value,
      });

      icon.addEventListener("click", this._boundUnselectOption);

      selectedLabel.append(icon.get());
      this._label.append(selectedLabel.get());

      return icon.get();
    });

    if (manual) {
      // eslint-disable-next-line no-magic-numbers
      this._optionsWrapper.setTop(Number(this._select.getHeight().split("px")[0]) + 5);
    }

    if (this._config.onChange && manual) {
      this._config.onChange(this._config.value);
    }
  }

  _unselectOption(event) {
    const newValue = [...this._config.value];
    const index = newValue.indexOf(event.target.getAttribute("data-value"));

    // eslint-disable-next-line no-magic-numbers
    if (index !== -1) {
      newValue.splice(index, 1);
    }

    this._setValue(newValue, true, true);
  }

  _sortOptions(event) {
    this._options.forEach(_option => {
      if (!_option.get().textContent.toLowerCase().startsWith(event.target.value.toLowerCase())) {
        _option.addClass("select-pure__option--hidden");
        return;
      }
      _option.removeClass("select-pure__option--hidden");
    });
  }
}

export default SelectPure;
