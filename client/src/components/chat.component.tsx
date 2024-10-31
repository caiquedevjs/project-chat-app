import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const Chat = ()=>{
    const [sendMessage, setSendMessage] = useState('');
    const [messages, setMessages]= useState([]);

    const socket = 'http://localhost:3333';

    useEffect(()=>{
        const socketObserved = io(socket);

        socketObserved.on('message', (data)=>{
            setMessages((prevMessages)=> [...prevMessages, data])
        })

        return () => {
            socketObserved.disconnect();
          };
    }, [socket])

    const sendMessages = ()=>{
        const socketMessages = io(socket);
        socketMessages.emit('message', sendMessage);
        setSendMessage('');
    }
    return(
        <div className='chat-conteiner'>
            <div className='menssages-conteiner'>
                <ul>
                {messages.map((msg, index) =>(
                    <li className='list-message' key={index}>{msg}</li>
                ) )}
                </ul>
            </div>
            <input className='input-chat' value={sendMessage} onChange={(Event)=>setSendMessage(Event.target.value)}></input>
            <button className='btn-submit-chat' onClick={sendMessages}>Enviar</button>
        </div>
    )
}
export default Chat;