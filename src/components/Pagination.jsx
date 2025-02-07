import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  return (

    <div className="flex items-center justify-between px-4 py-3 sm:px-6">

      
                {/* Previous and next button wil show on small device only */}

      <div className="flex-1 flex justify-between sm:hidden">
               
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md
                   text-gray-700 bg-white hover:bg-gray-50 ">
          Previous
        </button> 

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md
                         text-gray-700 bg-white hover:bg-gray-50" >
          Next
        </button>

      </div>
          {/* showing page will display in minimum medium device only */}

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">

        <div>

          <p className="text-sm">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>

        </div>

        <div>

          <nav className="relative z-0 inline-flex text-black  rounded-md shadow-sm -space-x-px" aria-label="Pagination">

            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm 
                              font-medium  hover:bg-gray-50 disabled:opacity-50 ">
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm 
                               font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 ">
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>

          </nav>

        </div>

      </div>
      
    </div>
  )
}


