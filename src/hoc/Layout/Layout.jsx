import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from '../../components/Login/Login';
import AdminDashboard from '../../containers/AdminDashboard/AdminDashboard';
import ShowUser from '../../components/ShowUser/ShowUser';
import ShowService from '../../components/ShowService/ShowService';
import Header from '../../components/Header/Header';
import ShowAllServices from '../../components/ShowAllServices/ShowAllServices';
import CreateUser from '../../components/CreateUser/CreateUser';
import CreateService from '../../containers/CreateService/CreateService';
import GiveTutorRole from '../../components/GiveTutorRole/GiveTutorGetUsers';
import EditUser from '../../components/EditUser/EditUser';
import EditService from '../../containers/EditService/EditService';
import LandingPage from '../../components/LandingPage/LandingPage';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { authenticationService } from '../../services/authentication/authentication.service';


function Layout() {
	const changeLanguage = e => {
		const lng = e.target.value;
		i18n.changeLanguage(lng);
	};

	const useStyles = makeStyles(theme => ({
		appBarSpacer: theme.mixins.toolbar
	}));

	const [state, setState] = React.useState({
		loggedIn: authenticationService.loggedIn(),
		searchInput: null
	});
	const classes = useStyles();

	const changeLoggedInState = () => {
		setState({...state, loggedIn: authenticationService.loggedIn()});
	};

	const searchForService = (input) => {
		setState({...state, searchInput: input});
	};
	return (
		<Router>
			<Header changeLanguage={changeLanguage} loggedIn={state.loggedIn} changeLoggedInState={changeLoggedInState} />
			<div className={classes.appBarSpacer} />
			<Container component="main" maxWidth="md">
				<Switch>
					<Route path="/admin" component={AdminDashboard} />
					<Route path="/user/edit/:id" component={EditUser}>
						<EditUser changeLoggedInState={changeLoggedInState} />
					</Route>
					<Route path="/user/:id" component={ShowUser} />
					<Route path="/service/create" component={CreateService} />
					<Route path="/service/edit/:id" component={EditService} />
					<Route path="/service/:id" component={ShowService} />
					<Route path="/service/">
						<ShowAllServices searchInput={state.searchInput}/>
					</Route>
					<Route path="/register" component={CreateUser} />
					<Route path="/account" component={ShowUser} />
					<Route path= "/tutorRole" component={GiveTutorRole}/>
					<Route path="/login">
						<Login changeLoggedInState={changeLoggedInState}/>
					</Route>
					<Route path="/">
						<LandingPage loggedIn={state.loggedIn} searchForService={searchForService}/>
					</Route>
				</Switch>
			</Container>
		</Router>
	);
}

export default withTranslation()(Layout);
