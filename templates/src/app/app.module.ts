import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { AssetsComponent } from './assets/assets.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentFormComponent,
    AssetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
