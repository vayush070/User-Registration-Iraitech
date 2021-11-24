import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialStatePage = { page: 2 };

const pageSlice = createSlice({
  name: "page",
  initialState: initialStatePage,
  reducers: {
    togglePage(state) {
      state.page = state.page === 1 ? 2 : 1;
    },
  },
});

const initialStateAuth = { isAuth: false };

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialStateAuth,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

const initialStateForm = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  curr_id: "",
};

const formSlice = createSlice({
  name: "form",
  initialState: initialStateForm,
  reducers: {
    setfirstname(state, actions) {
      state.firstname = actions.payload;
    },
    setlastname(state, actions) {
      state.lastname = actions.payload;
    },
    setemail(state, actions) {
      state.email = actions.payload;
    },
    setphone(state, actions) {
      state.phone = actions.payload;
    },
    setaddress(state, actions) {
      state.address = actions.payload;
    },
    setpassword(state, actions) {
      state.password = actions.payload;
    },
    setid(state, actions) {
      state.curr_id = actions.payload;
    },
  },
});
const initialAlertState = { alert: "" };
const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
  reducers: {
    updateAlert(state, actions) {
      state.alert = actions.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    page: pageSlice.reducer,
    auth: authSlice.reducer,
    form: formSlice.reducer,
    alert: alertSlice.reducer,
  },
});

export const pageActions = pageSlice.actions;
export const authActions = authSlice.actions;
export const formActions = formSlice.actions;
export const alertActions = alertSlice.actions;

export default store;
