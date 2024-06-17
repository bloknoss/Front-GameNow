import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';

export default function ControlPanelUser() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of users per page
    const navigation = useNavigate()


    useEffect(() => {
        axios.get("/api/User/GetUsers").then((response) => {
            setUsers(response.data);
        });
    }, []);

    const handleRemove = (id) => {
        console.log(id)
        setUsers(users.filter(user => user.id !== id));

        axios.delete("/api/User/DeleteUser", {
            params: {
                id: id
            }
        })
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='items-center mb-10 flex flex-col h-full mt-16'>
            <div className="max-w-7xl relative overflow-x-auto overflow-hidden shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs items-center justify-center font-poppins text-center flex-auto text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Games Played</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 font-poppins" key={user.id}>
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.userName}</th>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.phoneNumber}</td>
                                <td className="py-2 px-4">{user.gamesPlayed}</td>
                                <td className="py-2 px-4">
                                    <div className="px-6 py-4 flex flex-col gap-3">
                                        <Link to="/user" state={{ id: user.id }} className="font-medium text-green-600 hover:underline">View</Link>
                                        <Link onClick={() => handleRemove(user.id)} href="#" className="font-medium text-red-600 hover:underline">Remove</Link>
                                        <Link to="/admin/users/edit" state={{ id: user.id }} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => (navigation("/admin/users/insert"))} className='mt-5 mb-5 rounded-xl font-poppins transition-all hover:bg-green-300 text-black h-10 w-full bg-green-400'>Insertar</button>

            </div>
            <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} />
        </div>
    );
};

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex items-center -space-x-px">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginate(number)} href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
