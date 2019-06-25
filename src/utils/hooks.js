/* eslint-disable indent */
import { useEffect, useReducer } from 'react';

function resolvePromise(promise) {
  if (typeof promise === 'function') {
    return promise();
  }

  return promise;
}

const states = {
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

function reducer(state, action) {
  switch (action.type) {
    case states.pending:
      return { error: undefined, result: undefined, state: states.pending };
    case states.resolved:
      return {
        error: undefined,
        result: action.payload,
        state: states.resolved,
      };
    case states.rejected:
      return {
        error: action.payload,
        result: undefined,
        state: states.rejected,
      };
    default:
      return state;
  }
}

export function usePromise(promise, inputs) {
  const [{ error, result, state }, dispatch] = useReducer(reducer, {
    error: undefined,
    result: undefined,
    state: states.pending,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    promise = resolvePromise(promise);

    if (!promise) return;

    let canceled = false;

    dispatch({ type: states.pending });

    promise.then(
      res =>
        !canceled &&
        dispatch({
          payload: res,
          type: states.resolved,
        }),
      err =>
        !canceled &&
        dispatch({
          payload: err,
          type: states.rejected,
        })
    );

    return () => {
      canceled = true;
    };
  }, inputs);

  return [result, error, state];
}
