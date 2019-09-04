import React, {useState} from 'react';
import {Grid, Button, Icon} from 'semantic-ui-react';

const DisplayStocks = ({stocks,setStocks}) =>{


    const removeStock = (e)=>{
        e.preventDefault();
        setStocks(stocks.filter(stock=>{
            console.log(e.target.key);
            return stock !== e.target.value;
        }));
    }
    
    return (
        stocks.map((stock,idx)=>{
            return (
            <Button
                onClick = {removeStock}
                icon = {<Icon name = 'add'/>}
                key={idx}
                value={stock}
            > 
            {stock}
            </Button>)
        })
    )

}

export default DisplayStocks;