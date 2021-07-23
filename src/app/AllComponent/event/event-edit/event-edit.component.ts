import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
//import { DeviceService } from '../device.service';
import { Router,ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { eventForm ,eventmodels } from '../../../models/eventmodels'//'../../../../models/devicemodels';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EventService } from '../event.service'
import * as moment from 'moment';
import { routeurls } from '../../../AllComponent/routeurls/routeurls'
import {fromEvent, Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  categoryName_arr = ["general","navy_beyond_horizon","naval_exercises","naval_ceremonies","achievments","national_events","mujib_borsho"]

  add = false
  filenameinput3: string = "Image 3";
  filenameinput2: string = "Image 2";
  filenameinput1: string = "Image 1";
  filenameinput4: string = "Image 4";
  _file3id: string = null;
  _file2id: string = null;
  _file1id: string = null;
  _file4id: string = null;

  filenameinput5: string = "Image 5";
  filenameinput6: string = "Image 6";
  filenameinput7: string = "Image 7";
  filenameinput8: string = "Image 8";
  _file5id: string = null;
  _file6id: string = null;
  _file7id: string = null;
  _file8id: string = null;

  filenameinput9: string = "Image 9";
  filenameinput10: string = "Image 10";
  filenameinput11: string = "Image 11";
  filenameinput12: string = "Image 12";

  filenameinput13: string = "Video";

  _file9id: string = null;
  _file10id: string = null;
  _file11id: string = null;
  _file12id: string = null;

  _file13id: string = null; //video
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  public Editor = ClassicEditor;
  id: any;
  constructor(private snackBar: MatSnackBar,  private cdref: ChangeDetectorRef, private eventService:EventService,
    private formBuilder: FormBuilder, private _router: Router,private eventModels:eventForm,private route: ActivatedRoute) { }
    ////
      /////////////////////
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
    ////////////////
    posts  ={
      idres: {title: "",date:"", tdate: "",place:"pl", datetext: "",text: "",image1: "",image2: "",image3: "",
      image4: "",image5: "",image6: "",image7: "",image8: "",image9: "",image10: "",image11: "",image12: "",
      image1caption:"",image2caption:"",image3caption:"",image4caption:"",image5caption:"",image6caption:""
      ,image7caption:"",image8caption:"",image9caption:"",image10caption:"",image11caption:"",image12caption:"",
    video: null},
      relateddate: [{title:"Title 1", place: "All", date:"2021-05-27", tdate:"27 july12021",image1:"https://via.placeholder.com/160",isverticle:false},
      {title:"Title 2", place: "All", date:"2021-05-27", tdate:"27 july12021",image1:"https://via.placeholder.com/160",isverticle:false},
        {title:"Title 3", place: "All", date:"2021-05-27", tdate:"27 july12021",image1:"https://via.placeholder.com/160",isverticle:false}],
      relatedyear: [{title:"Title 1", place: "All", date:"2021-05-27", tdate:"27 july12021",image1:"https://via.placeholder.com/160",isverticle: false},
      {title:"Title 2", place: "All", date:"2021-05-27", tdate:"27 july12021",image1:"https://via.placeholder.com/160",isverticle:false},
        {title:"Title 3", place: "All", date:"2021-05-27", tdate:"27 july12021",image1:"https://via.placeholder.com/160",isverticle:false}],
      
    }
    ////////
  compareThem(o1, o2): boolean{
      console.log('compare with');
      return o1.name === o2.name;
  }
  defval:any;
  
  ngOnInit() {
    this.Forms = this.eventModels.modelForms;

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.eventService.getbyid(this.id).subscribe((data) => {
        this._file4id = data["image4"];
        this._file3id = data["image3"]; //prev val assign
        this._file2id = data["image2"];
        this._file1id = data["image1"];
        this._file5id = data["image5"];
        this._file6id = data["image6"];
        this._file7id = data["image7"];
        this._file8id = data["image8"];
        this._file9id = data["image9"];
        this._file10id = data["image10"];
        this._file11id = data["image11"];
        this._file12id = data["image12"];

        this._file13id = data["video"];
        data["date"] = moment(data['date']).format("YYYY-MM-DD")
        this.Forms.patchValue(data);
        //this.selectFormControl = new FormControl(data["productgroup"], Validators.required);
       // this.defval = data["productgroup"];
        console.log(this.Forms);
        ////////////////////////////////////////////////
            ////////////////////////////
    let posts = this.posts
    //console.log(posts)
    let temparr = []
    this.searchres = posts.idres
    posts.relateddate.map((mapval,index)=>{
      //mapval.image1 = this.mainuri + mapval.image1
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
      //mapval.image1 = this.mainuri + mapval.image1
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

    //////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
      });
    })
  }

  async FormSubmit() {
    if(!this._file1id){
      alert("Please Select Image 1")
      return
    }
    if(!this._file2id && this._file3id){
      alert("Please Select Image 2 or remove image 3")
      return
    }
    if(!this._file3id && this._file4id){
      alert("Please Select Image 3 or remove image 4")
      return
    }
    if(!this._file4id && this._file5id){
      alert("Please Select Image 4 or remove image 5")
      return
    }
    if(!this._file5id && this._file6id){
      alert("Please Select Image 5 or remove image 6")
      return
    }
    if(!this._file6id && this._file7id){
      alert("Please Select Image 6 or remove image 7")
      return
    }
    this.Forms.patchValue({
      image1: this._file1id,
      image2: this._file2id,
      image3: this._file3id,
      image4: this._file4id,

      image5: this._file5id,
      image6: this._file6id,
      image7: this._file7id,
      image8: this._file8id,
      image9: this._file9id,
      image10: this._file10id,
      image11: this._file11id,
      image12: this._file12id,

      video: this._file13id
    })
    const formValue = this.Forms.value;
    console.log(formValue);
    await this.eventService.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this._router.navigate(['/listEvent']);
    },
      error => {
        console.log("error Update", error);
        this.snackBar.open('Update Unsuccessfull', "Remove", {
          duration: 6000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      }
    );
  }
  file4id($event) {
    this._file4id = $event; console.log("pic id arrived--" + $event);
  }
  file3id($event) {
    this._file3id = $event; console.log("pic id arrived--" + $event);
  }
  file2id($event) {
    this._file2id = $event; console.log("pic id arrived--" + $event);
  }
  file1id($event) {
    this._file1id = $event; console.log("pic id arrived--" + $event);
  }

  file5id($event) {
    this._file5id = $event; console.log("pic id arrived--" + $event);
  }
  file6id($event) {
    this._file6id = $event; console.log("pic id arrived--" + $event);
  }
  file7id($event) {
    this._file7id = $event; console.log("pic id arrived--" + $event);
  }
  file8id($event) {
    this._file8id = $event; console.log("pic id arrived--" + $event);
  }
  file9id($event) {
    this._file9id = $event; console.log("pic id arrived--" + $event);
  }
  file10id($event) {
    this._file10id = $event; console.log("pic id arrived--" + $event);
  }
  file11id($event) {
    this._file11id = $event; console.log("pic id arrived--" + $event);
  }
  file12id($event) {
    this._file12id = $event; console.log("pic id arrived--" + $event);
  }

  file13id($event) {
    this._file13id = $event; console.log("pic id arrived--" + $event);
  }

  modalclose(){
    let modal  = document.getElementById('modal_1')
    modal.style.display = "none";
  }
  previewSubmit(){
    this.searchres.title = this.Forms.controls['title'].value
    this.searchres.date = this.Forms.controls['date'].value
    this.searchres.tdate = this.Forms.controls['date'].value
    this.searchres.place = this.Forms.controls['place'].value
    this.searchres.datetext = this.Forms.controls['datetext'].value
    this.searchres.text = this.Forms.controls['text'].value
    this.searchres.image1 = this._file1id
    this.searchres.image2 = this._file2id
    this.searchres.image3 = this._file3id
    this.searchres.image4 = this._file4id
    this.searchres.image5 = this._file5id
    this.searchres.image6 = this._file6id
    this.searchres.image7 = this._file7id
    this.searchres.image8 = this._file8id
    this.searchres.image9 = this._file9id
    this.searchres.image10 = this._file10id
    this.searchres.image11 = this._file11id
    this.searchres.image12 = this._file12id
    /////////////////////////////////////////////////
        ///////////////////////////////
        this.searchtext = "params['id'];"
        let posts = this.posts
        
        //this.searchres = posts.idres
    
          this.getImgSize(this.mainuri +   this.searchres.image1 ).subscribe(val=>{     
            ////////////////////////////////////////////////////////////////////////////////////
              posts.idres.image1 = this.mainuri +  this.searchres.image1
              this.imageObject.push({image:  posts.idres.image1,  title: posts.idres.image1caption,index:0})
              if(this.searchres.image2){
                posts.idres.image2 = this.mainuri +  this.searchres.image2
                this.totalImageno = this.totalImageno + 1
                this.imageObject.push({image:  posts.idres.image2,  title: posts.idres.image2caption,index:1})
              }
              
              //posts.idres.image3 = this.mainuri +  posts.idres.image1
              //this.imageObject.push({image:  posts.idres.image1,  title: posts.idres.image1caption})
              if(this.searchres.image3){       
                posts.idres.image3 = this.mainuri +  this.searchres.image3
                this.imageObject.push({image:  posts.idres.image3,  title: posts.idres.image3caption,index:2})
                
                this.totalImageno = this.totalImageno + 1
              }
              if(this.searchres.image4){
                posts.idres.image4 = this.mainuri +  this.searchres.image4
                this.imageObject.push({image:  posts.idres.image4,  title: posts.idres.image4caption,index:3})
                
                this.totalImageno = this.totalImageno + 1
              }
              if(this.searchres.image5){
                posts.idres.image5 = this.mainuri +  this.searchres.image5
                this.imageObject.push({image:  posts.idres.image5, title: posts.idres.image5caption,index:4})
                this.additional_image_num = "+0"
                this.totalImageno = this.totalImageno + 1
              }
              if(this.searchres.image6){
                posts.idres.image6 = this.mainuri +  this.searchres.image6
                this.imageObject.push({image:  posts.idres.image6,  title: posts.idres.image6caption,index:5})
                this.additional_image_num = "+1"
                this.totalImageno = this.totalImageno + 1
              }
              if(this.searchres.image7){
                posts.idres.image7 = this.mainuri +  posts.idres.image7
                this.imageObject.push({image:  posts.idres.image7,  title: posts.idres.image7caption,index:6})
                this.additional_image_num = "+2"
              }
              if(this.searchres.image8){
                posts.idres.image8 = this.mainuri +  posts.idres.image8
                this.imageObject.push({image:  posts.idres.image8, title: posts.idres.image8caption,index:7})
                this.additional_image_num = "+3"
                this.totalImageno = this.totalImageno + 1
              }
              if(this.searchres.image9){
                posts.idres.image9 = this.mainuri +  posts.idres.image9
                this.imageObject.push({image:  posts.idres.image9, title: posts.idres.image9caption,index:8})
                this.additional_image_num = "+4"
              }
              if(this.searchres.image10){
                posts.idres.image10 = this.mainuri +  posts.idres.image10
                this.imageObject.push({image:  posts.idres.image10, title: posts.idres.image10caption,index:9})
                this.additional_image_num = "+5"
                this.totalImageno = this.totalImageno + 1
              }
              if(this.searchres.image11){
                posts.idres.image11 = this.mainuri +  posts.idres.image11
                this.imageObject.push({image:  posts.idres.image11, title: posts.idres.image11caption,index:10})
                this.additional_image_num = "+6"
                this.totalImageno = this.totalImageno + 1
              }
              if(this.searchres.image12){
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
                      {text: 'One', cols: 2, rows: 2, image:  posts.idres.image1,image1verticle: true},
                      {text: 'two', cols: 2, rows: 2, video:  this.searchres.video,image1verticle: false}
                    ]
                  }else{ 
                    this.tiles = [
                      {text: 'two', cols: 2, rows: 2, video:  this.searchres.video},
                      {text: 'One', cols: 2, rows: 2, image: posts.idres.image1}] 
                  }
                } else{ 
                  this.rowHeight = "36vh"
                  if(val.height > val.width){
                    this.tiles = [
                      {text: 'One', cols: 4, rows: 2, image:  posts.idres.image1,image1verticle: true}
                    ]
                  }else{ 
                    this.tiles = [
                      {text: 'One', cols: 4, rows: 2, image: posts.idres.image1}] 
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
                      {text: 'One', cols: 3, rows: 2, video:  this.searchres.video},
                      {text: 'two', cols: 1, rows: 1, image:  posts.idres.image1,image1verticle: image2verticle},
                      {text: 'three', cols: 1, rows: 1, image:  posts.idres.image2,image1verticle: image2verticle}
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
                        {text: 'One', cols: 2, rows: 2, image:  posts.idres.image1,image1verticle: image1verticle},
                        {text: 'two', cols: 2, rows: 2, image:  posts.idres.image2,image1verticle: image2verticle}
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
                        {text: 'One', cols: 3, rows: 3, video:  this.searchres.video},
                        {text: 'Two', cols: 1, rows: 1,image: posts.idres.image1,image1verticle: image1verticle},
                        {text: 'Three', cols: 1, rows: 1,image: posts.idres.image2, image1verticle: image2verticle},
                        {text: 'Four', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle},
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
                        {text: 'One', cols: 3, rows: 2, image:  posts.idres.image1,image1verticle: image1verticle},
                        {text: 'Two', cols: 1, rows: 1,image: posts.idres.image2,image1verticle: image2verticle},
                        {text: 'Three', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle},
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
                          {text: 'One', cols: 4, rows: 3, video: this.searchres.video},
                          {text: 'Two', cols: 1, rows: 1,image: posts.idres.image1,image1verticle: image1verticle},
                          {text: 'Three', cols: 1, rows: 1,image: posts.idres.image2, image1verticle: image2verticle},
                          {text: 'Four', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle},
                          {text: 'Five', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image4verticle}
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
                              {text: 'One', cols: 3, rows: 3, image:  posts.idres.image1,image1verticle: image1verticle},
                              {text: 'Two', cols: 1, rows: 1,image: posts.idres.image2,image1verticle: image2verticle},
                              {text: 'Three', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle},
                              {text: 'Four', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image4verticle}
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
                              {text: 'One', cols: 4, rows: 3,video: this.searchres.video},
                              {text: 'Two', cols: 1, rows: 1,image: posts.idres.image1,image1verticle: image1verticle},
                              {text: 'Three', cols: 1, rows: 1,image: posts.idres.image2, image1verticle: image2verticle},
                              {text: 'Four', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle},
                              {text: 'Five', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image4verticle,additional_image: true}
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
                                {text: 'One', cols: 4, rows: 3, image:  posts.idres.image1,image1verticle: image1verticle},
                                {text: 'Two', cols: 1, rows: 1,image: posts.idres.image2,image1verticle: image2verticle},
                                {text: 'Three', cols: 1, rows: 1,image: posts.idres.image3, image1verticle: image3verticle},
                                {text: 'Four', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image4verticle},
                                {text: 'Five', cols: 1, rows: 1,image: posts.idres.image4, image1verticle: image5verticle,additional_image: true}
                              ]
                            })
                        })
                      })
                    })
                }
              }
              ///////////////////////////////////////////////////////////////
    
          })
    //////////////////////////////////////////////////////
    let modal_t  = document.getElementById('modal_1')
    var modalImg = document.getElementById("img01");
    modal_t.style.display = "block";
  }
  /////////////////////
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
  //////////////////////////

}
