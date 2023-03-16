import { Fragment, memo } from 'react';

const createArray = (qty: number) => {
  const count = [];
  for (let i = qty; i > 0; i--) {
    count.push(i);
  }
  return count;
};

type RatingProps = {
  onStarSelect: (value: number) => void;
};

function Rating({ onStarSelect }: RatingProps) {
  const starsArray = createArray(10);

  return (
    <div className="rating">
      <div className="rating__stars">
        {starsArray.map((item) => {
          return (
            <Fragment key={item}>
              <input
                className="rating__input"
                id={`star-${item}`}
                type="radio"
                name="rating"
                value={item}
                onChange={() => onStarSelect(item)}
              />
              <label className="rating__label" htmlFor={`star-${item}`}>
                Rating {item}
              </label>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Rating);
