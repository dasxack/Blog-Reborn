import React, { useEffect } from 'react';
import classes from './Sign-in.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { userLogIn, errorNull } from '../../store/userSlice';
const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, status, userData, errorMessage } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const userAuthorize = (str) => {
    const data = {
      email: str.email.trim(),
      password: str.password.trim(),
    };
    dispatch(userLogIn(data));
  };
  const successMessage = () => {
    notification.open({
      message: 'Welcome back to Realworld Blog!',
      duration: 2,
      onClose: () => {
        history.push('/');
      },
    });
  };
  useEffect(() => {
    try {
      if (userData !== null) {
        localStorage.setItem('token', JSON.stringify(userData.token));
        successMessage();
      }
    } catch (err) {
      console.log(err);
    }
  }, [userData]);
  const onClose = () => {
    dispatch(errorNull());
  };
  const errorAlert = (
    <Alert
      className={classes['form-alert']}
      description="Whoops, something went wrong :("
      type="error"
      showIcon
      closable
      onClose={onClose}
      style={{
        position: 'relative',
        bottom: '470px',
        left: '200px',
        width: '50%',
      }}
    />
  );
  const spinner = (
    <Spin
      size="large"
      className={classes['form-spinner']}
      style={{
        position: 'relative',
        bottom: '500px',
        left: '200px',
        width: '50%',
      }}
    />
  );
  const form = (
    <form className={classes['sign-form']} onSubmit={handleSubmit(userAuthorize)}>
      <div className={classes['form-title']}>
        <span>Sign In</span>
      </div>

      <label htmlFor="email" className={classes['form-label']}>
        Email address
        <input
          className={errors?.email?.message || Object.keys(errorMessage).length ? classes.required : classes.input}
          placeholder="Email address"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}$/g,
              message: 'Invalid email address',
            },
          })}
        />
        {errors?.email && <p className={classes['form-validate']}>{errors?.email?.message || 'Error!'}</p>}
      </label>
      <label htmlFor="email" className={classes['form-label']}>
        Password
        <input
          className={errors?.password?.message || Object.keys(errorMessage).length ? classes.required : classes.input}
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Please input your Password!',
          })}
        />
        {errors.password ? <p className={classes['form-validate']}>{errors.password.message}</p> : null}
        {Object.keys(errorMessage).length ? (
          <p className={classes['form-validate']}>Invalid email address or password</p>
        ) : null}
      </label>

      <button type="submit" className={classes['form-button']} disabled={status === 'loading'}>
        {status === 'loading' ? <LoadingOutlined /> : 'Log in'}
      </button>
      <span className={classes['no-account']}>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
      </span>
    </form>
  );
  return (
    <>
      {form}
      {status === 'loading' && spinner}
      {error && !Object.keys(errorMessage).length && errorAlert}
    </>
  );
};
export default SignIn;
