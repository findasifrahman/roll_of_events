import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonService } from './AllComponent/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bnArchieve';
  //@Input() showsearchattoolbar = false
  showsearchattoolbar = false
  loading = false;


  constructor(private router: Router,public _router: Router,private service: CommonService) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  private _filter(value: string): string[] {
    //console.log("insiede filter");
    const filterValue = value.toLowerCase();

    return this.clients.filter(clients => clients.toLowerCase().includes(filterValue));
  }
  ngOnInit() {
    this.service.data$.subscribe(res => {
      if(res.includes("true")){
          this.showsearchattoolbar = true
      }else{
        this.showsearchattoolbar = false
      }
    })  

    this.clients = []
    for (let i = 0; i<20; i++){
      let ins = localStorage.getItem("usersearch" + i.toString())
      console.log("ins--", ins)
      if(ins)
        this.clients.push(ins)
    }

    this.planClient.valueChanges.subscribe()
    this.filteredOptions = this.planClient.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  clients: string[] = []
  filteredOptions: Observable<string[]>;
  planClient = new FormControl();
  search_type = "all"
  ////////////////////
  gotohome(){
    this._router.navigate(['/']);
  }
  _yearClick(param){
    //this._router.navigate(['/yearsearchresult', param]);
    console.log("paramm--", param)
    this._router.navigate(['/searchlist', "yearsearch:" + param,  this.search_type])//"yearsearch:" + param]);
  }
  pastcnsClick(){
    this._router.navigate(['/pastcns'])
  }
  menueventsClick(navy_beyond_horizon){
    this._router.navigate(['/searchlist', "menusearch:" + navy_beyond_horizon, this.search_type])
  }
  gotoadmin(){
    this._router.navigate(['/addEvent'])
  }
  FormSubmit(){
    //console.log("submitted", this.planClient.value)
    this._router.navigate(['/searchlist',  this.planClient.value, "all"])//this.planClient.value]);
    //this._router.navigate(['/searchlist', this.textInput]);
  }
  FormSubmit1(){
    this._router.navigate(['/searchlist', this.planClient.value,this.search_type]);
    //this._router.navigate(['/viewtemptwo', id]);
  }
  //////////////////////////
}
