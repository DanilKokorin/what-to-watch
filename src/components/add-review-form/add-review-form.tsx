import { ChangeEvent, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getToken } from '../../api/token';
import { AppRoute, RatingValues, ReviewLength } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { commentSended } from '../../store/action';
import { leaveReviewAction } from '../../store/api-action';

import jwt_decode from 'jwt-decode';
import Rating from './review-rating/rating';

function AddReviewForm(): JSX.Element {
  const params = useParams();
  const pathId = Number(params.id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user_id = jwt_decode(getToken()) as any;

  const [formData, setFormData] = useState({ rating: 0, review: '' });
  const { isCommentSended } = useAppSelector((state) => state);

  const date = new Date().toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const sendReview = (event: any) => {
    event.preventDefault();
    const isCommentValid =
      formData.review.trim().length >= ReviewLength.MIN &&
      formData.review.trim().length <= ReviewLength.MAX;
    const isRateValid =
      formData.rating >= RatingValues.MIN &&
      formData.rating <= RatingValues.MAX;

    if (isRateValid && isCommentValid) {
      dispatch(commentSended(true));
      dispatch(
        leaveReviewAction({
          movie: pathId,
          comment: formData.review,
          rating: formData.rating,
          date,
          users_permissions_user: user_id.id,
        })
      ).then(() => {
        setFormData({
          rating: 0,
          review: '',
        });
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

  const fieldChangeHandle = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    dispatch(commentSended(false));
    setFormData({ ...formData, [name]: value });
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
        <Rating onStarSelect={(event) => fieldChangeHandle(event)} />

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review"
            id="review-text"
            placeholder="Review text"
            onChange={(event) => fieldChangeHandle(event)}
            value={formData.review}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              onClick={sendReview}
              disabled={
                isCommentSended ||
                isValidForSending(formData.rating, formData.review)
              }
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
