import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export const EmployeeList = ({ employees, onEdit, onDelete, sortField, sortDirection, onSort }) => {

  const getSortIcon = (field) => {     

    if (sortField !== field) return '↕️'                //sortField default value is "name"
    return sortDirection === 'asc' ? '↑' : '↓'         //sortDirection default value is "asc"

  }

  return (

    <div className="overflow-x-auto">

      <table className="min-w-full rounded-lg overflow-hidden">
          
          {/* Name,Department and salary are the columns of the table is sorted  */}

        <thead className="">

          <tr>

            <th
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('name')} >
              Name {getSortIcon('name')}
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Email
            </th>

            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('department')}>
              Department {getSortIcon('department')}
            </th>

            <th
              className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('salary')} >
              Salary {getSortIcon('salary')}
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Joining Date
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Actions
            </th>

          </tr>

        </thead>

           {/* Listing all employees data from props(api data) */}

        <tbody className="divide-y ">   

          {employees.map((employee) => (

            <tr key={employee.id} className="hover:bg-gray-400 ">

              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {employee.name}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {employee.email}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {employee.department}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm">
                 ₹{employee.salary.toLocaleString()}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {new Date(employee.joiningDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">

                    {/* when the edit button is clicked the form edit employee is showed */}
                <button onClick={() => onEdit(employee)} className="text-blue-600 hover:text-blue-900 " >
                  <Edit2 className="h-5 w-5" />
                </button>  
                    {/* When the delete icon is clicked ,delete the data from the employee list */}
                <button onClick={() => onDelete(employee.id)} className="text-red-900 hover:text-red-">
                  <Trash2 className="h-5 w-5" />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>


  )
}
