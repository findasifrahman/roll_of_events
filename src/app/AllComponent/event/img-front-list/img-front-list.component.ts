import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { EventService } from '../event.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../sharedComponentModule/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { routeurls } from '../../../AllComponent/routeurls/routeurls'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-img-front-list',
  templateUrl: './img-front-list.component.html',
  styleUrls: ['./img-front-list.component.scss']
})
export class ImgFrontListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id','title','image1','image1prio','image2','image2prio',
    'image3','image3prio','image4','image4prio','image5','image5prio'];
  displayedColumnsName: string[] = ['id','category','title','image1'];
  AllElement: MatTableDataSource<any>;
  mainuri = routeurls.BASE_API_URL + "/api/uploads/"//"/api/uploads/"//"http://localhost:5020/api/uploads/";
   
  constructor(private snackBar: MatSnackBar, private eventService : EventService , public dialog: MatDialog,
    public _router: Router,private spinner: NgxSpinnerService,) {

     }
     searchIn = 0
     public doFilter = (value: string) => {
       this.searchIn = 2
       this.AllElement.filter = value.trim().toLocaleLowerCase();
     }
     public doFilterdate = (value: string) => {
       console.log("value-",value)
       this.searchIn = 1
       this.AllElement.filter = value.trim()
     }
     public doFiltercategory = (value: string) => {
       this.searchIn = 0
       this.AllElement.filter = value.trim()
     }
  
  ngOnInit(): void {
    
  }


  ngAfterViewInit(): void {
    this.eventService.getAll().subscribe((posts) => {
      posts.map((mapval,index) =>{
        mapval.image1 = this.mainuri + mapval.image1
        if(mapval.image2){ mapval.image2 = this.mainuri + mapval.image2 }
        if(mapval.image3){ mapval.image3 = this.mainuri + mapval.image3 }
        if(mapval.image4){ mapval.image4 = this.mainuri + mapval.image4 }
        if(mapval.image5){ mapval.image5 = this.mainuri + mapval.image5 }
        if(mapval.image6){ mapval.image6 = this.mainuri + mapval.image6 }
        this.imageObject.push(mapval)
        if(posts.length - 1 == index){
          this.AllElement = new MatTableDataSource(posts as any);
          this.AllElement.paginator = this.paginator;
          this.AllElement.filterPredicate = (data, filter: string) => {
            if(this.searchIn == 1){
             return !filter || data.date.includes(filter);
            }else if(this.searchIn == 2){
              return !filter || data.title.includes(filter);
            }else {
              return !filter || data.category.includes(filter);
            }
          }

        }
      })
      //posts["date"] = moment(posts['date']).format("YYYY-MM-DD")
     /* this.AllElement.filterPredicate = (data, filter: string) => 
      !filter || data.category.includes(filter);*/
      //setTimeout(() => this.AllElement.paginator = this.paginator);
      console.log(posts);
    });
  }

  imagepriochange(id,imageno,prioval){
    console.log("image 1 prio changed---", id)
    ////////////////////////////////
    this.spinner.show()
    this.eventService.updateprio(id,imageno,prioval).subscribe(userdata=>{
     
      setTimeout(()=>{
        this.spinner.hide();
      },1000)
      console.log("update-", userdata)
      //this.update_table()
      this.snackBar.open('Update Successfully', "Remove", {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: ['blue-snackbar']
      });
      //this.router.navigate(["/adminhome"]);
    },
    error => {
      this.spinner.hide();
      console.log("error update -", error)
      this.snackBar.open('Update Error', "Remove", {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar']
      });
    })
    // copy and mutate
    //const copy = this.dataSource.data().slice()
    ///////////////////////////////////)
  }
  imageindex
  isverticalmodal = false
  current_caption
  imageObject = []
  imageUrl
  current_imageindex
  openModal(id,imageno) {
    this.imageindex = 0
    this.isverticalmodal = false
    let modal_t  = document.getElementById('modal_1')
    var modalImg = document.getElementById("img01");
    modal_t.style.display = "block";

    let obj = this.imageObject.find(x=> x.id == id)
    if(imageno == 1){
      this.current_caption = obj.title
      this.imageUrl = obj.image1;
    }else if(imageno == 2){
      this.current_caption = obj.title
      this.imageUrl = obj.image2;
    }else if(imageno == 3){
      this.current_caption = obj.title
      this.imageUrl = obj.image3;
    }else if(imageno == 4){
      this.current_caption = obj.title
      this.imageUrl = obj.image4;
    }else if(imageno == 5){
      this.current_caption = obj.title
      this.imageUrl = obj.image5;
    }


      //captionText.innerHTML = this.imageObject[this.imageindex].title;
    

    //this.display = "block";
  }

  modalclose(){
    let modal  = document.getElementById('modal_1')
    modal.style.display = "none";
    this.imageindex = 0
  }


}


