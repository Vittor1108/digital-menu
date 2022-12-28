import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-snack-atetion',
  templateUrl: './snack-atetion.component.html',
  styleUrls: ['./snack-atetion.component.scss'],
})
export class SnackAtetionComponent implements OnInit {
  @Input() title: string;
  @Input() messageAtention: string;
  @Input() events: Observable<void>;
  private eventSubscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.eventSubscription = this.events.subscribe(() => this.showSnackBar());
  }

  public showSnackBar = (): void => {
    const snack = document.querySelector<HTMLElement>('.snackAtention');
    snack?.classList.add('showSnackBar');
    setTimeout(() => {
      snack?.classList.remove('showSnackBar');
    }, 5000);
  };
}
