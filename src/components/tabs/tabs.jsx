import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabStyles from './tabs.module.css';

const Tabs = ({
  className,
  current,
  onClick,
  children,
  tabs,
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

Tabs.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  tabs: PropTypes.objectOf(PropTypes.string).isRequired,
};

Tabs.defaultProps = {
  className: '',
};

export default Tabs;
