import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { CommonService } from './services/common.service';

// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tamiyoz';
  lang: any;

  direction: any;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private commonService: CommonService,
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService
  ) {
    translate.setDefaultLang('ar');
    translate.use(localStorage.getItem('lang') || 'ar');
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.http
      .get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`)
      .subscribe((res: any) => {
        console.log(res);
        this.ngxLoader.stop();
      });

    // GET LANGUAGE
    this.lang = localStorage.getItem('lang') || 'ar';
    // SCROLL UP WHEN SWITCH BETWEEN COMPONENTS
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.direction = this.commonService.getDirection();
  }
}
