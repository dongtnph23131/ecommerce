import React from 'react'

const InputCategory = ({ data, onChangeCategory }) => {
    return (
        <div className="pt-6" id="filter-section-mobile-0">
            <div className="space-y-6">
                {data?.data.map((item) => {
                    return <div key={item._id} className="flex items-center">
                        <input onChange={onChangeCategory} id="filter-mobile-color-0" name="color[]" value={item._id} type="radio" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500">{item.name}</label>
                    </div>
                })}
            </div>
        </div>
    )
}

export default InputCategory