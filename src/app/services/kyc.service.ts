import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

@Injectable({ providedIn: 'root' })
export class KycService {
  private kycUrl =
    'https://run.mocky.io/v3/c2b445a9-af3b-4a57-b6b3-7e861b7ad6c0'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.kycUrl, user, this.httpOptions);
  }
}
