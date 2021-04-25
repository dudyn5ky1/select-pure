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
        gap: 0.5px;
        justify-content: space-between;
        overflow: hidden;
        position: absolute;
        top: 44px;
        width: calc(100% - 2px);
        z-index: 2;
      }
      .dropdown.visible {
        display: flex;
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


    const options = this.querySelectorAll("option-pure");
    for (let i = 0; i < options.length; i++) {
      options[i].onInit = this.addOption;
      options[i].onSelect = this.onSelect;
    }
  }

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
        option.select();
        continue;
      }
      option.unselect();
    }
  }

  get selectedIndex() {
    return 0;
  }

  renderOptions() {
    return this.options.map(({ value, label }) => html`<option value=${value}>${label}</option>`);
  }

  open(event) {
    event.stopPropagation(); // causes problem when one select is open and other is clicked
    this.visible = true;
    document.body.addEventListener("click", this.close);
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
          <div class="selected" @click="${this.visible ? this.close : this.open}">
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
