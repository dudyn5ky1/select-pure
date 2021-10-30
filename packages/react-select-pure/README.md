# React wrapper for a custom JavaScript `<select>` component. Easy-to-use, accessible, mobile friendly and super efficient.

[![npm version](https://img.shields.io/npm/v/react-select-pure.svg)](https://www.npmjs.com/package/react-select-pure)
[![npm](https://img.shields.io/npm/dm/react-select-pure.svg)](https://www.npmjs.com/package/react-select-pure)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/react-select-pure)

## Description

SelectPure is a Web Component (Custom Element) which makes it super easy to use and customize. Main goal is to use extended API of the native HTML `<select>` element and provide additional features, like autocomplete, custom styling and many more. The package itself is stable to be used, however, if you've found any issues, please report them [here](https://github.com/dudyn5ky1/react-select-pure/issues) or create a PR of your own.

## Demo

Interactive demo with many examples is available [here](https://www.webcomponents.org/element/select-pure).

## Usage

SelectPure is very easy to use. At first you have to install a package

```bash
yarn add react-select-pure
```
or

```bash
npm i react-select-pure --save
```

then include it in your JavaScript file:

```javascript
import { SelectPure } from "react-select-pure";
```

```JSX
<SelectPure
  name="country"
  id="country"
  options={[
    { value: "", disabled: true, hideen: true, label: "-- Please select a country --" },
    { value: "UA", label: "Ukrane" },
    { value: "PL", label: "Poland" },
    { value: "DE", label: "Germany" },
    { value: "US", label: "USA" },
    { value: "RU", label: "Russia", disabled: true }
  ]}
/>
```

### Attributes

`<select-pure>` supports the following attributes: `name`, `id`, `multiple`, `default-label` and `disabled`.

`<option-pure>` supports `value`, `label`, `disabled`, `selected` and `hidden` attributes.

### Custom styles

SelectPure offers high level of customisation. You can match any design you want by just providing a simple set of css variables. Below you can find their names and default values that are included in the package.

```css
select-pure {
  --select-height: 44px;
  --select-width: 100%;
  --border-radius: 4px;
  --border-width: 1px;
  --border-color: #000;
  --padding: 0 10px;
  --dropdown-z-index: 2;
  --disabled-background-color: #bdc3c7;
  --disabled-color: #ecf0f1;
  --background-color: #fff;
  --color: #000;
  --hover-background-color: #e3e3e3;
  --hover-color: #000;
  --selected-background-color: #e3e3e3;
  --selected-color: #000;
  --dropdown-gap: 0;
  --font-size: 14px;
  --font-family: inherit;
  --font-weight: 400;
  --select-outline: 2px solid #e3e3e3;
  --dropdown-items: 4;
}
```

### `<form>` support

If you place `<SelectPure />` inside a `<form>` and specify a `name` or `id` props, it will then append a hidden `input` with a given name inside a `<form>` and trigger `change` event, when value is selected.

## TODO

- [ ] Multiple support
- [ ] Default label support
- [ ] Write tests
- [ ] Callbacks
- [ ] Methods

## License

```MIT```
