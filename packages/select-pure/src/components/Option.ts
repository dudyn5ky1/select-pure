import { boundMethod } from "autobind-decorator";
import { LitElement, html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";

import { KEYS } from "./../constants";
import { optionStyles } from "./../styles";

@customElement("option-pure")
export class OptionPure extends LitElement {
  static get styles() {
    return optionStyles;
  }

  @property() isSelected: boolean = false;
  @property() isDisabled: boolean = false;
  @property() isHidden: boolean = false;
  @property() optionValue: string = "";
  @property() displayedLabel: string = "";
  @property() optionIndex: number = -1;

  private onSelect?: Function;
  private onReady?: Function;

  connectedCallback() {
    super.connectedCallback();

    this.isSelected = this.getAttribute("selected") !== null;
    this.isDisabled = this.getAttribute("disabled") !== null;
    this.isHidden = this.getAttribute("hidden") !== null;
    this.optionValue = this.getAttribute("value") || "";
    this.assignDisplayedLabel();

    this.fireOnReadyCallback();
  }

  @boundMethod
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

  @boundMethod
  public select() {
    this.isSelected = true;
    this.setAttribute("selected", "");
  }

  @boundMethod
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

  private assignDisplayedLabel() {
    if (this.textContent) {
      this.displayedLabel = this.textContent;
      return;
    }
    if (this.getAttribute("label")) {
      this.displayedLabel = this.getAttribute("label") || "";
    }
  }

  @boundMethod
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
}
