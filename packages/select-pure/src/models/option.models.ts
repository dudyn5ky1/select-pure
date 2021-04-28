import {LitElement} from "lit";

export interface Option {
  label: string;
  value: string;
  select: Function;
  unselect: Function;
  hidden: boolean;
  disabled: boolean;
}

export interface OptionPureElement extends LitElement {
  getOption: Function;
  setOnSelectCallback: Function;
}
