import { Action, createReducer, on } from '@ngrx/store';
import { ADD_USER } from './users.actions';
import { IUser } from 'src/app/models/User';

const initialState: Array<IUser> = [];

const reducer = createReducer(
  initialState,
  on(ADD_USER, (state, action) => {
    const user: IUser = {
      id: state.length + 1,
      ...action.payload,
    };
    return [...state, user];
  })
);

export function UsersReducer(state: Array<IUser> | undefined, action: Action) {
  return reducer(state, action);
}
