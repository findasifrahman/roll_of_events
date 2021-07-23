import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from "@angular/cdk/overlay";


import { SharedmodulesModule } from './commonmodule/sharedmodule/sharedmodules.module';
import { HomeComponent } from './AllComponent/home/home.component'

import { SearchlistComponent } from './AllComponent/searchlist/searchlist.component';
import { TemplateOneComponent } from './AllComponent/template-one/template-one.component';
import { TemplateTwoComponent } from './AllComponent/event/template-two/template-two.component'
//import { ViewTemplate1Component } from './AllComponent/view-template1/view-template1.component';
import { YearSearchComponent } from './AllComponent/year-search/year-search.component';
import { YearsearchResultComponent } from './AllComponent/yearsearch-result/yearsearch-result.component';
import { CnsViewComponent } from './AllComponent/cns-view/cns-view.component';
import { PastcnslistComponent } from './AllComponent/pastcnslist/pastcnslist.component';
import { PreviewViewComponent } from './AllComponent/preview-view/preview-view.component'
@NgModule({
  declarations: [
    AppComponent, HomeComponent,SearchlistComponent, TemplateOneComponent, 
    YearSearchComponent,TemplateTwoComponent, YearsearchResultComponent, CnsViewComponent, PastcnslistComponent, PreviewViewComponent,// ViewTemplate1Component 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    AppRoutingModule,
    SharedmodulesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
