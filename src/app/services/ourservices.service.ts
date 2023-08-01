import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class OurservicesService {
  _lang_code = this.commonService.lang;
  ourservicesHostName: any;
  ourservicesImageUrl: any;

  constructor(private commonService: CommonService, private http: HttpClient) {
    this.ourservicesHostName =
      this.commonService._hostName + 'services.php?action=';

    this.ourservicesImageUrl = this.commonService._ImageUrl + 'services/';
  }

  getSomeServices() {
    return this.http.get<any>(
      this.ourservicesHostName +
        'getSomeServices' +
        '&lang_code=' +
        this._lang_code
    );
  }
  getOneService(id: any) {
    let body = {
      id: id,
    };

    return this.http.post<any>(
      this.ourservicesHostName +
        'getOneService' +
        '&lang_code=' +
        this._lang_code,
      JSON.stringify(body)
    );
  }
}
