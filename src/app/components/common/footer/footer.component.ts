import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, ElementRef, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common.service';

import { Loader } from '@googlemaps/js-api-loader';






@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  responseData: any = {};
  direction: any;
  windowScrolled: any;

  chatBubble: boolean = true;

  lat: any;
  lng: any;
  map_url: any;
  main_map_url: any;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private commonService: CommonService,
    private sanitizer: DomSanitizer
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset > 500
      // document.documentElement.scrollTop ||
      // document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  googleCustomMap() {
    let loader = new Loader({
      apiKey: 'AIzaSyC7EZmrvFGBhKwUmLi-bh8Jqw6tIdmZEa0',
      version: 'weekly',
      // libraries: ['places'],
    });

    loader.load().then(() => {
      const image = {
        url: './assets/img/tamiyoz-map1.png',
        scaledSize: new google.maps.Size(60, 60),
      };
      const map = new google.maps.Map(
        document.getElementById('mapFooter') as HTMLElement,
        {
          center: { lat: this.lat, lng: this.lng },
          zoom: 12,
        }
      );
      new google.maps.Marker({
        position: { lat: this.lat, lng: this.lng },
        map,
        title: 'Tamiyoz Map',
        icon: image,
      });
    });
  }

  ngOnInit(): void {
    this.direction = this.commonService.getDirection();
    this.getAllSettings();
  }

  getAllSettings() {
    this.commonService.getAllSettings().subscribe(
      (res: any) => {
        this.responseData = res.data;
        
        this.lat = parseFloat(this.responseData.latitude);
        this.lng = parseFloat(this.responseData.longitude);
        this.main_map_url = `https://www.google.com/maps/search/?api=1&query=${this.lat},${this.lng}`;
        this.googleCustomMap();
        // this.map_url = this.sanitizer.bypassSecurityTrustResourceUrl(
        //   `https://maps.google.com/maps?q=${this.lat},${this.lng}&hl=es&z=14&amp&output=embed`
        // );
        // console.log(this.responseData);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  goToLink(url: any) {
    window.open(url, '_blank');
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
