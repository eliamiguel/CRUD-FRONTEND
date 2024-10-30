import React from "react";
import P from "prop-types";
import axios from "axios";

import { toast } from "react-toastify";
import Table from '../Table/index.jsx';


const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:6002/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table  users={users} handleEdit={handleEdit} handleDelete={handleDelete}/>
  );
};

Grid.propTypes = {
  users: P.arrayOf(P.string), 
  setUsers: P.node.isRequired,
  setOnEdit: P.node.isRequired
}

export default Grid;