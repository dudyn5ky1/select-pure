import { html, TemplateResult } from "lit";

import { SelectController } from "./../models";
import { SelectBaseController } from "./select-base.controller";

export class MultiChoiceSelectController extends SelectBaseController implements SelectController {
  renderNativeSelect(): TemplateResult {
    return html`
      <select
        @change=${this.handleNativeSelectChange}
        ?disabled=${this.disabled}
        multiple
        name="${ifDefined(this.name || undefined)}"
        id=${ifDefined(this.id || undefined)}
        size="1"
      >
        ${this.getNativeOptionsHtml()}
      </select>
    `;
  }
}
