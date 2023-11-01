import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Test = () => {
//test
useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.emit('test_message', 'Hello, Server!');

    socket.on('response_message', (data) => {
        console.log(data); 
    });

    return () => {
        socket.off('response_message');
        socket.disconnect();
    };
}, []);


  return (
    <div>
      
    </div>
  )
}

export default Test
