import publicDns from './api';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export function fetchSuccess(values) {
    return {type: FETCH_SUCCESS, values};
}

export function searchForward(qs) {  
    return function(dispatch) {
        return publicDns.forward(qs).then(values => {
            dispatch(fetchSuccess(values));
        }).catch(error => {
            throw(error);
        });
    };
}
