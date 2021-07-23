import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { routeurls } from '../routeurls/routeurls';
import { Observable,of } from 'rxjs';
import { map,catchError,retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  Add(formval : any): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
      let options = { headers: headers };
    //let header = headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    return this.http.post(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE,formval,options)
  }
  getAll(): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE).pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );//.pipe(map(response => response as productmodels));//.subscribe(result => {console.log(result);});
  }
  update(id: any, obj: any): Observable<any> {
    obj.Id = id;
    console.log(obj);
    return this.http.put<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE , obj)
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  updateprio(id, imageno,prioval){
    let obj = {Id:id, imageno:imageno, prioval: prioval}
    return this.http.put<any>(routeurls.BASE_API_URL + "/api/event/updateprio" , obj)
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  delete(id: any): Observable<any> {
    return this.http.delete<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE, { params: new HttpParams().set('id', id) });
  }
  getbyid(id: any): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getbyid", { params: new HttpParams().set('id', id) })
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbyyear(id: any): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getbyyear", { params: new HttpParams().set('myear', id) })
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbydate(id: any): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getbydate", { params: new HttpParams().set('mdate', id) })
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbymenusearch(id: any): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getbymenusearch", { params: new HttpParams().set('menuval', id) })
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbyidwithrelated(id: any): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getbyidrelated", { params: new HttpParams().set('id', id) })
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }

  getAllbysearch(id: any): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getallbysearch", { params: new HttpParams().set('id', id) })
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getRecent(): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getrecent")
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getrandomevent():Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getrandom")
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getnextarticle(id): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getnextarticle", { params: new HttpParams().set('mdate', id)})
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getprevarticle(id): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.EVENT_ADD_API_BASE+ "/getprevarticle", { params: new HttpParams().set('mdate', id)})
    .pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
}
