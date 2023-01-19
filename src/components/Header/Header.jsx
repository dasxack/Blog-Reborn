import React from 'react';
import classes from './Header.module.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Result } from 'antd';
import { logOutUser } from '../../store/userSlice';
import userAvatar from '../../assets/1.jpg';
const Header = ({ connection }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const logOut = () => {
    try {
      localStorage.removeItem('token');
      dispatch(logOutUser());
    } catch (err) {
      console.log(err);
    }
  };
  const getImageError = (e) => {
    e.currentTarget.src = userAvatar;
  };
  const buttonsUser = (
    <div className={classes['header__authorization']}>
      <Link to="/new-article">
        <button className={classes['header_button-green']}>Create article</button>
      </Link>
      <Link to="/profile">
        <div className={classes.user}>
          <span>{userData ? userData.username : '[loading]'}</span>
          <img src={userData?.image ? userData.image : userAvatar} alt="avatar" onError={getImageError} />
        </div>
      </Link>
      <Link to="/">
        <button className={classes['header_button-large']} onClick={logOut}>
          Log Out
        </button>
      </Link>
    </div>
  );

  const buttons = (
    <div className={classes['header__authorization']}>
      <Link to="/sign-in">
        <button className={classes['header_button-default']}>Sign In</button>
      </Link>
      <Link to="/sign-up">
        <button className={classes['green-sign']}>Sign Up</button>
      </Link>
    </div>
  );

  const errorResults = <Result status="error" title="Internet Error" subTitle="Check your Internet " />;

  return (
    <>
      <header className={classes.header}>
        <h1>
          <Link to="/">Realworld Blog</Link>
        </h1>
        {userData ? buttonsUser : buttons}
      </header>
      {!connection ? errorResults : null}
    </>
  );
};
export default Header;
Header.defaultProps = {
  connection: true,
};

Header.propTypes = {
  connection: PropTypes.bool,
};
