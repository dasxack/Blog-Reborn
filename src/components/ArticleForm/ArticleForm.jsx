import React from 'react';
import { Form, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import classes from './ArticleForm.module.scss';

const ArticleForm = ({ transferData, title, fields, loading }) => {
  const onFinish = (str) => {
    transferData(str);
  };

  return (
    <Form
      size="large"
      name="dynamic_form_item"
      layout="vertical"
      className={classes['ant-form']}
      onFinish={onFinish}
      fields={fields}
    >
      <div className={classes['form-title']}>
        <span>{title}</span>
      </div>
      <Form.Item
        className={classes['ant-form-item']}
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Title is required.',
          },
        ]}
      >
        <Input type="text" placeholder="Title" />
      </Form.Item>

      <Form.Item
        className={classes['ant-form-item']}
        name="description"
        label="Short description"
        rules={[
          {
            required: true,
            message: 'Please, specify the description.',
          },
        ]}
      >
        <Input type="text" placeholder="Short description" />
      </Form.Item>

      <Form.Item
        className={classes['ant-form-item']}
        name="body"
        label="Text"
        rules={[
          {
            required: true,
            message: 'You can`t create an article without text!',
          },
        ]}
      >
        <Input.TextArea type="text" placeholder="Text" className={classes['ant-input']} />
      </Form.Item>

      <div className={classes['form-item-list-wrapper']}>
        <Form.List name="tagList">
          {(fieldsList, { add, remove }) => (
            <>
              {fieldsList.map((field, index) => (
                <Form.Item label={index === 0 ? 'Tags' : ''} className={classes['ant-form-item']} key={field.key}>
                  <Form.Item {...field} noStyle initialValues={['']}>
                    <Input placeholder="Tag" style={{ width: '40%' }} />
                  </Form.Item>

                  {fieldsList.length > 1 ? (
                    <Button
                      className={classes['ant-btn-del-tag']}
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      Delete
                    </Button>
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
                  Add tag
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item className={classes['ant-form-item']}>
          <Button type="primary" htmlType="submit" className={classes['form-item-send-button']} disabled={loading}>
            {loading === true ? <LoadingOutlined /> : 'Send'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
export default ArticleForm;
ArticleForm.defaultProps = {
  loading: false,
  title: '',
  description: '',
  fields: [],
  tagList: [],
};

ArticleForm.propTypes = {
  loading: PropTypes.bool,
  transferData: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.array,
  tagList: PropTypes.array,
};
