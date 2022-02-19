import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';

const AddContact = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: ''
    },
    errorMessage: ''

  });

  useEffect(() => {

  }, [])

  const updateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value


      }
    })
  }

  const { loading, contact, errorMessage } = state;

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await ContactService.createContact(state.contact);
      if (response) {
        navigate('/contacts/list', { replace: true })
      }
    }
    catch (error) {
      setState({ ...state, errorMssage : error.message});
      navigate('/contacts/add', { replace: false })

    }

  }
  return (
    <>
      <section className="add-contact">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold" >Crear contacto</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" className="form-control" placeholder="Nombre" name="name" value={contact.name} onChange={updateInput} required />
                </div>
                <div className="mb-2">
                  <input type="text" className="form-control" placeholder="Foto URL" name="photo" value={contact.photo} onChange={updateInput} required />
                </div>
                <div className="mb-2">
                  <input type="text" className="form-control" placeholder="Telefono" name="mobile" value={contact.mobile} onChange={updateInput} required />
                </div>
                <div className="mb-2">
                  <input type="email" className="form-control" placeholder="Email" name="email" value={contact.email} onChange={updateInput} required />
                </div>
                <div className="mb-2">
                  <input type="text" className="form-control" placeholder="Titulo" name="title" value={contact.title} onChange={updateInput} />
                </div>
                <div className="mb-2">
                  <input type="text" className="form-control" placeholder="Compania" name="company" value={contact.company} onChange={updateInput} />
                </div>



                <div className="mb-2">
                  <input type="submit" className="btn btn-success" value="Crear" />
                  <Link to={'/contacts/list'} className="btn btn-dark ms-2">Volver</Link>
                </div>


              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddContact