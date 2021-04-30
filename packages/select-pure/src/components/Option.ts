import { css, LitElement, html } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { KEYS } from "./constants";

@customElement("option-pure")
export class OptionPure extends LitElement {
  static get styles() {
    return css`
      .option {
        align-items: center;
        background-color: var(--background-color, #fff);
        box-sizing: border-box;
        color: var(--color, #000);
        cursor: pointer;
        display: flex;
        font-family: var(--font-family, inherit);
        font-size: var(--font-size, 14px);
        font-weight: var(--font-weight, 400);
        height: var(--select-height, 44px);
        height: var(--select-height, 44px);
        justify-content: flex-start;
        padding: var(--padding, 0 10px);
        width: 100%;
      }
      .option:not(.disabled):focus, .option:not(.disabled):not(.selected):hover {
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

  @property() _selected: boolean = this.getAttribute("selected") !== null;

  @property() _disabled: boolean = this.getAttribute("disabled") !== null;

  @property() _value: string = this.getAttribute("value") || "";

  @property() _label: string = this.textContent || this.getAttribute("label") || "";

  private onSelect?: Function;

  constructor() {
    super();

    // bindings
    this.onClick = this.onClick.bind(this);
    this.select = this.select.bind(this);
    this.unselect = this.unselect.bind(this);
    this.getOption = this.getOption.bind(this);
  }

  //public
  public getOption() {
    return {
      label: this._label,
      value: this._value,
      select: this.select,
      unselect: this.unselect,
      selected: this._selected,
      disabled: this._disabled,
    };
  }

  public select() {
    this._selected = true;
    this.setAttribute("selected", "");
  }

  public unselect() {
    this._selected = false;
    this.removeAttribute("selected");
  }

  public setOnSelectCallback(callback: Function) {
    this.onSelect = callback;
  }

  private onClick(event: Event) {
    event.stopPropagation();
    if (!this.onSelect) {
      return;
    }
    this.onSelect(this._value);
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (event.which === KEYS.ENTER) {
      this.onClick(event);
    }
  }

  render() {
    const classNames = ["option"];
    if (this._selected) {
      classNames.push("selected");
    }
    if (this._disabled) {
      classNames.push("disabled");
    }
    return html`
      <div
        class="${classNames.join(" ")}"
        @click=${this.onClick}
        @keydown="${this.handleKeyPress}"
        tabindex="${ifDefined(this._disabled ? undefined : "0")}"
      >
        ${this._label}
      </div>
    `;
  }
}
