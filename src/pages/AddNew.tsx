
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage, } from "formik";
import {toast} from "react-hot-toast"
import * as Yup from "yup";
import { useAppDispatch } from '../hook';
import { addUser } from '../redux/userSlice';

interface FormValues {
    username: string;
    email: string;
}


// Validation Schema using Yup
const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(15, "Username must be less than 15 characters")
        .required("Username is required"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});







const AddNew = () => {
    const dispatch = useAppDispatch();
    const initialValues: FormValues = { username: "", email: "" };
    const handleAddNewUser = (values: FormValues,resetForm:()=>void) => {
        dispatch(addUser(values));
        toast.success("This is a success message!");
        resetForm();
    }
    
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-[900px]  bg-white shadow-lg rounded-lg ">
                    <h1 className='text-center text-2xl bg-sky-600 text-white py-2 font-bold uppercase tracking-wider'>Add New User</h1>
                    <div className="container mx-auto p-6 ">
                        <div className='flex justify-between items-center mb-4'>
                            <div> <h2 className="text-2xl font-bold"></h2></div>
                            <div>
                                <Link to={'/'} className='bg-green-700 px-4 py-2 text-white rounded-md'>Back To User</Link>
                            </div>
                        </div>


                        <div className="overflow-x-auto">
                            <div className="max-w-lg mx-auto">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values,{resetForm}) => handleAddNewUser(values,resetForm)}
                                >
                                    <Form className="space-y-4">
                                        {/* Username field */}
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                Username
                                            </label>
                                            <Field
                                                type="text"
                                                name="username"
                                                placeholder="Enter username"
                                                id="username"
                                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>

                                        {/* Email field */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter email address"
                                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Submit
                                        </button>
                                    </Form>
                                </Formik>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddNew