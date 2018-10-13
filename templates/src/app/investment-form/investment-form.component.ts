import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent implements OnInit {

  apiUrl = 'http://localhost:8080/v1/investments'

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Submitted')
  }

}
