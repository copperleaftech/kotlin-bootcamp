import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
@Injectable()
export class InvestmentFormComponent implements OnInit {

  apiUrlBase = 'http://localhost:8080/v1/'
  investmentsApiUrl = this.apiUrlBase + 'investments'
  assetsApiUrl = this.apiUrlBase + 'assets'

  assets = []; // is this necessary?

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('init');
    this.getAssets();
  }

  getAssets() {
    console.log('getAssets');
    this.http.get(this.assetsApiUrl).subscribe((data) => {
      console.log('data', data._embedded.assets);
      this.assets = data._embedded.assets;
    });
  }

  onSubmit() {
    console.log('Submitted');
    // console.log(formValue);


  //  this.http.post(this.investmentsApiUrl)
  }

}
