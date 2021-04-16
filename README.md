[#](#) SelectPure JavaScript component

[![npm version](https://img.shields.io/npm/v/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![gzip size](http://img.badgesize.io/https://unpkg.com/select-pure/dist/bundle.min.js?compression=gzip&label=gzip)](https://unpkg.com/select-pure/dist/bundle.min.js)
[![brotli size](http://img.badgesize.io/https://unpkg.com/select-pure/dist/bundle.min.js?compression=brotli&label=brotli)](https://unpkg.com/select-pure/dist/bundle.min.js)
[![npm](https://img.shields.io/npm/dt/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![Build Status](https://travis-ci.org/dudyn5ky1/select-pure.svg?branch=master)](https://travis-ci.org/dudyn5ky1/select-pure)
[![codecov](https://codecov.io/gh/dudyn5ky1/select-pure/branch/master/graph/badge.svg)](https://codecov.io/gh/dudyn5ky1/select-pure)

## V2 TODO

Abstraction component, built on top of HTMl `<select>` element. It extends native API and allows to implement a custom styling.

### Use cases

#### Single selectable value

1. Empty select;
2. Array of options, with no default value;
3. Array of options with a default value (preselected);
4. Callback after element got selected;
5. [List here attributes that can be set on the select];
6. Make sure it works correctly inside a `<form>`;
7. Dynamically select an option (API method);
8. Dynamically update options array (API method);
9. Disabled select;
10. Disabled option;
11. Dynamically disable / enable select (API method);
12. Fill README with React/Angular/Vue/Svelte/Purejs examples of usage;


#### Multiple values can be selected (multiple)

All of the above but allow multiple selected options;

#### Autocomplete

1. Provide a way to search and filter options;
2. Provide a way to fire a callback when user enters search string (nothing filtered??);
3. Custom matching pattern (or/and provide matching options);

#### Out of MVP scope

1. Custom styles (developer provides own stylesheet);
2. Option to not render styles;
3. Contribution guide;
4. Option groups;


### Browser support



## License

```MIT```
