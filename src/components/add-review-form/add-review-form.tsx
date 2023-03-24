import { useCallback, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute, RatingValues, ReviewLength, user_id } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { leaveReviewAction } from '../../store/api-action';

import Rating from './review-rating/rating';
import { commentSended } from '../../store/review-data/review-data';

function AddReviewForm(): JSX.Element {
  const params = useParams();
  const pathId = Number(params.id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const { isCommentSended } = useAppSelector(({ reviews }) => reviews);

  const date = new Date().toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const sendReview = (event: any) => {
    event.preventDefault();
    const isCommentValid =
      review.trim().length >= ReviewLength.MIN &&
      review.trim().length <= ReviewLength.MAX;
    const isRateValid =
      rating >= RatingValues.MIN && rating <= RatingValues.MAX;

    if (isRateValid && isCommentValid) {
      dispatch(commentSended(true));
      dispatch(
        leaveReviewAction({
          movie: pathId,
          comment: review,
          rating: rating,
          date,
          users_permissions_user: user_id && user_id.id,
        })
      ).then(() => {
        setRating(0);
        setReview('');
      });
      toast.info('Комментарий отправлен');
      navigate(generatePath(AppRoute.Film, { id: `${pathId}` }));
    } else {
      if (isRateValid && !isCommentValid) {
        toast.warn(
          'Длина отзыва должна быть не менее 50 и не более 400 символов'
        );
      } else {
        toast.warn('Укажите рейтинг');
      }
    }
  };

  const saveStarValue = useCallback((value: number): void => {
    dispatch(commentSended(false));
    setRating(value);
  }, []);

  const textChangeHandle = (comment: string): void => {
    dispatch(commentSended(false));
    setReview(comment);
  };

  const isValidForSending = (rating: number, comment: string) => {
    if (rating > 0 && comment.length > 0) {
      return false;
    }
    return true;
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <Rating onStarSelect={saveStarValue} />

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review"
            id="review-text"
            placeholder="Review text"
            onChange={({ target }) => textChangeHandle(target.value)}
            value={review}
            maxLength={ReviewLength.MAX}
            minLength={ReviewLength.MIN}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              onClick={sendReview}
              disabled={isCommentSended || isValidForSending(rating, review)}
            >
              Post
            </button>
          </div>
        </div>
        <p>Осталось символов: {ReviewLength.MAX - review.length}</p>
      </form>
    </div>
  );
}

export default AddReviewForm;
