import { Component, OnInit } from '@angular/core';
import {FormService} from '../form-service.service';

@Component({
  selector: 'app-investment-summary',
  templateUrl: './investment-summary.component.html',
  styleUrls: ['./investment-summary.component.css']
})
export class InvestmentSummaryComponent implements OnInit {
  investment = null;
  selectedAssets = null;
  success = null;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.getInvestment();
    this.getSelectedAssets();
  }

  getInvestment() {
    this.investment = this.formService.getInvestment();
  }

  getSelectedAssets() {
    this.selectedAssets = this.formService.filterAssets();
  }

  submitInvestment() {
    this.formService.createInvestment().subscribe(rsp => {
      const investmentId = rsp['id'];
      this.formService.addAssets(investmentId).subscribe(assetsRsp => {
        this.success = true;
      });
    });
  }

}
