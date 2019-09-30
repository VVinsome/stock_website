import React, {useState} from 'react';
import Search from './Search';
import Displaystocks from './DisplayStocks';
import {Grid, Button} from 'semantic-ui-react';
const StockApp = ()=>{
    const [stocks, setStocks] = useState([]);
    const [stockTable, setStockTable] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const display = showTable 
            ? {/* <TableStock/>  */}
        : <Grid divided='vertically'>
            <Grid.Row>
                <Search
                    stocks={stocks}
                    setStocks={setStocks}
                />
            </Grid.Row>
            <Grid.Row>
                <Grid stackable columns={2}>
                    <Displaystocks
                        stocks={stocks}
                        setStocks={setStocks}
                    />
                </Grid>



            </Grid.Row>
            <Grid.Row>
                <Button>Calculate All</Button>
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