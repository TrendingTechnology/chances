import React from 'react';
import { Formik, Form } from 'formik';
import cx from 'classnames';
import Input from '@components/Input';

const BlogSearch = ({ className, handleChange: changeProp }) => (
  <Formik
    initialValues={{ search: '' }}
    render={({ handleChange }) => (
      <Form className={cx('BlogSearch__form', className)}>
        <Input
          className="BlogSearch__input"
          name="search"
          placeholder="Search posts..."
          label="Search posts"
          showLabel={false}
          onChange={e => {
            handleChange(e);
            changeProp(e);
          }}
        />
      </Form>
    )}
  />
);

export default BlogSearch;
