import React from 'react';
import './App.less';
import AppBanner from "./components/appBanner/AppBanner";
import BrodsmuleSti from "./components/brodsmuleSti/BrodsmuleSti";
import SendtSoknad from "./pages/SendtSoknad";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";
import { Provider } from "react-redux";
import {Route, Switch} from "react-router";
import MottattSoknad from "./pages/MottattSoknad";

const store = configureStore();

const Meny: React.FC = () => {
	return (
		<>
			<h1>Mockede sider</h1>
			<ul>
				<li><a href="sendt">Sendt søknad</a></li>
				<li><a href="mottatt">Mottatt søknad</a></li>
			</ul>
		</>
	)
};

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<div className="informasjon-side">
				<AppBanner/>
				<ConnectedRouter history={history}>
					<div className="blokk-center">
						<BrodsmuleSti/>

						<Switch>
							<Route exact path="/" component={Meny} />
							<Route exact path="/sendt" component={SendtSoknad} />
							<Route exact path="/mottatt" component={MottattSoknad} />
						</Switch>

					</div>
				</ConnectedRouter>
			</div>
		</Provider>
	);
};

export default App;
