# d3-Marvel-Who-is-who
A d3.js project for university displaying Marvel characters and their relations based on Marvel's API.


### Get started:

* Download and unzip package
* `cd d3-marvel-who-is-who`
* `npm install` 
* `gulp`
* Access site on `localhost:8000`


## Hierarchical Edge Bundle

```
Based on: https://bl.ocks.org/mbostock/7607999
```

# Dokumentation

**Universität** **Regensburg**

**Philosophische**  **Fakultät III**

**Sprach- , Literatur- und Kulturwissenschaften**

**Institut für Information und**  **Medien**** , Sprache und Kultur (I:IMSK)
Lehrstuhl für Medieninformatik**



Projektseminar Mediengestaltung 1: Informationsvisualisierung

Modul: MEI-M05.3

SS17

Leitung: Florin Schwappach

**Marvel's Who is Who**



*Abgegeben am 31.07.2017


## 1. Motivation

Es gibt nur wenige fiktive Universen, die sich so erfolgreich und langfristig in die Herzen ihrer Zuschauer gespielt haben, wie das Marvel Universum. Zahlreiche Verfilmungen, Comics und Franchises ranken sich um die Helden und Schurken, die ihren Ursprung in einer Reihe handgezeichneter Comicbücher fanden. Mittlerweile brachte das Universum ein komplexes Netzwerk an Charakteren hervor, das nur wenige Fans lückenlos kennen. Denn das Netzwerk beinhaltet neben bekannten Spielfilmhelden vom Kaliber _„Iron Man&quot;_ oder „_Captain America&quot;_ auch zahlreiche Nebendarsteller wie beispielsweise „She-Hulk&quot; oder „_Carnage_&quot;. Im Jahr 2014 veröffentlichte der Mutterkonzern Marvel ein umfangreiches Application Programming Interface (API), das auf Anfrage Datensätze zu Comics, Events und Stories bereitstellt. Anhand dieser Datensätze sollten die umfangreichen und komplexen Verbindungen der Marvel Charaktere zueinander in interaktiver und visueller Form zur Schau gestellt werden.

## 2. Überlegungen zur Visualisierung

Zu Beginn des Projekts stellte sich die Frage, welche Form von Visualisierung sinnvoll erscheint, um einen nominalen Datensatz schlüssig visuell darzustellen. Die Wahl fiel auf eine Hierarchische Baumstruktur, da diese laut Definition geordnete Sets darstellen, in welchen Subsets anhand deren Beziehungen geordnet sind. Zudem können Daten in hierarchischer Struktur meist anhand deren Eigenschaften (Properties) und deren Elemente im Bezug auf Verwandschaftsbeziehung/Gleichheitsgrad  beschrieben und verglichen werden. Eine kreisrunde Darstellung der Daten sollte dafür sorgen, den Fokus auf die zahlreichen Verbindungen innerhalb der Mitte des Kreises an Charakteren zu legen. Eine alphabetische Sortierung des Datensatzes anhand der kreisrunden Achse mit gleichem Abstand gewährleistet eine Übersichtliche Darstellung der Namen. Sieht der Benutzer nicht sofort seinen gewünschten Charakter, kann er diesen über eine Suchleiste suchen und wird interaktiv darüber informiert, ob dieser im Datensatz enthalten ist. Ist der gewünschte Charakter gefunden, öffnet sich eine kleine Informationskarte, die das offizielle Avatar-Bild der Marvel-API beinhaltet und in Wiki-Kurzform weitere Informationen liefert, um dem User zusätzliches Wissen zu vermitteln. U

Karten angelehnt an Comic-Erklärung und Wiki-Einträge

Farbgebung analog gefasst zur Marvel Website

Schrift ist ähnlich zu CI

Wollen zeigen, wie verwoben einzelne Marvel-Charaktere miteinander sind

visueller Reminder, wie groß und vielfältig das Marvel Universum ist

Zusätzliche Marvel Trivia

## 3.Technische Implementierung

