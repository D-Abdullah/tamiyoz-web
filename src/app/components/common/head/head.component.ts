import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
// import { Title } from '@angular/platform-browser';
import { Router,NavigationStart,NavigationEnd, Event as NavigationEvent } from '@angular/router';
import {CommonService} from '../../../services/common.service'

import { OwlOptions } from 'ngx-owl-carousel-o';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StationsService } from 'src/app/services/stations.service';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  checkEndUrl: any;
  homeCheck: any;
  // newTitle: string = 'About Us Page';
  headerTextMain: any;
  headerText: any;
  headerTextLink: any;
  headerSubText: any;
  headerSubTextLink: any;
  headerAfterSubText: any;
  headerAfterSubTextLink: any;
  direction: any;

  longTitle1: boolean = false;

  responseData: any[] = [];
  imageUrl = this.stationsService.slidersImageUrl;

  sliderArray: any = [
    { imgName: 'assets/img/home/home2.jpg' },
    { imgName: 'assets/img/home/home1.png' },

    { imgName: 'assets/img/home/home3.jpg' },
  ];

  sliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    dotsData: false,
    navSpeed: 700,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 2000,
    autoHeight: true,

    animateOut: 'fadeOut',
    // animateIn: 'fadeIn',

    autoplayHoverPause: false,
    // dotsContainer: true,
    navText: [
      "<i class='bx bx-chevron-right'></i>",
      "<i class='bx bx-chevron-left'></i>",
    ],

    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  constructor(
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    private stationsService: StationsService
  ) {
    //GET PAGE TITLE MAIN
    this.commonService.getTitleHeaderMain.subscribe((name) => {
      this.headerTextMain = name;

      this.headerTextMain = name;
      let title = this.headerTextMain;
      if (title.length > 53) {
        this.longTitle1 = true;
      }
    });
    //GET PAGE TITLE
    this.commonService.getTitleHeader.subscribe((name) => {
      this.headerText = name;
    });
    //GET PAGE TITLE LINK
    this.commonService.getTitleHeaderLink.subscribe((name) => {
      this.headerTextLink = name;
    });
    //GET PAGE SUB TITLE
    this.commonService.getSubTitleHeader.subscribe((name) => {
      this.headerSubText = name;
    });
    //GET PAGE SUB TITLE LINK
    this.commonService.getSubTitleHeaderLink.subscribe((name) => {
      this.headerSubTextLink = name;
    });
    //GET PAGE AFTER SUB TITLE
    this.commonService.getAfterSubTitleHeader.subscribe((name) => {
      this.headerAfterSubText = name;
    });
    //GET PAGE AFTER SUB TITLE LINK
    this.commonService.getAfterSubTitleHeaderLink.subscribe((name) => {
      this.headerAfterSubTextLink = name;
    });

    // this.checkHomeUrl();

    // CHANGE HEADER IF HOME PAGE OR ANOTHER PAGE
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        // console.log(event.url)
        this.checkEndUrl = event.url;
        this.checkHomeUrl();
      }
    });
  }

  // CHECK IF THIS IS HOME PAGE OR NOT TO CHANGE HEADER
  checkHomeUrl() {
    if (this.checkEndUrl == '/home' || this.checkEndUrl == '/') {
      this.homeCheck = true;
    } else {
      this.homeCheck = false;
    }
  }

  ngOnInit(): void {
    // this.checkHomeUrl();
    const lang = localStorage.getItem('lang') || 'ar';
    this.direction = this.commonService.getDirection();

    this.getSomeSliders();
  }

  getSomeSliders() {
    this.stationsService.getSomeSliders().subscribe(
      (res: any) => {
        this.responseData = res.data;
        console.log(this.responseData);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
