const allowedAttributes = {
  value: "data-value",
  disabled: "data-disabled",
  class: "class",
  type: "type",
};

class Element {
  constructor(element, attributes = {}, i18n = {}) {
    this._node = element instanceof HTMLElement ? element : document.createElement(element);
    this._config = { i18n };

    this._setAttributes(attributes);

    if (attributes.textContent) {
      this._setTextContent(attributes.textContent);
    }

    return this;
  }

  get() {
    return this._node;
  }

  append(element) {
    this._node.appendChild(element);
    return this;
  }

  addClass(className) {
    this._node.classList.add(className);
    return this;
  }

  removeClass(className) {
    this._node.classList.remove(className);
    return this;
  }

  toggleClass(className) {
    this._node.classList.toggle(className);
    return this;
  }

  addEventListener(type, callback) {
    this._node.addEventListener(type, callback);
    return this;
  }

  removeEventListener(type, callback) {
    this._node.removeEventListener(type, callback);
    return this;
  }

  setText(text) {
    this._setTextContent(text);
    return this;
  }

  getHeight() {
    return window.getComputedStyle(this._node).height;
  }

  setTop(top) {
    this._node.style.top = `${top}px`;
    return this;
  }

  focus() {
    this._node.focus();
    return this;
  }

  _setTextContent(textContent) {
    this._node.textContent = textContent;
  }

  _setAttributes(attributes) {
    for (const key in attributes) {
      if (allowedAttributes[key] && attributes[key]) {
        this._setAttribute(allowedAttributes[key], attributes[key]);
      }
    }
  }

  _setAttribute(key, value) {
    this._node.setAttribute(key, value);
  }
}

export default Element;
