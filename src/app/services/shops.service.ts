import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  shopHostName: any;
  shopImageUrl: any;
  _lang_code = this.commonService.lang;

  constructor(private commonService: CommonService, private http: HttpClient) {
    this.shopHostName = this.commonService._hostName + 'shops.php?action=';
    this.shopImageUrl = this.commonService._ImageUrl + 'shops/';
  }

  getSomeShops(stationId: any) {
    return this.http.get<any>(
      this.shopHostName +
        'getSomeShops' +
        '&lang_code=' +
        this._lang_code +
        '&station_id=' +
        stationId
    );
  }

  getOneShop(id: any) {
    let body = {
      id: id,
    };

    return this.http.post<any>(
      this.shopHostName + 'getOneShop' + '&lang_code=' + this._lang_code,
      JSON.stringify(body)
    );
  }
}
