import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';

import { Comment, Member, MembersResponse } from '../members/member.model';

const BASE_URL = environment.baseUrl;
const path = 'members';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  all(event?: PageEvent): Observable<MembersResponse> {
    return this.http
      .get<Member[]>(this.getUrl(), {
        observe: 'response',
        params: {
          _page: (event?.pageIndex ?? 0) + 1,
          _limit: event?.pageSize ?? 10,
        },
      })
      .pipe(
        // get total members count from X-Total-Count response headers
        map((response) => ({
          members: response.body ?? [],
          total: +response.headers.get('X-Total-Count')!,
        }))
      );
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
