import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C55 Investment Builder';
  prevPage = null;
  nextPage = null;

  urls = {
    overview: {prev: null, next: 'assets'},
    assets: {prev: 'overview', next: 'summary'},
    summary: {prev: 'assets', next: null}
  };

  constructor(private router: Router, private http: HttpClient ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentPage = event.url.replace('/', '');
        this.prevPage = this.urls[currentPage].prev ? '/' + this.urls[currentPage].prev : null;
        this.nextPage = this.urls[currentPage].next ? '/' + this.urls[currentPage].next : null;
      }
    });
  }
}
