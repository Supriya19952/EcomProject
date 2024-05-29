import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  inValidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http : HttpClient, private router:Router) { }

  userSignUp(data:signUp){
    
   this.http.post("http://localhost:3000/user",data,{observe:'response'})
    .subscribe((result)=>{
      console.warn(result);
      if(result){
        //localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['user-auth'] , {fragment : 'userLoginPage'});
      }
    })
  }

  userLogin(data:login){
     this.http.get<signUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,
      {observe:'response'})
      .subscribe((result)=>{
        if(result && result.body?.length){
          this.inValidUserAuth.emit(false)
          localStorage.setItem('user',JSON.stringify(result.body));
          this.router.navigate(['/']);
        }else{
             this.inValidUserAuth.emit(true)
        }
      })
  }

  getuser(){
    return this.http.get<signUp>(`http://localhost:3000/user`)
  }

  getUserById(id : number){
    return this.http.get<signUp>(`http://localhost:3000/user/${id}`)
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
