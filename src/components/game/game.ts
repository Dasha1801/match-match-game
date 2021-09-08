import './game.scss';
import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { Timer } from '../timer/timer';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  timer: Timer;

  constructor() {
    super('main', ['main']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.timer = new Timer();
    this.element.appendChild(this.timer.element);
  }

  newGame(images: string[]) :void {
    this.cardsField.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', async (e) => {
        if (!(e.target as Element).classList.contains('card-container')) {
          await this.cardHandler(card);
          if (cards.every((checkCard) => checkCard.isBgGreen)) {
            this.timer.stopTimer();

            setTimeout(() => {
              alert('The end of the game!');
              window.location.hash = '#/about-game';
              this.timer.clearTimer();
            }, 1000);
          }
        }
      });
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) :Promise<void> {
    if (!this.cardsField.isClick) return;
    if (!this.timer.isTimer) this.timer.startTimer();
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      card.applyBgFalse();
      this.activeCard.applyBgFalse();
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      card.applyBgDefault();
      this.activeCard.applyBgDefault();
    } else {
      card.applyBgTrue();
      this.activeCard.applyBgTrue();
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
