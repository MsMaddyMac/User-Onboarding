import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";


function UserForm({ values, touched, errors, status }) {
    const [users, setUsers] = useState([])
    useEffect(() => {
        status && setUsers(users => [...users, status])
    }, [status])
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
                </label>
                {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}
                <button type="submit">Submit!</button>
            </Form>

            

            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}
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
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {setStatus(res.data); 
                resetForm()})
            .catch(err => console.log(err.response));
    }
    
})(UserForm);


export default FormikUserForm;



