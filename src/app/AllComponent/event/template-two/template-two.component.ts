import { Component, Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Router,ActivatedRoute } from '@angular/router';
import { EventService } from '../../event/event.service'
import { routeurls } from '../../../AllComponent/routeurls/routeurls'
import {FormControl} from '@angular/forms';
import {fromEvent, Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import { CommonService } from '../../common.service';
import { trigger, transition, query, style, animate, group,state, keyframes  } from '@angular/animations';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss'],
  animations:[
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
  ]
})
export class TemplateTwoComponent implements OnInit {
  planClient = new FormControl();
  filteredOptions: Observable<string[]>;


  tiles: any[] = [
    {text: 'One', cols: 3, rows: 2, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    //{text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  tDate = moment().format('LLLL')

  additional_image_num = "0"

  vidpresent = false
  myarr = [];// = myarr
  categoryNewsArr = []
  selectedCategory = "2020-"
  allvideo = []
  searchres: any
  relatedNews = []
  relatedDate = []
  relatedYear = []
  searchtext = ""
  mainuri = routeurls.BASE_API_URL + "/api/uploads/"//"/api/uploads/"//"http://localhost:5020/api/uploads/";
  totalImageno = 1
  constructor(private elRef: ElementRef<HTMLImageElement>,private service: CommonService,private route: ActivatedRoute,public _router: Router,private eventService:EventService) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  imageObject=[]//: Array<object>
  rowHeight = "28vh"
  gutter_size_main = "0.75em"
  search_date =""
  clients: string[]
  other_event_year = ""
  allloaded = false
  showLightbox(index) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }
  imageloaded(){
    console.log("image is loadddddddd")
    this.allloaded = true
  }
  closeEventHandler() {
      this.showFlag = false;
      this.selectedImageIndex = -1;
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
    this.route.params.subscribe(params => {
      this.searchtext = params['id'];
      
      //this.planClient.setValue(this.searchtext)
      this.eventService.getbyidwithrelated(this.searchtext).subscribe(posts=>{
        this.search_date = posts.idres.date
        //posts.relateddate
        // posts.idres
        //posts.relatedyear    
        
        this.getImgSize(this.mainuri +  posts.idres.image1 ).subscribe(val=>{
          //this.getImgSize(this.mainuri +  posts.idres.image2 ).subscribe(val2=>{
          //  this.getImgSize(this.mainuri +  posts.idres.image3 ).subscribe(val3=>{
           //   this.getImgSize(this.mainuri +  posts.idres.image4 ).subscribe(val4=>{
          
          //console.log("image get val--",val)          
          ////////////////////////////////////////////////////////////////////////////////////
            posts.idres.image1 = this.mainuri +  posts.idres.image1
            if(val.height > val.width){
              this.imageObject.push({image1verticle: true,image:  posts.idres.image1,  title: posts.idres.image1caption,index:0})
            }else{      
              this.imageObject.push({image1verticle: false,image:  posts.idres.image1,  title: posts.idres.image1caption,index:0})
            }
            if(posts.idres.image2){
              posts.idres.image2 = this.mainuri +  posts.idres.image2
              this.totalImageno = this.totalImageno + 1
              this.imageObject.push({image:  posts.idres.image2,  title: posts.idres.image2caption,index:1})
            }
            
            //posts.idres.image3 = this.mainuri +  posts.idres.image1
            //this.imageObject.push({image:  posts.idres.image1,  title: posts.idres.image1caption})
            if(posts.idres.image3){       
              posts.idres.image3 = this.mainuri +  posts.idres.image3
              this.imageObject.push({image:  posts.idres.image3,  title: posts.idres.image3caption,index:2})
              
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image4){
              posts.idres.image4 = this.mainuri +  posts.idres.image4
              this.imageObject.push({image:  posts.idres.image4,  title: posts.idres.image4caption,index:3})
              
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image5){
              posts.idres.image5 = this.mainuri +  posts.idres.image5
              this.imageObject.push({image:  posts.idres.image5, title: posts.idres.image5caption,index:4})
              this.additional_image_num = "+0"
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image6){
              posts.idres.image6 = this.mainuri +  posts.idres.image6
              this.imageObject.push({image:  posts.idres.image6,  title: posts.idres.image6caption,index:5})
              this.additional_image_num = "+1"
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image7){
              posts.idres.image7 = this.mainuri +  posts.idres.image7
              this.imageObject.push({image:  posts.idres.image7,  title: posts.idres.image7caption,index:6})
              this.additional_image_num = "+2"
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image8){
              posts.idres.image8 = this.mainuri +  posts.idres.image8
              this.imageObject.push({image:  posts.idres.image8, title: posts.idres.image8caption,index:7})
              this.additional_image_num = "+3"
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image9){
              posts.idres.image9 = this.mainuri +  posts.idres.image9
              this.imageObject.push({image:  posts.idres.image9, title: posts.idres.image9caption,index:8})
              this.additional_image_num = "+4"
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image10){
              posts.idres.image10 = this.mainuri +  posts.idres.image10
              this.imageObject.push({image:  posts.idres.image10, title: posts.idres.image10caption,index:9})
              this.additional_image_num = "+5"
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image11){
              posts.idres.image11 = this.mainuri +  posts.idres.image11
              this.imageObject.push({image:  posts.idres.image11, title: posts.idres.image11caption,index:10})
              this.additional_image_num = "+6"
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.image12){
              posts.idres.image12 = this.mainuri +  posts.idres.image12
              this.imageObject.push({image:  posts.idres.image12, title: posts.idres.image12caption,index:11})
              this.additional_image_num = "+7"
              this.totalImageno = this.totalImageno + 1
            }
            if(posts.idres.video){
              posts.idres.video == this.mainuri +  posts.idres.video
            }
            let ddate = posts.idres.date
            posts.idres.date = moment(posts.idres.date).format("Do MMMM YYYY, dddd")
            this.other_event_year = moment(ddate).format("YYYY")
            this.searchres = posts.idres

            if(this.searchres.video){
              this.vidpresent = true
              this.searchres.video = this.mainuri + this.searchres.video
            }
            
            ///////////////////////////////////////////////////////////////
            if(this.totalImageno == 1){
              if(posts.idres.video){
                this.rowHeight = "18vh"
                if(val.height > val.width){
                  this.tiles = [
                    {text: 'One', cols: 2, rows: 2, image:  posts.idres.image1,image1verticle: true,imageindex:0},
                    {text: 'two', cols: 2, rows: 2, video:  this.searchres.video,image1verticle: false,imageindex:-11}
                  ]
                }else{ 
                  this.tiles = [
                    {text: 'two', cols: 2, rows: 2, video:  this.searchres.video,imageindex:-1},
                    {text: 'One', cols: 2, rows: 2, image: posts.idres.image1,imageindex:0}] 
                }
              } else{ 
                this.rowHeight = "36vh"
                if(val.height > val.width){
                  this.tiles = [
                    {text: 'One', cols: 4, rows: 2, image:  posts.idres.image1,image1verticle: true,imageindex:0}
                  ]
                }else{ 
                  this.tiles = [
                    {text: 'One', cols: 4, rows: 2, image: posts.idres.image1,imageindex:0}] 
                }
              }
            }
            /////////////////////////////////////
            if(this.totalImageno == 2){  
              this.rowHeight = "21vh"
           
              let image1verticle = false
              let image2verticle = false

              if(posts.idres.video){
                this.getImgSize(posts.idres.image2 ).subscribe(val2=>{
                  if(val.height > val.width){
                    image1verticle = true
                  }
                  if(val2.height > val2.width ){
                    image2verticle = true
                  }
                  this.tiles = [
                    {text: 'One', cols: 3, rows: 2, video:  this.searchres.video,imageindex:-1},
                    {text: 'two', cols: 1, rows: 1, image:  posts.idres.image1,image1verticle: image2verticle,imageindex:0},
                    {text: 'three', cols: 1, rows: 1, image:  posts.idres.image2,image1verticle: image2verticle,imageindex:1}
                  ]

                })
              }
              else{
                this.getImgSize(posts.idres.image2 ).subscribe(val2=>{
                    if(val.height > val.width){
                      image1verticle = true
                    }
                    if(val2.height > val2.width ){
                      image2verticle = true
                    }
                    this.tiles = [
                      {text: 'One', cols: 2, rows: 2, image:  posts.idres.image1,image1verticle: image1verticle,imageindex:0},
                      {text: 'two', cols: 2, rows: 2, image:  posts.idres.image2,image1verticle: image2verticle,imageindex:1}
                    ]
                })
              }
            }
            //////////////////////////////////////////////////////
            if(this.totalImageno == 3){
              
              let image1verticle = false
              let image2verticle = false
              let image3verticle = false
              if(posts.idres.video){
                this.rowHeight ="18vh"               
                this.getImgSize(posts.idres.image2 ).subscribe(val2=>{
                  this.getImgSize(posts.idres.image3 ).subscribe(val3=>{
                    if(val.height > val.width){
                      image1verticle = true                
                      //posts.idres.image1verticle = true
                    }
              
                    if(val2.height > val2.width){ image2verticle = true }
                    if(val3.height > val3.width){ image3verticle = true }
                    this.tiles = [
                      {text: 'One', cols: 3, rows: 3, video:  this.searchres.video,imageindex:-1},
                      {text: 'Two', cols: 1, rows: 1,image: posts.idres.image1,image1verticle: image1verticle,imageindex:0},
                      {text: 'Three', cols: 1, rows: 1,image: posts.idres.image2, image1verticle: image2verticle,imageindex:1},
                      {text: 'Four', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle,imageindex:2},
                    ]
                  })
                })
              }
              else{
                this.getImgSize(posts.idres.image2 ).subscribe(val2=>{
                  this.getImgSize(posts.idres.image3 ).subscribe(val3=>{
                    if(val.height > val.width){
                      image1verticle = true                
                      //posts.idres.image1verticle = true
                    }
                    this.gutter_size_main = "1.5em"
                    this.rowHeight ="28vh" 
                    if(val2.height > val2.width){ image2verticle = true }
                    if(val3.height > val3.width){ image3verticle = true }
                    this.tiles = [
                      {text: 'One', cols: 3, rows: 2, image:  posts.idres.image1,image1verticle: image1verticle, imageindex:0},
                      {text: 'Two', cols: 1, rows: 1,image: posts.idres.image2,image1verticle: image2verticle,imageindex:1},
                      {text: 'Three', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle,imageindex:2},
                    ]
                  })
                })
              }
              //posts.idres.image1verticle = false
            }
            ///////////////////////////////////////////////////////////////
            if(this.totalImageno == 4){
              if(posts.idres.video){
                this.rowHeight = "19vh"
                let image1verticle = false
                let image2verticle = false
                let image3verticle = false
                let image4verticle = false
                this.getImgSize(posts.idres.image2 ).subscribe(val2=>{
                  this.getImgSize(posts.idres.image3 ).subscribe(val3=>{
                    this.getImgSize(posts.idres.image4 ).subscribe(val4=>{
                      if(val.height > val.width){
                        image1verticle = true                
                        //posts.idres.image1verticle = true
                      }

                      if(val2.height > val2.width){ image2verticle = true }
                      if(val3.height > val3.width){ image3verticle = true }
                      if(val4.height > val4.width){ image4verticle = true }
                      this.tiles = [
                        {text: 'One', cols: 4, rows: 3, video: this.searchres.video,imageindex:-1},
                        {text: 'Two', cols: 1, rows: 1,image: posts.idres.image1,image1verticle: image1verticle, imageindex:0},
                        {text: 'Three', cols: 1, rows: 1,image: posts.idres.image2, image1verticle: image2verticle, imageindex:1},
                        {text: 'Four', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle, imageindex:2},
                        {text: 'Five', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image4verticle, imageindex:3}
                      ]
                    })
                  })
                })
              }else{
                this.rowHeight = "20vh"
                let image1verticle = false
                let image2verticle = false
                let image3verticle = false
                let image4verticle = false
                this.getImgSize(posts.idres.image2 ).subscribe(val2=>{
                  this.getImgSize(posts.idres.image3 ).subscribe(val3=>{
                    this.getImgSize(posts.idres.image4 ).subscribe(val4=>{
                          if(val.height > val.width){
                            image1verticle = true                
                            //posts.idres.image1verticle = true
                          }
                    
                          if(val2.height > val2.width){ image2verticle = true }
                          if(val3.height > val3.width){ image3verticle = true }
                          if(val4.height > val4.width){ image4verticle = true }
                          this.tiles = [
                            {text: 'One', cols: 3, rows: 3, image:  posts.idres.image1,image1verticle: image1verticle, imageindex:0},
                            {text: 'Two', cols: 1, rows: 1,image: posts.idres.image2,image1verticle: image2verticle, imageindex:1},
                            {text: 'Three', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle, imageindex:2},
                            {text: 'Four', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image4verticle, imageindex:3}
                          ]
                        
                    })
                  })
                })
              }
            }
            ///////////////////////////////////////////////////////////////
            if(this.totalImageno >= 5){
              if(posts.idres.video){
                this.rowHeight = "19vh"
                let image1verticle = false
                let image2verticle = false
                let image3verticle = false
                let image4verticle = false
                this.getImgSize(posts.idres.image2 ).subscribe(val2=>{
                  this.getImgSize(posts.idres.image3 ).subscribe(val3=>{
                    this.getImgSize(posts.idres.image4 ).subscribe(val4=>{
                          if(val.height > val.width){
                            image1verticle = true                
                            //posts.idres.image1verticle = true
                          }
                    
                          if(val2.height > val2.width){ image2verticle = true }
                          if(val3.height > val3.width){ image3verticle = true }
                          if(val4.height > val4.width){ image4verticle = true }
                          this.tiles = [
                            {text: 'One', cols: 4, rows: 3,video: this.searchres.video,imageindex:-1},
                            {text: 'Two', cols: 1, rows: 1,image: posts.idres.image1,image1verticle: image1verticle, imageindex:0},
                            {text: 'Three', cols: 1, rows: 1,image: posts.idres.image2, image1verticle: image2verticle,imageindex:1},
                            {text: 'Four', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle,imageindex:2},
                            {text: 'Five', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image4verticle,additional_image: true,imageindex:3}
                          ]
                        
                    })
                  })
                })
              }else{
                  this.rowHeight = "24vh"
                  let image1verticle = false
                  let image2verticle = false
                  let image3verticle = false
                  let image4verticle = false
                  let image5verticle = false
                  this.getImgSize(posts.idres.image2 ).subscribe(val2=>{
                    this.getImgSize(posts.idres.image3 ).subscribe(val3=>{
                      this.getImgSize(posts.idres.image4 ).subscribe(val4=>{
                        this.getImgSize(posts.idres.image5).subscribe(val5=>{
                            if(val.height > val.width){
                              image1verticle = true                
                              //posts.idres.image1verticle = true
                            }
                      
                            if(val2.height > val2.width){ image2verticle = true }
                            if(val3.height > val3.width){ image3verticle = true }
                            if(val4.height > val4.width){ image4verticle = true }
                            if(val5.height > val5.width){ image5verticle = true }
                            this.tiles = [
                              {text: 'One', cols: 4, rows: 3, image:  posts.idres.image1,image1verticle: image1verticle,imageindex:0},
                              {text: 'Two', cols: 1, rows: 1,image: posts.idres.image2,image1verticle: image2verticle,imageindex:1},
                              {text: 'Three', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle,imageindex:2},
                              {text: 'Four', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image4verticle,imageindex:3},
                              {text: 'Five', cols: 1, rows: 1,image: posts.idres.image5, image1verticle: image5verticle,additional_image: true,imageindex:4}
                            ]
                          })
                      })
                    })
                  })
              }
            }
            ///////////////////////////////////////////////////////////////

        })
        //console.log(posts)
        let temparr = []
        posts.relateddate.map((mapval,index)=>{
          mapval.image1 = this.mainuri + mapval.image1
          mapval.tdate = moment(mapval.date).format("ll")

          this.getImgSize(mapval.image1 ).subscribe(val=>{
            if(val.height > val.width){
              mapval.isverticle = true
            }
            else{
              mapval.isverticle = false
            }
            temparr.push(mapval)
            if(index == posts.relateddate.length -1){
              this.relatedDate = temparr

            }
          })

         
        })
        /////////////////////////////////////////////////
        let temparr2 = []
        posts.relatedyear.map((mapval,index)=>{
          mapval.image1 = this.mainuri + mapval.image1
          mapval.tdate = moment(mapval.date).format("ll")

          this.getImgSize(mapval.image1 ).subscribe(val=>{
            if(val.height > val.width){
              mapval.isverticle = true
            }
            else{
              mapval.isverticle = false
            }
            temparr2.push(mapval)
            if(index == posts.relatedyear.length -1){
              this.relatedYear = temparr2
              this.allloaded = true
            }
          })


        })
        let temparr3 = []
        posts.relatednews.map((mapval,index)=>{
          mapval.image1 = this.mainuri + mapval.image1
          mapval.smtitle = mapval.title.substr(0,35) + " ..."
          this.getImgSize(mapval.image1 ).subscribe(val=>{
            console.log("image get val--",val)
            if(val.height > val.width){
              mapval.isverticle = true
            }
            else{
              mapval.isverticle = false
            }
            temparr3.push(mapval)


            if(index == posts.relatednews.length -1){
              this. relatedNews = temparr3
            }
          })
          
          
        })
        //////////////////////////////////////////////////////


      })
      this.allloaded = true
      //////////////////
    })

  }
  menueventsClick(navy_beyond_horizon){
    this._router.navigate(['/searchlist', "menusearch:" + navy_beyond_horizon, this.search_type])
  }
  private _filter(value: string): string[] {
    //console.log("insiede filter");
    const filterValue = value.toLowerCase();

    return this.clients.filter(clients => clients.toLowerCase().includes(filterValue));
  }

  pastcnsClick(){
    this._router.navigate(['/pastcns'])
  }
  category20(){
    this.categoryNewsArr =  this.myarr.map(mapval=>{
      if(mapval.category==2020){
        return mapval
      }else{
        return null
      }
    })
    this.categoryNewsArr = this.categoryNewsArr.filter(x=> x != null )
  }
  FormSubmit1(){
    this._router.navigate(['/searchlist', this.planClient.value,this.search_type]);
    //this._router.navigate(['/viewtemptwo', id]);
  }
  FormSubmit(id){
    //this._router.navigate(['/searchlist', this.planClient.value]);
    this._router.navigate(['/viewtemptwo', id]);
  }
  Bangabandhu(){
    this._router.navigate(['/viewtemptwo', 10]);
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
  ///////////// modal slideshow
  display = "none";
  imageUrl = ""
  imageindex = 0
  isverticalmodal = false
  current_caption =  "dfdfd"
  showCaption = true
  thumbnill_grid = true
  current_imageindex = "1/3"

  play_pause_icon = "play_circle_outline"
  click_toggle = true
  myslideinterval 
  caption_button = true
  curreent_animation = "small"
  modal_thumbnill_click(index){
    this.imageindex = index
    this.imageUrl = this.imageObject[this.imageindex].image;
    
    if(this.zoom_index > 0){
      var modalImg = document.getElementById("img01");
      modalImg.style.transform = "scale(1,1)"
      this.zoom_index = 0
    }
    this.curreent_animation = (this.curreent_animation ==='small' ? 'large' :'small');
    //var captionText = document.getElementById("caption");
    this.current_imageindex = (this.imageindex + 1).toString() + "/" + this.imageObject.length
    //captionText.innerHTML = this.imageObject[this.imageindex].title;
    this.current_caption = this.imageObject[this.imageindex].title
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
  openModal(indexx) {
    clearInterval(this.myslideinterval)
    this.caption_button = true
    this.showCaption = true
    this.Hide_Caption_Text = "Show Caption"
    this.thumbnill_grid = true
    this.Hide_Grid_Text = "Show Grid"

    
    this.play_pause_icon = "play_circle_outline"
    this.click_toggle = true

    this.imageindex = indexx//0
    this.isverticalmodal = false

    let modal_t  = document.getElementById('modal_1')
    var modalImg = document.getElementById("img01");
    modal_t.style.display = "block";
    modalImg.style.transform = "scale(1,1)"

    this.current_caption = this.imageObject[this.imageindex].title
    this.current_imageindex = (this.imageindex + 1).toString() + "/" + this.imageObject.length
    this.getImgSize(this.imageObject[this.imageindex].image ).subscribe(val=>{       
      if(val.height > val.width){
        this.isverticalmodal = true
      }else{
        this.isverticalmodal = false
      }

      this.imageUrl = this.imageObject[this.imageindex].image;
      var captionText = document.getElementById("caption");
      captionText.innerHTML = this.imageObject[this.imageindex].title;
    })

    //this.display = "block";
  }
  modalclose(){
    let modal  = document.getElementById('modal_1')
    modal.style.display = "none";
    this.imageindex = 0
    clearInterval(this.myslideinterval)
  }
  playslide(){
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
    
    if(this.zoom_index > 0){
      var modalImg = document.getElementById("img01");
      modalImg.style.transform = "scale(1,1)"
      this.zoom_index = 0
    }
    if(this.imageindex >= this.totalImageno -1){
      let modal  = document.getElementById('modal_1')
      this.imageindex = 0
      modal.style.display = "none";
      clearInterval(this.myslideinterval)
      
    }else{
      this.imageindex = this.imageindex + 1

      this.current_caption = this.imageObject[this.imageindex].title
      this.current_imageindex = (this.imageindex + 1).toString() + "/" + this.imageObject.length
      this.curreent_animation = (this.curreent_animation ==='small' ? 'large' :'small');
      this.getImgSize(this.imageObject[this.imageindex].image ).subscribe(val=>{       
        if(val.height > val.width){
          this.isverticalmodal = true
        }else{
          this.isverticalmodal = false
        }

        this.imageUrl = this.imageObject[this.imageindex].image;
        var captionText = document.getElementById("caption");
        captionText.innerHTML = this.imageObject[this.imageindex].title;
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
      this.current_caption = this.imageObject[this.imageindex].title
      this.current_imageindex = (this.imageindex + 1).toString() + "/" + this.imageObject.length
      this.curreent_animation = (this.curreent_animation ==='small' ? 'large' :'small');
      this.getImgSize(this.imageObject[this.imageindex].image ).subscribe(val=>{       
        if(val.height > val.width){
          this.isverticalmodal = true
        }else{
          this.isverticalmodal = false
        }


        this.imageUrl = this.imageObject[this.imageindex].image;
        var captionText = document.getElementById("caption");
        captionText.innerHTML = this.imageObject[this.imageindex].title;

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
  ////////////////////
  nextArticle(){//this.search_date
    this.eventService.getnextarticle(this.search_date).subscribe(posts=>{
      console.log("next article--", posts)
      if(posts[0]){
        this._router.navigate(['/viewtemptwo', posts[0].id]);
      }
    })
  }
  prevArticle(){//this.search_date
    this.eventService.getprevarticle(this.search_date).subscribe(posts=>{
      console.log("next article--", posts)
      if(posts[0]){
        this._router.navigate(['/viewtemptwo', posts[0].id]);
      }
    })
  }
  bntStyle1: string = "btn-default";
  bntStyle2: string = "btn-default";
  bntStyle3 = "btn-default2"
  bntStyle4 = "btn-default2"
  bntStyle5 = "btn-default2"
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
  nationnavyclik(){
    this._router.navigate(['/searchlist', "Nation and the Navy", this.search_type])
  }
  navyhorizonClick(){
    this._router.navigate(['/searchlist', "Navy beyond horizon", this.search_type])
  }
  dateval(id){
    this._router.navigate(['/searchlist', "datesearch:" + id, this.search_type])
  }
}
