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
  )
};

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  current: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }))
};

export default Tabs;
