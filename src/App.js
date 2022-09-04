// Elements
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Navbar from './components/Navbar';

// Hooks
import { useAuthContext } from './hooks/useAuthContext';

// Styles
import './App.css'


function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              { !user && <Redirect to="/login" />}
              { user && <Home /> }
            </Route>
            <Route exact path="/login">
              { !user && <Login/> }
              { user && <Redirect to="/" /> }
            </Route>
            <Route exact path="/signup">
              { !user && <SignUp /> }
              { user && <Redirect to="/" /> }
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
