import React from 'react'

const UserTableSkeleton = () => {
  return (
    <div><div className="animate-pulse">
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded w-1/2"/>
          </th>
          <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </th>
          <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </th>
          <th className="py-3 px-6 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="py-4 px-6 text-sm font-medium text-gray-800">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </td>
          <td className="py-4 px-6 text-sm font-medium text-gray-800">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
          <td className="py-4 px-6 text-sm text-gray-600">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </td>
          <td className="py-4 px-6 text-center">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div></div>
  )
}

export default UserTableSkeleton