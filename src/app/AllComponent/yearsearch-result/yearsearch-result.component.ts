import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-yearsearch-result',
  templateUrl: './yearsearch-result.component.html',
  styleUrls: ['./yearsearch-result.component.scss']
})
export class YearsearchResultComponent implements OnInit {
  resss
  constructor(private route: ActivatedRoute,public _router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resss = params['id'];
      
    })
  }

}
