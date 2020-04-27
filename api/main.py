#! /usr/bin/env python3
# -* coding: utf-8 -*

# Official packages

# 3rd-party Packages
import tornado.ioloop
import tornado.web

# Local Packages
# from classes import TermManager
from handlers import SSHSessionHandler

# CONST
# term_manager = TermManager()

# Class & Function Definition
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

# Logic
def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        # (r"/terminal/ssh", SSHHandler, {'term_manager': term_manager}),
        (r"/terminal/ssh", SSHSessionHandler),
    ], debug=True)

if __name__ == "__main__":
    from tornado.options import parse_command_line

    parse_command_line()

    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()