Die technische Umsetzung basiert auf zwei unterschiedlichen Ebenen: Ein Python-Skript verbindet sich zur Marvel API ( [https://developer.marvel.com/)](https://developer.marvel.com/)), speichert alle relevanten Daten und filtert diese anschließend in das festgelegte JSON-Format. Eine Web-Applikation auf Node.JS-Basis stellt anhand der gespeicherten Daten einen Webserver zur Verfügung, auf dem die Visualisierung mit der Frontend-Library d3.js in Version 3 gezeigt wird.

### 3.1 Datensatzgenerierung

Im Rahmen der Python-Implementierung werden die entsprechenden API-Calls an die durch Marvel selbst angebotene API durchgeführt. Dazu kommt das marvelpy-Projekt von ddominguez ( [https://github.com/ddominguez/marvelpy)](https://github.com/ddominguez/marvelpy)) abgeändert zum Einsatz. Der große Vorteil hierbei ist, dass das durch das Script generierte JSON-File für d3 durchgehend zur Verfügung steht und nicht bei jedem Seitenaufruf mehrere API-Calls durchgeführt werden müssen, was eine drastische Verlangsamung der Visualisierung zur Folge hätte.

Das Skript löst zudem ein weiteres, großes Problem: Bei jedem API-Call werden viele, für einen leichtgewichtigen Informationssatz unnütze, Daten übertragen. Diese Datenmenge verlangsamt d3 zusätzlich. Zudem filtert die Python-Implementierung die unbedingt nötige Zusammenstellung der „Meets&quot;, sowie das erste Auftreten der Charaktere und schreibt diese in ein JSON-File.

Das genaue Vorgehen ist wie folgt implementiert: Zuerst werden Characters und Events aus der API abgerufen. Dies geschieht in der while-Schleife, welche sich in den Zeilen 22 – 27 der main.py befindet.

```python
while i <= 1500:
   params_character = {'offset': i, 'limit': LIMIT}
   params_event = {'limit': LIMIT}
   request_responses.append(marvel.characters(params=params_character))
   event_call.append(marvel.events(params=params_event))
   i += 100
```

Hier werden mehrere API-Calls gestartet, denen jeweils ein offset- und ein limit-Attribut übergeben wird. Diese sind für die Anpassung des API-Calls unabdingbar, da sonst immer dieselben 25 Charaktere zurückgegeben werden.

Die API-Responses werden bei einem Status-Code von 200 (OK) eingelesen und nach und nach durch die Funktionen spezifiziert, um einen vollständigen Datensatz zu erzeugen:


```python
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
```

In der Funktion getNameAndDetails(chars) werden der Name des Helden, ihre Kurzbeschreibung sowie die Source ihres Thumbnails in das heroes-Dictionary geschrieben.

Anschließend wird in der Funktion getYears(chars) die Jahre, in denen Comics zum entsprechenden Helden erschienen sind, anhand der Regular Expression &quot;r&#39;d{4}&#39;&quot; extrahiert und als gespeichert.

Unmittelbar danach werden die „Meets&quot;, also die Treffen der einzelnen Helden, extrahiert. Hierzu werden sämtliche Helden und alle Events, die die API zurückgegeben hat, nacheinander untersucht und, sobald ein Charakter noch nicht zum aktuellen Helden gespeichert ist, diesem angehängt.

Zuletzt werden alle Helden ausgeschlossen, bei denen keine „Meets&quot; gefunden wurden. Danach wird der erste Auftritt gespeichert und eine Rangliste erstellt, entsprechend der Summe der Verbindungen. Das heroes-Dictionary wird dann noch in die Datei heroes\_by\_python.json geschrieben und steht dann für die weitere Verwendung zur Verfügung.

### 3.2 Visualisierung

Das Frontend basiert auf Node.Js und wird durch den Taskrunner Gulp gestartet. Letzterer stellt auch noch verschiedene Middleware für die Entwicklungsumgebung bereit, um automatisch einen Webserver mit Livereload bei Speicherung von Änderungen und ES6-Transpiling zu starten.

Für die Visualisierung mit d3.JS wird im Code zunächst der JSON-Datensatz eingelesen. In diesem Fall liegt der erstellte Datensatz in der Datei heroes\_by\_python.json. Dieses JSON-File enthält alle wichtigen Informationen, wie beispielsweise Name, Ersterscheinungsjahr und mit welchen anderen Charakteren die einzelnen Helden bzw. Schurken jemals aufgetreten sind. Über zwei Funktionen werden aus den Daten zwei Arrays erzeugt. Diese enthalten dann die einzelnen Knotenpunkte (Nodes) und Verbindungen (Links) der Marvel-Charakter.

```js 
nodes = cluster.nodes(packageHierarchy(classes));
```

Die Funktion packageHierarchy erzeugt eine neue Map als Javascript Objekt und sucht sich anhand des übergebenen &quot;classes&quot;-Atrribut die korrespondierenden Datensätze heraus, um daraus einen Datenpunkt (Node) zu erstellen.

```js 
links = packageImports(nodes);
```

packageImports hingegen gibt eine Liste für das gegebene Array an Nodes zurück, erstellt ein Map-Array vom Namen zur korrespondierenden Node und erzeugt für jeden Link eine Verbindung von Quelle zu Ziel.

Aus den beiden Arrays werden dann die Nodes als text-Element und Links als path-Element erzeugt. Die text-Elemente zeigen den Namen des Superhelden an und die path-Elemente welche Charaktere schon einmal zusammen aufgetreten sind.

```js 
link = link
           .data(bundle(links))
           .enter().append("path")
           .each(function (d) {
               d.source = d[0], d.target = d[d.length - 1];
           })
           .attr("class", "link")
           .attr("d", line);

       node = node
           .data(nodes.filter(function (n) {
               return !n.children;
           }))
           .enter().append("text")
           .attr("class", "node")
           .attr("dy", ".31em")
           .attr("transform", function (d) {
               return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
           })
           .style("text-anchor", function (d) {
               return d.x < 180 ? "start" : "end";
           })
           .text(function (d) {
               return d.key;
           })
           .on("click", mouseclick)

```

### 3.3 Charakterselektion

Beim Klick auf einen Namen wird die Funktion mouseclick ausgelöst. Durch die Funktion werden alle Verbindungen zu dem selektierten Charakter eingefärbt.

```js
export function mouseclick(d) {
       console.log(d);
       var background = d3.select("#main"); //.selectAll("svg");

       var card = background.selectAll((".card")).remove();

       node
           .each(function (n) {
               n.target = n.source = false;
           });

       link
           .classed("link--target", function (l) {
               if (l.target === d) return l.source.source = true;
           })
           .classed("link--source", function (l) {
               if (l.source === d) return l.target.target = true;
           })
           .filter(function (l) {
               return l.target === d || l.source === d;
           })
           .each(function () {
               this.parentNode.appendChild(this);
           });

       node
           .classed("node--target", function (n) {
               return n.target;
           }) //set the class
           .classed("node--source", function (n) {
               return n.source;
           }); //set the class
```

Außerdem erzeugt diese die Infobox. Diese dient zur Darstellung näherer Details des jeweils ausgewählten Charakters. In der Mitte des Kreises der alle Verbindungen der Superhelden darstellt, wird zuerst ein div-Container erzeugt. Als X- bzw. Y-Position wird der Radius übergeben, damit die Infobox auch wirklich in der Mitte des Kreises abgebildet wird.

```js
var group = background.append("div")
           .style({
               position: "absolute",
               left: (radius - 200) + 'px',
               top: (radius - 200) + 'px'
           })
           .attr("class", "card");
```

Über ein im Node hinterlegtes Thumbnail wird innerhalb des Containers ein Bild zu dem Charakter angezeigt.

```js
group.append("img")
           .attr("class", "card-img-top")
           .attr("width", 400)
           .attr("height", 400)
           .attr("src", d.thumbnail);
```

Darunter wird der Name und das Ersterscheinungsjahr angezeigt.  Außerdem kann der User eine nähere Beschreibung lesen, falls eine hinterlegt ist. Für den Fall, dass keine Beschreibung vorhanden ist, erscheint nur ein kurzer Text: „Keine Beschreibung verfügbar&quot;.  Sobald der User auf einen anderen Helden klickt, wird die vorherige Infobox gelöscht und eine neue erzeugt.

```js
group.append("h3")
           .text(d.name)
           .attr("class", "card-header");

       group.append("p")
           .text(d.years)
           .attr("class", "card-subtitle");

       group.append("p")
           .text(d.details)
           .attr("class", "card-text");
```

### 3.4 Zeitstrahl

Über dem großen Kreis soll sich eigentlich die Anzeige der Jahreszahl und der TimeSlider befinden.  Dessen Zeitstrahl würde am 1.1.1975 beginnen und am 1.1.2015 enden. Das Default-Jahr wäre 1975. Auf dem Reiter des Zeitstrahls würde ein Event-Listener liegen. Sobald sich die Position des Reiters also verändern würde, würde sich auch die darüber angezeigte Jahreszahl ändern.

```js
var TimeSlider =  chroniton()
       .domain([new Date('1/1/1975'), new Date('1/1/2015')])
       .width(500)
       .labelFormat(d3.time.format('%Y'))
       .on('change', function(d) {
         var yearNameFormat = d3.time.format("%Y"); 
         console.log(yearNameFormat(d));
         yearOutput.text(yearNameFormat(d));
         currentYear = yearNameFormat(d);
         return yearNameFormat(d);
       });

```

Außerdem war unser Ziel über eine Funktion alle Charaktere und deren Verbindungen auf „hidden&quot; zu setzen. Dadurch würden nur die Charaktere ausgewählt werden, deren Ersterscheinungsjahr nach dem Jahr liegt, das über den Zeitstrahl ausgewählt wurde. Dabei sollten die einzelnen Nodes mit dem selektierten Jahr abgeglichen werden.

Leider sind bei dem Versuch den Zeitstrahl zu implementieren folgende Schwierigkeiten aufgetreten:

### 3.5 Suchfunktion

Für die Suche einzelner Helden wurde ein Sucheingabefeld angelegt, dass ein Autocomplete feature der jQuery-UI library nutzt um dem Nutzer die in der Datenbank enthaltenen Helden vorzuschlagen. So wurde versucht die Usability für den Nutzer zu erhöhen.

Dazu wird zuerst das durch Python generierte JSON eingelesen und die einzelnen Namen in einem Array abgespeichert. Danach wird das autocomplete auf das Eingabefeld gesetzt und es werden verschiedene Attribute wie autofocus und Delay (der bei lokalen Datensätzen unnütz wird) gesetzt. Über verschiedene Methoden wird die Listenlänge, die Eingabequelle (hier das Array) sowie die Funktion, die beim Auswählen des Elements ausgeführt wird, festgelegt. Letztere übergibt den Namen an die in der visual.js implementierten und exportierten Methode selectNodeByName(name), die den Namen mit den in der visual.js bereits vorhandenen Nodeliste vergleicht, um den richtigen Node zu finden. Dieser wird dann einfach an die Funktion mouseclick(node) übergeben, die auch bei einem Klick auf ein einzelnes Nodeelement aufgerufen wird.
