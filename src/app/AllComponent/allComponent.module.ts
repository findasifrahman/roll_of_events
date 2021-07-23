import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from '../auth/auth.guard';

import { SharedmodulesModule } from '../commonmodule/sharedmodule/sharedmodules.module';
import { SharedComponentmoduleModule  } from '../sharedComponentModule/shared-componentmodule.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AdminlayoutComponent } from '../commonLayout/adminlayout/adminlayout.component';

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";

import { EventAddComponent } from './event/event-add/event-add.component'; // a plugin

import { eventForm } from '../models/eventmodels';
import { synonymForm } from '../models/synonymmodels'
import { EventListComponent } from './event/event-list/event-list.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { SynonyAddComponent } from './synonym/synony-add/synony-add.component';
import { SynonyEditComponent } from './synonym/synony-edit/synony-edit.component';
import { SynonyListComponent } from './synonym/synony-list/synony-list.component';
import { LoadedDirectiveDirective } from './directives/loaded-directive.directive';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ImgFrontListComponent } from './event/img-front-list/img-front-list.component';


const routes: Routes = [

  //{ path: '', redirectTo: 'addEvent', pathMatch: 'full'},
  { path: '',component: AdminlayoutComponent ,children:[

    { path: '', //loadChildren: './settingsComponents/settingsComponents.module#settingsComponentModule'
      children:[
                       
          { 
            path: 'addEvent', component: EventAddComponent
          },
          { 
            path: 'listEvent', component: EventListComponent
          },
          { 
            path: 'editEvent/:id', component: EventEditComponent
          },
          { 
            path: 'addrelated', component: SynonyAddComponent
          },
          { 
            path: 'listrelated', component: SynonyListComponent
          },
          { 
            path: 'editrelated/:id', component: SynonyEditComponent
          },
          {
            path:'frontimage', component:ImgFrontListComponent
          }
         /* { 
            path: 'editSchool/:id',  component: EditSchoolComponent,
          }*/

        ],

      },
    ]
  }
]

@NgModule({
  declarations:[AdminlayoutComponent,EventAddComponent, EventListComponent, EventEditComponent, 
    SynonyAddComponent, SynonyEditComponent, SynonyListComponent, LoadedDirectiveDirective, 
    ImgFrontListComponent],
  imports: [CommonModule,FormsModule,RouterModule.forChild(routes),SharedComponentmoduleModule,
    ReactiveFormsModule,HttpClientModule,SharedmodulesModule,NgxSpinnerModule,eventForm,synonymForm ],
  exports: [AdminlayoutComponent,EventAddComponent,EventListComponent,EventEditComponent,CKEditorModule,
    SynonyAddComponent, SynonyEditComponent, SynonyListComponent,ImgFrontListComponent
 ],
 providers: [AuthGuard,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
 schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class allComponentModule{}
