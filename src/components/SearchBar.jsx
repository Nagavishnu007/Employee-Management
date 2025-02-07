import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchTerm,onSearchChange,departments,selectedDepartment,onDepartmentChange,darkMode}) => {

  return (

    <div className="flex flex-col md:flex-row gap-4 mb-6">

      <div className="relative flex-1">

        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 " />
        </div>

        <input type="text"  placeholder="Search employees name..." value={searchTerm}  onChange={(e) => onSearchChange(e.target.value)}
               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5  placeholder-gray-500 "/>
       </div>    {/*whenever input field is changed the value it will stored in onSearchChange props */}

      <select value={selectedDepartment} onChange={(e) => onDepartmentChange(e.target.value)}
        className={`block w-full md:w-48 px-3 py-2 border bg- border-gray-300 rounded-md leading-5 ${darkMode?"":"bg-black"} `}>
                {/*whenever select field is changed the value it will stored in onDepartmentChange props */}    

        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}     
            {/* Listing all departments values(unique) from departments props */}
             
      </select>

    </div>
  )
}


