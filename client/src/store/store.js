import { createStore } from 'react-sweet-state';

const initialState = { count: 0, idOfTask: '', newTodo: false, userData: null};

const actions = {
  payment: (price) => ({ getState, setState }) => {
    const { count } = getState();
    setState({ count: price });
  },
  changeStatus: (specifyIdTask) => ({ getState, setState }) => {
    const { idOfTask } = getState();
    setState({ idOfTask: specifyIdTask });
  },
  openTodo: (e) => ({getState,setState}) => {
    const {newTodo} = getState();
    setState({newTodo: e})
  },
  user: (e) => ({getState,setState}) => {
    const {userData} = getState();
    setState({userData: e})
  }
};

const Store = createStore({ initialState, actions });

export default Store;
