import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public user: User | undefined;

  saveUser(user: User) {
    this.user = user;
  }

  clearUser() {
    this.user = undefined;
  }
}
