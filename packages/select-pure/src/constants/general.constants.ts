import { noop } from "./../utils";

export const defaultOption = {
  label: "",
  value: "",
  select: noop,
  unselect: noop,
  disabled: false,
  hidden: false,
  selected: false,
};
