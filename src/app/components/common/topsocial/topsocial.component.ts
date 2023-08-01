import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { throws } from 'assert';
import { ChancesService } from 'src/app/services/chances.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-topsocial',
  templateUrl: './topsocial.component.html',
  styleUrls: ['./topsocial.component.scss'],
})
export class TopsocialComponent implements OnInit {
  responseData: any = {};
  lang: any;

  searchName: any;

  topSearchBarOpen: boolean = false;

  searchBoxOpen: boolean = false;

  searchBoxCheck: boolean = false;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  topSearchBarOpenToggle() {
    this.topSearchBarOpen = !this.topSearchBarOpen;
    console.log(this.topSearchBarOpen);
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'ar';
    this.getAllSettings();

    // console.log(this.topSearchBarOpen);
    // console.log(searchName.value);
  }

  searchEnterKey() {
    // window.open(`/search/` + this.searchName, '_self');
    this.router.navigate(['/search/' + this.searchName]);
  }

  goToSearch() {
    this.router.navigate(['search']);
  }

  searchBoxShown() {
    this.searchBoxCheck = true;
    console.log(this.searchBoxCheck);
  }

  clickOutsideTopSearch() {
    this.topSearchBarOpen = false;
  }

  clickOutside() {
    this.searchBoxOpen = false;
  }

  toggleSearchBox() {
    this.searchBoxOpen = !this.searchBoxOpen;
  }

  getAllSettings() {
    this.commonService.getAllSettings().subscribe(
      (res: any) => {
        this.responseData = res.data;
        // console.log(this.responseData);
      },
      (err: any) => {
        console.log(err);
      }
    );
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
}
