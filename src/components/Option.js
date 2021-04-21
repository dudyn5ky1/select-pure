import { LitElement, html } from "lit-element";

export class Option extends LitElement {
  constructor() {
    super();
    console.log(this.textContent);
  }

  render() {
    return html`<div><slot></slot></div>`;
  }
}
