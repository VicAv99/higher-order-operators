import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Member } from './member.model';

const BASE_URL = 'http://localhost:3000';
const path = 'members';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  all(): Observable<Member[]> {
    return this.http.get<Member[]>(this.getUrl());
  }

  load(id: number): Observable<Member> {
    return this.http.get<Member>(this.getUrlForId(id));
  }

  search(term: string): Observable<Member[]> {
    return this.http.get<Member[]>(this.getUrl(), {
      params: { firstName_like: term },
    });
  }

  create(member: Member): Observable<Member> {
    return this.http.post<Member>(this.getUrl(), member);
  }

  update(member: Member): Observable<Member> {
    return this.http.patch<Member>(this.getUrlForId(member.id), member);
  }

  delete(memberId: number): Observable<void> {
    return this.http.delete<void>(this.getUrlForId(memberId));
  }

  private getUrl(): string {
    return `${BASE_URL}/${path}`;
  }

  private getUrlForId(id: number): string {
    return `${this.getUrl()}/${id}`;
  }
}
