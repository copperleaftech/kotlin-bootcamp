import { Component, Injectable, OnInit } from '@angular/core';

import * as Pikaday from 'pikaday';

import { FormService } from '../form-service.service';


@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
@Injectable()
export class InvestmentFormComponent implements OnInit {
  constructor(private formService: FormService) { }

  investment = null;

  ngOnInit(): void {
    this.getInvestment();
    const datepicker = new Pikaday({ field: document.getElementById('required-by') });
  }

  getInvestment() {
    this.investment = this.formService.getInvestment();
  }

  validate(e) {
    const field = e.target.name;
    const value = e.target.value;

    this.formService.validateInvestmentField(field, value);
  }

  updateField(e) {
    const field = e.target.name;
    const value = e.target.value;

    this.formService.setInvestmentField(field, value);
  }

}
