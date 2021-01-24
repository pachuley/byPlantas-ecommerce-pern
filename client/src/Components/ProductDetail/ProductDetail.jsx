import React from 'react';


const ProductDetail = (detail) =>{

// const { nameProduct, descriptionProduct, priceProduct, urlProduct, stockProduct, _id} = props;
console.log(detail)
    return(


<div className="card mb-3">
<img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png" className="card-img-top" />
<div className="card-body">
  {/* <h5 className="card-title"> {nameProduct} </h5>
  <p className="card-text">{descriptionProduct}</p> */}

  <button type="button" className="btn btn-outline-success">Add</button>
  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
</div>
</div>
        

    )
}


export default ProductDetail;

 {/* <div className={`${style.boxes}`}>
            <img className={`${style.img}`} src={urlProduct}/>
            <ul>{nameProduct}</ul>
            <ul>{descriptionProduct}</ul>
            <ul>ARS {priceProduct}</ul>
            <ul>{stockProduct}</ul>
            <button onClick={()=>alert("Not so fast!")}>Add to Cart</button>
        </div> */}