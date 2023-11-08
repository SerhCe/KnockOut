import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  status: boolean = false;
  sidebarButton: boolean = false;

  clickEvent() {
    this.status = !this.status;
    this.sidebarButton = !this.sidebarButton;
  }
}
