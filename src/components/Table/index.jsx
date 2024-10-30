import P from 'prop-types'
import { FaTrash, FaEdit } from "react-icons/fa";
import { Thead, Tbody, Table as TableSyle, Td, Tr,Th} from "../Table/styles.js";
const Table = ({users, handleEdit, handleDelete})=>{
  return(
    <TableSyle>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="20%" onlyWeb>
              {item.numero}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit className='editDelete' onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash className='editDelete' onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </TableSyle>
  )
};

Table.propTypes = {
  users: P.arrayOf(P.shape({
    id: P.number.isRequired,
    nome: P.string.isRequired,
    email: P.string.isRequired,
    numero: P.string.isRequired,
  })).isRequired,
  handleEdit: P.func.isRequired,
  handleDelete: P.func.isRequired,
};
export default Table; 