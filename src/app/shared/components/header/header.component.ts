import { Component } from '@angular/core';

@Component({
  selector: 'um-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public title = 'User Management';
}
