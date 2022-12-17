import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.validationToken();
  }

  public redirect = () => {
    this.router.navigate(['']);
  };

  private validationToken = () => {
    this.activeRoute.params.subscribe((params) => console.log(params['id']));
  };
}
