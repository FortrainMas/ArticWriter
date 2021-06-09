import MainPage from './js/mainPage/mainPage'
import Article from './js/article_page/articlePage'


import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/article/:article">
            <Article />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      
      </Router>
    </div>
  );
}

export default App;
