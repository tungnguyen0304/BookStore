import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([{id: 1, name: 'Nguyen Van A', phone: '0939393939'},
  {id: 2, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},
  {id: 3, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 4, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},    
  {id: 5, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 6, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},
  {id: 7, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 8, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},    
  {id: 9, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 10, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},
  {id: 11, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 12, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},    
  {id: 13, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 14, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},
  {id: 15, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 16, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},  
  {id: 17, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 18, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},
  {id: 19, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 20, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},    
  {id: 21, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 22, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},
  {id: 23, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 24, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},  
  {id: 25, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},    
  {id: 26, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 27, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},
  {id: 28, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 29, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},  
  {id: 30, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},    
  {id: 31, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 32, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'},
  {id: 33, name: 'Nguyen Van A', subject: '0939393939',email:'abcd@gmail.com',message:'mess'},
  {id: 34, name: 'Nguyen Van B', subject: '0494848484',email:'abcd@gmail.com',message:'mess'}, ]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await axios.get('/api/contacts');
      setContacts(res.data);
    };

    getContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      <table className='AdminContacts-text'>
        <thead>
          <tr>
            <th className='AdminContacts-table' >Name</th>
            <th className='AdminContacts-table' >Email</th>
            <th className='AdminContacts-table' >Subject</th>
            <th className='AdminContacts-table' >Message</th>
            <th className='AdminContacts-table' >Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className='AdminContacts-info'>{contact.name}</td>
              <td className='AdminContacts-info'>{contact.email}</td>
              <td className='AdminContacts-info'>{contact.subject}</td>
              <td className='AdminContacts-info'>{contact.message}</td>
              <td className='AdminContacts-info'>
                <button className='AdminContacts-btn' onClick={() => handleDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContacts;
