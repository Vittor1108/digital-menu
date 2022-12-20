import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public showAccordion = (numberAccordion: number): void => {
    const accordions = document.querySelectorAll<HTMLElement>('.accordion');
    accordions[numberAccordion].classList.toggle('show');
    accordions.forEach((e, index) => {
      if (index === numberAccordion) {
        return;
      }

      e.classList.remove('show');
    });
  };

  public toggleMenu = (): void => {
    const menu = document.querySelector<HTMLElement>('.primarySideBar');
    const barsMenu = document.querySelectorAll<HTMLElement>('.menu > span');
    barsMenu.forEach((e) => {
      e.classList.toggle('menuFull');
    });
    const main = document.querySelector<HTMLElement>('main');
    main?.classList.toggle('mainFullScreen');
    menu?.classList.toggle('toggleMenu');
  };
}
