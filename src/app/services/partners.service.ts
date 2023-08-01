import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  _lang_code = this.commonService.lang;
  partnerHostName: any;
  partnersImageUrl: any;

  constructor(private commonService: CommonService, private http: HttpClient) {
    this.partnerHostName =
      this.commonService._hostName + 'partners.php?action=';

    this.partnersImageUrl = this.commonService._ImageUrl + 'partners/';
  }

  getSomePartners() {
    return this.http.get<any>(
      this.partnerHostName + 'getSomePartners' + '&lang_code=' + this._lang_code
    );
  }
}
