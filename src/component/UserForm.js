import React from 'react';
//import axios from 'axios';
import { withFormik, Form, Field, yupToFormErrors } from 'formik';
import * as Yup from "yup";

function UserForm({ values, touched, errors }) {
    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="text" name="email" placeholder="Email" />
                <Field type="text" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}


                <label className="checkbox-container">
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                </label>
                {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}
                <button type="submit">Submit!</button>
            </Form>  
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        password: Yup.string().required('Oops, a password is required!'),
        terms: Yup.boolean().oneOf([true], 'Agreement of terms is required!')
    })
})(UserForm);


export default FormikUserForm


