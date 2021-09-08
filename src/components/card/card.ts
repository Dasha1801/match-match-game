import './card.scss';
import { BaseComponent } from '../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  isBgGreen = false;

  backgroundCard: HTMLElement;

  constructor(readonly image: string) {
    super('div', ['card-container']);

    this.element.innerHTML = `
      <div class="card">
        <div class="card__bg"></div>
        <div class="card__front" style="background-image: url('./images/${image}')"></div>
        <div class="card__back"></div>
      </div>
    `;

    this.backgroundCard = this.element.querySelector('.card__bg')!;
  }

  applyBgTrue() :void {
    this.isBgGreen = true;
    this.backgroundCard.classList.add('true');
  }

  applyBgFalse() :void {
    this.isBgGreen = false;
    this.backgroundCard.classList.add('false');
  }

  applyBgDefault() :void {
    this.isBgGreen = false;
    this.backgroundCard.classList.remove('false');
  }

  flipToBack() :Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront() :Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
