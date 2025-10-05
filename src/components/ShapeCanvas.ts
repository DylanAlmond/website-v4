import { ShapeManager, type ShapeOptions } from './ShapeManager';

export class ShapeCanvas extends HTMLElement {
  public id: string = `shapeCanvas-${Math.random().toString(36).substring(2, 11)}`;
  private canvas!: HTMLCanvasElement;
  private shapes: ShapeOptions[] = [];
  private manager: ShapeManager | null = null;
  private hasInitialized = false;

  static get observedAttributes() {
    return ['shapes', 'disabled'];
  }

  connectedCallback() {
    // If already initialized (persisted element), do nothing
    if (this.hasInitialized && this.shadowRoot && this.manager) {
      this.manager.start();
      return;
    }

    // Check if shadow root already exists (shouldn't happen with the flag, but safety check)
    if (this.shadowRoot) {
      this.canvas = this.shadowRoot.querySelector('canvas')!;
      this.hasInitialized = true;
      return;
    }

    // First time setup
    const shadow = this.attachShadow({ mode: 'open' });

    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.overflow = 'hidden';

    shadow.appendChild(this.canvas);

    this.initManager();
    this.hasInitialized = true;
  }

  disconnectedCallback() {
    this.manager?.stop();
  }

  attributeChangedCallback(name: string) {
    if (name === 'disabled' && this.manager) {
      if (this.isDisabled()) {
        this.manager.stop();
      } else {
        this.manager.start();
      }
    }
  }

  private isDisabled() {
    return this.hasAttribute('disabled');
  }

  private initManager() {
    const shapesAttr = this.getAttribute('shapes');

    if (shapesAttr) {
      try {
        this.shapes = JSON.parse(shapesAttr);
      } catch {
        console.warn('Invalid shapes JSON');
      }
    }

    if (this.canvas && this.shapes.length > 0 && !this.manager) {
      this.manager = new ShapeManager(this.canvas, this.shapes, false);
    }
  }
}
