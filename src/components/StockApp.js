import React, {useState} from 'react';
import Search from './Search'
const StockApp = ()=>{
    const [stocks, setStocks] = useState([]);
    const [stockTable, setStockTable] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const display = showTable 
            ? {/* <TableStock/>  */}
            : <Search
                stocks = {stocks}
                setStocks = {setStocks}
               />;
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