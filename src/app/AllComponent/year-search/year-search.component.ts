import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-year-search',
  templateUrl: './year-search.component.html',
  styleUrls: ['./year-search.component.scss']
})
export class YearSearchComponent implements OnInit {

  constructor(public _router: Router) { }

  ngOnInit(): void {
  }

  _yearClick(param){
    //this._router.navigate(['/yearsearchresult', param]);
    console.log("paramm--", param)
    this._router.navigate(['/searchlist', "yearsearch:" + param]);
  }
  gotohome(){
    this._router.navigate(['/']);
  }


}
