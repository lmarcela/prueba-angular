import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/User';

export const ADD_USER = createAction(
  '[AUTH] Add User',
  props<{ payload: IUser }>()
);
