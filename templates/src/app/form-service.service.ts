import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  apiUrlBase = 'http://localhost:8080/v1/'
  assetsApiUrl = this.apiUrlBase + 'assets'
  assetSearchApiUrlBase = this.apiUrlBase + 'assets/search/queryByNameContainingOrTypeContainingOrLocationContainingAllIgnoreCase'
  investmentsApiUrl = this.apiUrlBase + 'investments'

  investment = {
    title: null,
    sponsorName: null,
    requiredBy: null,
    projectReason: null,
    projectScope: null,
  };
  assets = []; // is this necessary?
  selectedAssets = []; // ugh
  filteredAssets = null;

  getAssets(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(this.assetsApiUrl).subscribe((data) => {
        console.log('data', data['_embedded'].assets);
        this.assets = data['_embedded'].assets;
        observer.next(this.assets);
        observer.complete();
      });
    });
  }

  toggleAssetSelection(assetId) {
    const foundIndex = this.selectedAssets.indexOf(assetId);

    if (foundIndex !== -1) {
      this.selectedAssets.splice(foundIndex, 1);
    } else {
      this.selectedAssets.push(assetId);
    }

    return this.selectedAssets;
  }

  search(query): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const searchUrl = `${this.assetSearchApiUrlBase}?name=${query}&type=${query}&location=${query}`;

      this.http.get(searchUrl).subscribe((data) => {
        this.filteredAssets = data['_embedded'].assets;
        observer.next(this.filteredAssets);
        observer.complete();
      });
    });
  }

  setInvestmentField(field, value) {
    this.investment[field] = value;
  }

  getInvestment() {
    return this.investment;
  }

  getSelectedAssets() {
    return this.selectedAssets;
  }

  filterAssets() {
    const self = this;
    return this.assets.filter(function(elem) {
      return self.selectedAssets.indexOf(elem.id) !== -1;
    });
  }

  createInvestment() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.investmentsApiUrl, this.investment, httpOptions);
  }

  addAssets(investmentId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/uri-list'
      })
    };

    const filteredAssets = this.filterAssets();
    const assetsUriList = filteredAssets.reduce(function(acc, elem) {
      return acc + elem._links.self.href + '\n';
    }, '');

    // add Asset associations
    const assetAssociationsUrl = `${this.investmentsApiUrl}/${investmentId}/assets`;
    return this.http.put(assetAssociationsUrl, assetsUriList, httpOptions);
  }
}
