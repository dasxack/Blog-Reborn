import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { userRemember } from '../../service/apiService';
import classes from './App.module.scss';
import {
  articles,
  newArticle,
  signIn,
  signUp,
  profile,
  articlesSlug,
  articlesSlugEdit,
  kingPath,
} from '../../utils/routerWay';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticleFull from '../AricleFull';
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
          <Route path={articlesSlugEdit}>{userData ? <ArticleEdit /> : <Redirect to={articles} />}</Route>
          <Route path={articlesSlug} exact component={ArticleFull} />
          <Route path={articles} exact component={ArticlesList} />
          <Route path={kingPath} exact component={ArticlesList} />
          <Route path={newArticle}>{userData ? <ArticleCreate /> : <Redirect to={signIn} />}</Route>
          <Route path={signIn} component={SignIn} />
          <Route path={signUp} component={SignUp} />
          <Route path={profile}>{userData ? <Profile /> : <Redirect to={signIn} />}</Route>
        </Switch>
      </div>
    </div>
  );
};
export default App;
