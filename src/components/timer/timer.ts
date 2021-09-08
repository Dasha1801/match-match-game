import './timer.scss';
import { BaseComponent } from '../base-component';

export class Timer extends BaseComponent {
  time = 0;

  timerId?: NodeJS.Timeout;

  isTimer = false;

  constructor() {
    super('time', ['timer']);
    this.showTime();
  }

  startTimer() :void {
    this.isTimer = true;
    this.timerId = setInterval(() => {
      this.time++;
      this.showTime();
    }, 1000);
  }

  showTime() :void {
    this.element.textContent = Timer.gameTimer(this.time);
  }

  stopTimer() :void {
    this.isTimer = false;
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  static gameTimer(time:number):string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    let s = `${seconds}`;

    let m = `${minutes}`;
    if (seconds < 10) {
      s = `0${seconds}`;
    }
    if (minutes < 10) {
      m = `0${minutes}`;
    }
    return `${m}:${s}`;
  }

  clearTimer() :void {
    this.time = 0;
    this.stopTimer();
    this.showTime();
  }
}
