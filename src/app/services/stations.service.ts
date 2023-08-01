import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  // searchName: any;

  stationHostName: any;
  stationsFileUrl: any;
  shopsFileUrl: any;
  stationImageUrl: any;
  getPageByIdHostName: any;
  slidersHostName: any;
  slidersImageUrl: any;
  addRentHostName: any;
  _lang_code = this.commonService.lang;

  constructor(private commonService: CommonService, private http: HttpClient) {
    this.stationHostName =
      this.commonService._hostName + 'projects.php?action=';
    this.stationImageUrl = this.commonService._ImageUrl + 'projects/';
    this.stationsFileUrl = this.commonService._ImageUrl + 'projects/files/';
    this.shopsFileUrl = this.commonService._ImageUrl + 'shops/files/';

    this.getPageByIdHostName =
      this.commonService._hostName + 'pages.php?action=';

    this.slidersHostName = this.commonService._hostName + 'sliders.php?action=';
    this.slidersImageUrl = this.commonService._ImageUrl + 'sliders/';

    this.addRentHostName = this.commonService._hostName + 'rentes.php?action=';
  }
  getPageById(id: any) {
    return this.http.get<any>(
      this.getPageByIdHostName +
        'getPageById' +
        '&id=' +
        id +
        '&lang_code=' +
        this._lang_code
    );
  }
  getSomeProjects(name: any) {
    return this.http.get<any>(
      this.stationHostName +
        'getSomeProjects' +
        '&lang_code=' +
        this._lang_code +
        '&pagename=' +
        name
    );
  }

  getOneProject(id: any, pageName = '') {
    const body = {
      id: id,
    };

    return this.http.post<any>(
      this.stationHostName +
        'getOneProject' +
        '&pagename=' +
        pageName +
        '&lang_code=' +
        this._lang_code,

      JSON.stringify(body)
    );
  }

  getProjectsStations(name: any) {
    return this.http.get<any>(
      this.stationHostName +
        'getProjectsStations' +
        '&searchName=' +
        name +
        '&lang_code=' +
        this._lang_code
    );
  }
  getSomeSliders() {
    return this.http.get<any>(
      this.slidersHostName + 'getSomeSliders' + '&lang_code=' + this._lang_code
    );
  }

  addRente(
    name: any,
    phone: any,
    email: any,
    notes: any,
    rante_time: any,
    shop_id: any,
    activity_type: any,
    // activity_name: any,
    commercial_registration_no: any
  ) {
    let body = {
      name: name,
      phone: phone,
      email: email,
      notes: notes,
      activity_type: activity_type,
      rante_time: rante_time,
      // activity_name: activity_name,
      commercial_registration_no: commercial_registration_no,
      shop_id: shop_id,
    };

    return this.http.post<any>(
      this.addRentHostName + 'addRente',
      JSON.stringify(body)
    );
  }

  sendMail(id: any, senderName: any) {
    return this.http.get<any>(
      this.addRentHostName +
        'SendMail' +
        '&rentId=' +
        id +
        '&senderName=' +
        senderName
    );
  }

  getstationWithAllRentedShop(){
    return this.http.get<any>(
      this.stationHostName +
        'getstationWithAllRentedShop' +
        '&lang_code=' +
        this._lang_code
    );
  }
}
