import { css, LitElement, html } from "lit-element";

export class Option extends LitElement {
  static get styles() {
    return css`
      .option {
        align-items: center;
        box-sizing: border-box;
        background-color: #fff;
        cursor: pointer;
        display: flex;
        height: 44px;
        justify-content: flex-start;
        padding-left: 8px;
        width: 100%;
      }
      .option:not(.disabled):not(.selected):hover {
        background-color: #e3e3e3;
      }
      .selected {
        background-color: #e3e3e3;
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
