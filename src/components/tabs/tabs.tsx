import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabStyles from './tabs.module.css';

type TTabsProps = {
  className?: string;
  current: string;
  onClick: (value: string) => void;
  tabs: { [name: string]: React.ReactNode };
};

const Tabs: React.FC<TTabsProps> = ({
  className,
  current,
  onClick,
  children,
  tabs
}) => (
  <div
    className={className}
  >
    <div className={tabStyles['tabs-list']}>
      {Object.keys(tabs).map((key) => (
        <div
          key={key}
          className={tabStyles['tab-item']}
        >
          <Tab
            value={key}
            active={key === current}
            onClick={onClick}
          >
            {tabs[key]}
          </Tab>
        </div>
      ))}
    </div>
    {children}
  </div>
);

export default Tabs;
