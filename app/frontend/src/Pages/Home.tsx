import React, { useEffect, useState } from 'react'; //rfce
import { IUser } from '../types';

function Home() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users`)
      .then((response: Response) => response.json())
      .then((data: IUser[]) => setUsers(data));
  }, []);

  return (
    <div className="flex flex-col mt-10">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                {users?.map(({ id, email, name }) => (
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
                          {name}
                        </div>
                      </div>
                    </td>
                    <td className="sm:px-1 md:px-2 lg:px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center place-content-center">
                        <div className="text-sm font-medium text-gray-900">
                          {email}
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
  );
}

export default Home;
