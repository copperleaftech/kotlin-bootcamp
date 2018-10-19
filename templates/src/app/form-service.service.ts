import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  // hardcoded to my IP address for demoing
  // apiUrlBase = 'http://192.168.11.55:8080/v1/';

  apiUrlBase = 'http://localhost:8080/v1/'
  assetsApiUrl = this.apiUrlBase + 'assets';
  assetSearchApiUrlBase = this.apiUrlBase + 'assets/search/all';
  investmentsApiUrl = this.apiUrlBase + 'investments';

  investment = {
    title: {
      type: 'string',
      required: true,
      value: null,
      error: null,
    },
    sponsorName: {
      type: 'string',
      required: true,
      value: null,
      error: null,
    },
    requiredBy: {
      type: 'date',
      required: true,
      value: null,
      error: null,
    },
    projectReason: {
      type: 'string',
      required: true,
      value: null,
      error: null,
    },
    projectScope: {
      type: 'string',
      required: true,
      value: null,
      error: null,
    },
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

  validateInvestmentField(field, value) {
    // this is poorly implemented
    if (value === '') {
      if (this.investment[field].required) {
        this.investment[field].error = 'Field is required.';
      } else {
        this.investment[field].error = null;
      }
    } else {
      this.investment[field].error = null; // clear any previous 'field is required' errors
      if (this.investment[field].type === 'date') {
        if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
          this.investment[field].error = 'Invalid date. Date must be in the format YYYY-MM-DD.';
        } else {
          this.investment[field].error = null;
        }
      }
    }
  }

  setInvestmentField(field, value) {
    this.investment[field].value = value;
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

    const investment = this.investment; // this doesn't work inside reduce
    const data = Object.keys(investment).reduce((acc, key) => {
      acc[key] = investment[key].value;
      return acc;
    }, {});

    return this.http.post(this.investmentsApiUrl, data, httpOptions);
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
