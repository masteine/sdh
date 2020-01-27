import { init } from '@rematch/core';
import { users } from '../../views/Users/_models';

export const store = init({
  models: {
    users
  }
});
