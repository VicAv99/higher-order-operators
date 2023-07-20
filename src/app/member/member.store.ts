import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';

import { CallState, LoadingState, Member } from '../members/member.model';
import { MembersService } from '../shared/members.service';

export interface MemberState {
  member?: Member;
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
  readonly callState$ = this.select((state) => state.callState);

  readonly viewModel$ = this.select({
    member: this.member$,
    callState: this.callState$,
  });

  readonly setMember = this.updater((state, member: Member) => ({
    ...state,
    member,
  }));

  readonly setCallState = this.updater((state, callState: CallState) => ({
    ...state,
    callState,
  }));

  readonly fetchMember = this.effect(
    (id$: Observable<number | string | null>) =>
      id$.pipe(
        tap(() => this.setCallState(LoadingState.LOADING)),
        switchMap((id) =>
          this.membersService.load(Number(id)).pipe(
            tap((member) => this.setMember(member)),
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
