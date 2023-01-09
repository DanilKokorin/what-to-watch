import { ChangeEvent, useState } from 'react';

function AddReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({ rating: '', reviewText: '' });

  const fieldChangeHandle = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            <input
              className="rating__input"
              id="star-10"
              type="radio"
              name="rating"
              //   value="10"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-10">
              Rating 10
            </label>

            <input
              className="rating__input"
              id="star-9"
              type="radio"
              name="rating"
              //   value="9"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-9">
              Rating 9
            </label>

            <input
              className="rating__input"
              id="star-8"
              type="radio"
              name="rating"
              checked
              //   value="8"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-8">
              Rating 8
            </label>

            <input
              className="rating__input"
              id="star-7"
              type="radio"
              name="rating"
              //   value="7"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-7">
              Rating 7
            </label>

            <input
              className="rating__input"
              id="star-6"
              type="radio"
              name="rating"
              //   value="6"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-6">
              Rating 6
            </label>

            <input
              className="rating__input"
              id="star-5"
              type="radio"
              name="rating"
              //   value="5"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-5">
              Rating 5
            </label>

            <input
              className="rating__input"
              id="star-4"
              type="radio"
              name="rating"
              //   value="4"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-4">
              Rating 4
            </label>

            <input
              className="rating__input"
              id="star-3"
              type="radio"
              name="rating"
              //   value="3"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-3">
              Rating 3
            </label>

            <input
              className="rating__input"
              id="star-2"
              type="radio"
              name="rating"
              //   value="2"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-2">
              Rating 2
            </label>

            <input
              className="rating__input"
              id="star-1"
              type="radio"
              name="rating"
              //   value="1"
              value={formData.rating}
              onChange={fieldChangeHandle}
            />
            <label className="rating__label" htmlFor="star-1">
              Rating 1
            </label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="reviewText"
            id="review-text"
            placeholder="Review text"
            onChange={fieldChangeHandle}
            value={formData.reviewText}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
