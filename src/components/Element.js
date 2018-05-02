const allowedAttributes = {
  value: "data-value",
  disabled: "data-disabled",
  class: "class",
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

  addEventListener(type, callback) {
    this._node.addEventListener(type, callback);
    return this;
  }

  _onChange() {
    if (this._onChangeCallback) {
      if (this._node.type === "file") {
        this._onChangeCallback(this._node.files);
        return;
      }
      this._onChangeCallback(this._node.value);
    }
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
