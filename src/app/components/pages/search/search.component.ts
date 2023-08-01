import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  responseData: any[] = [];
  direction: any;

  companiesResults : any[] = [];
  stationsResults : any[] = [];
  projectsResults : any[] = [];

  // resultsLength:any;

  searchName: any;

  imageUrl = this.stationsService.stationImageUrl;

  title1: string =
    this.commonService.getDirection() == 'ltr'
      ? 'Search Results'
      : 'نتائج البحث';
  title1Link: string = '/search';

  constructor(
    private commonService: CommonService,
    private stationsService: StationsService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.direction = this.commonService.getDirection();

    this.commonService.insertTitleHeaderMain(this.title1);
    this.commonService.insertTitleHeader(this.title1);
    this.commonService.insertTitleHeaderLink(this.title1Link);
    this.commonService.insertSubTitleHeader('');
    this.commonService.insertAfterSubTitleHeader('');

    this.router.paramMap.subscribe((params: ParamMap) => {
      this.searchName = params.get('name');
      this.getProjectsStations(this.searchName);
    });

    this.commonService.setTitle(this.title1);

    
    
    
  }

  resultCheck() {
    if (this.responseData.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  searchEnterKey(){
    
    
    // window.open(`/search/` + this.searchName, '_self');
    this.route.navigate(['/search/' + this.searchName]); 
  }

  getProjectsStations(searchName: any) {
    this.companiesResults = [];
    this.projectsResults = [];
    this.stationsResults = [];
    this.stationsService.getProjectsStations(searchName).subscribe(
      (res: any) => {
        this.responseData = res.data;
        for (let index = 0; index < this.responseData.length; index++) {
          if (this.responseData[index]['project_type'] == 'companies') {
            this.companiesResults.push(this.responseData[index]);
          }
          if (this.responseData[index]['project_type'] == 'stations') {
            this.stationsResults.push(this.responseData[index]);
          }
          if (this.responseData[index]['project_type'] == 'projects') {
            this.projectsResults.push(this.responseData[index]);
          }
        }
        console.log('teeest');
        console.log(this.companiesResults);
        console.log(this.projectsResults);
        console.log(this.projectsResults);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
