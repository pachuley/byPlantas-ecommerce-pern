import React from 'react'

export default function CartLine ({product}){

    const handleDelete = e =>{

    }

    return (
        <div className='card'>
            <div className='card-body px-5'>
                <p className='card-title'>{product.name}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <p className="card-text">Precio: {product.price}</p>
                <button className='btn btn-danger' onClick={handleDelete}>X</button>
            </div>
        </div>
    )
}