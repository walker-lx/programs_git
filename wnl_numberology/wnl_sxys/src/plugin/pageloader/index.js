import './pageloader.css';

export default class PageLoader {
  constructor() {
    this.insertHTML();
  }

  insertHTML() {
    let htmlTpl = '<div class="pageload_mask hidden"><div class="maskImage"></div><div class="maskContent"></div></div>';
    document.body.insertAdjacentHTML('beforeEnd', htmlTpl);
    this.loaderItem = document.querySelector('.pageload_mask');
  }

  show() {
    this.loaderItem.classList.remove('hidden');
    this.loaderItem.querySelector('.maskImage').classList.remove('jumpOut');
    this.loaderItem.querySelector('.maskContent').classList.remove('jumpOut');
    // if (document.body.querySelector('.pageload_mask').length === 0) {
    //   this.insertHTML();
    // }
  }

  hide() {
    this.loaderItem.querySelector('.maskImage').classList.add('jumpOut');
    this.loaderItem.querySelector('.maskContent').classList.add('jumpOut');
    setTimeout(() => {
      this.loaderItem.classList.add('hidden');
    }, 330);
  }
}
