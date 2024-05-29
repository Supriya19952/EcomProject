import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../services/product.service';
import { threadId } from 'worker_threads';
import { cart, login, product, signUp } from '../data-type';
import { warn } from 'console';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  productData : undefined|product;
  productQuantity :number = 1
  quantity:number=1;
  removeCart = false;
  userId: number | null = null;
  user: any;
  //user: undefined|signUp;
 
  //cartData : product | undefined;

  constructor(private activateRoute : ActivatedRoute, private productService: ProductService
    ,private userService: UserService
  ){

  }
  ngOnInit(): void {
    
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.productService.getProduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData = result;

      let cartData = localStorage.getItem('localcart');
      if(productId && cartData){
        let items= JSON.parse(cartData);
        items = items.filter((item:product)=>productId == item.id.toString())
        if(items.length){
          this.removeCart =true;      
          }
      else{
        this.removeCart = false;
      }
      }
    })

     this.activateRoute.snapshot.paramMap.get('userId'); 
    

     this.userService.getuser().subscribe((data)=>{
     let cartData = localStorage.getItem('user');
     this.user =data;
     if(this.userId && cartData){
       let items= JSON.parse(cartData);
      // items = items.filter((item:signUp)=>userId == item.id.toString())
       items = items.filter((item:cart)=>this.userId?.toString()===item.userId?.toString())
     console.log(this.userId)
       if(items.length){
        cartData=items[0];
        this.removeCart=true;      
         }
     
     else{
       this.removeCart = false;
     }}
   
   })


    
    
  }


  fetchUser(userId : number): void {
    this.userService.getUserById(userId).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      error => {
        console.error('Error fetching user:', error);
      }
  )}

  handleQuantity(val : string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val === 'min'){
      this.productQuantity-=1;
    }
  }

  addtoCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        console.warn(this.productData);
        this.productService.localAddtoCart(this.productData);
        this.removeCart =true;
      }
      else
     {
      console.log(this.user);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      console.log(userId);
     }
       
      
     
    }
  
  }

  removeToCart(productId : number){
    this.productService.removeItemFromCart(productId)
    this.removeCart =false;
  }

}
