import './header.scss';
import { BaseComponent } from '../base-component';

export class Header extends BaseComponent {
  btnRegister: HTMLElement;

  iconUser: HTMLElement;

  btnStartGame: HTMLElement;

  constructor() {
    super('header', ['header']);
    this.element.innerHTML = `
    <div class="header__logo">
      <h1 class="logo title">MATCH</h1>
      <h3 class="logo">MATCH</h3>
    </div>
    <a class="header__nav active" href="#/about-game" id="/about-game">About Game</a>
    <a class="header__nav" href="#/settings" id="/settings">Game Settings</a>
    <a class="header__register" href="#/register">REGISTER</a>
    <div class="user__img" title="">
      <a class="start_game" href="#/game">Start</a>
    </div>
    `;

    this.btnRegister = this.element.querySelector('.header__register')!;
    this.iconUser = this.element.querySelector('.user__img')!;
    this.btnStartGame = this.element.querySelector('.start_game')!;
  }

  getUserAccount() :void {
    this.btnRegister.style.display = 'none';
    this.iconUser.style.display = 'flex';
  }

  stopGame() :void {
    this.btnStartGame.textContent = 'STOP';
    this.btnStartGame.setAttribute('href', '#/about-game');
  }

  startGame() :void {
    if (this.btnStartGame.textContent === 'STOP') {
      this.btnStartGame.textContent = 'START';
      this.btnStartGame.setAttribute('href', '#/game');
    }
  }
}
