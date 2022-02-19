import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../spinner/Spinner';

const ViewContact = () => {


  const { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: '',
  
  });

  useEffect(async () => {
    try {
      setState({ ...state, loading: true });
      const response = await ContactService.getContact(contactId);
      setState({
        ...state,
        loading: false,
        contact: response.data,
        
      })
    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      })
    }
  }, [contactId]);

  let { loading, contact, errorMessage} = state;

  return (
    <>
      <section className="view-contact p-2">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 fw-bold"> View Contact</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
            </div>
          </div>
        </div>
      </section>

      {
        loading ? <Spinner /> : <>
          {
            Object.keys(contact).length > 0 && 
            <section className="view-contact mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img src={contact.photo} alt="" className="contact-img" />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Nombre: <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Telefono: <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email: <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Compania: <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Titulo: <span className="fw-bold">{contact.title}</span>
                      </li>
                     
                    </ul>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link to={"/contacts/list"} className="btn btn-warning">Volver</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }
        </>
      }
    </>
  )
}

export default ViewContact