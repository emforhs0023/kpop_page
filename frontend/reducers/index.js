import { combineReducers } from 'redux';
import user from './user';
import noticeBoard from './noticeBoard';
import ranking from './ranking';
import newMusic from './newMusic';
import popularMusic from './popularMusic';
import freeBoard from './freeBoard';
import dance from './dance';


const rootReducer = combineReducers({
	user, noticeBoard, ranking, newMusic, popularMusic, freeBoard, dance
  	
});

export default rootReducer;