import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersCache$ = new BehaviorSubject<any[]>([]);
  private usersUrl = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}

  getAllUsers(page: number = 1): Observable<any[]> {
    const url = `${this.usersUrl}?page=${page}`;
    if (this.usersCache$.getValue().length === 0) {
      this.http
        .get<any>(url)
        .pipe(
          tap((response) => this.usersCache$.next(response.data)),
          catchError(() => of([]))
        )
        .subscribe();
    }
    return this.usersCache$.asObservable();
  }

  getUserById(id: string): Observable<any> {
    return this.getAllUsers().pipe(
      map((users) => users.find((user) => user.id.toString() === id)),
      catchError(() => of(null))
    );
  }
}
