
/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

function handleDragStart(element: HTMLElement) {
  element.style.opacity = '0.2';
}

function handleDragEnd(element: HTMLElement) {
  element.style.opacity = '1';
}

let items = document.querySelectorAll('.container .box') as NodeListOf<HTMLElement>;
items.forEach(function(item: HTMLElement) {
  item.addEventListener('dragstart', () => handleDragStart(item), false);
  item.addEventListener('dragend', () => handleDragEnd(item), false);
});
