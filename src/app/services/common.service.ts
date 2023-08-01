import { EventEmitter, Injectable, Output, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { stringify } from '@angular/compiler/src/util';

declare var jquery: any;
declare var $: any;

interface Script {
  src: string;
  loaded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  settingsHostName: any;

  // siteName: string = this.getDirection() == 'ltr' ? 'Tamyioz' : 'تميز';
  siteName: any;

  public title: any;
  public header: any;

  public lang: any;
  direction: string = 'rtl';

  // MAIN COMMON SERVICES **********************
  public _hostName = 'https://tamiyoz.com/api/web-api/';
  // public _hostName = 'http://192.168.1.14/tamiyoz/api/web-api/';
  // public _ImageUrl = 'http://192.168.1.14/tamiyoz/api/uploads/';
  public _ImageUrl = 'https://tamiyoz.com/api/uploads/';

  public _scripts: Script[] = [];

  @Output() getTitleHeaderMain: EventEmitter<any> = new EventEmitter();
  @Output() getTitleHeader: EventEmitter<any> = new EventEmitter();
  @Output() getTitleHeaderLink: EventEmitter<any> = new EventEmitter();
  @Output() getSubTitleHeader: EventEmitter<any> = new EventEmitter();
  @Output() getSubTitleHeaderLink: EventEmitter<any> = new EventEmitter();
  @Output() getAfterSubTitleHeader: EventEmitter<any> = new EventEmitter();
  @Output() getAfterSubTitleHeaderLink: EventEmitter<any> = new EventEmitter();

  @Output() changeCartUpdated: EventEmitter<any> = new EventEmitter();
  public loaderimg = 'assets/img/loading-1.gif';

  public_url = 'web-api/common.php?action=';

  private _Urlcommon: string = this._hostName + 'common.php?action=';
  private _UrlPages: string = this._hostName + 'pages.php?action=';
  private _UrlUsers: string = this._hostName + 'users.php?action=';
  // END MAIN COMMON SERVICES **********************

  constructor(
    private titleService: Title,
    private http: HttpClient,
    private router: Router,
    private meta: Meta
  ) // private translate : TranslateService
  {
    this.title = titleService.getTitle();

    this.lang = localStorage.getItem('lang') || 'ar';

    this.settingsHostName = this._hostName + 'settings.php?action=';
  }

  addMetaTag(name:any, content:any){
    this.meta.addTag({
      name: name,
      content: content,
    });
  }

  getDirection() {
    if (this.lang == 'en') {
      this.direction = 'ltr';
      this.siteName = 'Tamyioz';
    } else {
      this.direction = 'rtl';
      this.siteName = 'تميز';
    }
    return this.direction;
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(this.siteName + ' | ' + newTitle);
  }

  insertTitleHeaderMain(name: any) {
    this.getTitleHeaderMain.emit(name);
  }
  insertTitleHeader(name: any) {
    this.getTitleHeader.emit(name);
  }
  insertTitleHeaderLink(name: any) {
    this.getTitleHeaderLink.emit(name);
  }
  insertSubTitleHeader(name: any) {
    this.getSubTitleHeader.emit(name);
  }
  insertSubTitleHeaderLink(name: any) {
    this.getSubTitleHeaderLink.emit(name);
  }
  insertAfterSubTitleHeader(name: any) {
    this.getAfterSubTitleHeader.emit(name);
  }
  insertAfterSubTitleHeaderLink(name: any) {
    this.getAfterSubTitleHeaderLink.emit(name);
  }

  getAllSettings() {
    return this.http.get<any>(this.settingsHostName + 'getAllSettings');
  }
}
