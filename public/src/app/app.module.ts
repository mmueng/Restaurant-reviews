import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// register service
import { HttpService } from './http.service';
// import httpclient
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NewrestComponent } from './newrest/newrest.component';
import { EditrestComponent } from './editrest/editrest.component';
import { OnerestaurantComponent } from './onerestaurant/onerestaurant.component';
import { NewreviewComponent } from './newreview/newreview.component';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    NewrestComponent,
    EditrestComponent,
    OnerestaurantComponent,
    NewreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
