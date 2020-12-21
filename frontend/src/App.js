import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Home } from "./components/Home"
import { Login } from './components/Login';
import { Register } from './components/Register';
import Feed from './components/Feed';
import {useRecoilState} from 'recoil'
import {userAtom} from './atoms'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function App() {
	const [user, setUser] = useRecoilState(userAtom)
	const [loading, setLoading] = useState(true)
    
	useEffect(async () => {
		const auth = async () => {
			const jwt = Cookies.get('jwt')
	
			if(jwt) {
				setUser({jwt:jwt, isAuth:true})
				setLoading(false)
			} else {
				setUser({jwt: null, isAuth: false})
				setLoading(false)
			}
		}
		await auth()
	}, [userAtom])

	if(loading) return ( <div>Loading...</div>)
	

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{ user.isAuth ? <Redirect to="/feed"/> : <Home/> }
				</Route>
				<Route exact path="/login">
					{ user.isAuth ? <Redirect to="/feed"/> : <Login/> }
				</Route>
				<Route exact path="/register">
					{ user.isAuth ? <Redirect to="/feed"/> : <Register/> }
				</Route>
				<Route exact path="/feed">
					<Feed/>
				</Route>
			</Switch>
		</Router>
  );
}


export default App;
