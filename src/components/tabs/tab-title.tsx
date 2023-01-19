import { useCallback } from 'react';

export type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
};

const TabTitle = (props: Props): JSX.Element => {
  const { title, setSelectedTab, index, isActive } = props;

  const handleOnClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li
      className={
        isActive ? 'film-nav__item film-nav__item--active' : 'film-nav__item'
      }
    >
      <a className="film-nav__link" onClick={handleOnClick}>
        {title}
      </a>
    </li>
  );
};

export default TabTitle;
