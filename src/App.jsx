import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeList } from './components/EmployeeList';
import { SearchBar } from './components/SearchBar';
import { Pagination } from './components/Pagination';

const items_per_page = 5 

export function App() {

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees')   // Getting data from local storage(JSON format) so to change the JS object(JSON.parse())
    return saved ? JSON.parse(saved) : []       
  })
  //console.log(employees)        array of objects data [{},{},{}...]

  const [editingEmployee, setEditingEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [darkMode,setDarkMode] = useState(true)

  useEffect(() => {                 
 
    const fetchEmployees = async () => {
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        
        const transformedEmployees = data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          department: user.company.name,
          salary: Math.floor(Math.random() * 50000) + 50000,  // Random salary between 50000 and 100000
          joiningDate: new Date()                              
        }))                                                   // Api data will be stored as a object format 

        
        setEmployees(transformedEmployees)   // Storing the data in the state 
      
      } catch (error) {
        console.error('Error fetching employees:', error)       // error can check in the dev tool on console tap 
        alert('Error fetching employees:', error)                //display the error msg in ui for clarification    
      }                            
    }

    if (employees.length === 0) {
      fetchEmployees()
    }  
  }, [employees.length])            // when the app is render employees data will be fetched from the API because initial length is 0 

  // console.log(employees.length) 
  // console.log(employees.map((val)=>val.name)) 

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees))   // save employees api data in local storage into JSON format
  }, [employees])    //Whenever the employees state changes, save the data in local storage(new data)

 

  const handleAddEmployee = (newEmployee) => {           

    const employee = {...newEmployee , id: Math.max(0, ...employees.map(e => e.id)) + 1,}  //Math.max(0,11) id:11 to new employee 
    setEmployees([...employees, employee])   // Adding previous employees data and new employee data 

  }       // Adding the new employee to the employees array

  const handleUpdateEmployee = (updatedEmployee) => {
      if (!editingEmployee) return
      const updated = employees.map(emp => emp.id === editingEmployee.id ? { ...updatedEmployee, id: emp.id } : emp)
      setEmployees(updated)
     setEditingEmployee(null)
  }   // Updating the existing employee data to the employee array

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {         //Confirm msg for user experience 
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  }                          //When the delete icon is clicked it will filter same id will be remove and rest will be stored

  const departments = Array.from(new Set(employees.map(emp => emp.department)))   // Unique department will be stored in the array
  

  const filteredEmployees = employees.filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(emp => !selectedDepartment || emp.department === selectedDepartment)
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1
      if (sortField === 'salary') {
        return (a[sortField] - b[sortField]) * modifier
      }
      return a[sortField].localeCompare(b[sortField]) * modifier;
    })     // Filtering the data by employee name ,department and salary
    
  const totalPages = Math.ceil(filteredEmployees.length / items_per_page)   // Math.ceil(10/5) 
   const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * items_per_page,currentPage * items_per_page) //slice(0,5)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }   //It will sort asc or desc based on the field

  return (

    <div className={`min-h-screen  ${darkMode? "bg-white text-black" : "bg-black text-white"}`}>

      <div className="container mx-auto px-4 py-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-xl md:text-3xl font-bold ">Employee Management System</h1>

          <button onClick={()=>setDarkMode((prev)=>!prev)} className="p-2 rounded-lg  hover:bg-gray-300" >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}      
           </button>         {/* when clicking the button , the dark mode is toggled (t to f , f to t) */ }
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">

            <div className="rounded-lg shadow-md p-6">

              <h2 className="text-lg md:text-xl font-semibold mb-4 ">
                 {editingEmployee ? 'Edit Employee' : 'Add New Employee'}     {/* Default editingEmployee value = null(false) */}
              </h2>

              <EmployeeForm onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}  //onSubmit will work depend upon boolen value
                            initialData={editingEmployee || undefined}  isEditing={!!editingEmployee} /> 
                                              {/* sending state(props) to the EmployeeForm component */}
            </div>
            
          </div>

          <div className="lg:col-span-2">

            <div className=" rounded-lg shadow-md p-6">

              <SearchBar  searchTerm={searchTerm} onSearchChange={setSearchTerm} departments={departments} darkMode={darkMode}
                          selectedDepartment={selectedDepartment} onDepartmentChange={setSelectedDepartment}/>
                                               {/* sending state(props) to the SearchBar component */}

              <EmployeeList employees={paginatedEmployees} onEdit={setEditingEmployee} onDelete={handleDeleteEmployee}
                            sortField={sortField} sortDirection={sortDirection}  onSort={handleSort} />
                                               {/* sending state(props) to the EmployeeList component */}    
              <div className="mt-4">

                <Pagination  currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
                                               {/* sending state(props) to the Pagination component */}  
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


