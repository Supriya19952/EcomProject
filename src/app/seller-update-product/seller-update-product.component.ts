import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {

  productData : undefined | product;
  productMessage : undefined | string;

  constructor(private product :ProductService, private route : ActivatedRoute){}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id'); 
    console.warn(productId);
    productId && 
    this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data);
      this.productData=data;
    })
  }

  submit(data:product){
    if(this.productData){
      data.id=this.productData.id;
    }
   this.product.updateProduct(data).subscribe((result)=>{
    if(result){
      this.productMessage="product is updated";
    }
   });
   setTimeout(() => {
    this.productMessage=undefined;
   }, 3000);
   console.warn(data);
  }

}
