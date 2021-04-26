import { css, LitElement, html } from "lit-element";

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
        height: var(--select-height, 44px);
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
      disabled: {
        type: Boolean,
      },
      value: {
        type: String,
      },
      name: {
        type: String,
      },
      formName: {
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
    this.disabled = this.getAttribute("disabled") !== null;
    this.name = this.getAttribute("name");
    this.id = this.getAttribute("id");
    this.formName = this.name || this.id;
    this.value = null;
  }

  firstUpdated() {
    this.processOptions();
    this.watchNativeSelect();
    // :( Fails with React
    // window.addEventListener("DOMContentLoaded", this.processForm);
  }

  // public

  get selectedIndex() {
    return this.nativeSelect.selectedIndex;
  }

  set selectedIndex(index) {
    this.onSelect(this.options[index].value);
  }

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

  // private methods

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
        this.selectedOption = options[i];
        this.nativeSelect.selectedIndex = i;
      }
      options[i].onSelect = this.onSelect;

      if (i === options.length - 1 && !this.selectedOption.value) {
        this.selectedOption = options[0];
        options[0].select();
        this.nativeSelect.selectedIndex = i;
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
      option.unselect();
    }
    if (this.form) {
      this.hiddenInput.value = this.value;
      const event = new Event("change", { bubbles: true });
      this.hiddenInput.dispatchEvent(event);
    }
    this.visible = false;
  }

  selectOption(option, index) {
    this.selectedOption = option;
    this.value = option.value;
    option.select();
    this.nativeSelect.selectedIndex = index;
    this.afterSelect();
  }

  afterSelect() {
    this.dispatchEvent(new Event("change"));
  }

  renderOptions() {
    return this.options.map(({ value, label, hidden, disabled }) => {
      const isSelected = this.selectedOption.value === value;
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

  handleKeyPress(event) {
    if (event.which === KEYS.ENTER || event.which === KEYS.TAB) {
      this.open();
    }
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
        <select ?disabled=${this.disabled} name="${this.name}" id=${this.id}>
          ${this.renderOptions()}
        </select>

        <div class="select">
          <div
            class="${labelClassNames.join(" ")}"
            @click="${this.visible ? this.close : this.open}"
            @keydown="${this.handleKeyPress}"
            tabindex="0"
          >
            ${this.selectedOption.label}
          </div>
          <div class="dropdown${this.visible ? " visible" : ""}">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
