import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import {
  HomeVideoReducer,
  relatedVideoReducer,
  searchedVideosReducer,
  subscriptionsChannelReducer,
} from "./reducers/videos.reducer";
import { selectedVideoReducer } from "./reducers/videos.reducer";
import { channelDetailsReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comment.reducer";
const rootreducer = combineReducers({
  auth: authReducer,
  homeVideos: HomeVideoReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
  searchedVideos: searchedVideosReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  // channelVideos: channelVideosReducer,
});

const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
