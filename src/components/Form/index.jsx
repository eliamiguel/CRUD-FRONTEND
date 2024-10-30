import axios from "axios";
import P from "prop-types";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {FormContainer, InputArea, Label, Input, Button} from "./styles.js";


const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.numero.value = onEdit.numero;
      user.datadenasci.value = onEdit.datadenasci;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.numero.value ||
      !user.datadenasci.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:6002/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          numero: user.numero.value,
          datadenasci: user.datadenasci.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:6002/", {
          nome: user.nome.value,
          email: user.email.value,
          numero: user.numero.value,
          datadenasci: user.datadenasci.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.numero.value = "";
    user.datadenasci.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="numero" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="datadenasci" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

Form.propTypes = {
  getUsers: P.func.isRequired,
  onEdit: P.node.isRequired,
  setOnEdit: P.node.isRequired
}

export default Form;