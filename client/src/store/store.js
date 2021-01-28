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
  canSeeAlmost: false,
  totalPriceState: 0,
};

const actions = {
  payment: (price, title, credits, totalPrice) => ({ getState, setState }) => {
    const { count, titleSub, creditsSub, totalPriceState } = getState();
    setState({
      count: price,
      titleSub: title,
      creditsSub: credits,
      totalPriceState: totalPrice,
    });
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
  setAlmost: (e) => ({ getState, setState }) => {
    const { canSeeAlmost } = getState();
    setState({ canSeeAlmost: e });
  },
};

const Store = createStore({ initialState, actions });

export default Store;
