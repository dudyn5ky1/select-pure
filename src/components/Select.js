import { css, LitElement, html } from "lit-element";

export class Select extends LitElement {
  static get styles() {
    return css`
      select {
        display: none;
      }
      .select {
        display: flex;
        flex-wrap: wrap;
        height: 44px;
        position: relative;
        width: 400px;
      }
      .selected {
        align-items: center;
        border-radius: 4px;
        border: 1px solid black;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        height: 100%;
        justify-content: space-between;
        padding: 0 10px;
        width: 100%;
      }
      .dropdown {
        background-color: black;
        border-radius: 4px;
        border: 1px solid black;
        display: none;
        flex-direction: column;
        gap: 1px;
        justify-content: space-between;
        overflow-y: scroll;
        position: absolute;
        top: 44px;
        width: calc(100% - 2px);
        max-height: calc(44px * 4);
        z-index: 2;
      }
      .dropdown.visible {
        display: flex;
      }
      .disabled {
        background-color: #bdc3c7;
        color: #ecf0f1;
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
      listeners: {
        type: Object,
      },
      value: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    // bindings
    this.addOption = this.addOption.bind(this);
    this.close = this.close.bind(this);
    this.onSelect = this.onSelect.bind(this);

    // properties
    this.options = [];
    this.visible = false;
    this.selectedOption = {};
    this.disabled = this.getAttribute("disabled") !== null;
    this.listeners = {};
    this.value = null;

    this.nativeSelect = this.querySelector("select");

    const options = this.querySelectorAll("option-pure");
    for (let i = 0; i < options.length; i++) {
      options[i].onInit = this.addOption;
      options[i].onSelect = this.onSelect;
    }
  }

  // private methods

  addOption(option) {
    const { value, label, select, unselect, selected } = option;
    this.options.push({
      label,
      value,
      select,
      unselect,
    });
    if (selected) {
      this.selectedOption = option;
    }
  }

  onSelect(optionValue) {
    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      if (option.value === optionValue) {
        this.selectedOption = option;
        this.value = optionValue;
        option.select();
        this.dispatchEvent(new Event("change"));
        continue;
      }
      option.unselect();
    }
  }

  renderOptions() {
    return this.options.map(({ value, label }) => {
      const isSelected = this.selectedOption.value === value;
      return html`<option value=${value} ?selected=${isSelected}>${label}</option>`;
    });
  }

  open() {
    if (this.disabled) {
      return;
    }
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

  render() {
    return html`
      <div class="select-wrapper">
        <select>
          ${this.renderOptions()}
        </select>

        <div class="select" aria-hidden="true">
          <div
            class="selected${this.disabled ? " disabled": ""}"
            @click="${this.visible ? this.close : this.open}"
          >
            ${this.selectedOption.label || "Default label"}
          </div>
          <div class="dropdown${this.visible ? " visible" : ""}">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
