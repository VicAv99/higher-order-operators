export type NullablePartial<T> = { [P in keyof T]?: T[P] | null };

export interface Comment {
  id: string;
  memberId: string;
  text: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
}

export enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}
export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

// Utility function to extract the error from the state
export function getError(callState: CallState): string | null {
  if ((callState as ErrorState).errorMsg !== undefined) {
    return (callState as ErrorState).errorMsg;
  }

  return null;
}
