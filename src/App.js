import './App.css';
import {useState, useEffect} from 'react';
import {SocialIcon} from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'


const QuoteMachine = () =>{   
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [quoteBank, setBank] = useState();
  const [color, setColor] = useState("#777");
  const [buttonStyle, setButtonStyle] = useState({backgroundColor: "#777"});
   //Initialize 
 useEffect(()=>{
   console.log(`On Mount`);
   fetch("https://type.fit/api/quotes")
       .then(res=>res.json())
       .then((result)=>{
         setQuote(result[0].text);
         setAuthor(result[0].Author);
         setBank(result);
         document.body.style.background=color;
   })
 },[]);
   //Change colour
 useEffect(()=>{
     setButtonStyle({backgroundColor: `#${color}`});
     document.body.style.background=`#${color}`;
   },[color]);
   
   const changeQuote = () =>{            
     //Randomizes quote and author
     let randomize = Math.floor(Math.random()*quoteBank.slice(1).length)+1;
     setQuote(quoteBank[randomize].text);
     setAuthor(quoteBank[randomize].author);
     //Changing color
     let randomColor = Math.floor(Math.random()*16777215).toString(16);    
     setColor(randomColor);
   }
   return (
     <div>
   <div id="text"><FontAwesomeIcon icon={faQuoteLeft}/> {quote} <FontAwesomeIcon icon={faQuoteRight}/></div>
   <div id="author">-{author}</div>
   <div className="flex-container">    
     <div><SocialIcon url="twitter.com/intent/tweet"><a href="twitter.com/intent/tweet" id="tweet-quote"></a></SocialIcon></div> 
     <div id="new-quote"><button type="button" class="btn btn-primary" onClick={changeQuote} style={buttonStyle}>New Quote</button></div>
        </div>
     </div>
   )
 }

function App() {
  return (
    <div className="App">
      <div class="container">
        <div id="main-content">
          <div id="quote-Box"><QuoteMachine /></div>  
          <div id="creator">-JG</div>
        </div>
    </div>
    </div>
  );
}

export default App;
