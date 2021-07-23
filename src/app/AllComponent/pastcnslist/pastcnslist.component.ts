import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute } from '@angular/router';
import { EventService } from '../event/event.service'
import { routeurls } from '../../AllComponent/routeurls/routeurls'
import {FormControl} from '@angular/forms';
import {fromEvent, Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import {cnsdata } from '../cns-view/cnsdata'
import { CommonService } from '../common.service';

@Component({
  selector: 'app-pastcnslist',
  templateUrl: './pastcnslist.component.html',
  styleUrls: ['./pastcnslist.component.scss']
})
export class PastcnslistComponent implements OnInit {
  planClient = new FormControl();
  filteredOptions: Observable<string[]>;
  dataimage = ""
  datatext = ""
  cnstitle = ""
  heading = ""
  relatedNews = []
  search_type = ""
  clients: string[]
  pastcns = []
  constructor(private route: ActivatedRoute,public _router: Router,private eventService:EventService,private service: CommonService,) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  private _filter(value: string): string[] {
    //console.log("insiede filter");
    const filterValue = value.toLowerCase();
    return this.clients.filter(clients => clients.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    this.service.changeData('true'); 
    this.clients = []
    this.planClient.valueChanges.subscribe()
    this.filteredOptions = this.planClient.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    for (let i = 0; i<20; i++){
      let ins = localStorage.getItem("usersearch" + i.toString())
      console.log("ins--", ins)
      if(ins)
        this.clients.push(ins)
    } 
    this.pastcns = cnsdata.filter(x => !x.name.toLowerCase().includes("shaheen"))
    this.cnstitle = cnsdata[0].name

    this.route.params.subscribe(params => {
      this.cnstitle = params['id'];
      let oo = cnsdata.find(x=> x.name.toLocaleLowerCase().includes(this.cnstitle.toLowerCase()))
      this.dataimage = oo.image
      this.datatext = oo.data
      this.heading = oo.title
    })
  }
  gotohome(){
    this._router.navigate(['/']);
  }
  gotoid(id){
    this._router.navigate(['/viewtemptwo', id]);
  }
  _yearClick(param){
    //this._router.navigate(['/yearsearchresult', param]);
    console.log("paramm--", param)
    this._router.navigate(['/searchlist', "yearsearch:" + param, this.search_type]);
  }
  menueventsClick(navy_beyond_horizon){
    this._router.navigate(['/searchlist', "menusearch:" + navy_beyond_horizon, this.search_type])
  }
  FormSubmit1(){
    this._router.navigate(['/searchlist', this.planClient.value,this.search_type]);
    //this._router.navigate(['/viewtemptwo', id]);
  }
  FormSubmit(id){
    //this._router.navigate(['/searchlist', this.planClient.value]);
    this._router.navigate(['/viewtemptwo', id]);
  }
  gotocns(name){
    this._router.navigate(['/cns', name]);
  }
  pastcnsClick(){
    this._router.navigate(['/pastcns'])
  }

}
