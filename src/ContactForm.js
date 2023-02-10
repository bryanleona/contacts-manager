import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const ContactForm = () => {
  const [selectedDate, setSelectedDate] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  
  const [familyMembers, setFamilyMembers] = useState([{ name: "", dateOfBirth: "", relationshipStatus: "" }]);
  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: "", dateOfBirth: "", relationshipStatus: "" }]);
  };

  const onSubmit = (data) => {
    const phoneNumbers = data.phoneNumbers.split(',').map(number => number.trim());
    const familyMembersData = familyMembers.map((member, index) => ({
      name: data.familyMembers[index].name,
      dateOfBirth: data.familyMembers[index].dateOfBirth,
      relationshipStatus: data.familyMembers[index].relationshipStatus,
    }));
    console.log({...data, phoneNumbers, familyMembers: familyMembersData });
    dispatch({
      type: 'ADD_CONTACT',
      payload: { ...data, phoneNumbers, familyMembers: familyMembersData },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mt-3">Contact Information</h4>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl name="name" placeholder="Enter Your Name" 
        {...register("name", {
          validate: value => {
            if (!value || value === "") return "Name is required";
            if (!/^[a-zA-Z\s]+$/.test(value)) return "Name can only contain letters";
          }
        })}
        />
        {errors.name && <div className="text-danger">{errors.name.message}</div>}
      </FormGroup>
      <FormGroup>
        <FormLabel>E-KTP Number</FormLabel>
        <FormControl name="eKTPNumber" placeholder="Enter Your E-KTP Number"
        {...register("eKTPNumber", {
          validate: value => {
            if (!value || value === "") return "E-KTP number is required";
            if (!/^\d+$/.test(value)) return "E-KTP number can only contain numbers";
          }
        })}
        />
        {errors.eKTPNumber && <div className="text-danger">{errors.eKTPNumber.message}</div>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Address</FormLabel>
        <FormControl name="address" placeholder="Enter Your Address" as="textarea" rows={3}
        {...register("address", {
          validate: value => {
            if (!value || value === "") return "Address is required";
          }
        })}
        />
        {errors.address && <div className="text-danger">{errors.address.message}</div>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Job</FormLabel>
        <FormControl name="job" placeholder="Enter Your Job"
        {...register("job", {
          validate: value => {
            if (!value || value === "") return "Job is required";
            if (!/^[a-zA-Z\s]+$/.test(value)) return "Job can only contain letters";
          }
        })}
        />
        {errors.job && <div className="text-danger">{errors.job.message}</div>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Date Of Birth</FormLabel>
        <FormControl type="date" name="dateOfBirth" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} 
        {...register("dateOfBirth", {
          validate: value => {
            if (!value || value === "") return "Date of Birth is required";
          }
        })}
        />
        {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth.message}</div>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Phone Numbers</FormLabel>
        <FormControl name="phoneNumbers" placeholder="Enter Your Phone Numbers (Example: 085159662842, 089638408251)"
        {...register("phoneNumbers", {
          validate: value => {
            if (!value || value === "") return "Phone numbers is required";
          }
        })}
        />
        {errors.phoneNumbers && <div className="text-danger">{errors.phoneNumbers.message}</div>}
      </FormGroup>
      <h4 className="mt-3">Family Member Information</h4>
      {familyMembers.map((member, index) => (
        <div key={index}>
          <FormGroup>
            <FormLabel>Family Member Name {index + 1}</FormLabel>
            <FormControl placeholder="Enter Family Member Name"
            {...register(`familyMembers[${index}].name`,{
              validate: value => {
                if (!value || value === "") return "Family member name is required";
                if (!/^[a-zA-Z\s]+$/.test(value)) return "Family member name can only contain letters";
              }
            })}
            />
            {errors.familyMembers && errors.familyMembers[index] && errors.familyMembers[index].name && <div className="text-danger">{String(errors.familyMembers[index].name.message)}</div>}
          </FormGroup>
          <FormGroup>
            <FormLabel>Family Member Date of Birth {index + 1}</FormLabel>
            <FormControl type="date" name={`familyMembers[${index}].dateOfBirth`}
            onChange={(e) =>{
              const newFamilyMembers = [...familyMembers];
              newFamilyMembers[index].dateOfBirth = e.target.value;
              setFamilyMembers(newFamilyMembers);
            }}
            {...register(`familyMembers[${index}].dateOfBirth`,{
              validate: value => {
                if (!value || value === "") return "Family Date of Birth is required";
              }
            })}
            />
            {errors.familyMembers && errors.familyMembers[index] && errors.familyMembers[index].dateOfBirth && (
              <div className="text-danger">{String(errors.familyMembers[index].dateOfBirth.message)}</div>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>Family Member Relationship Status {index + 1}</FormLabel>
            <FormControl as="select" name={`familyMembers[${index}].relationshipStatus`}
            {...register(`familyMembers[${index}].relationshipStatus`, {
              validate: value => {
                if (!value || value === "") return "Family member relationship status is required";
              }})}>
              <option value="">Choose...</option>
              <option value="brother">Brother</option>
              <option value="sister">Sister</option>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
            </FormControl>
            {errors.familyMembers && errors.familyMembers[index] && errors.familyMembers[index].relationshipStatus && <div className="text-danger">{String(errors.familyMembers[index].relationshipStatus.message)}</div>}
          </FormGroup>
        </div>
      ))}
      <center className="m-3">
        <Button type="button" onClick={addFamilyMember}>Add Family Member</Button>
      </center>
      <center className="m-3">
        <Button type="submit">Submit</Button>
        {" "}
        <Link to="/">
          <Button>Contact List</Button>
        </Link>
      </center>
    </Form>
  );
};

export default ContactForm;
      
