# SelectPure JavaScript component

[![npm version](https://img.shields.io/npm/v/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/select-pure.svg)](https://www.npmjs.com/package/select-pure)
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
| options | true | Array | Collection of options to be rendered. Each `option` consists of `value`, `label` and optional property `disabled`.  |
| options[].value | true | String | Value of an option. |
| options[].label | true | String | Label of an option. |
| options[].disabled | false | Boolean | `true` if option is disabled. `false` by default. |
| multiple | false | Boolean | `true` if multiple options can be selected. |
| autocomplete | false | Boolean | Adds autocomplete input. Disabled by default. |
| icon | false | String | If specified - `<i></i>` will be inserted inside `select-pure__selected-label`. Works only with `multiple` option set to `true`. |
| onChange | false | Function | Return value on select. Return `Array` if `multiple` is `true`. |
| value | false | String \| Array | Initially selected value. If not provided - first option will be selected. If `multiple` is `true` -- `Array` should be provided. |

### Example

```javascript
const form = new FormPure(".form-wrapper", {});
```

## Structure

```
select-pure/
└── lib/
    └── select-pure.min.js
```

## TODO

- [ ] Callback for updating select
- [ ] React wrapper
- [ ] Angular wrapper

## License

```MIT```
