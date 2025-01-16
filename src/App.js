import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; // Use Switch for v5
import Register from './user/Register.jsx';
import Login from './user/Login.jsx'; // Ensure file extension matches
import './App.css';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Switch> {/* Use Switch for v5 */}
                {/* Define route for root path */}
                <Route exact path="/" component={() => <div>Welcome to the Home Page!</div>} /> {/* Add a default route for / */}
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
