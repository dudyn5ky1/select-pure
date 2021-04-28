import { LitElement } from "lit";
export declare class OptionPure extends LitElement {
    static get styles(): import("lit").CSSResultGroup;
    selected: boolean;
    disabled: boolean;
    value: string;
    label: string;
    private onSelect?;
    constructor();
    getOption(): {
        label: string;
        value: string;
        select: () => void;
        unselect: () => void;
        selected: boolean;
        disabled: boolean;
    };
    select(): void;
    unselect(): void;
    setOnSelectCallback(callback: Function): void;
    private onClick;
    private handleKeyPress;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=Option.d.ts.map