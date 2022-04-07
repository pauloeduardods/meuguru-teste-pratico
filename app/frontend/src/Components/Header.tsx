import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Link, Navigate } from 'react-router-dom';
import {
  MenuIcon,
  XIcon,
  CashIcon,
  MailIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import logo from '../Images/image.svg';
import FetchAxios from '../Service/api';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Header() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);

  const logOut = () => {
    localStorage.removeItem('token');
    setEmail('');
    setName('');
    setLoggedIn(false);
  };

  const deleteUser = () => {
    const response = FetchAxios({
      url: '/users',
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token') as string,
      },
    });
    response.then((res) => {
      if (res.status === 200) {
        logOut();
      }
    });
  };

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Popover className="relative bg-slate-900">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="flex justify-between items-center border-b-2 border-slate-800 py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">MeuGuru</span>
              <img
                className="h-11 w-auto"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-slate-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Abrir menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-100' : 'text-gray-300',
                      'group bg-slate-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    )}
                  >
                    <span>Usuário</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-400' : 'text-gray-600',
                        'ml-2 h-5 w-5 group-hover:text-gray-500',
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-slate-900 px-5 py-6 sm:gap-8 sm:p-8">
                          <div className="-m-3 p-3 flex items-start rounded-lg hover:bg-slate-800">
                            <MailIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-100">{name || 'Default Name'}</p>
                            </div>
                          </div>
                          <div className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-900">
                            <MailIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-100">{email || 'default-email@trybewallet.com'}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between">
                            <Link
                              to="/login/edit"
                              className="w-full sm:w-5/12 my-2 sm:my-0 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500"
                            >
                              Editar Usuario
                            </Link>
                            <button
                              type="button"
                              className="w-full sm:w-5/12 my-2 sm:my-0 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-red-600 hover:bg-red-700"
                              onClick={deleteUser}
                            >
                              Deletar Usuario
                            </button>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              type="button"
              onClick={logOut}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-indigo-600 hover:bg-indigo-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-white ring-opacity-5 bg-slate-900 divide-y-2 divide-gray-900">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-11 w-auto"
                    src={logo}
                    alt="Logo"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-slate-900 rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Fechar menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <div className="grid gap-y-8">
                  <div
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-900"
                  >
                    <CashIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                    <span className="ml-3 text-base font-medium text-gray-100">{name || 'Default name'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div
                  className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-900"
                >
                  <MailIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                  <span className="ml-3 text-base font-medium text-gray-100">{email || 'default-email@trybewallet.com'}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <Link
                  to="/login/edit"
                  className="w-full sm:w-5/12 my-2 sm:my-0 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500"
                >
                  Editar Usuario
                </Link>
                <button
                  type="button"
                  className="w-full sm:w-5/12 my-2 sm:my-0 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-red-600 hover:bg-red-700"
                  onClick={deleteUser}
                >
                  Deletar Usuario
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-900 bg-indigo-600 hover:bg-indigo-700"
                  onClick={logOut}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Header;
