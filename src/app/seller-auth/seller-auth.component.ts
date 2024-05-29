import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { ActivatedRoute } from '@angular/router';
import { login, signUp } from '../data-type';
import { isError } from 'util';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {


  showLogin = true;
  authError: string = '';

  constructor(private seller: SellerService, private route : ActivatedRoute) { }


  ngOnInit(): void {
    
    this.seller.reloadSeller();
  }

  signUp(data: signUp): void {
    
    console.warn(data)
    this.seller.userSignUp(data);
  }

  login(data: login): void {
   
    //console.warn(data)
    this.seller.userLogin(data);
  
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {

        this.authError = "User Email or password is incorret"
      }
    })
  }

  openLogin() {
    this.showLogin = true
  }

  openSignUp() {
    this.showLogin =  false
  }
}
