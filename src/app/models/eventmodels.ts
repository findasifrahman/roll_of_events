import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface eventmodels {
  eventName: string,
  DdayStart: string,
  isFullDay: number,
  mainColor: string,
  DdayEnd:string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class eventForm {
  modelForms: FormGroup = this.formBuilder.group({
    eventname:["", Validators.required],
    title: ["", Validators.required],
    subtitle:[""],
    date: ["", Validators.required],
    datetext:["", Validators.required],//{value: '', disabled: true}
    place: ["", Validators.required],
    uploadDate:[""],
    priority:[0],
    uuid:[""],
    keyword:[""],
    view:[0],
    category:["general"],
    relatedWord: [""],
    text: ["", Validators.required],
    numOfImage: [0],
    numOfVideo: [0],
    image1:[""],
    image2:[""],
    image3:[""],
    image4:[""],
    image5:[""],
    image6:[""],
    image7:[""],
    image8:[""],
    image9:[""],
    image10:[""],
    image11:[""],
    image12:[""],
    image13:[""],
    image14:[""],
    image15:[""],
    video:[""],
    eventCNS:[""],
    tenureCNS:[""],
    image1caption: [""],
    image2caption: [""],
    image3caption: [""],
    image4caption: [""],
    image5caption: [""],
    image6caption: [""],
    image7caption: [""],
    image8caption: [""],
    image9caption: [""],
    image10caption: [""],
    image11caption: [""],
    image12caption: [""],
    language:[""],
    image1prio:[false],
    image2prio:[false],
    image3prio:[false],
    image4prio:[false],
    image5prio:[false],
    image6prio:[false],
    image7prio:[false],
    image8prio:[false],
    image9prio:[false],
    image10prio:[false],
    image11prio:[false],
    image12prio:[false]

  });

  constructor(private formBuilder: FormBuilder) {}

}
