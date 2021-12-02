import React from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import tabStyles from './tabs.module.css';

const Tabs = ({current, onClick, children, tabs, className = '', ...rest}) => {
  return (
    <div className={`${tabStyles['tabs']} ${className}`} {...rest}>
      <div className={tabStyles['tabs-list']}>
        {
          tabs.map((tab, idx) => (
            <div
              key={idx}
              className={tabStyles['tab-item']}
            >
              <Tab
                value={tab.value}
                active={tab.value === current}
                onClick={onClick}
              >
                {tab.label}
              </Tab>
            </div>
          ))
        }
      </div>
      <div className={tabStyles['tabs-content']}>
        {children}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired
};

export default Tabs;
