import React, { Component } from 'react';

import {SSHTerminal} from './terminal'
// Terminal.applyAddon(AttachAddon)

class App extends Component {
    

  render() {
        return (
            <SSHTerminal />
        );
  }
}

export default App;