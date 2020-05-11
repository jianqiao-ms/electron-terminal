# electron-terminal
Build a tty application using electron

# How we start  

## Archtecture  
First let us go through the archtecture of this project:  
```
electron-terminal
├── api/
├── terminal/
├── view/
└── ...
```

* api/  
  > Restapi server written in python using tornado  
* terminal/  
  > Frontend src code only aimed working properly only in web browser.  
  Written in react-js and  bootstrapped with [Create React App](https://github.com/facebook/create-react-app)  
  Generally test purpose for what will be integrated into electron  
* view/  
  > Actual frontend src code using electron and interactive with server in api/

The releases will only contain api/ and view/ codes.

## How to  
Develop on Windows is not such a easy work. You may encount 

* ENF-OF-LINE problem if code would deployed on linux finnally
* Poor support for tornado or asyncio
* electron on WSL no GUI problems

Anyway, we decided to develop on Windows, strugle to work out. I successefully get a almost perfact development environment on Windows and here is how I did:

* Use WSL
  > This is important for almost all opensource technologies or projects run on Linux much more convinient than baddly traditionnal Windows. For example:  
  >
  > Python: Preinstalled on almost all I acknowlaged GUN Linux distributions. Of couse you can install Python2 or Python3 in WSL with just on command  
  >
  > node.js: Same reason of python ones though node.js is not preinstalled on Linux normally.  
* Install electron on windows
  > Install node.js & npm & yarn & electron on Windows first. This will install prebuild electron binaries for Windows into node_modules/, and when issue 'yarn start' in WSL, the Windows version WSL will start. This method avoid Linux version electron startup failed, it's will failed, certainly.  
  
  This include install node.js, chocolate, npm, yarn, electron at least.
* Install other node.js dependencied in WSL