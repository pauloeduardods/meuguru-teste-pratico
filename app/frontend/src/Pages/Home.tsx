import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import FetchAxios from '../Service/api';
import { IUser } from '../types';

function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [lastOptions, setLastOptions] = useState<AxiosRequestConfig>({});

  const getUsers = async () => {
    try {
      let options: AxiosRequestConfig = {
        url: '/users',
        method: 'GET',
        params: {
          page,
        },
      };
      if (isFilter) {
        options = {
          ...options,
          params: {
            ...options.params,
            name: name === '' ? undefined : name,
            email: email === '' ? undefined : email,
          },
        };
      }
      if (JSON.stringify(options) === JSON.stringify(lastOptions)) {
        return;
      }
      setLastOptions(options);
      await FetchAxios(options).then((res) => setUsers(res.data));
    } catch (error) {
      setUsers([]);
    }
  };

  const submitFilters = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setIsFilter(true);
    await getUsers();
  };

  useEffect(() => {
    getUsers();
  }, [page, isFilter]);

  if (!localStorage.token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-vh-100 bg-meuguru">
      <Header />
      <div className="flex flex-col mt-10">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <form
              onSubmit={submitFilters}
              className="shadow overflow-hidden border-b border-t border-slate-700 bg-slate-900 sm:rounded-lg flex flex-col my-4"
            >
              <h1 className="text-2xl text-white text-center py-3 font-bold">Filtros</h1>
              <div className="px-5 mb-4 flex flex-col md:flex-row md:justify-evenly">
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={({ target: { value } }) => setName(value)}
                  className="bg-gray-800 text-white p-2 border-2 border-gray-900 rounded-lg w-full md:w-1/3"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={({ target: { value } }) => setEmail(value)}
                  className="bg-gray-800 text-white p-2 border-2 border-gray-900 rounded-lg w-full md:w-1/3"
                />
              </div>
              <div className="px-5 mb-4 flex flex-col md:flex-row md:justify-evenly">
                <button
                  type="submit"
                  className="bg-green-400 text-gray-700 font-bold text-xl p-2 border-2 border-gray-700 rounded-lg w-full md:w-1/3"
                >
                  Filtrar
                </button>
                <button
                  type="button"
                  onClick={() => { setName(''); setEmail(''); setPage(1); setIsFilter(false); }}
                  className="bg-red-500 text-gray-900 font-bold text-xl p-2 border-2 border-gray-700 rounded-lg w-full md:w-1/3"
                >
                  Limpar Filtros
                </button>
              </div>
            </form>
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
            <div className="my-4 w-full flex justify-center sm:justify-end">
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
