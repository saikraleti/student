import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllstudentService {

  constructor(private httpClient:HttpClient) { }
 
  getallstudents():Observable<any>
  {
   return this.httpClient.get(
     'https://62b9299dff109cd1dc8ca34f.mockapi.io/students');
  }
  filteredallstudents(term:string):Observable<any>
  {
   return this.httpClient.get('https://62b9299dff109cd1dc8ca34f.mockapi.io/students'+'?filter='+term);
  }
  deleteallstudents(id:string):Observable<any>
  {
   return this.httpClient.delete('https://62b9299dff109cd1dc8ca34f.mockapi.io/students'+'/'+id);
  }

   sortedallstudents(column:string,order:string):Observable<any>
   {
    return this.httpClient.get('https://62b9299dff109cd1dc8ca34f.mockapi.io/students'+'?sortBy='+column+'&order='+order);
   }
   pagedallstudents(pageno:number,limit:number):Observable<any>
   {
    return this.httpClient.get('https://62b9299dff109cd1dc8ca34f.mockapi.io/students'+'?page='+pageno+'&limit='+limit)
   }
   getstudentdetails(id:string):Observable<any>
   {
     return this.httpClient.get('https://62b9299dff109cd1dc8ca34f.mockapi.io/students'+'/'+id)
   }
   createstudentdetails(data:any):Observable<any>
   {
    return this.httpClient.post('https://62b9299dff109cd1dc8ca34f.mockapi.io/students',data);
   }
   updateallstudent(id:string,data:any):Observable<any>
   {
    return this.httpClient.put('https://62b9299dff109cd1dc8ca34f.mockapi.io/students'+'/'+id,data);
   }
}
