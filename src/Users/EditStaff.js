import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

{/*these are Comments*/}

function EditStaff() {
    {/*
      The code takes a the user inputs and construction a staff object and then passes it to axios for putMapping.
      The putMapping(backend) component takes the user made staff object and sets the attributes to the target staff
  */}  

  let navigate = useNavigate(); 

  const {id} = useParams(); 

  {/*make object*/}
  const [user, setUsers] = useState({
    name:"",
    jobTitle:"",
    annualSalary:""
  }); 

  const{name, jobTitle, annualSalary} = user;

  {/*for each object, get each value*/}  
  const onInputChange = (e) =>{
    setUsers({...user, [e.target.name]:e.target.value});
  }; 

  {/*load effect onto the page*/}
  useEffect( () => {
    loadStaff()
  }, []); 

  {/*when submit is clicked, trigger axios put method  */}
  const onSubmit= async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8082/employee/${id}`, user);                      {/*PutMapping for adding 1 staff*/}
    navigate('/'); 
  }; 

  {/*load the current id enough via axios getMapping*/}
  const loadStaff = async ()=>{
  const result = await axios.get(`http://localhost:8082/employee/${id}`);               {/*getMapping for getting 1 staff*/}
    setUsers(result.data); 
  };


  return (
    
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edit Staff</h2>

          <form onSubmit={(e) => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor="Name" className='form-label'>
              Name
            </label>
            <input
            type={"text"}
            className='form-control'
            placeholder='Enter name'
            name='name'
            value={name}
            onChange={(e)=> onInputChange(e)}>
            </input>
          </div>

          <div className='mb-3'>
            <label htmlFor="jobTitle" className='form-label'>
              Job Title
            </label>
            <input
            type={"text"}
            className='form-control'
            placeholder='Enter Job Title'
            name='jobTitle'
            value={jobTitle}
            onChange={(e)=> onInputChange(e)}>
            </input>
          </div>

          <div className='mb-3'>
            <label htmlFor="annualSalary" className='form-label'>
              Annual Salary
            </label>
            <input
            type={"text"}
            className='form-control'
            placeholder='Enter Annual Salary'
            name='annualSalary'
            value={annualSalary}
            onChange={(e)=> onInputChange(e)}>
            </input>
          </div>

          <button type='submit' className='bnt btn-outline-primary'>
            Submit 
          </button>

          <Link className='bnt btn-outline-danger mx-2' to='/'>
            Cancel 
          </Link>
          </form>

        </div>
      </div>
    </div>



  )
}

export default EditStaff; 