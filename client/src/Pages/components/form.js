import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


function CreateForm() {

        const [formData, setFormData] = useState({
          family_id: '',
          name: '',
          reference: '',
          position: '',
          quantity: '',
          price: '',
          description: '',

        });

        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };

        const handleSubmit = async (e) => {
          e.preventDefault();
          // Do something with the form data, e.g., send it to a server
          console.log(formData);
          try {
            const response = await fetch('http://localhost:5001/api/components', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
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
          <h3 id="title">Adicionar Componente</h3>
          <Form id="formcreate" onSubmit={handleSubmit}>
             <Form.Group controlId="formSelect">
                <Form.Label>Família</Form.Label>
                <Form.Select
                  name="family_id"
                  value={formData.family_id}
                  onChange={handleChange}
                >
                  <option value="">Escolha uma opção...</option>
                  <option value="1">RASPBERRY PI</option>
                  <option value="2">FONTEALIMENTAÇÃO</option>
                  <option value="3">MEMÓRIA</option>
                  <option value="4">CONSUMIVÉIS 3D</option>
                  <option value="5">MICROCOMPUTADOR</option>
                </Form.Select>
              </Form.Group>

            <Form.Group controlyId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="reference">
              <Form.Label>Referência</Form.Label>
              <Form.Control
                type="number"
                placeholder="referencia"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="position">
              <Form.Label>Posição</Form.Label>
              <Form.Control
                type="text"
                placeholder="posição"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                placeholder="quantidade"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="preço"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="descrition">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>


            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </>
        );
      };


export default CreateForm;