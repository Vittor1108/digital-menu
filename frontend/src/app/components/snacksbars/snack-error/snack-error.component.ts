import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-snack-error',
  templateUrl: './snack-error.component.html',
  styleUrls: ['./snack-error.component.scss'],
})
export class SnackErrorComponent implements OnInit {
  @Input() title: string;
  @Input() messageError: string;
  @Input() events: Observable<void>;
  private eventSubscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.eventSubscription = this.events.subscribe(() => this.showSnackBar());
  }


  public showSnackBar = (): void => {
    const snack = document.querySelector<HTMLElement>('.snackError');
    snack?.classList.add('showSnackBar');
    setTimeout(() => {
      snack?.classList.remove('showSnackBar');
    }, 5000);
  };
}
