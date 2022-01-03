import React, { useState } from 'react';
import { useEffect } from 'react';
import generateMessage, { Message } from './Api';
import './index.css'

const App: React.FC<{}> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetching,setFetching] = useState(true)
  const [fetchButton,setFetchButton] = useState("STOP")
  useEffect(() => {
    
    const cleanUp = generateMessage((message: Message) => {
     if(fetching){

       setMessages(oldMessages => [...oldMessages, message]);
     } 
    });
    return cleanUp;
    
  }, [fetching,setMessages]);
  console.log()

  const handleStop = () =>{
    setFetching(fetching => !fetching)
    if (fetchButton === "STOP"){
      setFetchButton("START")
    }else{
      setFetchButton("STOP")
    }

  }
  const handleClear = () =>{
    setMessages([])
  }
  const handleClearMessage = (id:number,priority:number):void=> { 

      setMessages(  messages.filter(message=> messages.filter(msg=>msg.priority===priority).indexOf(message) !== id  ))


    
  }


  

  return (
    <div>
      <div className='header'>
        <h1>Coding Challenge</h1>
        <hr />
      </div>

    <div>
      <div className="buttons-group">
        <button onClick={handleStop}>{fetchButton} </button>
        <button onClick={handleClear}>CLEAR</button>
      </div>
    <div className="container">
      <div className="errors">
        <h1>Error Type 1</h1>
        <h5>Count : {messages?.filter(msg=> msg.priority === 0).length}</h5>
      {messages?.filter((msg)=> msg.priority === 0).map?.((msg,key) => <div key={msg?.message} className="message error">{msg?.message} <button className='clear-button' onClick={() => handleClearMessage(key,msg.priority)}>Clear</button> </div>)}
        
      </div >
      <div className="warnings">
      <h1>Warning Type 2</h1>
        <h5>Count : {messages?.filter(msg=> msg.priority === 1).length}</h5>
      {messages?.filter(msg=> msg.priority === 1).map?.((msg,key) => <div key={msg?.message} className="message warning">{msg?.message} <button className='clear-button' onClick={() => handleClearMessage(key,msg.priority)}>Clear</button> </div>)}

      </div>
      <div className="infos">
      <h1>Info Type 3</h1>
        <h5>Count : {messages?.filter(msg=> msg.priority === 2).length}</h5>
      {messages?.filter(msg=> msg.priority === 2).map?.((msg,key) => <div key={msg?.message} className="message info">{msg?.message} <button className='clear-button' onClick={() => handleClearMessage(key,msg.priority)}>Clear</button>  </div>)}

      </div>
    </div>
    </div>
    </div>

  );
}

export default App;
