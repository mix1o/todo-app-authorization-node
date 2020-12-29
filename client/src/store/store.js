import { createStore } from 'react-sweet-state';

const initialState = { count: 0, idOfTask: '' };

const actions = {
  payment: (price) => ({ getState, setState }) => {
    const { count } = getState();
    setState({ count: price });
  },
  changeStatus: (specifyIdTask) => ({ getState, setState }) => {
    const { idOfTask } = getState();
    setState({ idOfTask: specifyIdTask });
  },
};

const Store = createStore({ initialState, actions });

export default Store;
