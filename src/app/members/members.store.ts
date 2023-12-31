import { inject, Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import {
  catchError,
  delay,
  EMPTY,
  filter,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

import { MembersService } from '../shared/members.service';
import { DialogService } from '../ui/dialog/dialog.service';
import {
  CallState,
  getError,
  LoadingState,
  Member,
  MembersResponse,
} from './member.model';

export interface MemberState {
  member?: Member | null;
  members?: Member[];
  callState: CallState;
  total?: number;
}

const defaultState: MemberState = {
  callState: LoadingState.INIT,
};

@Injectable()
export class MembersStore extends ComponentStore<MemberState> {
  private readonly dialogService = inject(DialogService);
  private readonly membersService = inject(MembersService);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    super(defaultState);
  }

  readonly member$ = this.select((state) => state.member);
  readonly members$ = this.select((state) => state.members);
  readonly callState$ = this.select((state) => state.callState);
  readonly total$ = this.select((state) => state.total);

  readonly viewModel$ = this.select({
    member: this.member$,
    members: this.members$,
    callState: this.callState$,
    total: this.total$,
  });

  readonly clearMember = this.updater((state) => ({
    ...state,
    member: undefined,
  }));

  readonly setMember = this.updater((state, member: Member) => ({
    ...state,
    member,
  }));

  readonly setMembers = this.updater((state, members: Member[]) => ({
    ...state,
    members,
  }));

  readonly setCallState = this.updater((state, callState: CallState) => ({
    ...state,
    callState,
  }));

  readonly setTotal = this.updater((state, total: number) => ({
    ...state,
    total,
  }));

  readonly fetchMembers = this.effect(
    (
      trigger$: Observable<PageEvent | undefined>
    ): Observable<MembersResponse> => {
      return trigger$.pipe(
        tap(() => this.setCallState(LoadingState.LOADING)),
        tap((pageEvent) => console.log(pageEvent)),
        switchMap((pageEvent) => {
          return this.membersService.all(pageEvent).pipe(
            tap((membersResponse) => {
              this.setMembers(membersResponse.members);
              this.setTotal(membersResponse.total);
              this.setCallState(LoadingState.LOADED);
            }),
            catchError((error) => {
              this.setCallState({ errorMsg: error.message });
              this.snackBar.open(
                getError(this.get().callState) ?? 'An error occurred',
                'Dismiss'
              );
              return EMPTY;
            })
          );
        })
      );
    }
  );

  readonly searchMembers = this.effect(
    (searchTerm$: Observable<string>): Observable<Member[]> => {
      return searchTerm$.pipe(
        tap(() => this.setCallState(LoadingState.LOADING)),
        switchMap((searchTerm) => {
          return this.membersService.search(searchTerm).pipe(
            tap((members) => {
              this.setMembers(members);
              this.setCallState(LoadingState.LOADED);
            }),
            catchError((error) => {
              this.setCallState({ errorMsg: error.message });
              this.snackBar.open(
                getError(this.get().callState) ?? 'An error occurred',
                'Dismiss'
              );
              return EMPTY;
            })
          );
        })
      );
    }
  );

  readonly saveMember = this.effect((member$: Observable<Member>) => {
    return member$.pipe(
      tap((member) => {
        member.id ? this.updateMember(member) : this.createMember(member);
      })
    );
  });

  readonly createMember = this.effect(
    (member$: Observable<Member>): Observable<Member> => {
      return member$.pipe(
        tap(() => this.setCallState(LoadingState.LOADING)),
        switchMap((member) => {
          return this.membersService.create(member).pipe(
            tap((newMember) => {
              this.setMembers([...this.get().members!, newMember]);
              this.setCallState(LoadingState.LOADED);
            }),
            catchError((error) => {
              this.setCallState({ errorMsg: error.message });
              this.snackBar.open(
                getError(this.get().callState) ?? 'An error occurred',
                'Dismiss'
              );
              return EMPTY;
            })
          );
        })
      );
    }
  );

  readonly updateMember = this.effect(
    (member$: Observable<Member>): Observable<Member> => {
      return member$.pipe(
        tap(() => this.setCallState(LoadingState.LOADING)),
        switchMap((member) => {
          return this.membersService.update(member).pipe(
            tap((updatedMember) => {
              const members = this.get().members!;
              const index = members.findIndex((m) => m.id === updatedMember.id);
              members[index] = member;
              this.setMembers([...members]);
              this.setCallState(LoadingState.LOADED);
            }),
            catchError((error) => {
              this.setCallState({ errorMsg: error.message });
              this.snackBar.open(
                getError(this.get().callState) ?? 'An error occurred',
                'Dismiss'
              );
              return EMPTY;
            })
          );
        })
      );
    }
  );

  readonly deleteMember = this.effect(
    (member$: Observable<Member>): Observable<void> => {
      return member$.pipe(
        switchMap((member) => {
          return this.dialogService.openConfirmDelete(member).pipe(
            filter((confirmed) => confirmed), // Only continue if the user confirms
            tap(() => this.setCallState(LoadingState.LOADING)),
            delay(1000), // Simulate a delay
            switchMap(() => {
              return this.membersService.delete(member.id).pipe(
                tap(() => {
                  const members = this.get().members!;
                  const index = members.findIndex((m) => m.id === member.id);
                  members.splice(index, 1);
                  this.setMembers([...members]);
                  this.setCallState(LoadingState.LOADED);
                }),
                catchError((error) => {
                  this.setCallState({ errorMsg: error.message });
                  this.snackBar.open(
                    getError(this.get().callState) ?? 'An error occurred',
                    'Dismiss'
                  );
                  return EMPTY;
                })
              );
            })
          );
        })
      );
    }
  );
}
