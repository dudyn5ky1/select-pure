import { LitElement, html } from "lit-element";

export class Select extends LitElement {
  static get properties() {
    return {
      options: [],
    };
  }

  constructor() {
    super();

    this.options = [];
    const options = this.querySelectorAll("option");
    for (let i = 0; i < options.length; i++) {
      const { textContent, value } = options[i];
      this.options.push({
        label: textContent,
        value,
      });
    }
  }

  get selectedIndex() {
    return 0;
  }

  renderOptions() {
    return this.options.map(({ value, label }) => html`<option value=${value}>${label}</option>`);
  }

  render() {
    return html`
      <select>
        ${this.renderOptions()}
      </select>
    `;
  }
}
