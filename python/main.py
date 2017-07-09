# Adapted from: https://github.com/ddominguez/marvelpy
# Some changes have been made

from marvelpy import Marvel
import json
import re
import operator

PRIV_KEY = str("b5bc65e1c457d3a93983432e6f5b17cc156c01c0")
PUBLIC_KEY = str("892a83a89b7835c3a3798bcec5e472b0")
LIMIT = 100

heroes = []

marvel = Marvel(api_key=PUBLIC_KEY, private_key=PRIV_KEY)

request_responses = []
event_call = []

# get characters
i = 0
while i < 4000:
    params_character = {'offset': i, 'limit': LIMIT}
    params_event = {'limit': LIMIT}
    request_responses.append(marvel.characters(params=params_character))
    event_call.append(marvel.events(params=params_event))
    i += 100
# response is a Response object which contains a server's response to an HTTP request
#print(response.text) # Content of the response, in unicode.
#print(response.status_code) # status code
#print(response.headers['etag']) # etag
# response.json() Returns the json-encoded content of a response, if any.


def getNameAndDetails(chars):
    for i in range(0, len(chars.get("data").get("results"))):
        name = chars.get("data").get("results")[i]['name']
        details = chars.get("data").get("results")[i]['description']
        thumbnail = chars.get("data").get("results")[i]['thumbnail']['path'] + "." + chars.get("data").get("results")[i]['thumbnail']['extension']
        heroes.append({"name": name, "details": details, "thumbnail": thumbnail, "years": [], "meets": []})
    return heroes

def getYears(chars):
    for i in range(0, len(chars.get("data").get("results"))):
        for j in range(0, len(chars.get("data").get("results")[i]["comics"]["items"])):
            year = re.findall(r'\d{4}', chars.get("data").get("results")[i]["comics"]["items"][j]['name'])
            heroes[i].get('years').append(year[0]) if year else ''
        heroes[i]['years'] = list(set(heroes[i].get('years')))
        heroes[i]['years'] = sorted(heroes[i]['years'])
    return heroes

def getMeets(heroes, events):
    for hero in heroes:
        for event in events:
            for i in range(0, len(event.get('characters').get('items'))):
                if hero['name'] == event.get('characters').get('items')[i]['name']:
                    for j in range(0, len(event.get('characters').get('items'))):
                        other_character = event.get('characters').get('items')[j]['name']
                        if other_character != hero['name']:
                            hero.get('meets').append(other_character)
    return heroes

def writeToJsonFile(heroes):
    with open('../data/heroes_by_python.json', 'w') as outfile:
        json.dump(heroes, outfile)


if request_responses[0].status_code == 200:
    for i in range(0, len(request_responses)):
        chars = json.loads(request_responses[i].text)
        events = json.loads(event_call[i].text)
        heroes = getNameAndDetails(chars)
        heroes = getYears(chars)
        heroes = getMeets(heroes, events.get("data").get("results"))
    writeToJsonFile(heroes)
else:
    print("ERROR AT LOADING CHARACTERS!")


'''
# get characters with filters
params = {'name': 'Cable'}
response = marvel.characters(params=params)
#print(response.text)

# Get character by id
response = marvel.characters(id=1009214)
#print(response.text)

# Get all comics containing specific character
response = marvel.characters(id=1009214, list_type='comics')
#print(response.text)

# Get all comics containing specific character with filters
params = {'format': 'trade paperback'}
response = marvel.characters(id=1009214, list_type='comics', params=params)
#print(response.text)

# get comics
response = marvel.comics()
#print(response.text)

# get creators
response = marvel.creators()
#print(response.text)

# get events
response = marvel.events()
print(response.text)

# get series
response = marvel.series()
#print(response.text)

# get stories
response = marvel.stories()
#print(response.text)

# make a request with etags
response = marvel.characters()
#print(response.text)
#print(response.status_code) # 200
etag = response.headers['etag']

response = marvel.characters(etag=etag)
# if data has not changed, status code will be 304 with empty content
# if data has changed, status code will be 200 with updated content
#print(response.text)
#print(response.status_code)

# get data using marvel api resource uri
# will also accept params and etag arguments
# > response = marvel.get(uri='RESOURCE_URI', params=DICT_OF_FILTERS, etag=ETAG_STRING)
response = marvel.get('http://gateway.marvel.com/v1/public/comics/39770')
#print(response.text)

# get thumbail and image urls
# > marvel.image(IMAGE_OBJECT, IMAGE_TYPE, IMAGE_SIZE)
# types: portrait, standard, landscape, full
# portrait|standard|landscape sizes: small, medium, large, xlarge, fantastic, uncanny, incredible, amazing
# full sizes: detail, full
# see more sizes at http://developer.marvel.com/documentation/images
response = marvel.characters(id=1009214)
result = response.json()['data']['results'][0]
thumbnail = marvel.image(result['thumbnail'], 'standard', 'medium')
fullimage = marvel.image(result['thumbnail'], 'full', 'full')
#print(thumbnail)
# {'url': u'http://i.annihil.us/u/prod/marvel/i/mg/3/90/526165df2b584/standard_medium.jpg', 'width': 100, 'height': 100}
#print(fullimage)
# {'url': u'http://i.annihil.us/u/prod/marvel/i/mg/3/90/526165df2b584.jpg'}
# NOTE: full images do not return width or height
'''
