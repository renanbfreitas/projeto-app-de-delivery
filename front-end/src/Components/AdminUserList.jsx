import { useEffect, useState } from 'react';
import { adminGetUsers } from '../Utils/axios';
import Button from './Button';

function AdminUserList() {
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const requestUsers = async () => {
      const users = await adminGetUsers('/admin/users');
      return setUserList(users);
    };
    requestUsers();
  }, []);

  const convertRole = (role) => {
    switch (role) {
    case 'customer': return 'Cliente';
    case 'seller': return 'P. Vendedora';
    case 'administrator': return 'P. Administradora';
    default: return 'Desconhecido';
    }
  };

  if (!userList) return <p>Carregando usuários...</p>;
  return (
    <div>
      <span>Lista de usuários</span>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, i) => (
            <tr key={ user.id }>
              <th data-testid={ `admin_manage__element-user-table-item-number-${i}` }>
                {i + 1}
              </th>

              <th data-testid={ `admin_manage__element-user-table-name-${i}` }>
                {user.name}
              </th>

              <th data-testid={ `admin_manage__element-user-table-email-${i}` }>
                {user.email}
              </th>

              <th data-testid={ `admin_manage__element-user-table-role-${i}` }>
                {convertRole(user.role)}
              </th>

              <th data-testid={ `admin_manage__element-user-table-remove-${i}` }>
                <Button
                  onClick={ () => {} }
                  text="Excluir"
                  disabled={ false }
                />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList;
