import { ChangeEvent, Fragment, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getToken } from '../../api/token';
import { AppRoute, RatingValues, ReviewLength } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { commentSended } from '../../store/action';
import { leaveCommentAction } from '../../store/api-action';

import jwt_decode from 'jwt-decode';

const makeArray = () => {
  const result = [];
  for (let i = 10; i > 0; i--) {
    result.push(i);
  }
  return result;
};

function AddReviewForm(): JSX.Element {
  const params = useParams();
  const pathId = Number(params.id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const starsArray = makeArray();
  const [formData, setFormData] = useState({ rating: 0, review: '' });
  const [rateError, setRateError] = useState<boolean | null>(null);
  const [reviewError, setReviewError] = useState<boolean | null>(null);
  const { isCommentSended } = useAppSelector((state) => state);

  const user_id = jwt_decode(getToken()) as any;

  const date = new Date().toLocaleDateString('en-us', {
    month: 'short',
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
        leaveCommentAction({
          movie: pathId,
          comment: formData.review,
          rating: formData.rating,
          date,
          users_permissions_user: user_id,
        })
      ).then(() => {
        setFormData({
          rating: 0,
          review: '',
        });
      });
      navigate(generatePath(AppRoute.Film, { id: `${pathId}` }));
    } else {
      setReviewError(true);
    }
  };

  const fieldChangeHandle = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    dispatch(commentSended(false));
    setRateError(false);
    setReviewError(false);
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
      {rateError ? toast.warn('Укажите рейтинг') : ''}
      {reviewError
        ? toast.warn(
            'Длина отзыва должна быть не менее 50 и не более 400 символов'
          )
        : ''}
      {isCommentSended ? toast.warn('Комментарий отправлен') : ''}
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {starsArray.map((item) => (
              <Fragment key={item}>
                <input
                  className="rating__input"
                  id={`star-${item}`}
                  type="radio"
                  name="rating"
                  value={item}
                  onChange={(event) => fieldChangeHandle(event)}
                />
                <label className="rating__label" htmlFor={`star-${item}`}>
                  Rating {item}
                </label>
              </Fragment>
            ))}
          </div>
        </div>

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
