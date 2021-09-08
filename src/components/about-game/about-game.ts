import './about-game.scss';
import { BaseComponent } from '../base-component';

export class AboutGame extends BaseComponent {
  constructor() {
    super('div', ['register']);

    this.element.innerHTML = `
    <h3 class="register__title">How to play?</h3>
        <div class="register__game">
          <div class="register__step1">
            <span class="register__number">1</span><p class="register__rule">Register new player in game</p>
          </div>
          <div class="register__step2">
           <span class="register__number step2">2</span> <p class="register__rule">Configure your game settings</p>
          </div>
          <div class="register__step3">
          <span class="register__number">3</span>
          <p class="register__rule">Start you new game! Remember card positions and match it before times
            up</p>
          </div>
        </div>
    `;
  }
}
