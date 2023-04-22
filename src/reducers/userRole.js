// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const userRolePersistConfig = {
//   key: 'userRole',
//   storage: storage,
// };

const userRoleReducer =(state = '', action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return '';
    default:
      return state;
  }
}

export default userRoleReducer