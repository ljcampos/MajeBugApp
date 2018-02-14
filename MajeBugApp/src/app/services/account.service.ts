import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { Itoken } from '../auth/itoken';

@Injectable()
export class AccountService {
  loginUrl:string = environment.apiUrl + "token";
  private key = CryptoJS.enc.Utf8.parse('7061737323313233');
  private iv = CryptoJS.enc.Utf8.parse('7061737323313233');
  
  constructor(private _http: HttpClient) { }

  public doLogin(email:string, password:string) : Observable<any> {
    // promises
    /* this._http.get("URL").subscribe
      (data => {},
        error => {}
      ); */

    // subscribe
    let body = new URLSearchParams();
    body.set("grant_type", "password");
    body.set("username", email);
    body.set("password", password);
    body.set("client_id", "web");

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    console.log('submit form', email, password);
    return this._http.post(this.loginUrl, body.toString(), options)
    .do(data => {
      var token = JSON.stringify(data);
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(token), this.key,{keySize: 128 / 8,iv: this.iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
      localStorage.setItem('token', encrypted);
    })
    .catch(this.handleError);
  }

  public doLogout() {
    localStorage.removeItem('token');
  }

  handleError(errorData:HttpErrorResponse) {
    return Observable.throw(errorData.error.error_description)
  }

  public getCurrentSession():Itoken {
    var token = localStorage.getItem('token');
    if (token == undefined) return null;

    var encrypted = token;
    var decrypted = CryptoJS.AES.decrypt(encrypted, this.key, {keySize: 128 / 8,iv: this.iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7})
    var tokenDecrypted = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return tokenDecrypted;
  }

  public getToken():string {
    // var token = localStorage.getItem('token');
    // if (token == undefined) return null;

    // var encrypted = token;
    // var decrypted = CryptoJS.AES.decrypt(encrypted, this.key, {keySize: 128 / 8,iv: this.iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7})
    // var tokenDecrypted = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    // // console.log(tokenDecrypted);
    // return tokenDecrypted.access_token;
    
    var currentSession = this.getCurrentSession();
    if(currentSession != null) {
      return currentSession.access_token;
    }
    else return null;
  }

}
