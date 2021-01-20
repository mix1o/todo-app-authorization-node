import { createStore } from 'react-sweet-state';

const initialState = {
  count: 0,
  titleSub: '',
  creditsSub: null,
  idOfTask: '',
  newTodo: false,
  userData: null,
  correct: null,
  userFunction: null,
};

const actions = {
  payment: (price, title, credits) => ({ getState, setState }) => {
    const { count, titleSub, creditsSub } = getState();
    setState({ count: price, titleSub: title, creditsSub: credits });
  },
  changeStatus: (specifyIdTask) => ({ getState, setState }) => {
    const { idOfTask } = getState();
    setState({ idOfTask: specifyIdTask });
  },
  openTodo: (e) => ({ getState, setState }) => {
    const { newTodo } = getState();
    setState({ newTodo: e });
  },
  user: (e) => ({ getState, setState }) => {
    const { userData, correct } = getState();
    setState({ userData: e, correct: true });
  },
  loadUser: (e) => ({ getState, setState }) => {
    const { userFunction } = getState();
    setState({ userFunction: e });
  },
};

const Store = createStore({ initialState, actions });

export default Store;
