/* eslint-disable react/prop-types */
import React from 'react';
import classes from './Article.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { apiService } from '../../service/apiService';
import userAvatar from '../../assets/1.jpg';
import { reduction } from '../../utils/utils';
import { sortingText } from '../../store/articleSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
const Article = ({ item, confirmation, showSettings }) => {
  const dispatch = useDispatch();
  const { sortText } = useSelector((state) => state.articles);
  const { userData } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';
  const { slug, title, tagList, author, description, createdAt, favorited, favoritesCount } = item;
  const { username, image } = author;

  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [likeDisabled, setLikeDisabled] = useState(true);

  useEffect(() => {
    if (userData && token !== '') {
      setLikeDisabled(false);
    }
    if (token === '') {
      setLikeDisabled(true);
    }
  }, [userData, favorited, token]);
  const likeHandler = () => {
    if (!like) {
      apiService.addLike(slug, token).then((res) => {
        if (res.article.favorited) {
          setLike(true);
          setLikeCount(res.article.favoritesCount);
        }
      });
    } else {
      apiService.deleteLike(slug, token).then((res) => {
        if (!res.article.favorited) {
          setLike(false);
          setLikeCount(res.article.favoritesCount);
        }
      });
    }
  };
  const getImageError = (e) => {
    e.currentTarget.src = userAvatar;
  };
  const defaultImg = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  const articleButtons = (
    <div className={classes['article-controls']}>
      <button type="default" className={classes.red} onClick={confirmation}>
        Delete
      </button>
      <Link to={`/articles/${slug}/edit`}>
        <button type="default" className={classes.green}>
          Edit
        </button>
      </Link>
    </div>
  );
  const changeText = () => {
    dispatch(sortingText(true));
  };
  return (
    <>
      <div className={classes['post_left-block']}>
        <div className={classes['post_title-group']}>
          <h2 className={classes['post-left_name']}>
            <Link to={`/articles/${slug}`} onClick={changeText}>
              {!sortText ? reduction(title) : title}
            </Link>
          </h2>
          <div className={classes['post-left_like']}>
            <button className={classes['article-rating']} type="button" onClick={likeHandler} disabled={likeDisabled}>
              {like ? (
                <HeartFilled
                  style={{
                    fontSize: '18px',
                    width: '18px',
                    height: '18px',
                    marginRight: '4px',
                    color: '#ed553b',
                  }}
                />
              ) : (
                <HeartOutlined
                  style={{
                    fontSize: '18px',
                    width: '18px',
                    height: '18px',
                    marginRight: '4px',
                  }}
                />
              )}
              <span>{likeCount}</span>
            </button>
          </div>
        </div>
        <div className={classes['post_tag']}>
          {tagList.map((el, index) => (
            <button key={index}>{!sortText ? reduction(el) : el}</button>
          ))}
        </div>
        <div className={classes['post_text']}>
          <p>{!sortText ? reduction(description) : description}</p>
        </div>
      </div>
      <div className={classes['post_right-block']}>
        <div className={classes['post_right-block-floor']}>
          <div className={classes['post_right-block-floor_container']}>
            <div className={classes['post_author-data-block']}>
              <span className={classes['post_author-name']}>{username}</span>
              <span className={classes['post_author-date']}>{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className={classes['post_user-avatar']}>
              <img src={image === defaultImg ? userAvatar : image} alt="avatar" onError={getImageError} />
            </div>
          </div>
          {userData && showSettings ? articleButtons : null}
        </div>
      </div>
    </>
  );
};
export default Article;
Article.defaultProps = {
  tagList: [],
  showSettings: false,
  confirmation: PropTypes.func,
  item: {
    title: '',
    favorited: false,
    favoritesCount: null,
    description: '',
    createdAt: '',
    slug: '',
    author: PropTypes.shape({
      username: '',
      image: null,
    }),
  },
};

Article.propTypes = {
  tagList: PropTypes.array,
  showSettings: PropTypes.bool,
  confirmation: PropTypes.func,
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    slug: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};
