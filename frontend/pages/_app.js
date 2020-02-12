import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { LOAD_MAIN_NOTICES_REQUEST } from '../reducers/noticeBoard';
import AppLayout from '../components/AppLayout';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

import { LOAD_USER_REQUEST } from '../reducers/user';

const Kpop = ({ Component, store, pageProps }) => {
  const Loading = () => (<p>Loading...</p>);
	return (
		<Provider store={store}>
			<Head onLoading={Loading}>
  				<title>Kpop</title>
          <meta charset="utf-8" />
  				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
  			</Head>
  			<AppLayout>
  	      		<Component {...pageProps} />
  			</AppLayout>
		</Provider>
	)
}

Kpop.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  
  axios.defaults.headers.Cookie = '';

  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return { pageProps };
};

const configureStore = (initialState, options) => {
  	const sagaMiddleware = createSagaMiddleware(); // 사가를 사용 하겠다.
    const middlewares = [sagaMiddleware]; // 미들웨어에서 사가를 사용 하겠다
    const enhancer = process.env.NODE_ENV === 'production'  
		? compose(applyMiddleware(...middlewares))
		: compose(
        	applyMiddleware(...middlewares),
        	!options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    	);
	const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(Kpop));
