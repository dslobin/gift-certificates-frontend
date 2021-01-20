import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../core/http/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
