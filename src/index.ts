import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

document.addEventListener('DOMContentLoaded', (_e) => {
  let dragSrcEl: HTMLDivElement;

  function handleDragStart(e: DragEvent, el: HTMLDivElement) {
    el.style.opacity = '0.4';

    dragSrcEl = el;

    if (e.dataTransfer !== null) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer?.setData('text/html', el.innerHTML);
    }
  }

  function handleDragEnd(el: HTMLDivElement) {
    el.style.opacity = '1';

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }

  function handleDragOver(e: DragEvent) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function handleDrop(e: DragEvent, el: HTMLDivElement) {
    e.stopPropagation(); // stops the browser from redirecting.

    if (dragSrcEl !== el) {
      dragSrcEl.innerHTML = el.innerHTML;
      el.innerHTML = e.dataTransfer?.getData('text/html') ?? "";
    }

    return false;
  }

  function handleDragEnter(el: HTMLDivElement) {
    el.classList.add('over');
  }

  function handleDragLeave(el: HTMLDivElement) {
    el.classList.remove('over');
  }

  let items = document.querySelectorAll('.container .box') as NodeListOf<HTMLDivElement>;
  items.forEach(function(item) {
    item.addEventListener('dragstart', (e) => handleDragStart(e, item), false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragenter', () => handleDragEnter(item), false);
    item.addEventListener('dragleave', () => handleDragLeave(item), false);
    item.addEventListener('dragend', () => handleDragEnd(item), false);
    item.addEventListener('drop', (e) => handleDrop(e, item), false);
  });
});
