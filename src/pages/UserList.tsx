import React, { useEffect, useState, useCallback } from 'react';
import { deleteUser, fetchUsers, setPage, setSearchQuery } from '../redux/userSlice';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../hook';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import debounce from "lodash/debounce";
import UserTableSkeleton from '../components/sketon_loader/UserTableSkeleton';

const UserList: React.FC = () => {
    const dispatch = useAppDispatch();



    const { users, loading, error, totalItems, currentPage, pageSize, searchQuery } = useAppSelector((state: RootState) => state.users);


    const [searchTerm, setSearchTerm] = useState<string>(searchQuery);





    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, pageSize, search: searchQuery }));

    }, [dispatch, currentPage, pageSize, searchQuery]);




    const handleDeleteUser = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id));
                Swal.fire("Deleted!", "The user has been deleted.", "success");
            }
        });
    }

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };



    const updateSearchQuery = useCallback(
        debounce((query: string) => {
            dispatch(setSearchQuery(query));
            dispatch(setPage(1)); // Reset to first page for new search
        }, 500), // Debounce delay in milliseconds
        []
    );



    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchTerm(query);
        updateSearchQuery(query)
    };






    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-[900px]  bg-white shadow-lg rounded-lg relative">
                    <h1 className='text-center text-2xl bg-sky-600 text-white py-2 font-bold uppercase tracking-wider '>ALL USER LIST ( {totalItems} )</h1>

                    <div className="relative w-full mt-2 px-4 mx-auto">
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search Users....."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1  focus:border-none"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 ml-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM8 14a6 6 0 100-12 6 6 0 000 12z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>


                    <div className="container mx-auto p-6 ">
                        <div className='flex justify-between items-center mb-4'>
                            <div> <h2 className="text-2xl font-bold"></h2></div>
                            <div>
                                <Link to={'/add/new/user'} className='bg-green-700 px-4 py-2 text-white rounded-md'>Add New User</Link>
                            </div>
                        </div>



                        <div className="overflow-x-auto">
                            {loading ? (<UserTableSkeleton />) : error ? (<h1 className='text-rose-600'>{error}</h1>) : (
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                    <thead>
                                        <tr className="bg-gray-100 border-b">
                                            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Sl No</th>
                                            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Username</th>
                                            <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Email</th>
                                            <th className="py-3 px-6 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {users.map((user, index) => (
                                            <tr className="border-b hover:bg-gray-50" key={index}>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-800">{index + 1}</td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-800">{user.username}</td>
                                                <td className="py-4 px-6 text-sm text-gray-600">{user.email}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex justify-center space-x-1">

                                                        <button className="bg-green-600 text-white p-1 rounded-md">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-4 h-4"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 4.5c7.5 0 9 7.5 9 7.5s-1.5 7.5-9 7.5-9-7.5-9-7.5 1.5-7.5 9-7.5z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 9.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        {/* Edit Button */}
                                                        <button className="bg-sky-600 text-white p-1 rounded-md">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-4 h-4"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15.232 4.232l4.536 4.536-10.036 10.036-4.536 1 1-4.536L15.232 4.232z"
                                                                />
                                                            </svg>
                                                        </button>

                                                        {/* Delete Button */}
                                                        <button onClick={() => handleDeleteUser(user.id)} className="bg-rose-600 text-white p-1 rounded-md">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-4 h-4"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M19.5 9.75l-1.5 10.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25L4.5 9.75m10.5 0V5.25A2.25 2.25 0 0012.75 3h-1.5A2.25 2.25 0 009 5.25V9.75m0 0h6"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            )}

                        </div>


                        <div className="flex justify-between items-center">
                            <div></div>
                            <div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalItems={totalItems}
                                    pageSize={pageSize}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>



                    </div>

                </div>
            </div>

        </div>
    )
}

export default UserList