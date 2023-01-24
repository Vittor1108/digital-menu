import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';
import { IEmploye } from 'src/app/interfaces/IEmployess-interface';
import { IScreens } from 'src/app/interfaces/IEmployess-interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private screensAcess: IScreens[] = [];
  public isAnEmployee: boolean = false;
  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.getFunctionUser();
  }

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

  public toggleMenuMobile = (): void => {
    const menu = document.querySelector<HTMLElement>('.primarySideBar');
    const bgModal = document.querySelector<HTMLElement>('.bgModal');
    menu?.classList.toggle('toggleMenuMobile');
    bgModal?.classList.toggle('db');
  };

  public toggleMenu = (): void => {
    const menu = document.querySelector<HTMLElement>('.primarySideBar');
    const main = document.querySelector<HTMLElement>('main');
    const barsMenu = document.querySelectorAll<HTMLElement>('.menu > span');
    barsMenu.forEach((e) => {
      e.classList.toggle('menuFull');
    });
    main?.classList.toggle('mainFullScreen');
    menu?.classList.toggle('toggleMenu');
  };

  public removeMenu = (): void => {
    const menu = document.querySelector<HTMLElement>('.primarySideBar');
    const bgModal = document.querySelector<HTMLElement>('.bgModal');
    bgModal?.classList.remove('db');
    menu?.classList.remove('toggleMenuMobile');
  };

  public verifyRoute = (route: string): boolean => {
    const location = window.location.href;
    const verify = location.includes(route) ? true : false;
    return verify;
  };

  private getFunctionUser = (): void => {
    this.homeService.getFunctionUser().subscribe({
      next: (res) => {
        if ('screeens' in res) {
          this.screensAcess = res.screeens;
          this.isAnEmployee = true;
        }
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  public authorizationScreens = (value: string): boolean => {
    const acessScreens = this.screensAcess.map((e) => e.name);
    return acessScreens.includes(value);
  };
}
