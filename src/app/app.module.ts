import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './components/common/head/head.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TopsocialComponent } from './components/common/topsocial/topsocial.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { AboutusComponent } from './components/common/aboutus/aboutus.component';
import { ReadmorebuttonComponent } from './components/common/buttons/readmorebutton/readmorebutton.component';
import { OurservicesComponent } from './components/common/ourservices/ourservices.component';
import { ProjectsComponent } from './components/common/projects/projects.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { StatsComponent } from './components/common/stats/stats.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { PartnersComponent } from './components/common/partners/partners.component';
import { AnimatedDigitComponent } from './components/common/animated-digit/animated-digit.component';
import { StationComponent } from './components/pages/station/station.component';
import { NavbarsidemenuComponent } from './components/common/navbarsidemenu/navbarsidemenu.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

import { AboutuspageComponent } from './components/pages/aboutuspage/aboutuspage.component';
import { OurservicespageComponent } from './components/pages/ourservicespage/ourservicespage.component';
import { ContactpageComponent } from './components/pages/contactpage/contactpage.component';
import { SingleserviceComponent } from './components/pages/singleservice/singleservice.component';
import { MarketingComponent } from './components/pages/marketing/marketing.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AllprojectsComponent } from './components/pages/allprojects/allprojects.component';
import { AllstationsComponent } from './components/pages/allstations/allstations.component';
import { AllopportunitiesComponent } from './components/pages/allopportunities/allopportunities.component';
import { CompanyComponent } from './components/pages/company/company.component';
import { ProjectpageComponent } from './components/pages/projectpage/projectpage.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ShopComponent } from './components/pages/shop/shop.component';
// INSTALL NGX UI LOADER
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';
import { SearchComponent } from './components/pages/search/search.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TermsComponent } from './components/pages/terms/terms.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#d6be76',
  bgsOpacity: 1,
  bgsPosition: 'bottom-center',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#d6be76',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'ball-spin-clockwise',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(255, 255, 255, 1)',
  pbColor: '#d6be76',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};





@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    HomeComponent,
    TopsocialComponent,
    NavbarComponent,
    AboutusComponent,
    ReadmorebuttonComponent,
    OurservicesComponent,
    ProjectsComponent,
    StatsComponent,
    FooterComponent,
    PartnersComponent,
    AnimatedDigitComponent,
    StationComponent,
    NavbarsidemenuComponent,
    ClickOutsideDirective,

    AboutuspageComponent,
    OurservicespageComponent,
    ContactpageComponent,
    SingleserviceComponent,
    MarketingComponent,
    AllprojectsComponent,
    AllstationsComponent,
    AllopportunitiesComponent,
    CompanyComponent,
    ProjectpageComponent,
    TruncatePipe,
    ShopComponent,
    SearchComponent,
    TermsComponent,
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    CarouselModule,

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    // NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: false }),
  ],
  providers: [{ provide: 'localStorage', useFactory: getLocalStorage }],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
