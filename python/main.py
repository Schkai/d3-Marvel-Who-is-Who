#!/usr/bin/python3
# -*- coding: utf-8 -*-

from marvelpy import Marvel
import json, pprint

PRIV_KEY = "2bc84665e9b2df0787d56fb4cf274d9c4645bd1f"
PUBLIC_KEY = "979b099b043e4964b948d981ac2264b0"
url = 'http://gateway.marvel.com:80/v1/public/events'
url2 = 'http://gateway.marvel.com/v1/public/events/329/characters'
LIMIT = 100

def computeMD5hash(string):
    m = hashlib.md5()
    m.update(string.encode('utf-8'))
    return m.hexdigest()

def parseJsonData(json_string):
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(json_string)

if __name__ == "__main__":

    marvel = Marvel(api_key=PUBLIC_KEY, private_key=PRIV_KEY)
    # get characters
    response = marvel.characters()
    # response is a Response object which contains a server's response to an HTTP request
    parseJsonData(response.text)
    #print(response.text) # Content of the response, in unicode.
    #print(response.status_code) # status code
    #print(response.headers['etag']) # etag
    # response.json() # Returns the json-encoded content of a response, if any.

    #getEventList()
