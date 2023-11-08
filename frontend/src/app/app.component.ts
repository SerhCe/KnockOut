import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'knockout-frontend';
  sessionUserID: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.setSessionUserID(params['user_id']);
    });
  }

  setSessionUserID(sessionID: string) {
    if (!sessionStorage.hasOwnProperty('session_user_id')) {
      if (sessionID != undefined) {
        for (let i = 0; i < sessionID.length; i++) {
          this.sessionUserID = this.sessionUserID + sessionID[i];
        }
        sessionStorage.setItem('session_user_id', this.sessionUserID);
      }
    }
  }

  getSessionUserID() {
    return sessionStorage.getItem('session_user_id');
  }
}
