type ElementOptions = {
  style?: Record<string, string>;
  classList?: string[];
};

export const Div = (options?: ElementOptions): HTMLDivElement => {
  const div = document.createElement('div');

  if (!options) {
    return div;
  }

  if (options.style) {
    for (const property in options.style) {
      div.style.setProperty(property, options.style[property]);
    }
  }

  if (options.classList) {
    div.classList.add(...options.classList);
  }

  return div;
};
