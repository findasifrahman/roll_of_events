import { Component, HostListener, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as moment from 'moment'
import {fromEvent, Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith, take} from 'rxjs/operators';
import {myarr} from '../data'
import { EventService } from '../event/event.service'
import { routeurls } from '../../AllComponent/routeurls/routeurls'
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { PagerServiceService } from '../../pager-service.service'
import { CommonService } from '../common.service';
@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.scss']
})
export class SearchlistComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  allloaded = false

  recentlyUploaded = []
  allVideo = []
  public isMenuOpen: boolean = false;
  panelOpenState = false;
  imageEevent = []
  allevent = []/*[{id:1,title:"অনুভূতি amar amon", text:"BANGLA TEXT 1 jeta ektu boro but only 30 character nea hbe. tarpore sesh. pura jinista aro onek boro,er moddhe atbe kina ke jane xlick korle hobe", priority:1, date:moment().format('LLLL')},
  {id:2,title:"ক্লান্ত", text:"BANGLA TEXT 2", priority:2,date:moment().format('LLLL')},
  {id:3,title:"very tired", text:"BANGLA TEXT 3", priority:3, date:moment().format('LLLL')},
  {id:4,title:"inclusive", text:"BANGLA TEXT 4", priority:4, date:moment().format('LLLL')},
  {id:5,title:"nothing", text:"BANGLA TEXT 5", priority:5, date:moment().format('LLLL')},
  {id:6,title:"nothing2", text:"BANGLA TEXT 6", priority:6, date:moment().format('LLLL')}]*/

  searchtext = ""
  mainuri =  routeurls.BASE_API_URL + "/api/uploads/"//"http://localhost:5020/api/uploads/";
  image1 = ""
  filteredOptions: Observable<string[]>;
  planClient = new FormControl();
  textInput
  clients: string[] = [
    'Alabama',
    'California',
    'Colorado',
    'Connecticut',
    'SelectHealth',
    'UMR'
  ];
  permanentarr =[]
  totalImageno = 0
  showAllImage = false
  showAllVideo = false
  showallevent = true
  constructor(private route: ActivatedRoute, public _router: Router,private eventService:EventService,private service: CommonService,
    private observer: BreakpointObserver,private pagerService: PagerServiceService,public zone: NgZone) { 
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  pager: any = {};
  pagedItems: any[];
  setPage(page: number, ) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allevent.length, page);
    var tmparr = this.allevent.sort(function(a, b){return <any>moment(b.date) - <any>moment(a.date)})
    this.pagedItems = tmparr.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("slicearr size--", myarr.slice(this.pager.startIndex, this.pager.endIndex + 1))

   
  }
  setPage_image(page: number) {
    // get pager object from service
    //this.pager = this.pagerService.getPager(this.imageEevent.length, page);
    //this.pagedItems = this.imageEevent.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pager = this.pagerService.getPager(this.imageObject.length, page);
    this.pagedItems = this.imageObject.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  setPage_video(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allVideo.length, page);
    this.pagedItems = this.allVideo.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  ngOnInit(): void {
    this.service.changeData('true'); 
    /*this.clients = this.allevent.map(mapval=>{
      return mapval.title
    })*/
    this.clients = []
    for (let i = 0; i<20; i++){
      let ins = localStorage.getItem("usersearch" + i.toString())
      console.log("ins--", ins)
      if(ins)
        this.clients.push(ins)
    }
    this.route.params.subscribe(params => {
      this.searchtext = params['id'];
      console.log("searchtype--", params["id2"])
      if(params["id2"].includes("image")){
          this.showAllImage = true
          this.showallevent = false
          this.showAllVideo = false
      }else if(params["id2"].includes("video")){
        this.showAllImage = false
        this.showallevent = false
        this.showAllVideo = true
      }else{
        this.showAllImage = false
        this.showAllVideo = false
        this.showallevent = true
      }

      //this.planClient.setValue(this.searchtext)
      if(this.searchtext.toLowerCase().includes("yearsearch")){
        this.showbyyear(this.searchtext.substr(11))
      }else if(this.searchtext.toLowerCase().includes("datesearch")){
        this.showbydate(this.searchtext.substr(11))
      }else if(this.searchtext.toLowerCase().includes("menusearch")){
        this.showmenusearch(this.searchtext.substr(11))
      }else{
            let tempallevent = []
            this.imageObject =[]
            this.eventService.getAllbysearch(params['id']).subscribe((posts) => {
              this.permanentarr = posts
              console.log("posts.obj--", this.permanentarr)
              if(posts.length == 0){
                this.allloaded = true            
              }
              let imind = 0
              posts.map((mapval1,len1)=>{
              
                this.clients.push(mapval1.title)
                mapval1.image1 = this.mainuri +  mapval1.image1
                mapval1.indexx = len1
                mapval1.tdate=  moment(mapval1.date).format('LL')
                if(mapval1.title.length > 50){
                  mapval1.smtitle =  mapval1.title.substr(0,50) + " ..."
                }else{
                  mapval1.smtitle =  mapval1.title
                }
                this.totalImageno = this.totalImageno + 1
                /////////////////
                this.getImgSize(mapval1.image1 ).subscribe(val=>{
                  if(val.height > val.width){
                    mapval1.isverticle = true
                  }
                  else{
                    mapval1.isverticle = false
                  }
                  tempallevent.push(mapval1)
                  //this.allevent.push(mapval1)
                  //this.allevent = this.allevent.splice(0,8)
                  if(mapval1.video){
                    mapval1.video = this.mainuri +  mapval1.video
                    this.allVideo.push(mapval1)
                  }
                  this.imageObject.push({indexx: imind,image: mapval1.image1,title: mapval1.title, smtitle: mapval1.smtitle, caption:mapval1.image1caption})
                  imind++

                  this.imageEevent  =  tempallevent//this.allevent
                  if(posts.length - 1 == len1){
                    this.zone.run(() => {
                      this.allevent = tempallevent 
                      if(this.showAllImage){
                        setTimeout(function(){
                          this.setPage_image(1)
                          this.allloaded = true
                        }.bind(this),2000)
                      }
                      else if(this.showAllVideo){
                        setTimeout(function(){
                          this.setPage_video(1)
                          this.allloaded = true
                        }.bind(this),2000)
                      }else{              
                        setTimeout(function(){
                          this.setPage(1)
                          this.allloaded = true
                        }.bind(this),2000)
                      }
                      
                    })
                    
                  }
                  return mapval1.obj
                })
                //////////////////////


               
                })
              
          })
      }
      //this.allevent = tempp.filter(x=> x != null )

    })
    
    ///////////////////
    this.planClient.valueChanges.subscribe()
    this.filteredOptions = this.planClient.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    /////////////////////
  }
  ngAfterViewInit() {
   /* this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });*/
  }
  private _filter(value: string): string[] {
    //console.log("insiede filter");
    const filterValue = value.toLowerCase();

    return this.clients.filter(clients => clients.toLowerCase().includes(filterValue));
  }
  FormSubmit(){
    //console.log("submitted", this.planClient.value)
    this._router.navigate(['/searchlist',  this.planClient.value, "all"])//this.planClient.value]);
    //this._router.navigate(['/searchlist', this.textInput]);
  }
  menueventsClick(navy_beyond_horizon){
    this._router.navigate(['/searchlist', "menusearch:" + navy_beyond_horizon, this.search_type])
  }
  pastcnsClick(){
    this._router.navigate(['/pastcns'])
  }
  FormSubmit1(){
    this._router.navigate(['/searchlist', this.planClient.value,this.search_type]);
    //this._router.navigate(['/viewtemptwo', id]);
  }
  onDetail(id){
    this._router.navigate(['/viewtemptwo',id]);
  }
  gotoHome(){
    this._router.navigate(['/']);
  }


 

  allView(){
    this.showAllImage = false
    this.showallevent = true
    this.showAllVideo = false
    this.setPage(1)
  }
  imageView(){
    this.showAllImage = true
    this.showallevent = false
    this.showAllVideo = false
    this.setPage_image(1)
  }
  videoView(){
    this.showAllImage = false
    this.showallevent = false
    this.showAllVideo = true
    this.setPage_video(1)
  }

  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  imageObject=[]//: Array<object>
  showLightbox(index) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }
  closeEventHandler() {
    this.showFlag = false;
    this.selectedImageIndex = -1;
  }

  showbyyear(yeartext){
    this.eventService.getbyyear(yeartext).subscribe((posts) => {
      this.allevent = []
      this.imageObject = []
      this.allVideo = []
      this.imageEevent = []
      this.totalImageno = 0
      if(posts.length == 0){
        this.allloaded = true      
      }
      let imind = 0
      posts.map((mapval,index) =>{

        mapval.image1 = this.mainuri +  mapval.image1
        mapval.indexx = index
        this.totalImageno = this.totalImageno + 1
        mapval.tdate=  moment(mapval.date).format('LL')
        if(mapval.title.length > 50){
          mapval.smtitle =  mapval.title.substr(0,50) + " ..."
        }else{
          mapval.smtitle =  mapval.title
        }
        this.setPage(1);
        //////////////////////////////////////
        this.getImgSize(mapval.image1 ).subscribe(val=>{
          if(val.height > val.width){
            mapval.isverticle = true
          }
          else{
            mapval.isverticle = false
          }
          this.allevent.push(mapval)
          //this.allevent = this.allevent.splice(0,8)
          if(mapval.video){
            mapval.video = this.mainuri +  mapval.video
            this.allVideo.push(mapval)
          }
          this.imageObject.push({indexx: imind,image: mapval.image1,title: mapval.title, smtitle: mapval.smtitle,caption:mapval.image1caption})
          imind++
          //this.allVideo =  this.allevent//[]
          this.imageEevent  =  this.allevent//[]
          if(posts.length - 1 == index ){
            this.zone.run(() => {             
              setTimeout(function(){
                this.setPage(1);              
                this.allloaded = true
              }.bind(this),2000)
              
            })
          }
          return mapval.obj
        })

      })
    })
    console.log("yeartext--",yeartext)
  }
  showbydate(dt){
    
    this.eventService.getbydate(dt).subscribe((posts) => {
      this.allevent = []
      this.imageObject = []
      this.allVideo = []
      this.imageEevent = []
      this.totalImageno = 0
      if(posts.length == 0){
        this.allloaded = true
        
      }
      let imind = 0
      posts.map((mapval,index) =>{
        mapval.image1 = this.mainuri +  mapval.image1
        mapval.indexx = index
        this.totalImageno = this.totalImageno + 1
        mapval.tdate=  moment(mapval.date).format('LL')
        if(mapval.title.length > 50){
          mapval.smtitle =  mapval.title.substr(0,50) + " ..."
        }else{
          mapval.smtitle =  mapval.title
        }
        this.setPage(1);
        //////////////////////////////////////
        this.getImgSize(mapval.image1 ).subscribe(val=>{
          if(val.height > val.width){
            mapval.isverticle = true
          }
          else{
            mapval.isverticle = false
          }
          this.allevent.push(mapval)
          //this.allevent = this.allevent.splice(0,8)
          if(mapval.video){
            mapval.video = this.mainuri +  mapval.video
            this.allVideo.push(mapval)
          }
          this.imageObject.push({indexx:imind,image: mapval.image1,title: mapval.title, smtitle: mapval.smtitle,caption:mapval.image1caption})
          imind++
          //this.allVideo =  this.allevent//[]
          this.imageEevent  =  this.allevent//[]
          if(posts.length - 1 == index ){
            this.zone.run(() => {             
              setTimeout(function(){
                this.setPage(1);          
                this.allloaded = true
              }.bind(this),2000)
              
            })
          }
          return mapval.obj
        })
        //////////////////////////////////////////////

      })
    })

  }
  showmenusearch(menusearchval){
    this.eventService.getbymenusearch(menusearchval).subscribe((posts) => {
      this.allevent = []
      this.imageObject = []
      this.allVideo = []
      this.imageEevent = []
      this.totalImageno = 0
      if(posts.length == 0){
        this.allloaded = true
        
      }
      let imind = 0
      posts.map((mapval,index) =>{
        mapval.image1 = this.mainuri +  mapval.image1
        mapval.indexx = index
        this.totalImageno = this.totalImageno + 1
        mapval.tdate=  moment(mapval.date).format('LL')
        if(mapval.title.length > 50){
          mapval.smtitle =  mapval.title.substr(0,50) + " ..."
        }else{
          mapval.smtitle =  mapval.title
        }
       
        //////////////////////////////////////
        this.getImgSize(mapval.image1 ).subscribe(val=>{
          if(val.height > val.width){
            mapval.isverticle = true
          }
          else{
            mapval.isverticle = false
          }
          this.allevent.push(mapval)
          //this.allevent = this.allevent.splice(0,8)
          if(mapval.video){
            mapval.video = this.mainuri +  mapval.video
            this.allVideo.push(mapval)
          }
          this.imageObject.push({indexx:imind,image: mapval.image1,title: mapval.title, smtitle: mapval.smtitle,caption:mapval.image1caption})
          imind++
          //this.allVideo =  this.allevent//[]
          this.imageEevent  =  this.allevent//[]
          if(posts.length - 1 == index ){
            this.zone.run(() => {             
              setTimeout(function(){
                this.setPage(1);               
                this.allloaded = true
              }.bind(this),2000)
              
            })
          }
          return mapval.obj
        })
        //////////////////////////////////////////////

      })
    })
  }
  dateval(id){
    this._router.navigate(['/searchlist', "datesearch:" + id, this.search_type])
  }


  _yearClick(param){
    //this._router.navigate(['/yearsearchresult', param]);
    console.log("paramm--", param)
    this._router.navigate(['/searchlist',  "yearsearch:" + param,"all"])//"yearsearch:" + param]);
  }
  searchBangabandhu(){
    this._router.navigate(['/searchlist', "Bangabandhu", "all"])//"Bangabandhu"]);
  }
  gotohome(){
    this._router.navigate(['/']);
  }
  display = "none";
  imageUrl = ""
  prevUrl = ""
  nextUrl = ""
  imageindex = 0
  isverticalmodal = false
  slideimagetitle = ""
  imagenumbertext ="1"

  myslideinterval 
  play_pause_icon = "play_circle_outline"
  click_toggle = true

  playslide(){
    this.click_toggle = !this.click_toggle
    if(this.click_toggle){
      this.play_pause_icon = "play_circle_outline"
    }else{
      this.play_pause_icon = "pause"
    }
    if(this.play_pause_icon.includes("play_circle")){
      clearInterval(this.myslideinterval)
    }else{
      this.myslideinterval = setInterval(function(){
        if(this.imageindex == this.totalImageno){
          clearInterval(this.myslideinterval)
        }
        this.plusSlides()

      }.bind(this), 5000)
    }
  }
  openModal(indexx) {
    clearInterval(this.myslideinterval)
    this.play_pause_icon = "play_circle_outline"
    this.click_toggle = true

    this.imageindex = indexx //0
    this.isverticalmodal = false

    let modal_t  = document.getElementById('modal_1')
    var modalImg = document.getElementById("img01");
    modal_t.style.display = "block";

    this.getImgSize(this.imageObject[this.imageindex].image ).subscribe(val=>{       
      if(val.height > val.width){
        this.isverticalmodal = true
      }else{
        this.isverticalmodal = false
      }
      this.imageUrl = this.imageObject[this.imageindex].image;
      var captionText = document.getElementById("caption");
      captionText.innerHTML = this.imageObject[this.imageindex].title;

      this.slideimagetitle = this.imageObject[this.imageindex].title
      this.imagenumbertext = (indexx +1).toString() + "/" + this.imageObject.length.toString()
      
      this.prevUrl = ""
      if(this.imageObject.length > 1 && indexx > 0){
        this.prevUrl = this.imageObject[this.imageObject.length -1].image;
      }
      if(this.imageObject.length > this.imageindex + 1)
        this.nextUrl = this.imageObject[this.imageindex + 1].image;
    })

    //this.display = "block";
  }
  modalclose(){
    let modal  = document.getElementById('modal_1')
    modal.style.display = "none";
    this.imageindex = 0
    clearInterval(this.myslideinterval)
  }
  zoom_index =0
  zoomIn(){
    var modalImg = document.getElementById("img01");
    if(this.zoom_index == 0){
      modalImg.style.transform = "scale(1.2,1.2)"
      this.zoom_index = 1
    }else if(this.zoom_index == 1){
      modalImg.style.transform = "scale(1.4,1.4)"
      this.zoom_index = 2
    }else{
      modalImg.style.transform = "scale(1.6,1.6)"
      this.zoom_index = 3
    }
  }
  zoomOut(){
    var modalImg = document.getElementById("img01");
    if(this.zoom_index == 3){
      modalImg.style.transform = "scale(1.4,1.4)"
      this.zoom_index = 2
    }else if(this.zoom_index == 2){
      modalImg.style.transform = "scale(1.2,1.2)"
      this.zoom_index = 1
    }else{
      modalImg.style.transform = "scale(1,1)"
      this.zoom_index = 0
    }
  }
  downloadImage() {
 
                const a = document.createElement('a');
                a.href = this.imageUrl//URL.createObjectURL(res);
                a.download = this.imageUrl;
                document.body.appendChild(a);
                a.click();
           
  }
  plusSlides(){
    if(this.zoom_index > 0){
      var modalImg = document.getElementById("img01");
      modalImg.style.transform = "scale(1,1)"
      this.zoom_index = 0
    }
    if(this.imageindex >= this.totalImageno - 1){
      let modal  = document.getElementById('modal_1')
      this.imageindex = 0
      modal.style.display = "none";  
      clearInterval(this.myslideinterval)  
    }else{
      this.imageindex = this.imageindex + 1

      this.getImgSize(this.imageObject[this.imageindex].image ).subscribe(val=>{       
        if(val.height > val.width){
          this.isverticalmodal = true
        }else{
          this.isverticalmodal = false
        }
        this.imageUrl = this.imageObject[this.imageindex].image;
        var captionText = document.getElementById("caption");
        captionText.innerHTML = this.imageObject[this.imageindex].caption;

        this.imagenumbertext = (this.imageindex + 1).toString() + "/" + this.imageObject.length.toString()
        this.slideimagetitle = this.imageObject[this.imageindex].title
      
        this.prevUrl =  this.imageObject[this.imageindex - 1].image
        if(this.imageObject.length > this.imageindex + 1)
          this.nextUrl = this.imageObject[this.imageindex + 1].image;
        if(this.imageObject.length == this.imageindex + 1){
          this.nextUrl = ""
          if(this.imageObject.length > 1){
            this.nextUrl = this.imageObject[0].image;
          }
        }

      })
    }

  }
  minusSlides(){
    if(this.zoom_index > 0){
      var modalImg = document.getElementById("img01");
      modalImg.style.transform = "scale(1,1)"
      this.zoom_index = 0
    }
    if(this.imageindex > 0){
      this.imageindex = this.imageindex - 1

      this.getImgSize(this.imageObject[this.imageindex].image ).subscribe(val=>{       
        if(val.height > val.width){
          this.isverticalmodal = true
        }else{
          this.isverticalmodal = false
        }
        this.imageUrl = this.imageObject[this.imageindex].image;
        var captionText = document.getElementById("caption");
        captionText.innerHTML = this.imageObject[this.imageindex].title;

        this.imagenumbertext = (this.imageindex + 1).toString() + "/" + this.imageObject.length.toString()
        this.slideimagetitle = this.imageObject[this.imageindex].title

        if(this.imageObject.length > this.imageindex + 1)
          this.nextUrl = this.imageObject[this.imageindex + 1].image;
        if(this.imageindex == 0){
          this.prevUrl =  null
        }else{
          this.prevUrl =  this.imageObject[this.imageindex - 1].image
        }

      })
    }
    else{
      this.prevUrl =  ""
      if(this.imageObject.length > this.imageindex + 1)
        this.nextUrl = this.imageObject[this.imageindex + 1].image;
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let modal_t  = document.getElementById('modal_1')
    if(modal_t.style.display == "block")
    {
      if(event.key == 'ArrowLeft'){
        this.minusSlides()
        console.log("arroleft")
      }
      if(event.key == 'ArrowRight'){
        // Your row selection code
        this.plusSlides()
       console.log("arror")
      }
    }
  }

  bntStyle1: string = "btn-default";
  bntStyle2: string = "btn-default";
  search_type = "all"
  videoClick(){
    this.bntStyle1 = 'btn-default';
    this.bntStyle2 = 'btn-change';
    this.search_type = "video"
  }
  imageClick(){
    this.bntStyle1 = 'btn-change';
    this.bntStyle2 = 'btn-default';
    this.search_type = "image"
  }
  defaultClick(){
    this.bntStyle1 = 'btn-default';
    this.bntStyle2 = 'btn-default';
    this.search_type = "all"
  }
  getImgSize(imageSrc: string): Observable<any> {
    let mapLoadedImage = (event): any => {
        return {
            width: event.target.width,
            height: event.target.height
        };
    }
    var image = new Image();
    let $loadedImg = fromEvent(image, "load").pipe(take(1), map(mapLoadedImage));
    // Rxjs 4 - let $loadedImg = Observable.fromEvent(image, "load").take(1).map(mapLoadedImage);
    image.src = imageSrc;
    return $loadedImg;
  }

  nationnavyclik(){
    this._router.navigate(['/searchlist', "Nation and the Navy", this.search_type])
  }
  navyhorizonClick(){
    this._router.navigate(['/searchlist', "Navy beyond horizon", this.search_type])
  }
}
