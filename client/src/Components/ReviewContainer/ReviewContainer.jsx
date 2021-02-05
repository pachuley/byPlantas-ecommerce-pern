import React from 'react';
import ReviewCard from './ReviewCard';
import styles from './reviewcard.module.css'

const ReviewContainer = ({ reviews }) => {
  return (
    <>
      <div className={`${styles.titlereviews } d-flex justify-content-center`}>Reviews</div>
      {reviews.map(review => (
        <ReviewCard
            title={review.title}
            comment={review.comment}
            stars={review.stars}
            name={review.user.name}
            lastname={review.user.lastname}
        />
      ))}
    </>
  );
};

export default ReviewContainer;
