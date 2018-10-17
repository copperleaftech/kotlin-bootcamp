import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { Investment } from '../investment';

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
  selectedAssets = []; // ugh

  model = new Investment();

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

  toggleAssetSelection(assetId) {
    console.log(assetId)
    const foundIndex = this.selectedAssets.indexOf(assetId);

    if (foundIndex !== -1) {
      this.selectedAssets.splice(foundIndex, 1);
    } else {
      this.selectedAssets.push(assetId);
    }
  }

  createInvestment(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Investment>(this.investmentsApiUrl, data, httpOptions);
  }

  addAssets() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/uri-list'
      })
    };

    const self = this;
    const filteredAssets = this.assets.filter(function(elem) {
      return self.selectedAssets.indexOf(elem.id) !== -1;
    });
    const assetsUriList = filteredAssets.reduce(function(acc, elem) {
        return acc + elem._links.self.href + '\n';
    }, '');

    // add Asset associations
    const assetAssociationsUrl = `${this.investmentsApiUrl}/${this.model.id}/assets`;
    this.http.put(assetAssociationsUrl, assetsUriList, httpOptions)
      .subscribe((rsp) => {
        console.log('put', rsp);
      });
  }

  onSubmit(form) {
    console.log('Submitted', form.form.value);

    const data = form.form.value;

    this.createInvestment(data)
      .subscribe((rsp) => {
        console.log('create investment', rsp);
        this.model = rsp;
        this.addAssets();
      });

  }

}
