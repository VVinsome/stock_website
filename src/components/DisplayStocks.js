import React, {useState} from 'react';
import {Grid, Button, Icon} from 'semantic-ui-react';

const DisplayStocks = ({stocks,setStocks}) =>{


    const removeStock = (s)=>{
        setStocks(stocks.filter(stock=>{
            return stock !== s;
        }));
    }
    
    return (
        stocks.map((stock,idx)=>{
            return (
               <Grid.Column width ={3} key={idx}>

                    <Button animated='fade'
                        onClick={()=>removeStock(stock)}
                        value={stock}
                        color='blue'

                    >
                        <Button.Content visible > 
                            {stock}
                        </Button.Content>
                        <Button.Content hidden icon='true'>

                            <Icon name='remove' />
                            {stock}
                        </Button.Content>
                    </Button>

                </Grid.Column>
            )

        })

    )

}

export default DisplayStocks;