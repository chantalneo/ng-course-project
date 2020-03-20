import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(
        state = initialState, 
        action: AuthActions.AuthActions
    ) {
    console.log(state);
    switch (action.type) {
        case AuthActions.LOGIN_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                authError: null,
                user: user, // Can also be simply user in this case because both the variable name and the property name are the same
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        default: 
            return state;
    }
}