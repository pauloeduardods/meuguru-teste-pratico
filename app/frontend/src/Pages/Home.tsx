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
    <div className="h-vh-100 bg-meuguru">
      <Header />
      <div className="flex flex-col mt-10">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div>
              <input type="text" placeholder="Nome" value={name} onChange={({ target: { value } }) => setName(value)} />
              <input type="text" placeholder="Email" value={email} onChange={({ target: { value } }) => setEmail(value)} />
            </div>
            <div className="shadow overflow-hidden border-b border-t border-slate-700 sm:rounded-lg">
              <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="sm:px-1 md:px-2 lg:px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                    <th className="sm:px-1 md:px-2 lg:px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="sm:px-1 md:px-2 lg:px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900 divide-y divide-gray-800">
                  {users?.map(({ id, email: curEmail, name: curName }) => (
                    <tr key={id}>
                      <td className="sm:px-1 md:px-2 lg:px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center place-content-center">
                          <div className="text-sm font-medium text-gray-50 truncate sm:max-w-xss xl:max-w-mdd">
                            {id}
                          </div>
                        </div>
                      </td>
                      <td className="sm:px-1 md:px-2 lg:px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center place-content-center">
                          <div className="text-sm font-medium text-gray-50">
                            {curName}
                          </div>
                        </div>
                      </td>
                      <td className="sm:px-1 md:px-2 lg:px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center place-content-center">
                          <div className="text-sm font-medium text-gray-50">
                            {curEmail}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 w-full flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="my-2 mx-2 sm:my-0 flex items-center justify-center px-10 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-green-400 hover:bg-green-500 disabled:bg-green-800"
              >
                Anterior
              </button>
              <span className="mx-3 text-gray-200">{page}</span>
              <button
                type="button"
                onClick={() => setPage(page + 1)}
                disabled={users?.length < 10}
                className="my-2 mx-2 sm:my-0 flex items-center justify-center px-10 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-green-400 hover:bg-green-500 disabled:bg-green-800"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
