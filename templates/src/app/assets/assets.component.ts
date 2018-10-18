import { Component, OnInit } from '@angular/core';

import { FormService } from '../form-service.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  assets = [];
  selectedAssets = [];
  filteredAssets = null;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.getAssets();
    this.getSelectedAssets();
  }

  getAssets() {
    this.formService.getAssets().subscribe(data => {
      this.assets = data;
    });
  }

  getSelectedAssets() {
    this.selectedAssets = this.formService.getSelectedAssets();
  }

  toggleAssetSelection(assetId) {
    this.selectedAssets = this.formService.toggleAssetSelection(assetId);
  }

  search(event) {
    const query = event.target.value;
    this.formService.search(query).subscribe(data => {
      this.filteredAssets = data;
    });
  }


}
