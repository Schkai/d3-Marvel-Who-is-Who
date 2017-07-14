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
while i <= 1500:
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
        heroes.append({"name": name, "details": details, "thumbnail": thumbnail, "year_puffer": [], "meets": [], "rank": 0})
    return heroes

def getYears(chars):
    for i in range(0, len(chars.get("data").get("results"))):
        for j in range(0, len(chars.get("data").get("results")[i]["comics"]["items"])):
            year = re.findall(r'\d{4}', chars.get("data").get("results")[i]["comics"]["items"][j]['name'])
            heroes[i].get('year_puffer').append(year[0]) if year else ''
        heroes[i]['year_puffer'] = list(set(heroes[i].get('year_puffer')))
        heroes[i]['year_puffer'] = sorted(heroes[i]['year_puffer'])
    return heroes

def getMeets(heroes, events):
    for hero in heroes:
        for event in events:
            for i in range(0, len(event.get('characters').get('items'))):
                if hero['name'] == event.get('characters').get('items')[i]['name']:
                    for j in range(0, len(event.get('characters').get('items'))):
                        other_character = event.get('characters').get('items')[j]['name']
                        if other_character != hero['name'] and other_character not in hero.get('meets'):
                            hero.get('meets').append(other_character)
    return heroes

def writeToJsonFile(heroes):
    with open('../data/heroes_by_python.json', 'w') as outfile:
        json.dump(heroes, outfile)

def deleteEveryoneWithoutMeets(heroes):
    newHeroes = []
    for hero in heroes:
        if len(hero.get('meets')) > 0:
            newHeroes.append(hero)
    return newHeroes

def getOnlyFirstAppearance(heroes):
    firstAppearanceGlobal = 1961;

    for hero in heroes:
        if len(hero.get('year_puffer')) > 0:
            if int(hero.get('year_puffer')[0]) > firstAppearanceGlobal:
                hero['years'] = str(hero.get('year_puffer')[0])
            else:
                hero['years'] = str(firstAppearanceGlobal)
        else:
            hero['years'] = str(firstAppearanceGlobal)
        hero.pop('year_puffer', None)
    return heroes

def getRange(heroes):
    count_meets = {}
    for hero in heroes:
        count_meets[hero.get('name')] = len(hero.get('meets'))
    # sorting: https://stackoverflow.com/a/20948781
    heroes_meets_sorted = [(k, count_meets[k]) for k in sorted(count_meets, key=count_meets.get, reverse=True)]
    for i in range(0, len(heroes_meets_sorted)):
        for hero in heroes:
            if str(hero.get('name')) == str(heroes_meets_sorted[i][0]):
                hero['rank'] = i+1
    return heroes


if request_responses[0].status_code == 200:
    for i in range(0, len(request_responses)):
        chars = json.loads(request_responses[i].text)
        events = json.loads(event_call[i].text)
        heroes = getNameAndDetails(chars)
        heroes = getYears(chars)
        heroes = getMeets(heroes, events.get("data").get("results"))
    heroes = deleteEveryoneWithoutMeets(heroes)
    heroes = getOnlyFirstAppearance(heroes)
    heroes = getRange(heroes)
    writeToJsonFile(heroes)
else:
    print("ERROR AT LOADING CHARACTERS!")
