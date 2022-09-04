// Elements
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

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
  const { authIsReady } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
