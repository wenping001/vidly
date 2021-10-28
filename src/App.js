import Movies from './components/Movies';
import Customer from './components/Customer';
import Rental from './components/Rental';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NotFound from './components/NotFound';
import MovieForm from './components/common/MovieForm';
function App() {
  return (
    <div className="App">
      <Router>
        <nav
          style={{ paddingLeft: 200 }}
          className="navbar navbar-expand-lg navbar-light bg-light"
        >
          <Link className="navbar-brand" to="/">
            Vidly
          </Link>
          <Link className="nav-link" to="/movies">
            Movies
          </Link>
          <Link className="nav-link" to="/customers">
            Customers
          </Link>
          <Link className="nav-link" to="/rental">
            Rental
          </Link>
        </nav>

        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/customers">
              <Customer />
            </Route>
            <Route path="/rental">
              <Rental />
            </Route>
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
