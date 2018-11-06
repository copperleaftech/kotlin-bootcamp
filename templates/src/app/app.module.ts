import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { AssetsComponent } from './assets/assets.component';
import { InvestmentSummaryComponent } from './investment-summary/investment-summary.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: 'overview', component: InvestmentFormComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'summary', component: InvestmentSummaryComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
]


@NgModule({
  declarations: [
    AppComponent,
    InvestmentFormComponent,
    AssetsComponent,
    InvestmentSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
