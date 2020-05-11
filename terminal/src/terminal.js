import React, { Component } from 'react';
import './terminal.scss';
import './fonts/ptmono/PTMono-Regular.ttf'
import './fonts/spacemono/SpaceMono-Bold.ttf'
import './fonts/roboto/RobotoMono-Regular.ttf'

import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';
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
        const socket = new WebSocket(socketURL);
        let term = new Terminal({ 
            fontFamily: 'ptmono',
            // letterSpacing: -5,
            // letterSpacing: 0
            rendererType:"dom",
            cols: 80,
            rows: 24,
            screenKeys: true,
            useStyle: true
         });
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        // const attachAddon = new AttachAddon(socket);
        

        socket.onopen = () => {
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
                if(msg.type==='stdout') {
                    console.log(msg.data)
                    term.write(msg.data)
                }
            }
        }

        term.onData((e) => {socket.send(JSON.stringify(
            {
                "type": "stdin",
                "data": e
            }))
        })

        term.onResize((e) => {socket.send(JSON.stringify(
            {
                "type": "resize",
                "data": e
            }))
        })

        
        
        term.open(this.terminalRef.current)
        // fitAddon.fit();
        // term.write("Last login: Mon Apr 27 18:17:29 2020 from 192.168.0.1")
        // this.term = term?
    }

  render() {
        return (
            <div className="container-fluid term-roboto-font">
                Last login: Mon Apr 27 18:17:29 2020 from 192.168.0.1
                <div ref={this.terminalRef}></div>
            </div>
        );
  }
}

export  {SSHTerminal};