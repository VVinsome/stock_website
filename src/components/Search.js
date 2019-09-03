import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { List, Input, Grid, Icon, Button } from 'semantic-ui-react'
import './Search.css'
const Search = ({stocks, setStocks})=>{
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const stockDisplayLimit = 10;
    
    useEffect(()=>{
    
    const url = 'https://cloud.iexapis.com/stable/'
    const token ='?token=pk_52ae86a3ff14418d86666498498aa228';
    const searchURL = url+'/ref-data/iex/symbols'+token;
    axios
        .get(searchURL)
        .then(response=>{
            console.log(response);
            setResults(response.data.map(res=>res.symbol));
        });
    },[]);
    
    const handleAddStock = ()=>{
        if(results.includes(query.toUpperCase()) && !stocks.includes(query)){
            setStocks(stocks.concat(query.toUpperCase()));
            setQuery('');
            setSuggestions([]);
        }
        else{
            setMessage('Nonvalid symbol');
        }

    }

    const handleTextChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setSuggestions([]);
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            setSuggestions(results.filter(v => (regex.test(v) && !stocks.includes(v))).slice(0,stockDisplayLimit));
        }
        
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        // TODO: call server for calculations, get request on stocks
    }
    const selectSuggestion = (stock) =>{
        setQuery(stock);
        setSuggestions([]);
    }
    const renderSuggestions = () => {
        return suggestions.map((s) => {
            return(
                <List.Item
                    key = {s} 
                >
                    
                    <List.Content>
                        <List.Header
                            onClick={() => selectSuggestion(s)}
                        >
                            {s}
                        </List.Header>
                    </List.Content>
                </List.Item>
            )
        

        });
    }
    const renderList = ()=>{
        return (
        <List divided selection verticalAlign='middle' 
        className= 'SearchList'>
            {renderSuggestions()}
        </List>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid centered columns={1} verticalAlign='middle'>
                <Grid.Column width ={8}>
                    <Input
                        focus
                        icon ={<Icon name='add'  inverted circular link  
                        onClick ={handleAddStock}/>}
                        onChange={handleTextChange}
                        value={query}
                        type='text'
                        placeholder='Stock (ex: GOOG...)'
                        fluid
                    />
                    {!(suggestions.length === 0) && renderList()}


                </Grid.Column>
                <Grid.Row>
                    <Button type = 'submit'>Calculate</Button>
                </Grid.Row>
            </Grid>
        </form>
    )
}

export default Search;