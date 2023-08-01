import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';


import {
  NavigationStart,
  Event as NavigationEvent,
  Router,
} from '@angular/router';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-navbarsidemenu',
  templateUrl: './navbarsidemenu.component.html',
  styleUrls: ['./navbarsidemenu.component.scss'],
})
export class NavbarsidemenuComponent implements OnInit {
  isOpened: boolean = false;
  checkEndUrl: any;
  lang: any;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService
  ) {
    // CHANGE HEADER IF HOME PAGE OR ANOTHER PAGE
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        // console.log(event.url)
        this.checkEndUrl = event.url;
        // this.checkHomeUrl();
        this.isOpened = false;
      }
    });
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'ar';
  }

  changeLang(lang: any) {
    localStorage.setItem('lang', lang);
    window.location.reload();

    const htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    htmlTag.lang = lang;
    this.translate.use(lang);
  }

  showConsole() {
    this.isOpened = !this.isOpened;
    // console.log(this.isOpened);
  }

  clickOutside() {
    this.isOpened = false;
    // console.log(this.isOpened);
  }
}
