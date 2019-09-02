import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react'
const Search = ({stocks, setStocks})=>{
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    
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
    // TODO: need to check if valid
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(stocks.includes(query)){
            setStocks(stocks.concat(query));
            setQuery('');
        }
        else{
            setMessage('Nonvalid symbol');
        }

    }

    const handleTextChange = (e) => {
        const value = e.target.value;
        let count = 0;
        setQuery(value);
        setSuggestions([]);
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            // TODO: make not magic number for slice
            setSuggestions(results.filter(v => regex.test(v)).slice(0,10));
        }
        
    }
    const selectSuggestion = (s) =>{
        setQuery(s);
        setSuggestions([]);
    }
    const renderSuggestions = () => {
        return suggestions.map((s) => {
            return(
                <List.Item>
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

    return (
        <form onSubmit = {handleSubmit}>
            <input
                onChange = {handleTextChange}
                value = {query}
                type = 'text'
                placeholder = 'ex: GOOG,AAPL...'
            />
            <button type = "submit">add stocks</button>
            <List selection verticalAlign='middle'>
                {renderSuggestions()}
            </List>
        </form>
    )
}

export default Search;