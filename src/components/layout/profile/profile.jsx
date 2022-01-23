import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Base from '../base/base';
import MenuItem from '../../menu/menu-item/menu-item';
import Menu from '../../menu/menu';
import Row from '../../grid/row/row';
import Col from '../../grid/col/col';
import profileStyles from './profile.module.css';

const Profile = ({ description, content }) => {
  const descriptionClasses = classNames('mt-20 text text_type_main-default text_color_inactive', profileStyles['description']);
  return (
    <Base>
      <Row>
        <Col>
          <Menu direction="column" size="big" className="mt-30">
            <MenuItem to="/profile" label="Профиль" />
            <MenuItem to="/profile/orders" label="История заказа" />
            <MenuItem to="/logout" label="Выход" />
          </Menu>
          <p className={descriptionClasses}>
            {description}
          </p>
        </Col>
        <Col>
          {content}
        </Col>
        <Col />
      </Row>
    </Base>
  );
};

Profile.propTypes = {
  description: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired
};

export default Profile;
