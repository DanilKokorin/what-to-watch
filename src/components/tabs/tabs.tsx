import { ReactElement, useState } from 'react';
import TabTitle, { Props as TabTitleProps } from './tab-title';

type Props = {
  children: ReactElement<TabTitleProps>[];
  defaultSelectedTab?: number;
};

const Tabs = (props: Props): JSX.Element => {
  const { children, defaultSelectedTab } = props;

  const [selectedTab, setSelectedTab] = useState<number>(
    defaultSelectedTab || 0
  );

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {children.map((item, index) => (
            <TabTitle
              key={item.props.title}
              index={index}
              title={item.props.title}
              isActive={index === selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </ul>
      </nav>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
