import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { Comment, Member } from '../members/member.model';

const BASE_URL = environment.baseUrl;
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

  loadMemberWithComments(
    id: number
  ): Observable<Member & { comments: Comment[] }> {
    return this.http.get<Member & { comments: Comment[] }>(
      `${this.getUrlForId(id)}`,
      {
        params: { _embed: 'comments' },
      }
    );
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
