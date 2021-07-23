import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA,ElementRef, ViewChild, ViewEncapsulation,ChangeDetectorRef, HostListener, Renderer2, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {fromEvent, Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import {myarr} from '../data'
// Import library module
import { NgxSpinnerService } from "ngx-spinner";
import { EventService } from '../event/event.service'

import { routeurls } from '../../AllComponent/routeurls/routeurls'
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import * as moment from 'moment';
import { trigger, transition, query, style, animate, group,state, keyframes  } from '@angular/animations';
import { CommonService } from '../common.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    // the fade-in/fade-out animation.
    /*trigger('fade', [
      state('in', style({ 'opacity': '1' })),
      state('out', style({ 'opacity': '0.2' })),
      transition('in <=> out', [
        animate(20)
      ]),
      transition('out <=> in', [
        animate(4000)
      ])
    ])
    ]*/

      trigger('myAwesomeAnimations',[
          state('small',style({
            'opacity': '1' 
              //transform: 'scale(1)',
          })),
          state('large',style({
            'opacity': '1' 
            //transform: 'scale(1)',
          })),
          transition('small<=>large', animate('2000ms ease-in',keyframes([
            style({opacity: 0,transform: 'translateX(0)',offset:0}),
            style({opacity: 0.3,offset: .3}),
            style({opacity: 0.6,offset:.6}),
            style({opacity: 1,transform: 'translateX(0)',offset:1}),
          ]))),
      ]),
      trigger('myAwesomeAnimations2',[
        state('small',style({
          'opacity': '1' 
            //transform: 'scale(1)',
        })),
        state('large',style({
          'opacity': '1' 
          //transform: 'scale(1)',
        })),
        transition('small<=>large', animate('1000ms ease-in',keyframes([
          style({opacity: 0,offset:0}),
          style({opacity: 1,offset: .5}),
          style({opacity: 1,offset:1}),
        ]))),
      ]),
  ]

})
export class HomeComponent implements OnInit {
  
  myGroup;
  recentVideos = []
  public isMenuOpen: boolean = false;
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
  mainuri =  routeurls.BASE_API_URL + "/api/uploads/"//"http://localhost:5020/api/uploads/";
  recentlyUploaded = []
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  panelOpenState = false;
  usersearchlist = []
  randomevent = []
  @Input() target: HTMLImageElement;
  constructor(public elem: ElementRef,public _router: Router, private eventService:EventService,
    private observer: BreakpointObserver,private renderer: Renderer2,private service: CommonService,
    private el: ElementRef<HTMLImageElement>,) { 
  }
  cureentfadestate = "in"
    ////////////////////////// slideshow bangobandhu
    slideIndex = 1;
    slideshow_image = "../../../assets/mujib100.png"
    current_imageindex = "1/13"
    currentSlide(id){
      this.slideIndex = id
    }
    showSlides() {

      if(this.slideIndex == 1){
        this.slideshow_image = "../../../assets/home2.png"
        this.slideIndex = 2
      }else if(this.slideIndex == 2){
        this.slideshow_image = "../../../assets/mujib100.png"
        this.slideIndex = 3
      }
      else if(this.slideIndex == 3){
        this.slideshow_image = "../../../assets/bangabadhu2.jpeg"
        this.slideIndex = 1
      }
      if(this.cureentfadestate == "in"){
        this.cureentfadestate = "out"
        //this.cureentfadestate = "in"
      }else{
        this.cureentfadestate = "in"
        //this.cureentfadestate = "out"
      }
      //this.slideIndex++

      //setTimeout(this.showSlides(), 2000); // Change image every 2 seconds
    }
  ////////////////////


