import { LitElement } from "lit";

export interface Option {
  label: string;
  value: string;
  select: Function;
  unselect: Function;
  hidden: boolean;
  disabled: boolean;
  selected: boolean;
}

export interface OptionPureElement extends LitElement {
  setOnSelectCallback: Function;
  setOnReadyCallback: Function;
  ready: boolean;
  getOption: Function;
}
