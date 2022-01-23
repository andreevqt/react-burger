import React from 'react';
import { Link } from 'react-router-dom';
import Col from '../../components/grid/col/col';
import Container from '../../components/grid/container/container';
import Row from '../../components/grid/row/row';
import noMatchStyles from './no-match.module.css';

const NoMatch = () => (
  <Container>
    <Row className={noMatchStyles['row']}>
      <Col mod="6" className="ml-auto mr-auto">
        <h5 className="text text_type_main-large mb-5">Упс! 404 Ошибка</h5>
        <p className="text text_type_main-default">
          Страница, которую вы запросили не найдена. Проверьте адрес или попробуйте&nbsp;
          <Link to="/" className="link">Главную</Link>
        </p>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
