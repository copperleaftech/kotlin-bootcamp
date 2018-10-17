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
  assetSearchApiUrlBase = this.apiUrlBase + 'assets/search/queryByNameContainingOrTypeContainingOrLocationContainingAllIgnoreCase'

  assets = []; // is this necessary?
  selectedAssets = []; // ugh
  filteredAssets = null;

  model = new Investment();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAssets();
  }

  getAssets() {
    this.http.get(this.assetsApiUrl).subscribe((data) => {
      console.log('data', data._embedded.assets);
      this.assets = data._embedded.assets;
    });
  }

  toggleAssetSelection(assetId) {
    const foundIndex = this.selectedAssets.indexOf(assetId);

    if (foundIndex !== -1) {
      this.selectedAssets.splice(foundIndex, 1);
    } else {
      this.selectedAssets.push(assetId);
    }
  }

  search(event) {
    const query = event.target.value;
    const searchUrl = `${this.assetSearchApiUrlBase}?name=${query}&type=${query}&location=${query}`;

    this.http.get(searchUrl).subscribe((data) => {
      this.filteredAssets = data._embedded.assets;
    });
  }

  createInvestment(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Investment>(this.investmentsApiUrl, data, httpOptions);
  }

  addAssets() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/uri-list'
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
