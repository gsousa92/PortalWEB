import Slideout from 'slideout';

import { Injectable } from '@angular/core';

@Injectable()
export class SlideoutService {
  isOpen: Boolean;
  touchEnabled: Boolean;

  globalSlideout: any;

  init(panel: any, menu: any) {
    this.globalSlideout = new Slideout({
      panel: panel,
      menu: menu,
      padding: 165,
      tolerance: 70
    });
  }

  // constructor() {};

  enableTouch() {
    this.globalSlideout.enableTouch();
    this.touchEnabled = true;
  }

  disableTouch() {
    this.globalSlideout.disableTouch();
    this.touchEnabled = false;
  }

  open() {
    this.globalSlideout.open();
    this.isOpen = true;
  }

  close() {
    this.globalSlideout.close();
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.globalSlideout.close();
      this.isOpen = false;
    } else {
      this.globalSlideout.open();
      this.isOpen = true;
    }
  }
}
