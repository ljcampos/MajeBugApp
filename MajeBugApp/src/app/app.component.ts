import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _accountervice:AccountService, private _router:Router) {}

  exit() {
    this._accountervice.doLogout();
    this._router.navigate(['/login']);
  }
}
