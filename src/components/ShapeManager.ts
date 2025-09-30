export interface ShapeOptions {
  type?: 'polygon' | 'circle' | 'rectangle';
  percentX: number;
  percentY: number;
  radius?: number;
  width?: number;
  height?: number;
  sides?: number;
  speed?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string | null;
  offset?: number;
  rotation?: number;
  borderRadius?: number | number[];
}

export interface Shape extends Required<Omit<ShapeOptions, 'strokeDasharray'>> {
  strokeDasharray: string | null;
  borderRadius: number[];
  rotationRad: number;
  direction: number;
  phase: number;
  t: number;
}

export class ShapeManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private shapes: Shape[] = [];
  private scaleFactor: number = 1;
  private debug: boolean = false;

  constructor(
    canvas: HTMLCanvasElement,
    shapes: ShapeOptions[] = [],
    debug: boolean = false,
  ) {
    // const canvas = document.getElementById(
    //   canvasId,
    // ) as HTMLCanvasElement | null;
    if (!canvas) throw new Error(`Canvas not found`);

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;
    if (!ctx) throw new Error('Could not get 2D context');

    this.canvas = canvas;
    this.ctx = ctx;

    shapes.forEach((o) => this.addShape(o));

    this.debug = debug;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    requestAnimationFrame(() => this.animate());
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.scaleFactor = Math.max(
      0.5,
      Math.min(window.innerWidth, window.innerHeight) / 1080,
    );
  }

  public addShape(options: ShapeOptions) {
    const {
      type = 'polygon',
      percentX,
      percentY,
      radius = 50,
      width = 100,
      height = 100,
      sides = 5,
      speed = 0.01,
      stroke = '#000000',
      strokeWidth = 4,
      strokeDasharray = null,
      borderRadius = 0,
      offset = 60,
      rotation = 0,
    } = options;

    let borderRadiusArray: number | number[] = [];
    if (type === 'polygon' && !Array.isArray(borderRadius)) {
      borderRadiusArray = new Array(sides).fill(borderRadius);
    } else {
      borderRadiusArray = borderRadius;
    }

    const rotationRad =
      (((sides % 2 === 0 ? -180 / sides : -90) + rotation) * Math.PI) / 180;
    const direction = Math.random() < 0.5 ? 1 : -1;
    const phase = Math.random() * 2 * Math.PI;

    this.shapes.push({
      type,
      percentX,
      percentY,
      radius,
      width,
      height,
      sides,
      speed,
      stroke,
      strokeWidth,
      strokeDasharray,
      offset,
      rotation,
      rotationRad,
      direction,
      phase,
      borderRadius: borderRadiusArray,
      t: 0,
    } as Shape);
  }

  private drawPolygon(
    ctx: CanvasRenderingContext2D,
    shape: Shape,
    centerX: number,
    centerY: number,
    scale: number,
  ) {
    const points: [number, number][] = [];
    for (let i = 0; i < shape.sides; i++) {
      const theta = (2 * Math.PI * i) / shape.sides + shape.rotationRad;
      const x = centerX + shape.radius * scale * Math.cos(theta);
      const y = centerY + shape.radius * scale * Math.sin(theta);
      points.push([x, y]);
    }

    ctx.beginPath();
    const n = points.length;
    for (let i = 0; i < n; i++) {
      const radius = shape.borderRadius[i] * scale;
      const prev = points[(i - 1 + n) % n];
      const curr = points[i];
      const next = points[(i + 1) % n];

      const v1x = prev[0] - curr[0];
      const v1y = prev[1] - curr[1];
      const v2x = next[0] - curr[0];
      const v2y = next[1] - curr[1];

      const len1 = Math.sqrt(v1x * v1x + v1y * v1y);
      const len2 = Math.sqrt(v2x * v2x + v2y * v2y);
      const n1x = v1x / len1;
      const n1y = v1y / len1;
      const n2x = v2x / len2;
      const n2y = v2y / len2;

      const dot = n1x * n2x + n1y * n2y;
      const angle = Math.acos(Math.max(-1, Math.min(1, dot)));

      const tanDist = radius / Math.tan(angle / 2);

      const p1x = curr[0] + n1x * tanDist;
      const p1y = curr[1] + n1y * tanDist;
      const p2x = curr[0] + n2x * tanDist;
      const p2y = curr[1] + n2y * tanDist;

      if (i === 0) ctx.moveTo(p1x, p1y);
      else ctx.lineTo(p1x, p1y);

      ctx.arcTo(curr[0], curr[1], p2x, p2y, radius);
    }
    ctx.closePath();
  }

  private drawShape(shape: Shape) {
    const ctx = this.ctx;
    const { width, height } = this.canvas;

    const originX = width * shape.percentX;
    const originY = height * shape.percentY;
    const scale = this.scaleFactor;

    shape.t += shape.speed;
    const scaledOffset = shape.offset * scale;

    const centerX =
      originX +
      scaledOffset * Math.cos(shape.direction * shape.t + shape.phase);
    const centerY =
      originY +
      scaledOffset * Math.sin(shape.direction * shape.t + shape.phase);

    ctx.lineWidth = shape.strokeWidth * scale;
    ctx.strokeStyle = shape.stroke;
    if (shape.strokeDasharray)
      ctx.setLineDash(shape.strokeDasharray.split(',').map(Number));
    else ctx.setLineDash([]);

    // Show shape origin on debug
    if (this.debug) {
      ctx.fillStyle = 'purple';

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(shape.rotationRad);
      ctx.beginPath();
      ctx.arc(0, 0, 10 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    switch (shape.type) {
      case 'circle':
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(shape.rotationRad);
        ctx.beginPath();
        ctx.arc(0, 0, shape.radius * scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        break;

      case 'rectangle':
        const w = (shape.width ?? shape.radius * 2) * scale;
        const h = (shape.height ?? shape.radius * 2) * scale;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(shape.rotationRad);
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, shape.borderRadius);
        ctx.stroke();
        ctx.restore();
        break;

      case 'polygon':
      default:
        this.drawPolygon(ctx, shape, centerX, centerY, scale);
        ctx.stroke();
        break;
    }
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const shape of this.shapes) {
      this.drawShape(shape);
    }
    requestAnimationFrame(() => this.animate());
  }
}
