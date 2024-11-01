import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
    const [sendMessage, setSendMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = 'http://localhost:3333';

    useEffect(()=>{
        const socketObserved = io(socket);

        socketObserved.on('message', (data)=>{
            setMessages((prevMessages)=> [...prevMessages, data])
        })

       
    }, [socket])

    const sendMessages = () => {
        const socketMessages = io(socket);
        socketMessages.emit('message', { content: sendMessage });
        setSendMessage('');
    };

    console.log('Mensagens atuais:', messages); // Log para ver o estado atual

    return (
        <div className='chat-container'>
            <div className='messages-container'>
                <ul>
                    {messages.map((msg, index) => (
                        <li className='list-message' key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
            <input
                className='input-chat'
                value={sendMessage}
                onChange={(event) => setSendMessage(event.target.value)}
            />
            <button className='btn-submit-chat' onClick={sendMessages}>Enviar</button>
        </div>
    );
};

export default Chat;
