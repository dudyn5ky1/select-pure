import { css, LitElement, html } from "lit-element";

export class Option extends LitElement {
  static get styles() {
    return css`
      .option {
        align-items: center;
        box-sizing: border-box;
        background-color: var(--background-color, #fff);
        color: var(--color, #000);
        cursor: pointer;
        display: flex;
        height: var(--select-height, 44px);
        justify-content: flex-start;
        padding: var(--padding, 0 10px);
        height: var(--select-height, 44px);
        width: 100%;
      }
      .option:not(.disabled):not(.selected):hover {
        background-color: var(--hover-background-color, #e3e3e3);
        color: var(--hover-color, #000);
      }
      .selected {
        background-color: var(--selected-background-color, #e3e3e3);
        color: var(--selected-color, #000);
      }
      .disabled {
        background-color: var(--disabled-background-color, #e3e3e3);
        color: var(--disabled-color, #000);
        cursor: default;
      }
    `;
  }

  static get properties() {
    return {
      selected: {
        type: Boolean,
      },
      label: {
        type: String,
      },
      value: {
        type: String,
      },
      disabled: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();

    // bindings
    this.onClick = this.onClick.bind(this);
    this.select = this.select.bind(this);
    this.unselect = this.unselect.bind(this);

    // properties
    this.label = this.textContent || this.getAttribute("label");
    this.value = this.getAttribute("value");
    this.selected = this.getAttribute("selected") !== null;
    this.disabled = this.getAttribute("disabled") !== null;

    if (!this.onInit) {
      return;
    }
    this.onInit({
      label: this.label,
      value: this.value,
      select: this.select,
      unselect: this.unselect,
      selected: this.selected,
    });
  }

  onClick(event) {
    if (!this.onSelect || this.disabled) {
      event.stopPropagation();
      return;
    }
    this.onSelect(this.value);
  }

  select() {
    this.selected = true;
  }

  unselect() {
    this.selected = false;
  }

  render() {
    const classNames = ["option"];
    if (this.selected) {
      classNames.push("selected");
    }
    if (this.disabled) {
      classNames.push("disabled");
    }
    return html`<div class="${classNames.join(" ")}" @click=${this.onClick}>
      ${this.label}
    </div>`;
  }
}
