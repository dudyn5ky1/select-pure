var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, LitElement, html } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { KEYS } from "./constants";
let OptionPure = class OptionPure extends LitElement {
    constructor() {
        super();
        this.selected = this.getAttribute("selected") !== null;
        this.disabled = this.getAttribute("disabled") !== null;
        this.value = this.getAttribute("value") || "";
        this.label = this.textContent || this.getAttribute("label") || "";
        // bindings
        this.onClick = this.onClick.bind(this);
        this.select = this.select.bind(this);
        this.unselect = this.unselect.bind(this);
        this.getOption = this.getOption.bind(this);
    }
    static get styles() {
        return css `
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
    //public
    getOption() {
        return {
            label: this.label,
            value: this.value,
            select: this.select,
            unselect: this.unselect,
            selected: this.selected,
            disabled: this.disabled,
        };
    }
    select() {
        this.selected = true;
        this.setAttribute("selected", "");
    }
    unselect() {
        this.selected = false;
        this.removeAttribute("selected");
    }
    setOnSelectCallback(callback) {
        this.onSelect = callback;
    }
    onClick(event) {
        if (!this.onSelect || this.disabled) {
            event.stopPropagation();
            return;
        }
        this.onSelect(this.value);
    }
    handleKeyPress(event) {
        if (event.which === KEYS.ENTER) {
            this.onClick(event);
        }
    }
    render() {
        const classNames = ["option"];
        if (this.selected) {
            classNames.push("selected");
        }
        if (this.disabled) {
            classNames.push("disabled");
        }
        return html `
      <div
        class="${classNames.join(" ")}"
        @click=${this.onClick}
        @keydown="${this.handleKeyPress}"
        tabindex="${ifDefined(this.disabled ? "0" : undefined)}"
      >
        ${this.label}
      </div>
    `;
    }
};
__decorate([
    property()
], OptionPure.prototype, "selected", void 0);
__decorate([
    property()
], OptionPure.prototype, "disabled", void 0);
__decorate([
    property()
], OptionPure.prototype, "value", void 0);
__decorate([
    property()
], OptionPure.prototype, "label", void 0);
OptionPure = __decorate([
    customElement("option-pure")
], OptionPure);
export { OptionPure };
//# sourceMappingURL=Option.js.map