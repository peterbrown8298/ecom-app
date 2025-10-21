import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  products: Product[] = [];

  ngOnInit(): void {
      this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
        next: response => this.products = response.data,
        error: error => console.log(error), 
        complete: () => console.log('complete')
      });
  }
}
