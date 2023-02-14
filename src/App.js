
import { useEffect,useState } from 'react';
import './App.css';
import Coin from './Componets/Coin';


function App() {

  const [coins,setCoins] =useState([])
  const[search,setSearch] = useState('')
  const updateCoin= async ()=>{
    const url = " https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const data = await  fetch(url);
    const response = await  data.json();
    
     setCoins(response)
     console.log(coins)
  }
   useEffect(() => {
     updateCoin()
    
     
   }, [])
  
   const handleChange=(e)=>{
    setSearch(e.target.value)
   }
   const filteredCoins = coins.filter((coin)=>{
     return coin.name.toLowerCase().includes(search.toLowerCase())
   })
   

  


  return (
    <>
    <div className="coin-app">
       <div className="coin-search">
        <h1>Search a currency</h1>
        <form action="">
          <input value={search} type="text" className="coin-input" placeholder='Search' onChange={handleChange} />
        </form>
       </div >
       {filteredCoins.map((coin)=>{
        return (
          <Coin  key={coin.id}
           name={coin.name} 
           image={coin.image}
           symbol={coin.symbol}
           volume={coin.market_cap}
           price = {coin.current_price}
           priceChange={coin.price_change_percentage_24h}
           marketcap={coin.total_volume}
           />
        )
       })}

    </div>
    
  
    </>
  );
}

export default App;
