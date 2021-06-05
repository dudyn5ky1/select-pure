import { css, LitElement, html } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { KEYS } from "./../constants";

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

  @property() isSelected: boolean = false;

  @property() isDisabled: boolean = false;

  @property() isHidden: boolean = false;

  @property() optionValue: string = "";

  @property() displayedLabel: string = "";

  @property() optionIndex: number = -1;

  private onSelect?: Function;

  private onReady?: Function;

  constructor() {
    super();

    this.fireOnSelectCallback = this.fireOnSelectCallback.bind(this);
    this.select = this.select.bind(this);
    this.unselect = this.unselect.bind(this);
    this.getOption = this.getOption.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.isSelected = this.getAttribute("selected") !== null;
    this.isDisabled = this.getAttribute("disabled") !== null;
    this.isHidden = this.getAttribute("hidden") !== null;
    this.optionValue = this.getAttribute("value") || "";
    this.assignDisplayedLabel();

    this.fireOnReadyCallback();
  }

  public getOption() {
    return {
      label: this.displayedLabel,
      value: this.optionValue,
      select: this.select,
      unselect: this.unselect,
      selected: this.isSelected,
      disabled: this.isDisabled,
      hidden: this.isHidden,
    };
  }

  public select() {
    this.isSelected = true;
    this.setAttribute("selected", "");
  }

  public unselect() {
    this.isSelected = false;
    this.removeAttribute("selected");
  }

  public setOnReadyCallback(onReadyCallback: Function, optionIndex: number) {
    this.onReady = onReadyCallback;
    this.optionIndex = optionIndex;
  }

  public setOnSelectCallback(callback: Function) {
    this.onSelect = callback;
  }

  private assignDisplayedLabel() {
    if (this.textContent) {
      this.displayedLabel = this.textContent;
      return;
    }
    if (this.getAttribute("label")) {
      this.displayedLabel = this.getAttribute("label") || "";
    }
  }

  private fireOnReadyCallback() {
    if (!this.onReady) {
      return;
    }
    this.onReady(this.getOption(), this.optionIndex);
  }

  private fireOnSelectCallback(optionClickEvent: Event) {
    optionClickEvent.stopPropagation();
    if (!this.onSelect || this.isDisabled) {
      return;
    }
    this.onSelect(this.optionValue);
  }

  private fireOnSelectIfEnterPressed(keyboardKeydownEvent: KeyboardEvent) {
    if (keyboardKeydownEvent.key === KEYS.ENTER) {
      this.fireOnSelectCallback(keyboardKeydownEvent);
    }
  }

  render() {
    const optionWrapperClassNames = ["option"];
    if (this.isSelected) {
      optionWrapperClassNames.push("selected");
    }
    if (this.isDisabled) {
      optionWrapperClassNames.push("disabled");
    }
    return html`
      <div
        class="${optionWrapperClassNames.join(" ")}"
        @click=${this.fireOnSelectCallback}
        @keydown="${this.fireOnSelectIfEnterPressed}"
        tabindex="${ifDefined(this.isDisabled ? undefined : "0")}"
      >
        <slot hidden @slotchange=${this.assignDisplayedLabel}></slot>
        ${this.displayedLabel}
      </div>
    `;
  }
}
