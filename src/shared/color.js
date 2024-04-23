export { default as default } from 'picocolors';

export const rgb = (/** @type {number} */ r, /** @type {number} */ g, /** @type {number} */ b) =>
	`\x1b[38;2;${r};${g};${b}m`;
export const bgrgb = (/** @type {number} */ r, /** @type {number} */ g, /** @type {number} */ b) =>
	`\x1b[48;2;${r};${g};${b}m`;

export const brand = (/** @type {string} */ str) => `${rgb(28, 132, 236)}${str}\x1b[0m`;
export const bgBrand = (/** @type {string} */ str) => `${bgrgb(28, 132, 236)}${str}\x1b[0m`;
