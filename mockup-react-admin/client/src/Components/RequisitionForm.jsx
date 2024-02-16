import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useGlobalState } from '../Components/GlobalStateContext';

function RequisitionForm() {
  const [reqMember, setReqMember] = useState({ nmec: '', name: '', email: '' });
  const { cartItems , selectedWarehouse, setWarehouse, selectFromWarehouse} = useGlobalState();

  const components= selectFromWarehouse(selectedWarehouse);


  const [group, setGroup] = useState({

    number: '',
    professor: '',
    user_nmec: '',
    project_id: 2,
    description: '',
    users: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup({
      ...group,
      [name]: value,
    });
  };

  const handleChangeReqMember = (e) => {
    const { name, value } = e.target;
    setReqMember({
      ...reqMember,
      [name]: value,
    });
  };

  const handleAddMember = () => {
    const newMember = {
      name: '',
      nmec: '',
      email: '',
    };

    setGroup({
      ...group,
      users: [...group.users, newMember],
    });
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...group.users];
    updatedMembers[index][name] = value;

    setGroup({
      ...group,
      users: updatedMembers,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your existing code for form submission
    group.user_nmec= reqMember.nmec;
    const dataToSend={components,
                      warehouse: selectedWarehouse,
                      group: {
                        ...group,
                        users: [...group.users, reqMember],
                      },
                    }


    console.log(dataToSend);
    try {
      const response = await fetch( import.meta.env.VITE_SERVER +'/api/requisitions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Data sent successfully!');
        window.location.href = '/';
        // Reset the form or handle success as needed
      } else {
        console.error('Failed to send data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h3 id="title">Formulário de Requisição</h3>
      <Form id="formcreate" onSubmit={handleSubmit}>
            <Form.Group controlyid="ano">
            <Row>
                <Col>
                  <Form.Label>Grupo</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Grupo N"
                    name="number"
                    value={group.number}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Group Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Grupo N"
                    name="name"
                    value={group.name}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Professor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="professor"
                    name="professor"
                    value={group.professor}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlid="user_nmec">
              <Row>
                <Col>
                  <Form.Label>Nmec Requisitante</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nmec Requisitante"
                    name="nmec"
                    value={reqMember.nmec }
                    onChange={handleChangeReqMember}
                  />
                </Col>
                <Col>
                  <Form.Label>Nome Requisitante</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do Requisitante"
                    name="name"
                    value={reqMember.name}
                    onChange={handleChangeReqMember}
                  />
                </Col>
                <Col>
                  <Form.Label>Email Requisitante</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email do Requisitante"
                    name="email"
                    value={reqMember.email}
                    onChange={handleChangeReqMember}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlyid="descricao">
              < Form.Label>Descrição</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Descrição"
                    name="description"
                    value={group.description}
                    onChange={handleChange}
                  />
            </Form.Group>
            <Form.Group controlId="additionalMembers">
              {group.users.map((member, index) => (
                <Row key={index}>
                  <Form.Label>Membros</Form.Label>

                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Nome"
                      name="name"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, e)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Nmec"
                      name="nmec"
                      value={member.nmec}
                      onChange={(e) => handleMemberChange(index, e)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, e)}
                    />
                  </Col>
                </Row>
              ))}
              <Button variant="primary" type="button" onClick={handleAddMember}>
                Adicionar Membros
              </Button>
            </Form.Group>

        <Button variant="primary" type="submit" id="butSubmit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default RequisitionForm;