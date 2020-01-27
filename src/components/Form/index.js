import React from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, FormGroup, Label, Button } from 'reactstrap';
import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  first_name: yup
    .string()
    .max(256)
    .required(),
  last_name: yup
    .string()
    .max(256)
    .required(),
  job: yup
    .string()
    .max(256)
    .required(),
  biography: yup
    .string()
    .max(1024)
    .required(),
  birth_date: yup.date().required()
});

export default function CustomForm(props) {
  const { submitData, user } = props;
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    validationSchema: SignupSchema
  });

  const onSubmit = (data) => {
    let date = data.birth_date;
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + 1);
    let a = new Date(copy);
    let birth_date = a.toISOString().slice(0, 10);
    console.log(birth_date);
    const newData = { ...data, birth_date };
    submitData(newData);
  };

  return (
    <Row>
      <Col md="12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6">
              <FormGroup>
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  defaultValue={user.first_name}
                  ref={register}
                />
                {errors.first_name && (
                  <p className="errors">{errors.first_name.message}</p>
                )}
              </FormGroup>
              <FormGroup>
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  defaultValue={user.last_name}
                  ref={register}
                />
                {errors.last_name && (
                  <p className="errors">{errors.last_name.message}</p>
                )}
              </FormGroup>
              <FormGroup>
                <label>Birth date</label>
                <input
                  type="date"
                  name="birth_date"
                  defaultValue={user.birth_date}
                  ref={register}
                />
                {errors.birth_date && (
                  <p className="errors">{errors.birth_date.message}</p>
                )}
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                style={{ marginTop: '25px' }}>
                Save
              </Button>
            </Col>
            <Col md="6">
              <FormGroup>
                <label>Gender</label>
                <select
                  type="select"
                  name="gender"
                  defaultValue={user.gender}
                  ref={register}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="errors">{errors.gender.message}</p>
                )}
              </FormGroup>
              <FormGroup>
                <label>Job</label>
                <input
                  type="text"
                  name="job"
                  defaultValue={user.job}
                  ref={register}
                />
                {errors.job && <p className="errors">{errors.job.message}</p>}
              </FormGroup>
              <FormGroup>
                <label>Biography</label>
                <textarea
                  row="3"
                  type="text"
                  name="biography"
                  defaultValue={user.biography}
                  ref={register}
                />
                {errors.biography && (
                  <p className="errors">{errors.biography.message}</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label>
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultValue={user.is_active}
                    ref={register}
                  />
                  Is active
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  );
}
