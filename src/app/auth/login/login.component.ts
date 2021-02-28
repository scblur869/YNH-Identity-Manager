import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export interface JWT {
  access_token: string;
  refresh_token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() error?: string | null;
  public jt?: JWT;
  @Output() submitEM = new EventEmitter();
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.form.valid) {
      this.authService._login(this.form.value.username, this.form.value.password)
        .pipe(catchError(err => {
          this.error = err.statusText;
          return throwError(err);
        })
        )
        .subscribe((resp: string) => {
          if (resp === 'successful') {
            const details: string = this.cookieService.get('is-logged-in');

            const p = JSON.parse(details);
            localStorage.setItem('dn', p.display_name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' '));
            localStorage.setItem('role', p.role.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' '));
          }
          if ((this.cookieService.check('is-logged-in')) && (localStorage.getItem('role') === 'admin')) {
            this.router.navigate(['app'], {});
          }
        });
    }
  }

}

