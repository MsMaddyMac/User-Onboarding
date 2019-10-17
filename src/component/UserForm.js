import React from 'react';
//import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
// import * as Yup from "yup";

function UserForm({ values }) {
    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="text" name="email" placeholder="Email" />
                <Field type="text" name="password" placeholder="Password" />

                <label className="checkbox-container">
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                </label>
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
            terms: terms || ""
        };
    },
})(UserForm);


export default FormikUserForm


