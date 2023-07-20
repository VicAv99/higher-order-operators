import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';

import {
  CallState,
  Comment,
  LoadingState,
  Member,
} from '../members/member.model';
import { MembersService } from '../shared/members.service';

export interface MemberState {
  member?: Member;
  comments?: Comment[];
  callState: CallState;
}

const defaultState: MemberState = {
  callState: LoadingState.INIT,
};

@Injectable()
export class MembersStore extends ComponentStore<MemberState> {
  private readonly membersService = inject(MembersService);

  constructor() {
    super(defaultState);
  }

  readonly member$ = this.select((state) => state.member);
  readonly comments$ = this.select((state) => state.comments);
  readonly callState$ = this.select((state) => state.callState);

  readonly viewModel$ = this.select({
    member: this.member$,
    comments: this.comments$,
    callState: this.callState$,
  });

  readonly setMember = this.updater((state, member: Member) => ({
    ...state,
    member,
  }));

  readonly setComments = this.updater((state, comments: Comment[]) => ({
    ...state,
    comments,
  }));

  readonly setCallState = this.updater((state, callState: CallState) => ({
    ...state,
    callState,
  }));

  readonly fetchMember = this.effect((id$: Observable<string | null>) =>
    id$.pipe(
      tap(() => this.setCallState(LoadingState.LOADING)),
      switchMap((id) =>
        this.membersService.loadMemberWithComments(String(id)).pipe(
          tap(({ comments, ...member }) => this.setMember(member)),
          tap(({ comments }) => this.setComments(comments)),
          tap(() => this.setCallState(LoadingState.LOADED)),
          catchError((error) => {
            this.setCallState({ errorMsg: error.message });
            return EMPTY;
          })
        )
      )
    )
  );

  readonly createComment = this.effect(
    (comment$: Observable<Omit<Comment, 'id'>>) =>
      comment$.pipe(
        tap(() => this.setCallState(LoadingState.LOADING)),
        tap((comment) => console.log(comment)),
        switchMap((comment) =>
          this.membersService.createComment(comment).pipe(
            tap((newComment) =>
              this.setComments([...this.get().comments!, newComment])
            ),
            tap(() => this.setCallState(LoadingState.LOADED)),
            catchError((error) => {
              this.setCallState({ errorMsg: error.message });
              return EMPTY;
            })
          )
        )
      )
  );
}
