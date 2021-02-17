import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import MaskedInput from "react-maskedinput";
import { Button, FormControl, InputGroup } from 'react-bootstrap';

import './index.css';

const Shema = yup.object().shape({
  "id": yup.number().required(),
  "firstName": yup.string().required(),
  "lastName": yup.string().required(),
  "email": yup.string().required().email(),
  "phone": yup.string().test(
    'checkPhone',
    'Phone in not valid',
    (value) => !(value?.match(/\d+/g).join('').length < 10))
    .required(),
});

export default function AddForm({additionForList, setAdditionForList }) {
  const [newTr, setNewTr] = useState({});

  const handleSubmit = (values, actions) => {
    setAdditionForList([values, ...additionForList]);
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        "id": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": ""
      }}
      validationSchema={Shema}
      onSubmit={handleSubmit}
    >
      {({ dirty, isValid }) => (
        <Form className="addForm">
          <Field name="id">
            {({ field, meta }) => (
              <InputGroup className="addForm__input">
                <InputGroup.Prepend>
                  <InputGroup.Text>id</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl isInvalid={(meta.touched && meta.error) ? true : false} isValid={(meta.touched && !meta.error) ? true : false} {...field} placeholder="id" />
              </InputGroup>
            )}
          </Field>

          <Field name="firstName">
            {({ field, meta }) => (
              <InputGroup className= "addForm__input">
                <InputGroup.Prepend>
                  <InputGroup.Text>firstName</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl isInvalid={(meta.touched && meta.error) ? true : false} isValid={(meta.touched && !meta.error) ? true : false} {...field} placeholder="firstName" />
              </InputGroup>
            )}
          </Field>

          <Field name="lastName">
            {({ field, meta }) => (
              <InputGroup className="addForm__input">
                <InputGroup.Prepend>
                  <InputGroup.Text>lastName</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl isInvalid={(meta.touched && meta.error) ? true : false} isValid={(meta.touched && !meta.error) ? true : false} {...field} placeholder="lastName" />
              </InputGroup>
            )}
          </Field>

          <Field name="email">
            {({ field, meta }) => (
              <InputGroup className="addForm__input">
                <InputGroup.Prepend>
                  <InputGroup.Text>email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl isInvalid={(meta.touched && meta.error) ? true : false} isValid={(meta.touched && !meta.error) ? true : false} {...field} placeholder="email" />
              </InputGroup>
            )}
          </Field>

          <Field name="phone">
            {({ field, meta }) => (
              <InputGroup className="addForm__input">
                <InputGroup.Prepend>
                  <InputGroup.Text>Phone</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl isInvalid={(meta.touched && meta.error) ? true : false} isValid={(meta.touched && !meta.error) ? true : false} {...field} as={MaskedInput} mask="(111)111-1111" />
              </InputGroup>
            )}
          </Field>

          <Button
            className="addBtn"
            type="submit"
            variant="primary"
            disabled={dirty && isValid ? false : true}
          >
            Добавить в таблицу
          </Button>
        </Form>
      )}

    </Formik>
  )
}
