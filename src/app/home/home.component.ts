import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
popularProduct: undefined|product[]
trendyProducts: undefined|product[]

constructor(private productService : ProductService){}
  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data)=>{
      console.warn(data);
      this.popularProduct= data;
    });

    this.productService.trendyProducts().subscribe((data)=>{
      this.trendyProducts = data;
    })
  }
}
