import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../../helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
	login,
	logout,
	currentUser: currentUserSubject.asObservable(),
	get currentUserValue () { return currentUserSubject.value; }
};

function login(username, password) {
	console.log(username);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	};

	return fetch(`http://localhost:3000/api/auth/login`, requestOptions)
	.then(res => JSON.parse(res))
		.then(handleResponse)
		.then(user => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('currentUser', JSON.stringify(user));
			currentUserSubject.next(user);

			return user;
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('currentUser');
	currentUserSubject.next(null);
}