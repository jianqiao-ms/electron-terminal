#! /usr/bin/env python3
# -* coding: utf-8 -*
import json
import logging

import asyncssh

MESSAGE_TYPE_ENUM = [
    'conn',
    'stdin',
    'stdout',
    'stderr',
    'resize'
]

class Message():
    def __init__(self, smsg):
        msg = json.loads(smsg)
        if msg['type'] not in MESSAGE_TYPE_ENUM:
            raise Exception('Not supported message')
        self.type = msg['type']
        self.data = msg['data']

class SSHTerm():
    def __init__(self, socket):
        self.process = None
        self.socket = socket

    async def connect(self, host=None, port=None, username=None, password=None, pubkey=None):
        conn = await asyncssh.connect(
            host=host, 
            port=port, 
            username=username, 
            password=password, 
            known_hosts = None
        )
        self.process = await conn.create_process(term_type='xterm-color')
        self.process.data_received = self.send_stream
        self.process.eof_received = self.socket.close

    def write(self, s:str):
       self.process.stdin.write(s)
       
    def send_stream(self, data, event):
        try:
            self.socket.write_message(json.dumps({
                'type':'stdout',
                'data' : data
            }))
        except:
            import traceback
            traceback.print_exc()
    def status(self):
        pass

    def start_read(self):
        pass

    def start_write(self):
        pass
