import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'view', component: HomeComponent,
    // children: [
    //   { path: ':project_id', redirectTo: ':project_id/0', pathMatch: 'full' },
    //   { path: ':project_id/:slide_id', component: ViewComponent },
    //   { path: '', component: HomeComponent },
    // ]
  },
  { path: 'view/:project_id', redirectTo: 'view/:project_id/0', pathMatch: 'full' },
  { path: 'view/:project_id/:slide_id', component: ViewComponent },
  { path: 'edit', component: EditComponent },
  { path: 'edit/:project_id', component: EditComponent },
  { path: '', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
