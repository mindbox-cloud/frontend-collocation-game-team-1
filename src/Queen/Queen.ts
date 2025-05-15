import {Cell} from '~/Cell/Cell'

export class Queen extends Cell {
  constructor(x: number, y: number, size: number, i: number, j: number) {
    super(x, y, size, i, j)
    this.agent = 'queen'
  }

  private checkForFood(): void {}

  createAnt(): void {
    //создает муравья при наличии рядом с едой с вероятность Р1. Еда пропадает. С вероятностю Р2 создается муравей без еды
  }
}
