import React, {useState} from 'react';
import Search from './Search';
import Displaystocks from './DisplayStocks';
import axios from 'axios'
import { Segment,Header,Grid, Button, Table} from 'semantic-ui-react';
const StockApp = ()=>{
    const [stocks, setStocks] = useState([]);
    const [stockTable, setStockTable] = useState({});
    const [loading, setLoading] = useState(false);

    const handleCalculate = (e)=>{
        e.preventDefault();
        setLoading(true);
        const searchURL = 'https://stock-back-api.herokuapp.com/optimize/' + stocks.join(',') + '?format=json'
        axios
        .get(searchURL)
        .then(response=>{
            console.log(response);
            setStockTable(response.data);
        })
        .then(response=>{
            setLoading(false);
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
                            <Table.HeaderCell>Log Return % ANNUAL</Table.HeaderCell>
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
                            <Table.Cell>{stockTable.hasOwnProperty('exp_return') && stockTable['exp_return'] * 100}</Table.Cell>
                            <Table.Cell>{stockTable.hasOwnProperty('stdev') && stockTable['stdev']}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>



            </Grid.Row>
            <Grid.Row>
                <Button 
                    onClick = {handleCalculate}
                    disabled = {loading}
                    loading = {loading}

                >
                    Calculate All
                </Button>
            </Grid.Row>
        </Grid>

    return (
        <Segment padded>
            <Header as='h2' textAlign='center'>Discover Your Best.
            </Header>
            <Header as='h1' textAlign='center'>
            Find your optimal stock portfolio based on modern portfolio theory.
            </Header>
            <Header as='h3' textAlign='center'>
                Enter stock combinations and find out what percentage of your portfolio a particular stock should take.
            </Header>

           <div> 
               {display}
           </div>
            
        </Segment>
        
    )
}

export default StockApp;