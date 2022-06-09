import React from 'react';
import { ILoginValidation } from '../../../../../models/auth';
import { FieldHookConfig, useField } from 'formik';

interface Props {
  label: string;
  classInput: string;
}

const EmailField = (props: Props & FieldHookConfig<any>) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label htmlFor={field.name} className="form-label">
        {props.label}
      </label>
      <input className={props.classInput} aria-describedby="emailHelp" {...field} type={props.type} />
      <div id="emailHelp" className="form-text">
        {meta.touched && meta.error ? <div className="error" style={{color: 'red'}}>{meta.error}</div> : null}
      </div>
    </div>
  );
};

export default EmailField;
