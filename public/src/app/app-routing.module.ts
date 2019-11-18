import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NewrestComponent } from './newrest/newrest.component';
import { EditrestComponent } from './editrest/editrest.component';
import { OnerestaurantComponent } from './onerestaurant/onerestaurant.component';
import { NewreviewComponent } from './newreview/newreview.component';
const routes: Routes = [
  { path: '', component: RestaurantComponent },
  { path: 'new', component: NewrestComponent },
  { path: 'edit/:id', component: EditrestComponent },
  { path: 'rest/:id', component: OnerestaurantComponent },
  { path: 'rest/new/:id', component: NewreviewComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '**', component: RestaurantComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
