import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient)
  {
  }

  public Authenticate(email: string, password: string) {
    const body = {
      email,
      password
    }

    return this.http.post<any>(`https://localhost:7070/auth`, body);
  }
}
