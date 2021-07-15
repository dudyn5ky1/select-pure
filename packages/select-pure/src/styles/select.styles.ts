import { css } from "lit";

export const selectStyles = css`
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
    max-height: calc(var(--select-height, 44px) * var(--dropdown-items, 4) + var(--border-width, 1px) * calc(var(--dropdown-items, 4) - 1));
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
