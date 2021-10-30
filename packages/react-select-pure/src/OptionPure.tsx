import React from "react";
import { OptionProps } from "./models";

export const OptionPure = (props: OptionProps) => {
  const { value, label, selected, disabled, hidden } = props;
  return (
    <option-pure
      value={value}
      label={label}
      selected={selected}
      disabled={disabled}
      hidden={hidden}
    />
  );
}
