import React from 'react';
//import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";

function UserForm({ values }) {
    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="text" name="email" placeholder="Email" />
                <Field type="text" name="password" placeholder="Password" />
            </Form>
            
        </div>
    )
}

export default UserForm


