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

  loadMemberWithComments(
    id: string
  ): Observable<Member & { comments: Comment[] }> {
    return this.http.get<Member & { comments: Comment[] }>(
      this.getUrlForId(id),
      {
        params: { _embed: 'comments' },
      }
    );
  }

  createComment(comment: Omit<Comment, 'id'>): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.getUrlForId(comment.memberId)}/comments`,
      comment
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

  delete(memberId: string): Observable<void> {
    return this.http.delete<void>(this.getUrlForId(memberId));
  }

  private getUrl(): string {
    return `${BASE_URL}/${path}`;
  }

  private getUrlForId(id: string): string {
    return `${this.getUrl()}/${id}`;
  }
}
