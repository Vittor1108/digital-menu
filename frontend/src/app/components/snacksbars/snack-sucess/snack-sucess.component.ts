import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-snack-sucess',
  templateUrl: './snack-sucess.component.html',
  styleUrls: ['./snack-sucess.component.scss'],
})
export class SnackSucessComponent implements OnInit {
  @Input() title: string;
  @Input() messageSucess: string;
  @Input() events: Observable<void>;
  private eventSubscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.eventSubscription = this.events.subscribe(() => this.showSnackBar());
  }

  public showSnackBar = (): void => {
    const snack = document.querySelector<HTMLElement>('.snackSucess');
    snack?.classList.add('showSnackBar');
    setTimeout(() => {
      snack?.classList.remove('showSnackBar');
    }, 5000);
  };
}
