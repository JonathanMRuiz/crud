import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../spinner/Spinner'
import { FaEye,FaTrash,FaPen } from "react-icons/fa";

let ContactList = () => {


  const [query, setQuery] = useState({
    text: ''
  }) 


  const searchContacts = (e) =>{
    setQuery({...query, text: e.target.value});
    const theContacts = state.contacts.filter(contact =>{
      return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setState({
      ...state,
      filteredContacts: theContacts
    })
  }


  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: ''
  })

  useEffect(async () => {
    try {
      setState({ ...state, loading: true })
      let response = await ContactService.getAllContacts();
      console.log(response.data);
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        filteredContacts: response.data
      });
    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      });
    }
  }, []);

  const clickDelete = async (contactId) => {
    try{
      const response = await ContactService.deleteContact(contactId);
      if(response){
        setState({ ...state, loading: true })
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        })
      }

    }
    catch (error){

    }

  }

  let { loading, contacts, errorMessage, filteredContacts } = state;

  return (
    <>
      <section className="contact-search p-2">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Lista de Contactos
                  <Link to={'/contacts/add'} className="btn btn-primary ms-2">Nuevo <i className="fa fa-plus me-2" /> </Link>
                </p>
                <p className="fst-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Buscar contacto" name="text" value={query.text} onChange = {searchContacts}/>
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-2">
                      <input type="submit" className="btn btn-outline-primary" value="Buscar" />
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

      </section>
      {
        loading ? <Spinner /> :
          <>
            <section className="contact-list">
              <div className="container">
                <div className="row">
                  {
                    filteredContacts.length > 0 &&
                    filteredContacts.map(contact => {
                      return (
                        <div className="col-md-6" key={contact.id}>
                          <div className="card my-2">
                            <div className="card-body">
                              <div className="row align-items-center d-flex justify-content-around">
                                <div className="col-md-4">
                                  <img src={contact.photo} alt="" className="contact-img" />
                                </div>
                                <div className="col-md-7">
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
                                    
                                  </ul>
                                </div>
                                <div className="col-md-1 d-flex flex-column align-items-center ">
                                  <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1"><i> <FaEye/></i></Link>
                                  <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1"><i><FaPen/></i></Link>
                                  <button className="btn btn-danger my-1" onClick={()=>clickDelete(contact.id)}><i><FaTrash/></i></button>


                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }

                </div>
              </div>
            </section>
          </>
      }

    </>

  )
}

export default ContactList