import './register.scss';
import { BaseComponent } from '../base-component';

export class Register extends BaseComponent {
  isRegister = false;

  btnCancel : HTMLButtonElement;

  btnAddUser: HTMLButtonElement;

  userName: HTMLInputElement;

  lastName: HTMLInputElement;

  email: HTMLInputElement;

  constructor() {
    super('div', ['popup']);

    this.element.innerHTML = `
    <div class="popup__form">
    <form action="" class="registrationForm">
      <label for="" class="nameField">Last name</label>
      <input type="text" class="names" pattern="^([А-Яа-яё]{1,30}|[A-Za-z]{1,30})$" required placeholder="Joe">
      <label for="" class="nameField">First name</label>
      <input type="text" class="names last" pattern="^([А-Яа-яё]{1,30}|[A-Za-z]{1,30})$" required placeholder="Ann">
      <label for="" class="nameField">Email</label>
      <input type="email" class="email" pattern="^[-\\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$"
      required placeholder="match-game@mail.ru" maxlength="30">
    </form>
    <div class="popup__form__avatar"><button class="btn add_user" type="submit" disabled>Add user</button>
      <button class="btn cancel">cancel</button>
    </div>
  </div>
    `;

    this.btnCancel = this.element.querySelector('.btn.cancel')!;
    this.btnAddUser = this.element.querySelector('.btn.add_user')!;
    this.userName = this.element.querySelector('.names')!;
    this.lastName = this.element.querySelector('.names.last')!;
    this.email = this.element.querySelector('.email')!;

    this.btnCancel.onclick = () => {
      this.popupHide();
      window.history.back();
      this.cleanForm();
    };
    this.userName.oninput = () => {
      this.formValidate();
    };
    this.lastName.oninput = () => {
      this.formValidate();
    };
    this.email.oninput = () => {
      this.formValidate();
    };
  }

  popupHide(): void {
    this.element.style.display = 'none';
  }

  popupShow(): void {
    this.element.style.display = 'block';
  }

  formValidate(): void {
    if (/^([А-Яа-яё]{1,30}|[A-Za-z]{1,30})$/gm.test(this.userName.value)
      && /^([А-Яа-яё]{1,30}|[A-Za-z]{1,30})$/gm.test(this.lastName.value)
      && /^[-\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$/i.test(this.email.value)) {
      this.btnAddUser.disabled = false;
      this.btnAddUser.onclick = () => {
        this.popupHide();
        this.isRegister = true;
        window.history.back();
        this.cleanForm();
        this.btnAddUser.disabled = true;
      };
    } else {
      this.btnAddUser.disabled = true;
    }
  }

  cleanForm(): void {
    this.userName.value = '';
    this.lastName.value = '';
    this.email.value = '';
  }
}
