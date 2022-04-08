/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import logo from '../Images/image.svg';
import FetchAxios from '../Service/api';

function Edit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getUser = async () => {
    try {
      const result = await FetchAxios({
        url: '/login/validate',
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token') as string,
        },
      });
      if (result.status === 200) {
        setEmail(result.data.email);
        setName(result.data.name);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!localStorage.getItem('token')) {
        setIsError(true);
        return;
      }
      const result = await FetchAxios({
        url: '/users',
        method: 'PUT',
        data: {
          name,
          email,
        },
        headers: {
          Authorization: localStorage.getItem('token') as string,
        },
      });
      if (result.status === 200) {
        setIsSuccess(true);
        return;
      }
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!localStorage.getItem('token') || isError) {
    return <Navigate to="/login" />;
  }

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-meuguru h-vh-100">
      <div className="max-w-md w-full space-y-8 border-solid border-slate-700 bg-slate-900 p-3 border-2 rounded-xl shadow-md">
        <div className="relative mt-3">
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">Criar Usuário</h2>
        </div>
        <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="input-name" className="sr-only">
                Nome
              </label>
              <input
                id="input-name"
                data-testid="input-name"
                name="name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                type="text"
                autoComplete="name"
                value={name}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-slate-300 focus:border-slate-500 focus:z-10 sm:text-sm"
                placeholder="Nome"
              />
            </div>
            <div>
              <label htmlFor="input-email" className="sr-only">
                E-mail
              </label>
              <input
                id="input-email"
                data-testid="input-email"
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                value={email}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-slate-300 focus:border-slate-500 focus:z-10 sm:text-sm"
                placeholder="E-mail"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-60 mb-1"
              data-testid="btn-play"
              disabled={isButtonEnabled}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-violet-200 group-hover:text-violet-100" aria-hidden="true" />
              </span>
              Entrar
            </button>
          </div>
        </form>
        <div>
          <p className="text-center text-sm text-gray-300">
            Não quer mais editar seu usuário?
            {' '}
            <Link to="/login" className="text-indigo-500 hover:text-indigo-400 focus:outline-none focus:underline">
              Voltar para Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Edit;
