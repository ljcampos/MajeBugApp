import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { AccountService } from '../services/account.service';

@Injectable()
export class BugService {

  private _urlBugs = environment.apiUrl + 'api/bug';
  constructor(private _accountService:AccountService, private _http:HttpClient) { }

  public getBugs():Observable<any>{
    const httpOptions = {
        headers: new HttpHeaders({ "Authorization": "bearer " + this._accountService.getToken() })
    };

    return this._http.get(this._urlBugs, httpOptions)
    .do(data => { })
    .catch(this.handleError);
  }

  public getBug(id:number) {
    const httpOptions = {
        headers: new HttpHeaders({ "Authorization": "bearer " + this._accountService.getToken() })
    };

    return this._http.get(this._urlBugs + "/" + id, httpOptions)
    .do(data => { })
    .catch(this.handleError);
  }

  public postBug(bug:any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Authorization": "bearer " + this._accountService.getToken() })
    };

    return this._http.post(this._urlBugs, bug, httpOptions)
    .do(data => {})
    .catch(this.handleError);
  }

  public putBug(bug:any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Authorization": "bearer " + this._accountService.getToken() })
    };

    return this._http.put(this._urlBugs  + "/" + bug.id, bug, httpOptions)
    .do(data => {})
    .catch(this.handleError);
  }

  handleError(errorData:HttpErrorResponse) {
    // return Observable.throw(errorData.error.error_description)
    return Observable.throw(errorData);
  }

  // {
  //   id: 2,
  //   title: "Bug en sesion",
  //   body: "Lorem ipsum dolor sit amet, consectetur adipiscing…o lobortis lorem, nec viverra lorem nisi in erat.",
  //   isFixed: true,
  //   stepToReproduce: "sasas"
  //   }

}
