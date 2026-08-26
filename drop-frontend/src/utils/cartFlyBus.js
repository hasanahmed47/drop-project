export function triggerCartFly(x, y) {
  window.dispatchEvent(new CustomEvent('drop:cart-fly', { detail: { x, y } }));
}
