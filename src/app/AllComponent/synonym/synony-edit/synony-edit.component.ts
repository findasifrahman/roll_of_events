import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
//import { DeviceService } from '../device.service';
import { Router,ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { synonymForm  } from '../../../models/synonymmodels'//'../../../../models/devicemodels';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SynonyService } from '../synony.service'

@Component({
  selector: 'app-synony-edit',
  templateUrl: './synony-edit.component.html',
  styleUrls: ['./synony-edit.component.scss']
})
export class SynonyEditComponent implements OnInit {

  id: any;
  Forms: FormGroup;
  constructor(private snackBar: MatSnackBar,  private cdref: ChangeDetectorRef, private synonymService:SynonyService,
    private formBuilder: FormBuilder, private _router: Router,private synonymModels:synonymForm,private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.Forms = this.synonymModels.modelForms;

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.synonymService.getbyid(this.id).subscribe((data) => {
        this.Forms.patchValue(data);
      })
    })
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    //console.log(formValue);
    await this.synonymService.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this._router.navigate(['/listrelated']);
    },
      error => {
        console.log("error Update", error);
        this.snackBar.open('Update Unsuccessfull', "Remove", {
          duration: 6000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      }
    );
  }

}
