import { watermark } from './core/watermark';
import './main.css';

const target = document.querySelector<HTMLElement>('#watermark-target');
const removeButton = document.querySelector<HTMLButtonElement>('#remove-watermark');
const restoreButton = document.querySelector<HTMLButtonElement>('#restore-watermark');

if (target) {
  const content = 'common-watermark\n仅用于演示';
  watermark.setWatermark(content, target);

  removeButton?.addEventListener('click', () => watermark.removeWatermark(target));
  restoreButton?.addEventListener('click', () => watermark.setWatermark(content, target));
}
