import { css, LitElement, html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";

import { KEYS } from "./constants";
import { Option, OptionPureElement } from "./../models";

// eslint-disable-next-line
const noop = () => {};
const defaultOption = {
  label: "",
  value: "",
  select: noop,
  unselect: noop,
  disabled: false,
  hidden: false,
  selected: false,
};

@customElement("select-pure")
export class SelectPure extends LitElement {
  static get styles() {
    return css`
      .select-wrapper {
        position: relative;
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
      }
      select[multiple] {
        z-index: 0;
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
        z-index: 1;
      }
      @media only screen and (hover: none) and (pointer: coarse){
        select {
          z-index: 2;
        }
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
        z-index: 100;
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

  @property() options: Option[] = [];

  @property() visible: boolean = false;

  @property() selectedOption: Option = defaultOption;

  @property() _selectedOptions: Option[] = [];

  @property() disabled: boolean = this.getAttribute("disabled") !== null;

  @property() _multiple: boolean = false;

  @property() name: string = this.getAttribute("name") || "";

  @property() _id: string = "";

  @property() formName: string = "";

  @property() value: string = "";

  @property() values: string[] = [];

  @property() defaultLabel: string = "";

  @property() _optionsLength: number = -1;

  private nativeSelect: HTMLSelectElement | null = null;

  private form: HTMLFormElement | null = null;

  private hiddenInput: HTMLInputElement | null = null;

  constructor() {
    super();

    // bindings
    this.close = this.close.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.processOptions = this.processOptions.bind(this);
    this.processForm = this.processForm.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // set properties
    this.disabled = this.getAttribute("disabled") !== null;
    this._multiple = this.getAttribute("multiple") !== null;
    this.name = this.getAttribute("name") || "";
    this._id = this.getAttribute("id") || "";
    this.formName =this.name || this.id;
    this.defaultLabel = this.getAttribute("default-label") || "";
  }

  public open() {
    if (this.disabled) {
      return;
    }
    this.visible = true;
    this.removeEventListeners();
    document.body.addEventListener("click", this.close, true);
  }

  public close(event?: Event) {
    // @ts-ignore
    if (event && this.contains(event.target)) {
      return;
    }
    this.visible = false;
    this.removeEventListeners();
  }

  public enable() {
    this.disabled = false;
  }

  public disable() {
    this.disabled = true;
  }

  get selectedIndex(): number | undefined {
    return this.nativeSelect?.selectedIndex;
  }

  set selectedIndex(index: number | undefined) {
    if (!index && index !== 0) {
      return;
    }
    this.onSelect(this.options[index].value);
  }

  get selectedOptions() {
    return this.nativeSelect?.selectedOptions;
  }

  private removeEventListeners() {
    document.body.removeEventListener("click", this.close);
  }

  private processForm() {
    this.form = this.closest("form");
    if (!this.form) {
      return;
    }
    this.hiddenInput = document.createElement("input");
    this.hiddenInput.setAttribute("type", "hidden");
    this.hiddenInput.setAttribute("name", this.formName);
    this.form.appendChild(this.hiddenInput);
  }

  private handleNativeSelectChange() {
    this.selectedIndex = this.nativeSelect?.selectedIndex;
  }

  private processOptions() {
    // @ts-ignore
    this.nativeSelect = this.shadowRoot.querySelector("select");
    const options = this.querySelectorAll("option-pure");
    this._optionsLength = options.length;
    for (let i = 0; i < options.length; i++) {
      const currentOption = options[i] as OptionPureElement;
      currentOption.setOnSelectCallback(this.onSelect);
      this.options[i] = currentOption.getOption();
      if (this.options[i].selected) {
        this.onSelect(this.options[i].value);
      }
      if (i === this._optionsLength - 1 && !this.selectedOption.value && !this._multiple) {
        this.selectOption(this.options[0], true);
      }
    }
    this.processForm();
  }

  private onSelect(optionValue: string) {
    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      if (option.value === optionValue) {
        this.selectOption(option);
        continue;
      }
      if (!this._multiple) {
        option.unselect();
      }
    }
    if (!this._multiple) {
      this.close();
    }
  }

  private selectOption(option: Option, isInitialRender?: boolean) {
    if (this._multiple) {
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
    if (this.form && this.hiddenInput) {
      this.hiddenInput.value = this._multiple ? this.values.join(",") : this.value;
      const event = new Event("change", { bubbles: true });
      this.hiddenInput.dispatchEvent(event);
    }
    if (isInitialRender) {
      return;
    }
    this.afterSelect();
  }

  private afterSelect() {
    this.dispatchEvent(new Event("change"));
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (event.which === KEYS.ENTER || event.which === KEYS.TAB) {
      this.open();
    }
  }

  private onCrossClick(event: Event, value: string) {
    event.stopPropagation();
    this.onSelect(value);
  }

  private renderNativeOptions() {
    return this.options.map(({ value, label, hidden, disabled }) => {
      let isSelected = this.selectedOption.value === value;
      if (this._multiple) {
        isSelected = Boolean(this._selectedOptions.find(option => option.value === value));
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

  private renderLabel() {
    if (this._multiple && this._selectedOptions.length) {
      return html`
        <div class="multi-selected-wrapper">
          ${this._selectedOptions.map(({ label, value }) => html`
              <span class="multi-selected">
                ${label}
                <span class="cross" @click=${(event: Event) => this.onCrossClick(event, value)}></span>
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
          @change=${this.handleNativeSelectChange}
          ?disabled=${this.disabled}
          ?multiple=${this._multiple}
          name="${ifDefined(this.name || undefined)}"
          id=${ifDefined(this.id || undefined)}
          size="1"
        >
          ${this.renderNativeOptions()}
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
            <slot @slotchange=${this.processOptions}></slot>
          </div>
        </div>
      </div>
    `;
  }
}
