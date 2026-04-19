export const createEl = (tag, id = null, ...classes) => {
  const el = document.createElement(tag);
  if (id) el.id = id;
  if (classes) el.classList.add(...classes);
  return el;
};

export const createDiv = (id = null, ...classes) => {
  const div = document.createElement("div");
  if (id) div.id = id;
  if (classes) div.classList.add(...classes);
  return div;
};

export const createTextElement = (tag, text = "", id = null, ...classes) => {
  const el = createEl(tag, id, ...classes);
  el.textContent = text;
  return el;
};

export const createTextDiv = (text = "", id = null, ...classes) => {
  const div = createDiv(id, ...classes);
  div.textContent = text;
  return div;
};

export const appendChildren = (parent, ...children) => {
  parent.append(...children);
  return parent;
};

export const createInput = (type, id = null, placeholder = "", ...classes) => {
  const input = createEl("input", id, ...classes);
  input.type = type;
  input.placeholder = placeholder;
  return input;
};

export const createButton = (text, id = null, ...classes) => {
  const button = createEl("button", id, ...classes);
  button.type = "button";
  button.textContent = text;
  return button;
};

export const clearElement = (el) => {
  el.textContent = "";
};

export const createIconButton = (label, svgMarkup, ...classes) => {
  const button = createEl("button", null, ...classes);
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.innerHTML = svgMarkup;
  return button;
};

export const createImg = (src, alt = "", id = null, ...classes) => {
  const img = createEl("img", id, ...classes);
  img.src = src;
  img.alt = alt;
  return img;
};
