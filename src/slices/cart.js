import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const item = state.items.find(item => item._id === action.payload._id)
            if (item) {
                const updateItem = { ...item, quantity: item.quantity + 1 }
                state.items = state.items.map((item) => item._id === action.payload._id ? updateItem : item)
            }
            else {
                state.items.push(action.payload)
            }
        },
        removeItem: (state, action) => {
            const item = state.items.find(item => item._id === action.payload._id)
            if (item.quantity>1) {
                const updateItem = { ...item, quantity: item.quantity - 1 }
                state.items = state.items.map((item) => item._id === action.payload._id ? updateItem : item)
            }
            else {
                state.items=state.items.filter(item=>item._id!==action.payload._id)
            }
        },
        updateItem:(state,action)=>{
            const item = state.items.find(item => item._id === action.payload._id)
            if (item) {
                const updateItem = { ...item, quantity: action.payload.quantity }
                state.items = state.items.map((item) => item._id === action.payload._id ? updateItem : item)
            }
        }
    }
})
export const { addItem,removeItem,updateItem } = cartSlice.actions
export default cartSlice
//Test hihi