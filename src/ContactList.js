import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-KTP Number</th>
            <th>Address</th>
            <th>Job</th>
            <th>Date of Birth</th>
            <th>Phone Numbers</th>
            <th>Family Members Name</th>
            <th>Family Members Date of Birth</th>
            <th>Family Members Relationship Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.name}>
              <td>{contact.name}</td>
              <td>{contact.eKTPNumber}</td>
              <td>{contact.address}</td>
              <td>{contact.job}</td>
              <td>{contact.dateOfBirth}</td>
              <td>{contact.phoneNumbers.length > 1 ? contact.phoneNumbers.join(', ') : contact.phoneNumbers}</td>
              <td>{contact.familyMembers.length > 0 ? contact.familyMembers.map(member => member.name).join(', ') : "-"}</td>
              <td>{contact.familyMembers.length > 0 ? contact.familyMembers.map(member => member.dateOfBirth).join(', ') : "-"}</td>
              <td>{contact.familyMembers.length > 0 ? contact.familyMembers.map(member => member.relationshipStatus).join(', ') : "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <center>
        <Link to="/form">
          <Button className="m-2">Add Contact</Button>
        </Link>
      </center>
    </div>
  );
};  
export default ContactList;