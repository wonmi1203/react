import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/fonts/Lobster/fontLobster.css';
import './assets/fonts/Noto_Sans_KR/fontNoto.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
	try {
		const user = localStorage.getItem('user');
		if (!user) return; // 로그인 상태가 아니라면 아무것도 안함

		store.dispatch(tempSetUser(user));
		store.dispatch(check());
	} catch (e) {
		console.log('localStorage is not working');
	}
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<HelmetProvider> {/* Helmet을 사용하려면 HelmetProvider로 감싸줘야한다. App component안에 Helmet 사용중 */}
				<App />
			</HelmetProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

serviceWorker.unregister();
