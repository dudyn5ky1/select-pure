import React from "react";
import "select-pure";

import { SelectPureProps, OptionPureProps, SelectProps, OptionProps } from "./models";
import { OptionPure } from "./OptionPure";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "select-pure": SelectPureProps,
      "option-pure": OptionPureProps
    }
  }
}

export const SelectPure = (props: SelectProps) => {
  const { options, id, name } = props;
  return (
    <select-pure
      id={id}
      name={name}
    >
      {options.map((optionProps: OptionProps) => <OptionPure {...optionProps} />)}
    </select-pure>
  );
};
