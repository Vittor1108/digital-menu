import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  private userToken: string;
  public errorValidation: boolean;
  constructor(
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.validationToken();
  }

  public redirect = (): void => {
    this.router.navigate(['']);
  };

  private validationToken = (): void => {
    this.activeRoute.params.subscribe(
      (params) => (this.userToken = params['id'])
    );

    this.authService.validationToken(this.userToken).subscribe({
      next: (res) =>{
        this.errorValidation = false;
      },
      error: (err) => {
        this.errorValidation = true;
      }
    });
  };
}
