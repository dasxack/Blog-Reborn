import React, { useState } from 'react';
import classes from './ArticlesList.module.scss';
import Article from '../Article/Article';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { paginationChange, sortingText } from '../../store/articleSlice';
import { getArticles } from '../../service/apiService';
import { Alert, Spin, Pagination } from 'antd';

const ArticlesList = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, maxPages, status, error, sortText } = useSelector((state) => state.articles);
  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

  useEffect(() => {
    dispatch(sortingText(false));
  }, []);
  useEffect(() => {
    dispatch(getArticles([(currentPage - 1) * 5, token]));
  }, [currentPage, dispatch, token]);
  const articleList = articles && (
    <ul className={classes['article-list']}>
      {articles.map((el, index) => (
        <li className={classes['article-card']} key={index}>
          <Article item={el} />
        </li>
      ))}
    </ul>
  );
  const onChangePage = (page) => {
    dispatch(paginationChange(page));
  };
  const spinner = <Spin size="large" className={classes['form-spinner']} />;

  const errorMessage = <Alert description="Whoops, something went wrong :(" type="error" showIcon />;
  const pagination = (
    <Pagination
      className={classes['ant-pagination']}
      size="small"
      showSizeChanger={false}
      current={currentPage}
      total={maxPages * 10}
      onChange={onChangePage}
    />
  );
  return (
    <>
      {status === 'loading' && spinner}
      {error && errorMessage}
      {articleList}
      {articles && pagination}
    </>
  );
};
export default ArticlesList;
