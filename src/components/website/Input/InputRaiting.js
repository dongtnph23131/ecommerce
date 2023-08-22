import React from 'react'

const InputRaiting = ({onInputRaitingChange}) => {
  return (
    <div className="space-y-6">
    <div className="flex items-center">
      <input onChange={onInputRaitingChange} id="filter-mobile-color-0" name="raiting" value="1" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500">1 sao +</label>
    </div>
    <div className="flex items-center">
      <input  onChange={onInputRaitingChange} id="filter-mobile-color-1" name="raiting" value="2" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-1" className="ml-3 min-w-0 flex-1 text-gray-500">2 sao +</label>
    </div>
    <div className="flex items-center">
      <input  onChange={onInputRaitingChange} id="filter-mobile-color-2" name="raiting" value="3" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-gray-500">3 sao +</label>
    </div>
    <div className="flex items-center">
      <input  onChange={onInputRaitingChange} id="filter-mobile-color-3" name="raiting" value="4" type="radio"className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-gray-500">4 sao +</label>
    </div>
  </div>
  )
}

export default InputRaiting