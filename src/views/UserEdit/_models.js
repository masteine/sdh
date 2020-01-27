import contact from '../../utils/api/contact';

export const users = {
  state: {
    users: [],
    auth: false,
    error: ''
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        [payload.name]: payload.data
      };
    }
  },

  effects: (dispatch) => ({})
};
