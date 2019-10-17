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
                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}

                <Field component="select" className="role-select" name="role">
                    <option>Choose an option</option>
                    <option value="Section Lead">Section Lead</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Developer">Developer</option>
                </Field>
                {touched.role && errors.role && (
                    <p className="error">{errors.role}</p>
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
                    <li>Role: {user.role}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, role, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            role: role || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        password: Yup.string().required('Oops, a password is required!'),
        role: Yup.string().required('Please make a selection!'),
        terms: Yup.boolean().oneOf([true], 'Agreement of terms is required!')
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {setStatus(res.data); 
                resetForm()
            })
            .catch(err => console.log(err.response));
    }
    
})(UserForm);


export default FormikUserForm;



