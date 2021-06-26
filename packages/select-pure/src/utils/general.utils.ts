// eslint-disable-next-line
export const noop = () => {};

export const isAttributePresent = (element: HTMLElement, name: string) => element.getAttribute(name) !== null;

export const getAttributeOrDefault = (element: HTMLElement, name: string, defaultValue: string) => element.getAttribute(name) || defaultValue;
