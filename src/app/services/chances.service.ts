import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ChancesService {
  _lang_code = this.commonService.lang;
  chancesHostName: any;
  chancesImageUrl: any;

  constructor(private commonService: CommonService, private http: HttpClient) {
    this.chancesHostName = this.commonService._hostName + 'chances.php?action=';

    this.chancesImageUrl = this.commonService._ImageUrl + 'chances/';
  }

  getSomeChances() {
    return this.http.get<any>(
      this.chancesHostName + 'getSomeChances' + '&lang_code=' + this._lang_code
    );
  }
  
}
