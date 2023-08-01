import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title1: string =
    this.commonService.getDirection() == 'ltr' ? 'Home' : 'الرئيسية';

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.setTitle(this.title1);
  }
}
