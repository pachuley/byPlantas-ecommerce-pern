import React from 'react';
import styles from './reviewcard.module.css'

const ReviewCard = ({title,comment,stars,name,lastname}) => {
    return ( 
        <div className={`${styles.cardreview}`}>
            <h5 className={`${styles.cardtitle}`}>"{title}"</h5>
            <p>{comment}</p>
            <div className={`${styles.namecard} d-flex justify-content-end`}>
                    <cite>-{name}</cite>
                    <cite className="px-1">{lastname}</cite>
            </div>
            <div className="d-flex justify-content-end my-2">
                {stars}
            </div>

        </div>
     );
}
 
export default ReviewCard;