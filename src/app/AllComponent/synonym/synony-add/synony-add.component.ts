import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SynonyService } from '../synony.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';

import { synonymForm } from '../../../models/synonymmodels';

@Component({
  selector: 'app-synony-add',
  templateUrl: './synony-add.component.html',
  styleUrls: ['./synony-add.component.scss']
})
export class SynonyAddComponent implements OnInit {
  Forms: FormGroup;
  constructor(private synonymmodelsform:synonymForm,private snackBar:MatSnackBar,
    private synonymService: SynonyService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.Forms = this.synonymmodelsform.modelForms;
    this.Forms.reset();
  }
  async FormSubmit() {

    const formValue = this.Forms.value;
    try {
      await this.synonymService.Add(formValue).subscribe(
        data => {
          //console.log("data returned is-", data)
            console.log("post req successfull");
            this.snackBar.open('Added Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/listrelated"]);
          
        },
        error => {
          if(error.error){
            console.log("error post", error.error);
            this.snackBar.open('Unsuccessfull, Duplicate Data probably', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['red-snackbar']
            });
          }else{
            this.snackBar.open('Something Went Wrong', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['red-snackbar']
            });
          }
        }
      );

    }
    catch (err) {
    }
  }

}
