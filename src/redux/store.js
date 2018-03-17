import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {autoRehydrate} from 'redux-persist'
import movieApp from './allReducers'

export const store = compose(
	autoRehydrate(),
	applyMiddleware(thunk)
)(createStore)(movieApp) //reducers
