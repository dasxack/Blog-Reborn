import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { userRemember } from '../../store/userSlice';
import classes from './App.module.scss';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticleFull from '../Article/AricleFull/ArticleFull';
import NetworkDetector from '../../utils/internet';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Header from '../Header';
import Profile from '../Profile';
import ArticleCreate from '../ArticleCreate';
import ArticleEdit from '../ArticleEdit';
const App = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [connection, setConnection] = useState(true);
  const detectConnection = () => {
    if (connection) {
      setConnection(false);
    } else {
      setConnection(true);
    }
  };
  useEffect(() => {
    try {
      if (JSON.parse(localStorage.getItem('token'))) {
        dispatch(userRemember(JSON.parse(localStorage.getItem('token'))));
      }
    } catch (err) {}
  }, [dispatch]);
  return (
    <div className={classes['blog-container']}>
      <Header connection={connection} />
      <div className={classes.main}>
        <NetworkDetector detectConnection={detectConnection} />
        <Switch>
          <Route path="/articles/:slug/edit">{userData ? <ArticleEdit /> : <Redirect to="/articles" />}</Route>
          <Route path="/articles/:slug" exact component={ArticleFull} />
          <Route path="/articles" exact component={ArticlesList} />
          <Route path="/" exact component={ArticlesList} />
          <Route path="/new-article">{userData ? <ArticleCreate /> : <Redirect to="/sign-in" />}</Route>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile">{userData ? <Profile /> : <Redirect to="/sign-in" />}</Route>
        </Switch>
      </div>
    </div>
  );
};
export default App;
