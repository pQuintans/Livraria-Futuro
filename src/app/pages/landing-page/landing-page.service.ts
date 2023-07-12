import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private baseService: BaseService, private http: HttpClient)
  {
  }


  public deleteBook(book_id: number) {
    let headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.baseService.user!.token}`)
    }

    return this.http.delete<any>(`https://localhost:7070/books/${book_id}`, headers);
  }

  public getAllBooks() {
    return this.http.get<any>(`https://localhost:7070/books`);
  }
}
