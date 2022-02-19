import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ContactList from './components/contacts/contactList/contactList'
import Navbar from './components/navbar/Navbar'
import AddContact from './components/contacts/addContact/addContact'
import ViewContact from './components/contacts/viewContact/viewContact'
import EditContact from './components/contacts/editContact/editContact'

const App = () => {
  return (
    <>
      <Navbar />
      
      <Routes>

        <Route path={'/'} element={<Navigate to ={'/contacts/list'}/>}/>
        <Route path={'/contacts/list'} element={<ContactList/>} />
        <Route path={'/contacts/add'} element={<AddContact/>} />
        <Route path={'/contacts/view/:contactId'} element={<ViewContact/>} />
        <Route path={'/contacts/edit/:contactId'} element={<EditContact/>} />


      </Routes>

    </>
  )
}

export default App