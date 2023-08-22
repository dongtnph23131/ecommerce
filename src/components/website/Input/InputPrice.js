import React from 'react'

const InputPrice = ({onInputPriceChange}) => {
  return (
    <div className="space-y-6">
    <div className="flex items-center">
      <input onChange={onInputPriceChange} id="filter-mobile-color-0" name="price" value="0,100" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500">0-100 $</label>
    </div>
    <div className="flex items-center">
      <input onChange={onInputPriceChange} id="filter-mobile-color-1" name="price" value="100,200" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-1" className="ml-3 min-w-0 flex-1 text-gray-500">100-200 $</label>
    </div>
    <div className="flex items-center">
      <input onChange={onInputPriceChange}  id="filter-mobile-color-2" name="price" value="200,300" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-gray-500">200-300 $</label>
    </div>
    <div className="flex items-center">
      <input onChange={onInputPriceChange} id="filter-mobile-color-3" name="price" value="300,400" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-gray-500">300-400 $</label>
    </div>
    <div className="flex items-center">
      <input onChange={onInputPriceChange} id="filter-mobile-color-3" name="price" value="400,500" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-gray-500">400-500 $</label>
    </div>
    <div className="flex items-center">
      <input onChange={onInputPriceChange} id="filter-mobile-color-4" name="price" value="500" type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <label htmlFor="filter-mobile-color-4" className="ml-3 min-w-0 flex-1 text-gray-500">500 $ trở nên</label>
    </div>
  </div>
  )
}

export default InputPrice