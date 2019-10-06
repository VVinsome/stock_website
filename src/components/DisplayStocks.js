import React, {useEffect} from 'react';
import { Icon, Table} from 'semantic-ui-react';

const DisplayStocks = ({stockTable, stocks,setStocks}) =>{
    const captured = stockTable

    const removeStock = (s)=>{
        setStocks(stocks.filter(stock=>{
            return stock !== s;
        }));
    }
    
    return (
        stocks.map((stock,idx)=>{
            return (
                <Table.Row key = {idx}>
                    <Table.Cell>{stock}</Table.Cell>
                    <Table.Cell>{captured.hasOwnProperty(stock) && captured[stock].single_exp_return * 252}</Table.Cell>
                    <Table.Cell>{captured.hasOwnProperty(stock) && captured[stock].std}</Table.Cell>
                    <Table.Cell>{captured.hasOwnProperty(stock) && captured[stock].weight * 100}</Table.Cell>
                    <Table.Cell textAlign='center' selectable>
                                <Icon 
                                    name='remove'
                                    onClick={() => removeStock(stock)}
                                    value={stock}
                                    color = 'red'
                                />


                    </Table.Cell>
                    
                </Table.Row>


            )

        }

        )
 
    )

}

export default DisplayStocks;