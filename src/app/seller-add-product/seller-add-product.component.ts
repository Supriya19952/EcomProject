import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit{

  addProductMessage : string|undefined;
  constructor(private productservice : ProductService){}
  ngOnInit(): void {
    
  }

  submit(data : product){
    console.warn(data);
    this.productservice.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
      this.addProductMessage="Product is Successfully Added"
    }
    setTimeout(()=>this.addProductMessage=undefined,3000);
    })

  }

}
