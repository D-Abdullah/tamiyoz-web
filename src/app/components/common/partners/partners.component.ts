import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import AOS from "aos";
import { PartnersService } from 'src/app/services/partners.service';

// declare var filejs: any;

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  responseData: any[] = [];

  imageUrl = this.partnersService.partnersImageUrl;

  constructor(private partnersService: PartnersService) {}

  ngOnInit(): void {
    AOS.init();

    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      // offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });

    this.getSomePartners();
  }

  getSomePartners() {
    this.partnersService.getSomePartners().subscribe(
      (res: any) => {
        this.responseData = res.data;
        // console.log(this.responseData);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  partnersArray: any = [
    { imgName: 'assets/img/partners/partner1.png' },
    { imgName: 'assets/img/partners/partner2.png' },
    { imgName: 'assets/img/partners/partner3.png' },
    { imgName: 'assets/img/partners/partner4.png' },
    { imgName: 'assets/img/partners/partner1.png' },
    { imgName: 'assets/img/partners/partner2.png' },
    {
      imgName:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Badan_Informasi_Geospasial_logo.png/525px-Badan_Informasi_Geospasial_logo.png',
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 2000,
    autoHeight: true,

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
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
}
