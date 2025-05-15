import {Cell} from '~/Cell/Cell'

export class Queen extends Cell {
  constructor(x: number, y: number, size: number, i: number, j: number) {
    super(x, y, size, i, j)
    this.agent = 'queen'
  }

  public drawQueen(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = 'brown';
    ctx.arc(this.x + this.size/4, this.y + this.size/4, this.size/4, 0, Math.PI * 2);
    ctx.fill();
}

  private checkForFood(): void {}

  createAnt(): void {
    //создает муравья при наличии рядом с едой с вероятность Р1. Еда пропадает. С вероятностю Р2 создается муравей без еды
  }
}
