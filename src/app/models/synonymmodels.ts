import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface synonymmodels {
  word: string,
  related: string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class synonymForm {
  modelForms: FormGroup = this.formBuilder.group({
    word:["", Validators.required],
    related: ["", Validators.required]

  });

  constructor(private formBuilder: FormBuilder) {}

}
