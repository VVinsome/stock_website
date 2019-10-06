import React, {useState} from 'react';
import Search from './Search';
import Displaystocks from './DisplayStocks';
import axios from 'axios'
import {Grid, Button, Table} from 'semantic-ui-react';
const StockApp = ()=>{
    const [stocks, setStocks] = useState([]);
    const [stockTable, setStockTable] = useState({});


    const handleCalculate = (e)=>{
        e.preventDefault();
        const searchURL = 'https://stock-back-api.herokuapp.com/optimize/' + stocks.join(',') + '?format=json'
        axios
        .get(searchURL)
        .then(response=>{
            console.log(response);
            setStockTable(response.data);
        });

    }
    
    const display =  
          <Grid divided='vertically'>
            <Grid.Row>
                <Search
                    stocks={stocks}
                    setStocks={setStocks}
                />
            </Grid.Row>
            <Grid.Row>
                <Table unstackable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Symbol</Table.HeaderCell>
                            <Table.HeaderCell>Return</Table.HeaderCell>
                            <Table.HeaderCell>StDev</Table.HeaderCell>
                            <Table.HeaderCell>Optimal Asset %</Table.HeaderCell>
                            <Table.HeaderCell>Close</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Displaystocks
                            stockTable = {stockTable}
                            stocks={stocks}
                            setStocks={setStocks}
                        />
                        <Table.Row>
                            <Table.Cell>Total Results </Table.Cell>
                            <Table.Cell>{stockTable.hasOwnProperty('exp_return') && stockTable['exp_return']}</Table.Cell>
                            <Table.Cell>{stockTable.hasOwnProperty('stdev') && stockTable['stdev']}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>



            </Grid.Row>
            <Grid.Row>
                <Button onClick = {handleCalculate}>
                    Calculate All
                </Button>
            </Grid.Row>
        </Grid>

    return (
        <div>
            <h1>Discover Your Best.
                Find your optimal stock portfolio based on modern portfolio theory.
            </h1>

           <div> 
               {display}
           </div>
            
        </div>
        
    )
}

export default StockApp;