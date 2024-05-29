import { Component, OnInit } from '@angular/core';
import { login, signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{

  showLogin:boolean=true;
  authError : string="";
  constructor(private user:UserService){}
  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp){
   // console.warn(data);
    this.user.userSignUp(data);
  }

  login(data: login){
    // console.warn(data);
     this.user.userLogin(data);
     this.user.inValidUserAuth.subscribe((result)=>{
      if(result){
        this.authError="please enter valid user details"
      }
     })
   }

   openLogin(){
    this.showLogin =true
   }

   openSignup(){
    this.showLogin =false
   }

}
