import React, { useState } from 'react';

export const EmployeeForm = ({ onSubmit, initialData, isEditing }) => {  

  const [formData, setFormData] = useState({       //initialData will be empty default when the input field changes it will store the data in formData
    name: initialData?.name || '',                            
    email: initialData?.email || '',
    department: initialData?.department || '',
    salary: initialData?.salary || '',
    joiningDate: initialData?.joiningDate || new Date().toISOString().split('T')[0]  //2025-02-07
  })
  //console.log( new Date().toISOString().split('T')[0] )
  const [errors, setErrors] = useState({})

  const validateForm = () => {
                                             
    const newErrors = {}                        //IF any field is empty it will throw an error 
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.department) newErrors.department = 'Department is required'
    if (!formData.salary) newErrors.salary = 'Salary is required'
    if (!formData.email) newErrors.email = 'Invalid email format'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0     //If no error occurs it will directly return the function

  }                           

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        salary: Number(formData.salary),
        joiningDate: formData.joiningDate
      });
      if (!isEditing) {
        setFormData({
          name: '',
          email: '',
          department: '',
          salary: '',
          joiningDate: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  return (

    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-lg shadow-2xl">

       <div>   {/*In form input field are controlled input managed by formData state */}

        <label className="block text-sm font-medium ">Name</label>
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`mt-1 block w-full rounded-md  border-2 border-gray-500 shadow  ${errors.name ? 'border-red-500' : ''}`} />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        
      </div>
      
      <div>

        <label className="block text-sm font-medium ">Email</label>
        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`mt-1 block w-full rounded-md border-2 border-gray-500 shadow-sm  ${errors.email ? 'border-red-500' : ''}`}/>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

      </div>
      
      <div>

        <label className="block text-sm font-medium ">Department</label>
        <input  type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}
               className={`mt-1 block w-full rounded-md border-2 border-gray-500 shadow-sm  ${errors.department ? 'border-red-500' : ''}`}/>
        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}

      </div>
      
      <div>

        <label className="block text-sm font-medium">Salary</label>
        <input type="number" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
               className={`mt-1 block w-full rounded-md border-2 border-gray-500 shadow-sm  ${errors.salary ? 'border-red-500' : ''}`}/>
        {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}

      </div>
      
      <div>

        <label className="block text-sm font-medium ">Joining Date</label>
        <input type="date" value={formData.joiningDate} onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-2 border-gray-500 shadow-sm"/>

      </div>
      
      <button  type="submit"  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {isEditing ? 'Update Employee' : 'Add Employee'}
      </button>

    </form>  // When the form data is submitted , it will stored in local storage and then it will be displayed in the table(employee array)
  )
}
