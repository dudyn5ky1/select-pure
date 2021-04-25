[#](#) Custom JavaScript `<select>` component. Easy-to-use, accessible, mobile friendly and super efficient.

[![npm version](https://img.shields.io/npm/v/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![gzip size](http://img.badgesize.io/https://unpkg.com/select-pure/dist/bundle.min.js?compression=gzip&label=gzip)](https://unpkg.com/select-pure/dist/bundle.min.js)
[![brotli size](http://img.badgesize.io/https://unpkg.com/select-pure/dist/bundle.min.js?compression=brotli&label=brotli)](https://unpkg.com/select-pure/dist/bundle.min.js)
[![npm](https://img.shields.io/npm/dm/select-pure.svg)](https://www.npmjs.com/package/select-pure)
[![Build Status](https://travis-ci.org/dudyn5ky1/select-pure.svg?branch=master)](https://travis-ci.org/dudyn5ky1/select-pure)
[![codecov](https://codecov.io/gh/dudyn5ky1/select-pure/branch/master/graph/badge.svg)](https://codecov.io/gh/dudyn5ky1/select-pure)

## Description

SelectPure is a Web Component (Custom Element) which makes it super use and customize. Main goal is to use extended API of the native HTML `<select>` element and provide additional features, like autocomplete, custom styling and many more. The package itself is stable to be used, however, if you've found any issues, please report them [here](https://github.com/dudyn5ky1/select-pure/issues) or create a PR of your own.

If you want to use older version, please refer to this [README](./README-v1.md).

## Usage

SelectPure is very easy to use. At first you have to install a package

`yarn add select-pure` or `npm i select-pure --save`

then include it in your JavaScript file

`import 'select-pure';`

and use in the similar way as you would use a native HTML `<select>`.

```
<select-pure>
  <option-pure value="UA">Ukraine</option-pure>
  <option-pure value="PL">Poland</option-pure>
  <option-pure value="DE">Germany</option-pure>
  <option-pure value="US">USA</option-pure>
  <option-pure value="US" disabled>Russia</option-pure>
</select-pure>
```

## V2 TODO

2.0

[x] Dropdown with options;
[x] Hide dropdown on body click;
[x] Default selected option;
[x] Default not selectable option that acts like a default label;
[x] Disabled option;
[] Disabled select;
[] Callback after element got selected;
[] [List here attributes that can be set on the select];
[] Make sure it works correctly inside a `<form>`;
[] Custom styling (css variables)
[] Dynamically disable / enable select (API method);
[] Dynamically select an option (API method);
[] Dynamically update options array (API method);
[] Mobile devices support;
[] Accessibility (keyboard / tabs support);

2.1
[] Mutiple
[] Autocomplete input
[] Callback for autocomplete input
[] Custom matching/filter pattern
[] Fill README with React/Angular/Vue/Svelte/Purejs examples of usage;

2.2
[] Option groups;
[] Contribution guide;

## License

```MIT```
