import React, { useState }from 'react'
import axios from 'axios'
import Product from './product'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';
  import styles from './formCategory.module.css';
import ProductCard from '../ProductCard/ProductCard';




export default class Catalog extends React.Component{

    constructor(props){
        super(props)
         this.state={
            products: [],
            category: [],
            actualCategory: ''
        }
        
        this.showProducts = this.showProducts.bind(this)
        this.showCategories = this.showCategories.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.change = this.change.bind(this)
        
    }

    componentDidMount(){
        axios.get((`${REACT_APP_BACKEND_URL}/products/category`, category)
            .then(response =>{
                this.setState({
                    products: response.data,
                    category: response.data
                    
                })
                console.log('Loaded')
            })
            .catch(error => {
                console.log(error)
            })
        )}

    getProducts(e){   
        axios.get(`${REACT_APP_BACKEND_URL}/products/category`+ e.target.value)
        .then (response =>{
            this.setState({
                products: response.data,
            })
            console.log(this.state)
            
        })

        .catch(error => {
            console.log(error)
        })

    }
    

    showCategories =() => 
        this.state.category.map(element => 
           <option key = {element.id} value = {element.userId}>{element.userId} </option>
        );
        

    showProducts=()=>
          
        this.state.products.map(element => 
            <ProductCard
                name = {element.title}
                price = {element.id}
                stock = {element.stock}
                image = {element.image}
            />
        )
    
    
    change(){
        this.setState({
            products: [{
                title:'start ',
                body: 'change'
            }]
        })
    }
    
    

    render(){
        const showCategories = this.showCategories()
        const showProducts = this.showProducts()
        return (
            <section >
                <div className='shopSection'><h3>Categorias:</h3>
                <select className='categorySelect' onChange={(e)=>this.getProducts(e)}>{showCategories}</select>
                </div>
                {showProducts}
            </section>
           
        )
    }

}
