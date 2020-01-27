import contact from '../../utils/api/contact';
import { toast } from 'react-toastify';

export const users = {
  state: {
    users: [],
    user: {},
    auth: false,
    message: '',
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

  effects: (dispatch) => ({
    async getUsers(formData) {
      try {
        const data = await contact.get('', false, formData);
        await dispatch.users.updateState({ data, name: 'users' });
      } catch (error) {
        console.warn(error);
      }
    },
    async getUserById(formData) {
      try {
        const data = await contact.getById('', false, formData);
        await dispatch.users.updateState({ data, name: 'user' });
      } catch (error) {
        console.warn(error);
      }
    },
    async deleteUser(formData) {
      try {
        const data = await contact.delete('', false, formData);
        await dispatch.users.updateState({
          data: data.message,
          name: 'message'
        });
        toast.success('User has been deleted');
      } catch (error) {
        toast.warning(error.toString());
        console.warn(error);
      }
    },
    async createUser(formData) {
      try {
        console.warn(formData);
        const data = await contact.post('', false, formData);
        await dispatch.users.updateState({ data, name: 'message' });
        toast.success('User has been created');
      } catch (error) {
        toast.warning(error.toString());
        console.warn(error);
      }
    },
    async editUserById(arg) {
      const { id, formData } = arg;
      try {
        const data = await contact.put('', false, id, formData);
        await dispatch.users.updateState({ data, name: 'message' });
        toast.success('User has been updated');
      } catch (error) {
        toast.warning(error.toString());
        console.warn(error);
      }
    }
  })
};
