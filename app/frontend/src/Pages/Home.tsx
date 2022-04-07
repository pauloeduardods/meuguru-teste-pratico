import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import FetchAxios from '../Service/api';
import { IUser } from '../types';

function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    FetchAxios({
      url: '/users',
      params: {
        name,
        email,
        page,
      },
    }).then((res) => setUsers(res.data));
  }, [name, email, page]);

  if (!localStorage.token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col mt-10">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div>
              <input type="text" placeholder="Nome" value={name} onChange={({ target: { value } }) => setName(value)} />
              <input type="text" placeholder="Email" value={email} onChange={({ target: { value } }) => setEmail(value)} />
            </div>
            <div className="shadow overflow-hidden border-b border-t border-gray-300 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="sm:px-1 md:px-2 lg:px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                    <th className="sm:px-1 md:px-2 lg:px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="sm:px-1 md:px-2 lg:px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users?.map(({ id, email: curEmail, name: curName }) => (
                    <tr key={id}>
                      <td className="sm:px-1 md:px-2 lg:px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center place-content-center">
                          <div className="text-sm font-medium text-gray-900 truncate sm:max-w-xss xl:max-w-mdd">
                            {id}
                          </div>
                        </div>
                      </td>
                      <td className="sm:px-1 md:px-2 lg:px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center place-content-center">
                          <div className="text-sm font-medium text-gray-900">
                            {curName}
                          </div>
                        </div>
                      </td>
                      <td className="sm:px-1 md:px-2 lg:px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center place-content-center">
                          <div className="text-sm font-medium text-gray-900">
                            {curEmail}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