  ngOnInit() {
    this.service.changeData('false'); 
    setInterval(function(){
      //this.  cureentfadestate = "in"
      this.showSlides();

      this.randomImageUrl()
     
    }.bind(this),8000)

    this.recentlyUploaded = []
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
      this.usersearchlist.push(ins)
      if(ins)
        this.clients.push(ins)
    }
    this.eventService.getrandomevent().subscribe((posts)=>{
      console.log("random poosts--", posts)
      posts.map((mapval,index)=>{
        if(mapval.image1prio){
          mapval.image1 = this.mainuri  + mapval.image1
        }else if(mapval.image2prio){
          mapval.image1 = this.mainuri  + mapval.image2
        }else if(mapval.image3prio){
          mapval.image1 = this.mainuri  + mapval.image3
        }else if(mapval.image4prio){
          mapval.image1 = this.mainuri  + mapval.image4
        }else if(mapval.image5prio){
          mapval.image1 = this.mainuri  + mapval.image5
        }
        mapval.date = moment(mapval.date).format("LL")
        this.randomevent.push(mapval)
        if(index == posts.length - 1){
          this.randomImageUrl()
        }
      })
    })
    this.eventService.getRecent().subscribe((posts) => {
      posts.map((mapval,index)=>{
        mapval.image1 = this.mainuri  + mapval.image1
        mapval.date = moment(mapval.date).format("LL")
        this.recentlyUploaded.push(mapval)
        this.clients.push(mapval.title)
        this.usersearchlist.push(mapval.title)
      })
    })
   /* this.planClient.valueChanges.subscribe()
    this.filteredOptions = this.planClient.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      
      this.clients = []
      this.recentlyUploaded = []
      this.eventService.getAll().subscribe((posts) => {

        let temparr = posts.sort(function(a, b){return new Date(b.uploadDate).getDate() - new Date(a.uploadDate).getDate()});
        let yu = []  
        for (var i = 0; i < temparr.length; i++) {
          if(temparr[i].title.length > 40)
            temparr[i].title = temparr[i].title.substr(0,40) + "..."
          temparr[i].image1 = this.mainuri  + temparr[i].image1
          
          //this.recentlyUploaded.push(temparr[i])
          //yu.push(temparr[i])
          if(temparr[i].video){
            temparr[i].video = this.mainuri  + temparr[i].video
            this.recentVideos.push(temparr[i])
          }
          if(i<=5){
            this.recentlyUploaded.push(temparr[i])
           // break
          }
        }

        posts.map(mapval=>{
          this.clients.push(mapval.title)
          //////////////////////////////
        })        
      })*/
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  private _filter(value: string): string[] {
    //console.log("insiede filter");
    const filterValue = value.toLowerCase();

    return this.clients.filter(clients => clients.toLowerCase().includes(filterValue));
  }
  FormSubmit(){
    if(this.planClient.value){
      console.log("submitted", this.planClient.value)
      
      if(!this.usersearchlist.find(x=> x && x.toLowerCase() == this.planClient.value.toLowerCase()))
      {

          let ins = localStorage.getItem("usersearchindex")
          
          if(!ins || ins.includes("NaN")){
            ins = "0"
          }
          console.log("ins--", ins)
          if(ins == "0"){localStorage.setItem('usersearch0', this.planClient.value)}
          else if(ins == "1"){localStorage.setItem('usersearch1', this.planClient.value)}
          else if(ins == "2"){localStorage.setItem('usersearch2', this.planClient.value)}
          else if(ins == "3"){localStorage.setItem('usersearch3', this.planClient.value)}
          else if(ins == "4"){localStorage.setItem('usersearch4', this.planClient.value)}
          else if(ins == "5"){localStorage.setItem('usersearch5', this.planClient.value)}
          else if(ins == "6"){localStorage.setItem('usersearch6', this.planClient.value)}
          else if(ins == "7"){localStorage.setItem('usersearch7', this.planClient.value)}
          else if(ins == "8"){localStorage.setItem('usersearch8', this.planClient.value)}
          else if(ins == "9"){localStorage.setItem('usersearch9', this.planClient.value)}
          else if(ins == "10"){localStorage.setItem('usersearch10', this.planClient.value)}
          else if(ins == "11"){localStorage.setItem('usersearch11', this.planClient.value)}
          else if(ins == "12"){localStorage.setItem('usersearch12', this.planClient.value)}
          else if(ins == "13"){localStorage.setItem('usersearch13', this.planClient.value)}
          else if(ins == "14"){localStorage.setItem('usersearch14', this.planClient.value)}
          else if(ins == "15"){localStorage.setItem('usersearch15', this.planClient.value)}
          else if(ins == "16"){localStorage.setItem('usersearch16', this.planClient.value)}
          else if(ins == "17"){localStorage.setItem('usersearch17', this.planClient.value)}
          else if(ins == "18"){localStorage.setItem('usersearch18', this.planClient.value)}
          else if(ins == "19"){localStorage.setItem('usersearch19', this.planClient.value)}

          console.log("localStorage.getItem('usersearch' + ins)-",localStorage.getItem("usersearch" + ins), ins, ins.toString())
          let cur =  parseInt(ins) + 1
          if(cur != NaN){
            if(cur > 20){
              cur = 0
            }
            localStorage.setItem('usersearchindex', cur.toString());
          }else{
            cur = 0
            localStorage.setItem('usersearchindex', cur.toString());
          }
      }
      this._router.navigate(['/searchlist', this.planClient.value, this.search_type])//this.planClient.value]);
      
    }
  
  }
  Bangabandhu(){
    this._router.navigate(['/viewtemptwo', 10]);
  }
  searchBangabandhu(){
    this._router.navigate(['/searchlist',"Bangabandhu", this.search_type])//"Bangabandhu"]);
  }
  cnsSearch(id){
    if(id==1){
      this._router.navigate(['/searchlist', "Captain Nurul Huq, (E)"]);
    }else if(id == 2){this._router.navigate(['/searchlist', "Rear Admiral Musharraf Hussain Khan, psc"]);}
    else if(id == 3){this._router.navigate(['/searchlist', "Rear Admiral Mahbub Ali Khan, psc"]);}
    else if(id == 12){this._router.navigate(['/searchlist', "Vice Admiral Zahir Uddin Ahmed NBP"]);}
    else if(id == 13){this._router.navigate(['/searchlist', "Admiral Muhammad Farid Habib"]);}
    else if(id == 14){this._router.navigate(['/searchlist', "Admiral Mohammad Nizamuddin Ahmed"]);}
  }
  gotoid(id){
    this._router.navigate(['/viewtemptwo', id]);
  }
  category(time){
    if(time == "71")
        this._router.navigate(['/searchlist', "category:1971-1979"]);
    else if(time == "80"){ this._router.navigate(['/searchlist', "category:1980-1989"]);}
    else if(time == "90"){ this._router.navigate(['/searchlist', "category:1990-1999"]);}
    else if(time == "00"){ this._router.navigate(['/searchlist', "category:2000-2009"]);}
    else if(time == "10"){ this._router.navigate(['/searchlist', "category:2010-2019"]);}
    else if(time == "20"){ this._router.navigate(['/searchlist', "category:1920-"]);}
  }
  recently(){
    this._router.navigate(['/searchlist', "recently:"]);
  }
  serachyear(){
    this._router.navigate(['/yearsearch']);
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
  _yearClick(param){
    //this._router.navigate(['/yearsearchresult', param]);
    console.log("paramm--", param)
    this._router.navigate(['/searchlist', "yearsearch:" + param,  this.search_type])//"yearsearch:" + param]);
  }
  FormSubmit1(id){
    this._router.navigate(['/viewtemptwo', id]);
  }
  bntStyle3 = "btn-default2"
  bntStyle4 = "btn-default2"
  bntStyle5 = "btn-default2"
  cnsClick(name){
      this._router.navigate(['/cns', name])
    
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
  dateval(id){
    this._router.navigate(['/searchlist', "datesearch:" + id, this.search_type])
  }
  //////////////////
    ///////////// modal slideshow
    imageObject=[{ image: "../../../assets/bangabandhu/1.jpg",title:"বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠানের ফিতা কাটছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index :0},
    { image: "../../../assets/bangabandhu/2.jpg",title:"বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠানের কুচকাওয়াজে সালাম গ্রহণ করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:1},
    { image: "../../../assets/bangabandhu/3.jpg", title: "বানৌজা ঈসা খান এর কমিশনিং কুচকাওয়াজে গার্ড পরিদর্শন করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:2  },
    {image: "../../../assets/bangabandhu/4.jpg", title: "বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠানে নেভাল এনসাইন প্রদান করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:3},
    {image: "../../../assets/bangabandhu/5.jpg", title: "বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠানে নেভাল এনসাইন প্রদান শেষে অভিবাদন গ্রহণ করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:4},
    {image: "../../../assets/bangabandhu/6.jpg", title: "বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠানে সর্বস্তরের নৌসদস্যদের উদ্দেশ্যে ভাষণ দেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:5},
    {image: "../../../assets/bangabandhu/7.jpg", title: "বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠান শেষে শহীদদের স¥ৃতিস্তম্ভে পুষ্পস্তবক অর্পণ করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:6},
    {image: "../../../assets/bangabandhu/8.jpg", title: "বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠানে আগত অতিথিদের মাঝে জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:7},
    {image: "../../../assets/bangabandhu/9.jpg", title: "বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠানে বিদেশি কূটনীতিক ও সামরিক ব্যক্তিবর্গের সাথে কুশল বিনিময় করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:8},
    {image: "../../../assets/bangabandhu/10.jpg", title: "বানৌজা ঈসা খান এর কমিশনিং অনুষ্ঠান শেষে তৎকালীন নৌপ্রধান এর নিকট থেকে ক্রেস্ট গ্রহণ করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:9},
    {image: "../../../assets/bangabandhu/11.jpg", title: "কমিশনিং অনুষ্ঠান শেষে বানৌজা ঈসা খান পরিদর্শন করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:10},
    {image: "../../../assets/bangabandhu/12.jpg", title: "বাংলাদেশ নৌবাহিনীর যুদ্ধ জাহাজ ‘সুরমা’ থেকে বার্ষিক সমুদ্র মহড়া প্রত্যক্ষ করছেন জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান",index:11},
    {image: "../../../assets/bangabandhu/13.jpg", title: "বার্ষিক সমুদ্র মহড়া উপলক্ষে জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান এর বাংলাদেশ নৌবাহিনীর যুদ্ধ জাহাজ ‘সুরমা’ এ আগমন",index:12}]//: Array<object>
    totalImageno = 13
    display = "none";
    imageUrl = ""
    imageindex = 0
    isverticalmodal = false
    current_caption =  "dfdfd"
    showCaption = true
    thumbnill_grid = true
    caption_button = true
    
    fadeval = "out"
    curreent_animation = "small"
    modal_thumbnill_click(index){
      if(this.zoom_index > 0){
        var modalImg = document.getElementById("img01");
        modalImg.style.transform = "scale(1,1)"
      }
      this.imageindex = index
      this.imageUrl = this.imageObject[this.imageindex].image;
      //var captionText = document.getElementById("caption");
      this.current_imageindex = (this.imageindex + 1).toString() + "/13"
      //captionText.innerHTML = this.imageObject[this.imageindex].title;

      this.current_caption = this.imageObject[this.imageindex].title
      ///////////////////////////////////
      this.curreent_animation = (this.curreent_animation ==='small' ? 'large' :'small');
      /////////////////////////////////////////
    }
    Hide_Caption_Text = "Hide Caption"
    Hide_Grid_Text = "Hide Grid"
    captionHide(){
      this.showCaption = !this.showCaption
      if(!this.showCaption)
        this.Hide_Caption_Text = "Show Caption"
      else{
        this.Hide_Caption_Text = "Hide Caption"
      }
    }
    gridhide(){
      this.thumbnill_grid = !this.thumbnill_grid
      if(!this.thumbnill_grid)
        this.Hide_Grid_Text = "Show Grid"
      else{
        this.Hide_Grid_Text = "Hide Grid"
      }
    }
    openModal() {
      if(this.zoom_index > 0){
        var modalImg = document.getElementById("img01");
        modalImg.style.transform = "scale(1,1)"
      }
      this.thumbnill_grid = true
      this.caption_button = true
      clearInterval(this.myslideinterval)
      this.play_pause_icon = "play_circle_outline"
      this.click_toggle = true

      this.imageindex = 0
      this.isverticalmodal = false
      let modal_t  = document.getElementById('modal_1')
      var modalImg = document.getElementById("img01");
      modal_t.style.display = "block";

      this.current_caption = this.imageObject[this.imageindex].title

        this.imageUrl = this.imageObject[this.imageindex].image;
        //var captionText = document.getElementById("caption");
        this.current_imageindex = (this.imageindex + 1).toString() + "/13"
        //captionText.innerHTML = this.imageObject[this.imageindex].title;
      
  
      //this.display = "block";
    }

    modalclose(){
      let modal  = document.getElementById('modal_1')
      modal.style.display = "none";
      this.imageindex = 0
      clearInterval(this.myslideinterval)
    }
    myslideinterval 
    play_pause_icon = "play_circle_outline"
    click_toggle = true

    isShownImageslide = true

    playslide(){
      if(this.zoom_index > 0){
        var modalImg = document.getElementById("img01");
        modalImg.style.transform = "scale(1,1)"
      }
      this.click_toggle = !this.click_toggle
      if(this.click_toggle){
        this.play_pause_icon = "play_circle_outline"
        this.thumbnill_grid = true
        this.caption_button = true
      }else{
        this.play_pause_icon = "pause"
        this.thumbnill_grid = false
        this.caption_button = false
      }
      if(this.play_pause_icon.includes("play_circle")){
        clearInterval(this.myslideinterval)
      }else{
        this.myslideinterval = setInterval(function(){
          if(this.imageindex == this.totalImageno){
            clearInterval(this.myslideinterval)
          }
          //this.isShownImageslide = false
          //this.fadeval = "out"
          //this.renderer.setAttribute(this.target, 'src', this.el.nativeElement.src);
          // Add fade-in css class

          this.plusSlides()
         
 
        }.bind(this), 5000)
      }
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
      if(this.play_pause_icon == "pause"){
       // this.imganime = "imganime"
      }

      if(this.fadeval == "out"){
        this.fadeval = "in"
        setTimeout(function(){
          this.fadeval = "out"
        }.bind(this),50)
       }
       if(this.zoom_index > 0){
         var modalImg = document.getElementById("img01");
         modalImg.style.transform = "scale(1,1)"
       }
      if(this.imageindex >= this.totalImageno - 1){
        let modal  = document.getElementById('modal_1')
        this.imageindex = 0
        modal.style.display = "none";
        clearInterval(this.myslideinterval)
      }else{
        this.imageindex = this.imageindex + 1
  
        this.current_caption = this.imageObject[this.imageindex].title
    
  
          this.imageUrl = this.imageObject[this.imageindex].image;
          //var captionText = document.getElementById("caption");
          this.current_imageindex = (this.imageindex + 1).toString() + "/13"
          //captionText.innerHTML = this.imageObject[this.imageindex].title;
                ///////////////////////////////////
           this.curreent_animation = (this.curreent_animation ==='small' ? 'large' :'small');
      
      }
  
    }
    minusSlides(){
      if(this.zoom_index > 0){
        var modalImg = document.getElementById("img01");
        modalImg.style.transform = "scale(1,1)"
      }
      if(this.imageindex > 0){
        this.imageindex = this.imageindex - 1
  
        this.current_caption = this.imageObject[this.imageindex].title
        ///////////////////////////////////
        this.curreent_animation = (this.curreent_animation ==='small' ? 'large' :'small');
        this.getImgSize(this.imageObject[this.imageindex].image ).subscribe(val=>{       
          if(val.height > val.width){
            this.isverticalmodal = true
          }else{
            this.isverticalmodal = false
          }
          this.imageUrl = this.imageObject[this.imageindex].image;
          //var captionText = document.getElementById("caption");
          this.current_imageindex = (this.imageindex + 1).toString() + "/13"
          //captionText.innerHTML = this.imageObject[this.imageindex].title;

        })
      }
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


  randomimageUrl
  randomImagedate
  randomimagetext
  randomimageplace
  randomindex = 0
  curreent_animation2
    ///////////////////////
  allloaded = false 
  imageloaded(){
    console.log("image is loadddddddd--",this.randomindex, this.randomevent[this.randomindex - 1])
    this.allloaded = true
    /////////////
    ///////////////////////////////////
    this.curreent_animation2 = (this.curreent_animation2 ==='small' ? 'large' :'small');
    this.randomImagedate =  this.randomevent[this.randomindex - 1].date

    if(this.randomevent[this.randomindex - 1].title.length > 60){
      this.randomevent[this.randomindex - 1].title = this.randomevent[this.randomindex - 1].title.substr(0,60) + " ..."
    }
    this.randomimagetext =  this.randomevent[this.randomindex - 1].title
    
    this.randomimageplace =  this.randomevent[this.randomindex - 1].place
    if(this.randomindex == 8){
      this.randomindex = 0
    }
    /////////////////////
  }
  showpastev(){
    this._router.navigate(['/viewtemptwo', this.randomevent[this.randomindex-1].id])
  }
  randomImageUrl(){
    this. randomimageUrl = this.randomevent[this.randomindex].image1

    this.randomindex++

    this.allloaded = false

  }

  //////////////////
}
