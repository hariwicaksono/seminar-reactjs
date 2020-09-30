import React from 'react';
import { Form } from 'react-bootstrap';

const FormSelect = ({
  field,
  label,
  children,
  form: { errors, touched }
}) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control as="select"
      {...field}
      isInvalid={errors[field.name] && touched[field.name]}
    >
        {children}
    </Form.Control>
    {errors[field.name] && touched[field.name] &&  <Form.Control.Feedback type="invalid">{errors[field.name]}</Form.Control.Feedback>}
    
  </Form.Group>
);

export default FormSelect;
