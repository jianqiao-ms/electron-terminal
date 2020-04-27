import React, { Component } from 'react';
import './terminal.scss';

import { Terminal } from 'xterm'
// import { AttachAddon } from 'xterm-addon-attach';



class SSHTerminal extends Component {
    constructor(props) {
        super(props);
        this.terminalRef = React.createRef();
    }
    
    async componentDidMount() {
        // const protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
        // let socketURL = protocol + window.location.hostname + ((window.location.port) ? (':' + window.location.port) : '') + '/terminal/ssh'
        // const res = await fetch('/terminals?cols=' + term.cols + '&rows=' + term.rows, {method: 'POST'})
        // const processId = await res.text()
        
        // const pid = processId;
        // socketURL += processId;
        let socketURL = "ws://192.168.0.100:8888/terminal/ssh"
        const term = new Terminal({ 
            fontFamily: 'monospace',
            letterSpacing: 1
         });
        const socket = new WebSocket(socketURL);
        // const attachAddon = new AttachAddon(socket);
        

        socket.onopen = () => {
            // term.loadAddon(attachAddon);
            // term._initialized = true;

            socket.send(JSON.stringify(
                    {
                        "type": "conn",
                        "data": {
                            "host": "192.168.0.100",
                            "port": 22,
                            "username": "root",
                            "password": " "
                        }
                    }
                )
            )
            socket.onmessage = (m) => {
                let msg = JSON.parse(m.data)
                if(msg.type==='stdout')
                    term.write(msg.data)
            }
        }

        term.onData((e) => {socket.send(JSON.stringify(
            {
                "type": "stdin",
                "data": e
            }))
        })

        
        
        term.open(this.terminalRef.current)
        // this.term = term?
    }

  render() {
        return (
        <div className="container-fluid" ref={this.terminalRef}></div>
        );
  }
}

export  {SSHTerminal};