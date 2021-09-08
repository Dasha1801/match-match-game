import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 5;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  isClick = false;

  constructor() {
    super('div', ['cards-field']);
  }

  clear() :void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) :void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    this.isClick = false;
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
      this.isClick = true;
    }, SHOW_TIME * 1000);
  }
}
