# Custom JavaScript `<select>` component. Easy-to-use, accessible, mobile friendly and super efficient.

[![npm version](https://img.shields.io/npm/v/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![gzip size](http://img.badgesize.io/https://unpkg.com/select-pure/dist/index.js?compression=gzip&label=gzip)](https://unpkg.com/select-pure/dist/index.js)
[![brotli size](http://img.badgesize.io/https://unpkg.com/select-pure/dist/index.js?compression=brotli&label=brotli)](https://unpkg.com/select-pure/dist/index.js)
[![npm](https://img.shields.io/npm/dm/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![Build Status](https://travis-ci.org/dudyn5ky1/select-pure.svg?branch=master)](https://travis-ci.org/dudyn5ky1/select-pure)
[![codecov](https://codecov.io/gh/dudyn5ky1/select-pure/branch/master/graph/badge.svg)](https://codecov.io/gh/dudyn5ky1/select-pure)

## Description

SelectPure is a Web Component (Custom Element) which makes it super easy to use and customize. Main goal is to use extended API of the native HTML `<select>` element and provide additional features, like autocomplete, custom styling and many more. The package itself is stable to be used, however, if you've found any issues, please report them [here](https://github.com/dudyn5ky1/select-pure/issues) or create a PR of your own.

If you want to use older version, please refer to this [README](./README-v1.md).

## Usage

SelectPure is very easy to use. At first you have to install a package

```bash
yarn add select-pure
```
or

```bash
npm i select-pure --save
```

then include it in your JavaScript file

```javascript
import 'select-pure';
```

and use in the similar way as you would use a native HTML `<select>`.

```javascript
<select-pure name="country" id="country">
  <option-pure value="" disabled hidden>-- Please select a country --</option-pure>
  <option-pure value="UA">Ukraine</option-pure>
  <option-pure value="PL">Poland</option-pure>
  <option-pure value="DE">Germany</option-pure>
  <option-pure value="US">USA</option-pure>
  <option-pure value="RU" disabled>Russia</option-pure>
</select-pure>
```

## SelectPure instance

In order to call API methods of the `SelectPure`, subscribe to callbacks or use it's properties, you can simple use `querySelector`.

```javascript
const selectPure = document.querySelector("select-pure");

console.log(selectPure.selectedIndex);

selectPure.disable();
```

### Attributes

`<select-pure>` supports the following attributes: `name`, `id` and `disabled`.

`<option-pure>` supports `value`, `label`, `disabled`, `selected` and `hidden` attributes.

### Available properties

| property      | description                                                                                                                                                                    |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selectedIndex | Returns index of the selected option. You can also manipulate selected value with changing this property (`selectPure.selectedIndex = 2`). Just like in the native `<select>`. |
| value         | Returns selected value.                                                                                                                                                        |

### Callbacks

If you want to set a callback for when the new value is selected, you can just use the traditional `addEventListener`.

```javascript
const selectPure = document.querySelector("select-pure");
selectPure.addEventListener("change", (event) => {
  // You can use
  // event.target.value or
  // event.currentTarget.value
});
```

### API methods

| method    | description        |
|-----------|--------------------|
| disable() | Disables select.   |
| enable()  | Enables select.    |
| open()    | Opens a dropdown.  |
| close()   | Closes a dropdown. |

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
}
```

### `<form>` support

If you place `<select-pure>` inside a `<form>` and specify a `name` or `id` attribute, it will then append a hidden `input` with a given name inside a `<form>` and trigger `change` event, when value is selected.

## TODO

- [ ] Autocomplete input
- [ ] Callback for autocomplete input
- [ ] Custom matching/filter pattern
- [ ] Fill README with React/Angular/Vue/Svelte/Purejs examples of usage;
- [ ] Precommit hooks;
- [ ] Add destroy method;
- [ ] Make sure Select behaves correctly when attributes are changed or options are removed from the DOM (MutationObserver);

2.1
- [ ] Option groups;
- [ ] Required attribute support
- [ ] Contribution guide;
- [ ] Position of the dropdown;


## License

```MIT```
