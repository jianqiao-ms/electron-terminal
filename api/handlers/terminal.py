#! /usr/bin/env python3
# -* coding: utf-8 -*
import json
import traceback

import tornado.websocket 

from classes import Message
from classes import SSHTerm

EXAMPLE_SSH_HOST = dict(
    host = "192.168.0.1",
    port = 22,
    username = "root",
    password = " "
)


class SSHSessionHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        self.term = SSHTerm(self)
        
    async def on_message(self, msg):
        message = Message(msg)

        if message.type == 'stdin':
            self.term.write(message.data)
        if message.type == 'conn':
            await self.term.connect(**message.data)
       