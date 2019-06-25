import React from 'react';
import cx from 'classnames';
import './BookExcerpt.css';

const BookExcerpt = ({
  className,
  title,
  author,
  image,
  imageAlt,
  date,
  spoiler,
}) => {
  return (
    <article
      className={cx('BookExcerpt', className, {
        'BookExcerpt--hasImage': image,
      })}
    >
      {image && (
        <img
          className="BookExcerpt__image"
          src={image}
          alt={imageAlt}
          loading="lazy"
        />
      )}
      <div className="BookExcerpt__contentWrapper">
        <header className="BookExcerpt__header">
          <h3 className="BookExcerpt__title">{title}</h3>
          <small className="BookExcerpt__meta">
            By {author} | Reviewed on {date}
          </small>
        </header>
        <p
          className="BookExcerpt__spoiler"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: spoiler }}
        />
        {/* <small className="BookExcerpt__more">
          <Link className="BookExcerpt__moreLink" to={slug} rel="bookmark">
            Read More
          </Link>
        </small> */}
      </div>
    </article>
  );
};

export default BookExcerpt;
