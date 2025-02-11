import BinCheckWidget from "./Widget.js"

const parentEl = document.querySelector('.wrapper');

const form = new BinCheckWidget(parentEl);

form.bindToDOM();