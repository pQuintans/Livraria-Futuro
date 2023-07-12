import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class ManageBookService {
  constructor(private baseService: BaseService, private http: HttpClient)
  {
  }

  public createBook(book: { name: string, author: string, category: string | null, pageTotal: number, isActive: boolean}) {
    let headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.baseService.user!.token}`)
    }

    return this.http.post<any>(`https://localhost:7070/books`, book, headers);
  }

  public updateBook(book_id: number, book: { name: string, author: string, category: string | null, pageTotal: number, isActive: boolean}) {
    let headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.baseService.user!.token}`)
    }

    return this.http.put<any>(`https://localhost:7070/books/${book_id}`, book, headers);
  }
}
