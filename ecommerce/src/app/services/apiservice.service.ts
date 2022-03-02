import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://172.26.21.163:8080/"
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(
    private http:HttpClient
  ) { }

  public headers = new HttpHeaders().set('x-access-token', 'Bearer');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  getData(url: any):Observable<any>{
    console.log("In get service with url",baseUrl+url);
    return this.http.get(baseUrl+url,this.httpOptions).pipe(
      data => data
    );
  }

  postData(url:any,data:any):Observable<any>{
    console.log("In post data service with url ",url,"with data ",data);
    return this.http.post(baseUrl+url,data,this.httpOptions).pipe(
      data=>data
    )
  }

  putData(url:any,data:any):Observable<any>{
    console.log("In update data service with url ",url,"with data ",data);
    return this.http.put(baseUrl+url,data,this.httpOptions).pipe(
      data=>data
    )
  }
  
  deleteData(url:any):Observable<any>{
    console.log("In delete data service with url ",url);
    return this.http.delete(baseUrl+url,this.httpOptions).pipe(
      data => data
    )
  }
}
