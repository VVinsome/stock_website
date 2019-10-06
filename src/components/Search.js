import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { List, Input, Grid, Icon,  Message } from 'semantic-ui-react'
import './Search.css'
const Search = ({stocks, setStocks})=>{
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const stockDisplayLimit = 10;
    const errorState = message? 'error' : '';
    
    useEffect(()=>{
    const url = 'https://cloud.iexapis.com/stable/';
    const token = '?token=pk_52ae86a3ff14418d86666498498aa228';

    const searchURL = url+'/ref-data/iex/symbols'+token;
    axios
        .get(searchURL)
        .then(response=>{
            console.log(response);
            setResults(response.data.map(res=>res.symbol));
        });
    },[]);
    
    const addHelper = (stock) =>{
        const formatS = stock.toUpperCase();
        if (results.includes(formatS) && !stocks.includes(formatS)) {
            setStocks(stocks.concat(formatS));
            setQuery('');
            setSuggestions([]);
            setMessage('')
        }
        else{
            setMessage('Unique or Valid Stock Symbols Only');
        }
    }

    const handleEnter = (e) =>{
        const code = e.keyCode || e.charCode;
        if(code === 13){
            e.preventDefault();
            addHelper(query);
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

    const renderSuggestions = () => {
        return suggestions.map((s) => {
            return(
                <List.Item
                onClick={() => addHelper(s)}

                    key = {s} 
                >
                    
                    <List.Content>
                        <List.Header
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
    const renderErrorMessage = ()=>{
        const errorNotification = message 
            ? (< Message negative>
                <Message.Header>{message}
                </Message.Header>
               </ Message>)
            : '';
        return errorNotification;
    }

    return (
            <Grid centered columns={1} >
                <Grid.Column width ={8}>
                    {renderErrorMessage()}
                    <Input
                        className = 'SearchBar' 
                        className={errorState}
                        icon ={
                            <Icon name='add'  inverted circular link color = 'blue' 
                            onClick ={()=>{addHelper(query)}}
                            />}
                        onChange={handleTextChange}
                        onKeyPress={handleEnter}
                        value={query}
                        type='text'
                        placeholder='Enter Portfolio (ex: GOOG...)'
                        fluid
                        focus
                        size = 'large'
                    />
                    {!(suggestions.length === 0) && renderList()}


                </Grid.Column>

            </Grid>
    )
}

export default Search;