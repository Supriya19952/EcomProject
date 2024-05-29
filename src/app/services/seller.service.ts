import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);


  constructor(private http: HttpClient, private router: Router) { }


  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller',
      data,
      { observe: 'response' })
      .subscribe((result) => {

        if (result) {

          //localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-auth'] , {fragment : 'loginPage'});
        }
      })

  }

  reloadSeller(): void {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    console.warn(data);

   this.http.get(`http://localhost:3000/seller?&email=${data.email}&password=${data.password}`,
      { observe: 'response' })
      .subscribe((result: any) => {

        console.warn(result)
        if (result && result.body && result.body.length === 1) {

          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }
        else {
          console.warn("User LoggedIn Failed")
          this.isLoginError.emit(true);
        }


      });

  }

  
}
