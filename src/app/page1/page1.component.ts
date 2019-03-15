import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.sass']
})
export class Page1Component implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
        .get('http://localhost:8000/api/categories')
        .subscribe((data) => console.log(data));
  }

}
