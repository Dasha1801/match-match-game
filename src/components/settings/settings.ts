import './settings.scss';
import { BaseComponent } from '../base-component';

export class Settings extends BaseComponent {
  cat : HTMLSelectElement;

  difficulty : HTMLSelectElement;

  constructor() {
    super('div', ['settings']);

    this.element.innerHTML = `
    <div class="settings__cards">
      <h3>Game cards</h3>
      <select name="" class="cat">
          <option value="animals">Animals</option>
          <option value="flags">Flags</option>
      </select>
    </div>
    <div class="settings__level">
      <h3>Game cards</h3>
      <select name="" class="difficulty">
          <option value="6">Easy</option>
          <option value="8">Middle</option>
          <option value="10">Hard</option>
      </select>
    </div>
    `;

    this.cat = <HTMLSelectElement> this.element.querySelector('.cat')!;
    this.difficulty = <HTMLSelectElement> this.element.querySelector('.difficulty')!;
  }

  getDifficulty() : string[] {
    if (this.difficulty.value === '10') {
      document.documentElement.style.setProperty('--card-flex', '1 1 calc(100% / 5)');
      document.documentElement.style.setProperty('--card-size', '5rem');
    } else if (this.difficulty.value === '8') {
      document.documentElement.style.setProperty('--card-flex', '1 1 calc(100% / 4)');
      document.documentElement.style.setProperty('--card-size', '5rem');
    } else {
      document.documentElement.style.setProperty('--card-flex', '1 1 calc(100% / 4)');
      document.documentElement.style.setProperty('--card-size', '6.5rem');
    }
    return [this.cat.value, this.difficulty.value];
  }
}
