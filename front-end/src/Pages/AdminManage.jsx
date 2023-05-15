import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import AdminRegister from '../Components/AdminRegister';
import { getUser } from '../Utils/LocalStorage';
import AdminUserList from '../Components/AdminUserList';

function AdminManage() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsLogged(true);
  }, []);

  return (
    <div>
      { isLogged && <Redirect to="/login" /> }
      <Navbar />
      <AdminRegister />
      <AdminUserList />
    </div>
  );
}

export default AdminManage;
