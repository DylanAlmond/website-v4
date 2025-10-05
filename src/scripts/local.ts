import Alpine from 'alpinejs';
import { ShapeCanvas } from '../components/ShapeCanvas';

customElements.define('shape-canvas', ShapeCanvas);

document.addEventListener('alpine:init', () => {
  console.log('Init Alpine');

  Alpine.store('menuOpen', false);

  // Controlled from `html` tag by layout component
  Alpine.data('inverted', (initialState = false) => ({
    inverted: initialState,
  }));

  // Close our menu when navigating to a new page
  document.addEventListener('astro:page-load', () => {
    Alpine.store('menuOpen', false);
  });
});
