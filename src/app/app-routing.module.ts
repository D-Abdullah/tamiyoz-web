import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutuspageComponent } from './components/pages/aboutuspage/aboutuspage.component';
import { AllopportunitiesComponent } from './components/pages/allopportunities/allopportunities.component';
import { AllprojectsComponent } from './components/pages/allprojects/allprojects.component';
import { AllstationsComponent } from './components/pages/allstations/allstations.component';
import { CompanyComponent } from './components/pages/company/company.component';
import { ContactpageComponent } from './components/pages/contactpage/contactpage.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MarketingComponent } from './components/pages/marketing/marketing.component';
import { OurservicespageComponent } from './components/pages/ourservicespage/ourservicespage.component';
import { ProjectpageComponent } from './components/pages/projectpage/projectpage.component';
import { SearchComponent } from './components/pages/search/search.component';
import { ShopComponent } from './components/pages/shop/shop.component';
import { SingleserviceComponent } from './components/pages/singleservice/singleservice.component';
import { StationComponent } from './components/pages/station/station.component';
import { TermsComponent } from './components/pages/terms/terms.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'app-aboutuspage', component: AboutuspageComponent },
  { path: 'ourservices', component: OurservicespageComponent },
  { path: 'contact', component: ContactpageComponent },
  { path: 'project-page/:id', component: StationComponent },
  { path: 'single-service/:id', component: SingleserviceComponent },
  { path: 'marketing', component: MarketingComponent },
  { path: 'news', component: AllprojectsComponent },
  { path: 'projects', component: AllstationsComponent },
  { path: 'allopportunities', component: AllopportunitiesComponent },
  { path: 'company/:id', component: CompanyComponent },
  { path: 'news-page/:id', component: ProjectpageComponent },
  { path: 'shop/:id', component: ShopComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:name', component: SearchComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
