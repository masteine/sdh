import React from 'react';
import {
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';

export default function List(props) {
  const { data, removeUser, showDetails } = props;
  return (
    <Row>
      {data.map((user) => (
        <Col
          md={4}
          key={user.id}
          style={{ cursor: 'pointer', padding: '15px' }}>
          <Card body className="list-card">
            <CardBody onClick={() => showDetails(user)}>
              <CardTitle>
                {user.first_name} {user.last_name}
              </CardTitle>
              <CardText>{user.birth_date}</CardText>
              <CardText>{user.gender}</CardText>
            </CardBody>
            <Button color="danger" onClick={() => removeUser(user)}>
              Delete user
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
