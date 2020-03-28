import Element from "./components/Element";

const CLASSES = {
  select: "select-pure__select",
  dropdownShown: "select-pure__select--opened",
  multiselect: "select-pure__select--multiple",
  label: "select-pure__label",
  placeholder: "select-pure__placeholder",
  dropdown: "select-pure__options",
  option: "select-pure__option",
  optionDisabled: "select-pure__option--disabled",
  autocompleteInput: "select-pure__autocomplete",
  selectedLabel: "select-pure__selected-label",
  selectedOption: "select-pure__option--selected",
  placeholderHidden: "select-pure__placeholder--hidden",
  optionHidden: "select-pure__option--hidden",
};

class SelectPure {
  constructor(element, config) {
    this._config = {
      ...config,
      classNames: {
        ...CLASSES,
        ...config.classNames,
      },
      disabledOptions: [],
    };
    this._state = {
      opened: false,
    };
    this._icons = [];

    this._boundHandleClick = this._handleClick.bind(this);
    this._boundUnselectOption = this._unselectOption.bind(this);
    this._boundSortOptions = this._sortOptions.bind(this);

    this._body = new Element(document.body);

    this._create(element);
    if (!this._config.value) {
      return;
    }
    this._setValue();
  }

  // Public API
  value() {
    return this._config.value;
  }

  reset() {
    this._config.value = this._config.multiple ? [] : null;
    this._setValue();
  }

  // Private methods
  _create(_element) {
    const element = typeof _element === "string" ? document.querySelector(_element) : _element;

    this._parent = new Element(element);
    this._select = new Element("div", { class: this._config.classNames.select });
    this._label = new Element("span", { class: this._config.classNames.label });
    this._optionsWrapper = new Element("div", { class: this._config.classNames.dropdown });

    if (this._config.multiple) {
      this._select.addClass(this._config.classNames.multiselect);
    }

    this._options = this._generateOptions();

    this._select.addEventListener("click", this._boundHandleClick);
    this._select.append(this._label.get());
    this._select.append(this._optionsWrapper.get());
    this._parent.append(this._select.get());
    this._placeholder = new Element("span",
      {
        class: this._config.classNames.placeholder,
        textContent: this._config.placeholder,
      },
    );
    this._select.append(this._placeholder.get());
  }

  _generateOptions() {
    if (this._config.autocomplete) {
      this._autocomplete = new Element("input", { class: this._config.classNames.autocompleteInput, type: "text" });
      this._autocomplete.addEventListener("input", this._boundSortOptions);

      this._optionsWrapper.append(this._autocomplete.get());
    }

    return this._config.options.map(_option => {
      const option = new Element("div", {
        class: `${this._config.classNames.option}${_option.disabled ?
          " " + this._config.classNames.optionDisabled : ""}`,
        value: _option.value,
        textContent: _option.label,
        disabled: _option.disabled,
      });
      if (_option.disabled) {
        this._config.disabledOptions.push(String(_option.value));
      }
      this._optionsWrapper.append(option.get());

      return option;
    });
  }

  _handleClick(event) {
    event.stopPropagation();

    if (event.target.className === this._config.classNames.autocompleteInput) {
      return;
    }

    if (this._state.opened) {
      const option = this._options.find(_option => _option.get() === event.target);

      if (option) {
        this._setValue(option.get().getAttribute("data-value"), true);
      }

      this._select.removeClass(this._config.classNames.dropdownShown);
      this._body.removeEventListener("click", this._boundHandleClick);
      this._select.addEventListener("click", this._boundHandleClick);

      this._state.opened = false;
      return;
    }

    if (event.target.className === this._config.icon) {
      return;
    }

    this._select.addClass(this._config.classNames.dropdownShown);
    this._body.addEventListener("click", this._boundHandleClick);
    this._select.removeEventListener("click", this._boundHandleClick);

    this._state.opened = true;

    if (this._autocomplete) {
      this._autocomplete.focus();
    }
  }

  _setValue(value, manual, unselected) {
    if (this._config.disabledOptions.indexOf(value) > -1) {
      return;
    }
    if (value && !unselected) {
      this._config.value = this._config.multiple ? [...this._config.value || [], value] : value;
    }
    if (value && unselected) {
      this._config.value = value;
    }
    this._options.forEach(_option => {
      _option.removeClass(this._config.classNames.selectedOption);
    });
    this._placeholder.removeClass(this._config.classNames.placeholderHidden);

    if (this._config.multiple) {
      const options = this._config.value.map(_value => {
        const option = this._config.options.find(_option => _option.value === _value);
        const optionNode = this._options.find(
          _option => _option.get().getAttribute("data-value") === option.value.toString(),
        );

        optionNode.addClass(this._config.classNames.selectedOption);

        return option;
      });

      if (options.length) {
        this._placeholder.addClass(this._config.classNames.placeholderHidden);
      }
      this._selectOptions(options, manual);

      return;
    }

    const option = this._config.value ?
      this._config.options.find(_option => _option.value.toString() === this._config.value) :
      this._config.options[0];

    const optionNode = this._options.find(
      _option => _option.get().getAttribute("data-value") === option.value.toString(),
    );

    if (!this._config.value) {
      this._label.setText("");
      return;
    }
    optionNode.addClass(this._config.classNames.selectedOption);
    this._placeholder.addClass(this._config.classNames.placeholderHidden);
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
        class: this._config.classNames.selectedLabel,
        textContent: _option.label,
      });
      const icon = new Element(this._config.inlineIcon ?
        this._config.inlineIcon.cloneNode(true) : "i", {
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
        _option.addClass(this._config.classNames.optionHidden);
        return;
      }
      _option.removeClass(this._config.classNames.optionHidden);
    });
  }
}

export default SelectPure;
