import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { adminDeleteUser, adminGetUsers } from '../Utils/axios';
import Button from './Button';
import '../Styles/components/adminUserList.css';

function AdminUserList({ userList, setUserList }) {
  useEffect(() => {
    const requestUsers = async () => {
      const users = await adminGetUsers('/admin/users');
      return setUserList(users);
    };
    requestUsers();
  }, [setUserList]);

  const convertRole = (role) => {
    switch (role) {
    case 'customer': return 'Cliente';
    case 'seller': return 'P. Vendedora';
    case 'administrator': return 'P. Administradora';
    default: return 'Desconhecido';
    }
  };

  const deleteUser = async (userId) => {
    await adminDeleteUser(`/admin/delete/${userId}`);
    const newUserList = userList.filter((user) => user.id !== userId);
    setUserList(newUserList);
  };

  if (!userList) return <p className="pVendedora">Carregando usuários...</p>;
  return (
    <div>
      <span className="pVendedora">Lista de usuários</span>
      {
        userList.length === 0 ? <p className="pVendedora">Não há usuários cadastrados</p>
          : (
            <table>
              <thead>
                <tr className="classificacao">
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
                    <th
                      className="number"
                      data-testid={ `admin_manage__element-user-table-item-number-${i}` }
                    >
                      {i + 1}
                    </th>

                    <th
                      className="name"
                      data-testid={ `admin_manage__element-user-table-name-${i}` }
                    >
                      {user.name}
                    </th>

                    <th
                      className="email"
                      data-testid={ `admin_manage__element-user-table-email-${i}` }
                    >
                      {user.email}
                    </th>

                    <th
                      className="name"
                      data-testid={ `admin_manage__element-user-table-role-${i}` }
                    >
                      {convertRole(user.role)}
                    </th>

                    <th
                      className="name"
                      data-testid={ `admin_manage__element-user-table-remove-${i}` }
                    >
                      <Button
                        onClick={ () => deleteUser(user.id) }
                        text="Excluir"
                        disabled={ false }
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )
      }
    </div>
  );
}

AdminUserList.propTypes = {
  userList: PropTypes.array,
  setUserList: PropTypes.func,
}.isRequired;

export default AdminUserList;
