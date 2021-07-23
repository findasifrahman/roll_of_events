import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './AllComponent/home/home.component'
import { SearchlistComponent } from './AllComponent/searchlist/searchlist.component'
import { TemplateOneComponent } from './AllComponent/template-one/template-one.component'
import { TemplateTwoComponent } from './AllComponent/event/template-two/template-two.component'
import { YearSearchComponent } from './AllComponent/year-search/year-search.component'
import { YearsearchResultComponent } from './AllComponent/yearsearch-result/yearsearch-result.component'
import { CnsViewComponent  } from './AllComponent/cns-view/cns-view.component'
import { PastcnslistComponent } from './AllComponent/pastcnslist/pastcnslist.component'
//import { ViewTemplate1Component } from './allComponent/view-template1/view-template1.component';
const routes: Routes = [
  /*{
    path: '', component: LoginComponent, pathMatch: 'full'
  },*/
  { 
    path: '', component: HomeComponent,pathMatch: 'full'
  },   
  { 
    path: 'viewtempone/:id', component: TemplateOneComponent,pathMatch: 'full'
  },  
  { 
    path: 'viewtemptwo/:id', component: TemplateTwoComponent,pathMatch: 'full'
  },    
  { 
    path: 'searchlist/:id/:id2', component: SearchlistComponent,pathMatch: 'full'
  },  
  { 
    path: 'yearsearch', component: YearSearchComponent,pathMatch: 'full'
  },
  { 
    path: 'yearsearchresult/:id', component: YearsearchResultComponent,pathMatch: 'full'
  },    
  { 
    path: 'cns/:id', component: CnsViewComponent,pathMatch: 'full'
  }, 
  { 
    path: 'pastcns', component: PastcnslistComponent,pathMatch: 'full'
  },
  /*{ 
    path: 'viewTemp1/:id', component: ViewTemplate1Component,pathMatch: 'full'
  }, */
  { path: '',     //component: AdminlayoutComponent,
    children: [
      { path:'', loadChildren: () => import('./AllComponent/allComponent.module').then(m => m.allComponentModule) }
    ]
  },

];
export function mytokenGetter() {
  //return this.logservice.getUserLogStatus();
  return localStorage.getItem('jwt');
}
@NgModule({
  imports: [RouterModule.forRoot(routes),
    JwtModule.forRoot({/* automatically assign bearer token with every http request service*/
      config: {
        tokenGetter: mytokenGetter,
        //whitelistedDomains: ['localhost:5022','18.136.57.177:5022'],
        //blacklistedRoutes: []
      }
    }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
