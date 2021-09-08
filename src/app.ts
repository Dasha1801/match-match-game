import { Game } from './components/game/game';
import { ImageCategoryModel } from './models/image-category-model';
import { Header } from './components/header/header';
import { Register } from './components/register/register';
import { AboutGame } from './components/about-game/about-game';
import { Settings } from './components/settings/settings';

export class App {
  private readonly header: Header;

  register : Register;

  aboutGame : AboutGame;

  game: Game;

  settings: Settings;

  private gameImages?: string [];

  constructor(private readonly rootElement: HTMLElement) {
    window.location.hash = '';
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
    this.register = new Register();
    this.aboutGame = new AboutGame();
    this.settings = new Settings();

    window.addEventListener('hashchange', (e) => {
      const location = window.location.hash;

      if (this.register.isRegister) {
        this.header.getUserAccount();
      }
      if (location) {
        this.locationResolver(location, e);
      }
    });
    window.location.hash = '#/about-game';
  }

  async start() :Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const [cat, difficulty] = this.settings.getDifficulty();
    const images = categories.filter((el) => el.category === cat)[0].images.sort(() => (Math.random() * 1.5) - 1);
    const currentImages = images.slice(0, +difficulty).map((name) => `${cat}/${name}`);
    this.gameImages = currentImages;
  }

  initGame() : void {
    this.game.element.innerHTML = '';
    if (this.gameImages) this.game.newGame(this.gameImages);
    this.game.element.appendChild(this.game.cardsField.element);
    this.game.element.appendChild(this.game.timer.element);
  }

  locationResolver = async (location:string, e:HashChangeEvent):Promise<void> => {
    const oldUrl = (e.oldURL).split('#')[1];
    const newUrl = (e.newURL).split('#')[1];

    document.getElementById(oldUrl)?.classList.remove('active');
    document.getElementById(newUrl)?.classList.add('active');

    switch (location) {
      case '#/about-game':
        this.game.element.innerHTML = '';
        this.game.element.appendChild(this.aboutGame.element);
        this.header.startGame();
        this.game.timer.clearTimer();
        break;
      case '#/register':
        if (this.game.element.childElementCount === 1) {
          this.game.element.appendChild(this.register.element);
          this.register.popupShow();
        } else {
          this.register.popupShow();
        }
        break;
      case '#/game':
        await this.start();
        this.initGame();
        this.header.stopGame();
        break;
      case '#/settings':
        this.game.element.innerHTML = '';
        this.game.element.appendChild(this.settings.element);
        this.header.startGame();
        this.game.timer.clearTimer();
        break;
      default:
        break;
    }
  };
}
