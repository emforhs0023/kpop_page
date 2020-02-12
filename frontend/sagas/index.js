import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import noticeBoard from './noticeBoard';
import ranking from './ranking';
import newMusic from './newMusic';
import popularMusic from './popularMusic';
import freeBoard from './freeBoard';
import dance from './dance';


axios.defaults.baseURL = 'http://localhost:3065/api';

export default function* rootSaga() {
	yield all([
	    fork(user),
	    fork(noticeBoard),
	    fork(ranking),
	    fork(newMusic),
	    fork(popularMusic),
	    fork(freeBoard),
	    fork(dance),
  	]);
}