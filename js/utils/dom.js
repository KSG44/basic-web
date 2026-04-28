export function byId(id) {
  return document.getElementById(id);
}

export function setText(idOrElement, value) {
  const element = typeof idOrElement === "string" ? byId(idOrElement) : idOrElement;
  if (element) element.innerText = value;
}
