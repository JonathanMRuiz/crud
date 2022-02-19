import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../spinner/Spinner';


const EditContact = () => {
  const navigate = useNavigate()
  const { contactId } = useParams();
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
  })

  useEffect(async () => {
    try {
      setState({ ...state, loading: true })
      const response = await ContactService.getContact(contactId);
      setState({
        ...state,
        loading: false,
        contact: response.data

      })

    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.message
      })
    }
  }, [contactId])

  const { loading, contact, errorMessage } = state;

  const updateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value
      }
    })
  }
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await ContactService.updateContact(state.contact, contactId);
      if (response) {
        navigate('/contacts/list', { replace: true })
      }
    }
    catch (error) {
      setState({ ...state, errorMssage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false })

    }
  }
  return (
    <>
      {
        loading ? <Spinner /> : <>
          <section className="add-contact">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-primary fw-bold" >Editar contacto</p>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Nombre" value={contact.name} name="name" onChange={updateInput} required />
                    </div>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Foto URL" value={contact.photo} name="photo" onChange={updateInput} required />
                    </div>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Telefono" value={contact.mobile} name="mobile" onChange={updateInput} required />
                    </div>
                    <div className="mb-2">
                      <input type="email" className="form-control" placeholder="Email" value={contact.email} name="email" onChange={updateInput} required />
                    </div>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Titulo" value={contact.title} name="title" onChange={updateInput} required />
                    </div>

                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Compania" value={contact.company} name="company" onChange={updateInput} required />
                    </div>

                    

                    <div className="mb-2">
                      <input type="submit" className="btn btn-primary" value="Editar" />
                      <Link to={'/contacts/list'} className="btn btn-dark ms-2">Volver</Link>
                    </div>


                  </form>
                </div>
                <div className="col-md-6">
                  <img src={contact.photo} alt="" className="contact-img" />
                </div>
              </div>
            </div>
          </section>
        </>
      }

    </>
  )
}

export default EditContact