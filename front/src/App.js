import MainPage from './js/mainPage/mainPage'
import Article from './js/article_page/articlePage'
import Header from './js/header/header'
import Account from './js/account/_account'
import SignIn from './js/signin/signIn'
import SignUp from './js/signup/signup'
import CreateArticle from './js/create_article/createArticle'

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
      <Header />
        <Switch>
          <Route path="/create-article">
            <CreateArticle />
          </Route>
          <Route path="/article/:article">
            <Article />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
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
