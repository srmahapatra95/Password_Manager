import React from 'react';
import Toast from './Toast';

const ToastsContainer = ({toasts}) =>{
    const items = toasts.map((toast) => {
        return <Toast key={toast.id} {...toast}/>
    })
    return (
        <div className='w-80 fixed top-4 right-4 flex flex-col-reverse z-50 gap-1'>
            {items}
        </div>
    )
}

export default ToastsContainer
