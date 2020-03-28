# SelectPure JavaScript component

[![npm version](https://img.shields.io/npm/v/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![gzip size](http://img.badgesize.io/https://unpkg.com/select-pure/dist/bundle.min.js?compression=gzip&label=gzip)](https://unpkg.com/select-pure/dist/bundle.min.js)
[![brotli size](http://img.badgesize.io/https://unpkg.com/select-pure/dist/bundle.min.js?compression=brotli&label=brotli)](https://unpkg.com/select-pure/dist/bundle.min.js)
[![npm](https://img.shields.io/npm/dt/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![Build Status](https://travis-ci.org/dudyn5ky1/select-pure.svg?branch=master)](https://travis-ci.org/dudyn5ky1/select-pure)
[![codecov](https://codecov.io/gh/dudyn5ky1/select-pure/branch/master/graph/badge.svg)](https://codecov.io/gh/dudyn5ky1/select-pure)

## Installation

#### NPM

```
npm i select-pure --save
```

#### Yarn

```
yarn add select-pure
```

#### CDN

```
<script src="https://unpkg.com/select-pure@latest/dist/bundle.min.js"></script>
```
## Usage

```javascript
import SelectPure from "select-pure";

new SelectPure(element, config);

`element` // Required. Either selector or HTML node.
`config` // Required. Configuration object.
```

### Configuration

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| [option](#option) | true | Array | Collection of options to be rendered. Each `option` consists of `value`, `label` and optional property `disabled`. Properties for the single option object are listed below. |
| [classNames](#classNames) | false | Object | Object with custom classNames to be used inside select. In the next major version default classNames will be removed and this property will become required. |
| multiple | false | Boolean | `true` if multiple options can be selected. |
| autocomplete | false | Boolean | Adds autocomplete input. Disabled by default. |
| icon | false | String | If specified - `<i></i>` will be inserted inside `select-pure__selected-label`. Works only with `multiple` option set to `true`. |
| inlineIcon | false | HMTLElement | Custom cross icon for multiple select. |
| value | false | String \| Array | Initially selected value. If not provided - first option will be selected. If `multiple` is `true` -- `Array` should be provided. |
| placeholder | false | String | Placeholder for cases when value is not selected by default. |
| onChange | false | Function | Callback that returns value when option is being selected. Returns `Array` if `multiple` is `true`. |

#### option

Properties of a single option passed to the options Array in configuration.

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| value | true | String | Value of an option. |
| label | true | String | Label of an option. |
| disabled | false | Boolean | `true` if option is disabled. `false` by default. |

#### classNames

In the next major version default classNames will be removed and this property will become required.

| Property | Default value | Description |
| --- | --- | --- |
| select | "select-pure__select" | Wrapper div. |
| dropdownShown | "select-pure__select--opened" | Applied to the wrapper when dropdown is shown. |
| multiselect | "select-pure__select--multiple" | Applied to the wrapper if it's a multiselect. |
| label | "select-pure__label" | Label span. |
| placeholder | "select-pure__placeholder" | Placeholder span. |
| dropdown | "select-pure__options" | Options dropdown. |
| option | "select-pure__option" | Single option. |
| optionDisabled | "select-pure__option--disabled" | Single option. |
| autocompleteInput | "select-pure__autocomplete" | Autocomplete input |
| selectedLabel | "select-pure__selected-label" | Selected label for multiselect. |
| selectedOption | "select-pure__option--selected" | Applied to option when selected. |
| placeholderHidden | "select-pure__placeholder--hidden" | Hides placeholder when the value is selected. |
| optionHidden | "select-pure__option--hidden" | Hides options that does not match autocomplete input. |


### API

| Method | Description |
| --- | --- |
| value() | Returns currently selected value. |
| reset() | Resets currently selected value. |

## Structure

```
select-pure/
└── lib/
    └── select-pure.min.js
```

## TODO

- [ ] API method for updating select.
- [ ] Mobile select support.
- [ ] Drop support of default classNames (starting from 1.x.x versions).
- [ ] Drop support of default icon, support only inline SVG instead. (starting from 1.x.x versions).

## License

```MIT```
