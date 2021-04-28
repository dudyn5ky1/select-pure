import { css, LitElement, html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";

import { KEYS } from "./constants";

export class Select extends LitElement {
  static get styles() {
    return css`
      .select-wrapper {
        position: relative;
      }
      .select-wrapper:hover .select {
        z-index: 2;
      }
      .select {
        bottom: 0;
        display: flex;
        flex-wrap: wrap;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: var(--select-width, 100%);
      }
      .label:focus {
        outline: var(--select-outline, 2px solid #e3e3e3);
      }
      .label:after {
        border-bottom: 1px solid var(--color, #000);
        border-right: 1px solid var(--color, #000);
        box-sizing: border-box;
        content: "";
        display: block;
        height: 10px;
        margin-top: -2px;
        transform: rotate(45deg);
        transition: 0.2s ease-in-out;
        width: 10px;
      }
      .label.visible:after {
        margin-bottom: -4px;
        margin-top: 0;
        transform: rotate(225deg);
      }
      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: relative;
        opacity: 0;
        z-index: 1;
      }
      select,
      .label {
        align-items: center;
        background-color: var(--background-color, #fff);
        border-radius: var(--border-radius, 4px);
        border: var(--border-width, 1px) solid var(--border-color, #000);
        box-sizing: border-box;
        color: var(--color, #000);
        cursor: pointer;
        display: flex;
        font-family: var(--font-family, inherit);
        font-size: var(--font-size, 14px);
        font-weight: var(--font-weight, 400);
        min-height: var(--select-height, 44px);
        justify-content: space-between;
        padding: var(--padding, 0 10px);
        width: 100%;
      }
      .dropdown {
        background-color: var(--border-color, #000);
        border-radius: var(--border-radius, 4px);
        border: var(--border-width, 1px) solid var(--border-color, #000);
        display: none;
        flex-direction: column;
        gap: var(--border-width, 1px);
        justify-content: space-between;
        max-height: calc(var(--select-height, 44px) * 4 + var(--border-width, 1px) * 3);
        overflow-y: scroll;
        position: absolute;
        top: calc(var(--select-height, 44px) + var(--dropdown-gap, 0px));
        width: calc(100% - var(--border-width, 1px) * 2);
        z-index: var(--dropdown-z-index, 2);
      }
      .dropdown.visible {
        display: flex;
      }
      .disabled {
        background-color: var(--disabled-background-color, #bdc3c7);
        color: var(--disabled-color, #ecf0f1);
        cursor: default;
      }
      .multi-selected {
        background-color: var(--selected-background-color, #e3e3e3);
        border-radius: var(--border-radius, 4px);
        color: var(--selected-color, #000);
        display: flex;
        gap: 8px;
        justify-content: space-between;
        padding: 2px 4px;
      }
      .multi-selected-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        width: calc(100% - 30px);
      }
      .cross:after {
        content: '\\00d7';
        display: inline-block;
        height: 100%;
        text-align: center;
        width: 12px;
      }
    `;
  }

  static get properties() {
    return {
      options: {
        type: Array,
      },
      visible: {
        type: Boolean,
      },
      selectedOption: {
        type: Object,
      },
      _selectedOptions: {
        type: Array,
      },
      disabled: {
        type: Boolean,
      },
      value: {
        type: String,
      },
      values: {
        type: Array,
      },
      name: {
        type: String,
      },
      formName: {
        type: String,
      },
      id: {
        type: String,
      },
      multiple: {
        type: Boolean,
      },
      defaultLabel: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    // bindings
    this.close = this.close.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.processOptions = this.processOptions.bind(this);
    this.watchNativeSelect = this.watchNativeSelect.bind(this);
    this.processForm = this.processForm.bind(this);

    // properties
    this.options = [];
    this.visible = false;
    this.selectedOption = {};
    this._selectedOptions = [];
    this.disabled = this.getAttribute("disabled") !== null;
    this.multiple = this.getAttribute("multiple") !== null;
    this.name = this.getAttribute("name");
    this.id = this.getAttribute("id");
    this.formName = this.name || this.id;
    this.value = null;
    this.values = [];
    this.defaultLabel = this.getAttribute("default-label");
  }

  // lifecycle

  firstUpdated() {
    this.processOptions();
    this.watchNativeSelect();
    this.processForm();
  }

  // public methods
  open() {
    if (this.disabled) {
      return;
    }
    document.body.removeEventListener("click", this.close);
    this.visible = true;
    setTimeout(() => {
      // :( don't close the select right away
      document.body.addEventListener("click", this.close);
    });
  }

  close() {
    this.visible = false;
    document.body.removeEventListener("click", this.close);
  }

  enable() {
    this.disabled = false;
  }

  disable() {
    this.disabled = true;
  }

  // public properties
  get selectedIndex() {
    return this.nativeSelect.selectedIndex;
  }

  set selectedIndex(index) {
    this.onSelect(this.options[index].value);
  }

  get selectedOptions() {
    return this.nativeSelect.selectedOptions;
  }

  // internal methods

  processForm() {
    this.form = this.closest("form");
    if (!this.form) {
      return;
    }
    this.hiddenInput = document.createElement("input");
    this.hiddenInput.setAttribute("type", "hidden");
    this.hiddenInput.setAttribute("name", this.formName);
    this.form.appendChild(this.hiddenInput);
  }

  watchNativeSelect() {
    this.nativeSelect.addEventListener("change", () => {
      this.selectedIndex = this.nativeSelect.selectedIndex;
    });
  }

  processOptions() {
    this.nativeSelect = this.shadowRoot.querySelector("select");
    const options = this.querySelectorAll("option-pure");
    for (let i = 0; i < options.length; i++) {
      const { value, label, select, unselect, selected, hidden, disabled } = options[i].getOption();
      this.options.push({
        label,
        value,
        select,
        unselect,
        hidden,
        disabled,
      });
      if (selected) {
        this.selectOption(options[i], i, true);
      }
      options[i].onSelect = this.onSelect;

      if (i === options.length - 1 && !this.selectedOption.value && !this.multiple) {
        this.selectOption(options[0], 0, true);
      }
    }
  }

  onSelect(optionValue) {
    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      if (option.value === optionValue) {
        this.selectOption(option, i);
        continue;
      }
      if (!this.multiple) {
        option.unselect();
      }
    }
    this.visible = false;
  }

  selectOption(option, index, isInitialRender) {
    if (this.multiple) {
      const isSelected = this._selectedOptions.find(({ value }) => value === option.value);
      if (isSelected) {
        const selectedIndex = this._selectedOptions.indexOf(isSelected);
        this.values.splice(selectedIndex, 1);
        this._selectedOptions.splice(selectedIndex, 1);
        option.unselect();
      } else {
        this.values.push(option.value);
        this._selectedOptions.push(option);
        option.select();
      }
      this.requestUpdate();
    } else {
      this.selectedOption = option;
      this.value = option.value;
      option.select();
    }
    if (this.form) {
      this.hiddenInput.value = this.multiple ? this.values : this.value;
      const event = new Event("change", { bubbles: true });
      this.hiddenInput.dispatchEvent(event);
    }
    if (isInitialRender) {
      return;
    }
    this.afterSelect();
  }

  afterSelect() {
    this.dispatchEvent(new Event("change"));
  }

  handleKeyPress(event) {
    if (event.which === KEYS.ENTER || event.which === KEYS.TAB) {
      this.open();
    }
  }

  onCrossClick(event, value) {
    event.stopPropagation();
    this.onSelect(value);
  }

  // internal render methods

  renderOptions() {
    return this.options.map(({ value, label, hidden, disabled }) => {
      let isSelected = this.selectedOption.value === value;
      if (this.multiple) {
        isSelected = this._selectedOptions.find(option => option.value === value);
      }
      return html`
        <option
          value=${value}
          ?selected=${isSelected}
          ?hidden=${hidden}
          ?disabled=${disabled}
        >
          ${label}
        </option>
      `;
    });
  }

  renderLabel() {
    if (this.multiple && this._selectedOptions.length) {
      return html`
        <div class="multi-selected-wrapper">
          ${this._selectedOptions.map(({ label, value }) => html`
              <span class="multi-selected">
                ${label}
                <span class="cross" @click=${event => this.onCrossClick(event, value)}></span>
              </span>
          `)}
        </div>
      `;
    }

    return this.selectedOption.label || this.defaultLabel;
  }

  render() {
    const labelClassNames = ["label"];
    if (this.disabled) {
      labelClassNames.push("disabled");
    }
    if (this.visible) {
      labelClassNames.push("visible");
    }
    return html`
      <div class="select-wrapper">
        <select
          ?disabled=${this.disabled}
          ?multiple=${this.multiple}
          name="${ifDefined(this.name || undefined)}"
          id=${ifDefined(this.id || undefined)}
          size="1"
        >
          ${this.renderOptions()}
        </select>

        <div class="select">
          <div
            class="${labelClassNames.join(" ")}"
            @click="${this.visible ? this.close : this.open}"
            @keydown="${this.handleKeyPress}"
            tabindex="0"
          >
            ${this.renderLabel()}
          </div>
          <div class="dropdown${this.visible ? " visible" : ""}">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
