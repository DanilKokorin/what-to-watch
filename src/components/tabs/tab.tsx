import React, { Fragment, ReactElement, ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactElement | ReactElement[] | ReactNode;
};

const Tab: React.FC<Props> = ({ children }: Props): JSX.Element => {
  return <Fragment>{children}</Fragment>;
};

export default Tab;
