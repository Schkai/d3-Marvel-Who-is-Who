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




![](data:image/*;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAD8AicDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKzdT1uz0pD5z7pccRryxoA0qzr3W9P0/ImuF3j+BeTXFal4nv78lEf7PD2SM8n6msQkk5JyaAOwuvG/JFpa/wDApD/QVkT+KdWnJxcCMHtGoH86xqKYi3LqmoTZEl7cMD1HmHH5VAZ5mOWlc/VjUdFAE8d7dxHMd1Mhxj5ZCKtw6/qsBG29lOOznd/Os2igDprbxrex4FxDHKPUfKa3LLxbp11hZS0Dn++OPzrz2igD16ORJUDxuroehU5Bp9eUWWpXenyb7adk9RnIP1FdfpXi+C52xXyiGQ8b1+4f8KQzqKKRWV1DKQQehFLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABR0pOlcX4k8SebvsbF/3fSSQfxew9qALOueK1hLW2nMGccNKOg+nrXGSSPLIZJGLMxyST1ptFMQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBsaP4hudKcIxMtv3jJ6fT0r0CyvrfUbYT20m9D+BB9DXk9XdM1S40u5EsDfL/EhPDCgD1SiqenahDqdmlzCeDwVPVT6GrlIYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUVm63qa6VpzzcGRvljHq1AGL4r1wwodPtnxIw/esOw9K4qnSSPNK0kjFnY5JPc02mIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDS0XVpNJvRIMmJuJEz1H+NelwTR3ECTRMGRxkEV5FXVeENY8qb+zp2/dyHMRPZvT8aQzt6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK868Uakb7VWjVv3MBKKB0J7mu11q9+waTPODhtu1fqa8vJJJJ6mgBKKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACnI7RyK6HDKcgim0UAep6RfrqWmxXAI3EYcejd6vVw/gu+8u7lsmPyyDev1H/wBau4pDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA4/wAb3ZAtrRTwcu39K46trxVP5+vTAHIjAQfln+tYtMQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAWdOujZajb3IJAjcFsenf9K9XBBGR0rx+vUtGn+0aNaSk5JjAJ9xx/SkMv0UUUAFFFFABRRRQAUUU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zA4Xb8jY4/KtWigDnv8AhDNK9Z/++x/hR/whmles/wD32P8ACuhooAp6dp0Ol2xt7cuYyxb5znFXKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoorOu9bsbG9jtJ5WWaTG0BCc5OBzQBo0UVnWet2F/eyWlvKzTRglgUIwAQDz+NAGjRRRQAUVWvrxNPspbqRWZI1yQvWotK1SHV7MXUKOibiuHxnj6UAXqKKKACiiigAooooAKKKiuJ1traWdgSsaFyB1IAzQBLRWZo+tQa1DJLBHIgjbaRIB/Q1faeJZRE0iiRui55NAElFNdgiMx6AZrJHiOxOlvqH7zyUfYfl5zQBsUVHDKs8EcqZ2uoYZ9CM0GeJZViaRRI3RSeTQBJRRUcsqQQvK5wiKWY+w5oAkorB/4TLRP+fl/+/Tf4VfsdZsNSO21uUdsZ29D+RoAv0UUUAFFFFABRRRQAUUUUAFFFFABRRTZG2Ru+M7QTQA6isTQPEB1t7gG28nycfx7s5z7D0rboAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK4TxR/yN1h9Y/8A0Ku7rhPFv7nxPYTPwnyHP0bmgDu64Twn/wAjdf8A/XOT/wBDWu5LKE3k4XGc+1cL4PPm+J76ZeUMb8/Vxj+VAG9f+J4NO1gWM8JCbN5m39OCcYx7YrNk8cGKZS+mSpbt0Zjgn36YqrrMSTePrWORQyHZkHvW54wjV/DsxZQSpBU+hzTEW73ULf8AsJ78Ri4gMe/YeNw9Ko2WtRDw5LqNrp4RIySYVfHGeTnH41n2zFvhucnP7tx/4+ateDolm8NNE4yru6kH0NIZraNq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)

**Philosophische**  **Fakultät III**

**Sprach- , Literatur- und Kulturwissenschaften**

**Institut für Information und**  **Medien**** , Sprache und Kultur (I:IMSK)
Lehrstuhl für Medieninformatik**



Projektseminar Mediengestaltung 1: Informationsvisualisierung

Modul: MEI-M05.3

SS17

Leitung: Florin Schwappach

**Marvel&#39;s Who is Who**



Abgegeben am 31.07.2017


1.Motivation

Es gibt nur wenige fiktive Universen, die sich so erfolgreich und langfristig in die Herzen ihrer Zuschauer gespielt haben, wie das Marvel Universum. Zahlreiche Verfilmungen, Comics und Franchises ranken sich um die Helden und Schurken, die ihren Ursprung in einer Reihe handgezeichneter Comicbücher fanden. Mittlerweile brachte das Universum ein komplexes Netzwerk an Charakteren hervor, das nur wenige Fans lückenlos kennen. Denn das Netzwerk beinhaltet neben bekannten Spielfilmhelden vom Kaliber _„Iron Man&quot;_ oder „_Captain America&quot;_ auch zahlreiche Nebendarsteller wie beispielsweise „She-Hulk&quot; oder „_Carnage_&quot;. Im Jahr 2014 veröffentlichte der Mutterkonzern Marvel ein umfangreiches Application Programming Interface (API), das auf Anfrage Datensätze zu Comics, Events und Stories bereitstellt. Anhand dieser Datensätze sollten die umfangreichen und komplexen Verbindungen der Marvel Charaktere zueinander in interaktiver und visueller Form zur Schau gestellt werden.

2.Überlegungen zur Visualisierung

Zu Beginn des Projekts stellte sich die Frage, welche Form von Visualisierung sinnvoll erscheint, um einen nominalen Datensatz schlüssig visuell darzustellen. Die Wahl fiel auf eine Hierarchische Baumstruktur, da diese laut Definition geordnete Sets darstellen, in welchen Subsets anhand deren Beziehungen geordnet sind. Zudem können Daten in hierarchischer Struktur meist anhand deren Eigenschaften (Properties) und deren Elemente im Bezug auf Verwandschaftsbeziehung/Gleichheitsgrad  beschrieben und verglichen werden. Eine kreisrunde Darstellung der Daten sollte dafür sorgen, den Fokus auf die zahlreichen Verbindungen innerhalb der Mitte des Kreises an Charakteren zu legen. Eine alphabetische Sortierung des Datensatzes anhand der kreisrunden Achse mit gleichem Abstand gewährleistet eine Übersichtliche Darstellung der Namen. Sieht der Benutzer nicht sofort seinen gewünschten Charakter, kann er diesen über eine Suchleiste suchen und wird interaktiv darüber informiert, ob dieser im Datensatz enthalten ist. Ist der gewünschte Charakter gefunden, öffnet sich eine kleine Informationskarte, die das offizielle Avatar-Bild der Marvel-API beinhaltet und in Wiki-Kurzform weitere Informationen liefert, um dem User zusätzliches Wissen zu vermitteln. U

Karten angelehnt an Comic-Erklärung und Wiki-Einträge

Farbgebung analog gefasst zur Marvel Website

Schrift ist ähnlich zu CI

Wollen zeigen, wie verwoben einzelne Marvel-Charaktere miteinander sind

visueller Reminder, wie groß und vielfältig das Marvel Universum ist

Zusätzliche Marvel Trivia

3.Technische Implementierung

Die technische Umsetzung basiert auf zwei unterschiedlichen Ebenen: Ein Python-Skript verbindet sich zur Marvel API ( [https://developer.marvel.com/)](https://developer.marvel.com/)), speichert alle relevanten Daten und filtert diese anschließend in das festgelegte JSON-Format. Eine Web-Applikation auf Node.JS-Basis stellt anhand der gespeicherten Daten einen Webserver zur Verfügung, auf dem die Visualisierung mit der Frontend-Library d3.js in Version 3 gezeigt wird.

3.1 Datensatzgenerierung

Im Rahmen der Python-Implementierung werden die entsprechenden API-Calls an die durch Marvel selbst angebotene API durchgeführt. Dazu kommt das marvelpy-Projekt von ddominguez ( [https://github.com/ddominguez/marvelpy)](https://github.com/ddominguez/marvelpy)) abgeändert zum Einsatz. Der große Vorteil hierbei ist, dass das durch das Script generierte JSON-File für d3 durchgehend zur Verfügung steht und nicht bei jedem Seitenaufruf mehrere API-Calls durchgeführt werden müssen, was eine drastische Verlangsamung der Visualisierung zur Folge hätte.

Das Skript löst zudem ein weiteres, großes Problem: Bei jedem API-Call werden viele, für einen leichtgewichtigen Informationssatz unnütze, Daten übertragen. Diese Datenmenge verlangsamt d3 zusätzlich. Zudem filtert die Python-Implementierung die unbedingt nötige Zusammenstellung der „Meets&quot;, sowie das erste Auftreten der Charaktere und schreibt diese in ein JSON-File.

Das genaue Vorgehen ist wie folgt implementiert: Zuerst werden Characters und Events aus der API abgerufen. Dies geschieht in der while-Schleife, welche sich in den Zeilen 22 – 27 der main.py befindet.

```python
while i &lt;= 1500:

   params\_character = {&#39;offset&#39;: i, &#39;limit&#39;: LIMIT}

   params\_event = {&#39;limit&#39;: LIMIT}

   request\_responses.append(marvel.characters(params=params\_character))

   event\_call.append(marvel.events(params=params\_event))

   i += 100
```

Hier werden mehrere API-Calls gestartet, denen jeweils ein offset- und ein limit-Attribut übergeben wird. Diese sind für die Anpassung des API-Calls unabdingbar, da sonst immer dieselben 25 Charaktere zurückgegeben werden.

Die API-Responses werden bei einem Status-Code von 200 (OK) eingelesen und nach und nach durch die Funktionen spezifiziert, um einen vollständigen Datensatz zu erzeugen:


```python
def getNameAndDetails(chars):

   for i inrange(0, len(chars.get(&quot;data&quot;).get(&quot;results&quot;))):

       name = chars.get(&quot;data&quot;).get(&quot;results&quot;)[i][&#39;name&#39;]

       details = chars.get(&quot;data&quot;).get(&quot;results&quot;)[i][&#39;description&#39;]

       thumbnail = chars.get(&quot;data&quot;).get(&quot;results&quot;)[i][&#39;thumbnail&#39;][&#39;path&#39;] + &quot;.&quot; + chars.get(&quot;data&quot;).get(&quot;results&quot;)[i][&#39;thumbnail&#39;][&#39;extension&#39;]

       heroes.append({&quot;name&quot;: name, &quot;details&quot;: details, &quot;thumbnail&quot;: thumbnail, &quot;year\_puffer&quot;: [], &quot;meets&quot;: [], &quot;rank&quot;: 0})

   return heroes

def getYears(chars):

   for i inrange(0, len(chars.get(&quot;data&quot;).get(&quot;results&quot;))):

       for j inrange(0, len(chars.get(&quot;data&quot;).get(&quot;results&quot;)[i][&quot;comics&quot;][&quot;items&quot;])):

           year = re.findall(r&#39;\d{4}&#39;, chars.get(&quot;data&quot;).get(&quot;results&quot;)[i][&quot;comics&quot;][&quot;items&quot;][j][&#39;name&#39;])

           heroes[i].get(&#39;year\_puffer&#39;).append(year[0]) if year else&#39;&#39;

       heroes[i][&#39;year\_puffer&#39;] = list(set(heroes[i].get(&#39;year\_puffer&#39;)))

       heroes[i][&#39;year\_puffer&#39;] = sorted(heroes[i][&#39;year\_puffer&#39;])

   return heroes

def getMeets(heroes, events):

   for hero in heroes:

       for event in events:

           for i inrange(0, len(event.get(&#39;characters&#39;).get(&#39;items&#39;))):

               if hero[&#39;name&#39;] == event.get(&#39;characters&#39;).get(&#39;items&#39;)[i][&#39;name&#39;]:

                   for j inrange(0, len(event.get(&#39;characters&#39;).get(&#39;items&#39;))):

                       other\_character = event.get(&#39;characters&#39;).get(&#39;items&#39;)[j][&#39;name&#39;]

                       if other\_character != hero[&#39;name&#39;] and other\_character notin hero.get(&#39;meets&#39;):

                           hero.get(&#39;meets&#39;).append(other\_character)

   return heroes
```

In der Funktion getNameAndDetails(chars) werden der Name des Helden, ihre Kurzbeschreibung sowie die Source ihres Thumbnails in das heroes-Dictionary geschrieben.

Anschließend wird in der Funktion getYears(chars) die Jahre, in denen Comics zum entsprechenden Helden erschienen sind, anhand der Regular Expression &quot;r&#39;d{4}&#39;&quot; extrahiert und als gespeichert.

Unmittelbar danach werden die „Meets&quot;, also die Treffen der einzelnen Helden, extrahiert. Hierzu werden sämtliche Helden und alle Events, die die API zurückgegeben hat, nacheinander untersucht und, sobald ein Charakter noch nicht zum aktuellen Helden gespeichert ist, diesem angehängt.

Zuletzt werden alle Helden ausgeschlossen, bei denen keine „Meets&quot; gefunden wurden. Danach wird der erste Auftritt gespeichert und eine Rangliste erstellt, entsprechend der Summe der Verbindungen. Das heroes-Dictionary wird dann noch in die Datei heroes\_by\_python.json geschrieben und steht dann für die weitere Verwendung zur Verfügung.

3.2 Visualisierung

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

3.3 Charakterselektion

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

3.4 Zeitstrahl

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

3.5 Suchfunktion

Für die Suche einzelner Helden wurde ein Sucheingabefeld angelegt, dass ein Autocomplete feature der jQuery-UI library nutzt um dem Nutzer die in der Datenbank enthaltenen Helden vorzuschlagen. So wurde versucht die Usability für den Nutzer zu erhöhen.

Dazu wird zuerst das durch Python generierte JSON eingelesen und die einzelnen Namen in einem Array abgespeichert. Danach wird das autocomplete auf das Eingabefeld gesetzt und es werden verschiedene Attribute wie autofocus und Delay (der bei lokalen Datensätzen unnütz wird) gesetzt. Über verschiedene Methoden wird die Listenlänge, die Eingabequelle (hier das Array) sowie die Funktion, die beim Auswählen des Elements ausgeführt wird, festgelegt. Letztere übergibt den Namen an die in der visual.js implementierten und exportierten Methode selectNodeByName(name), die den Namen mit den in der visual.js bereits vorhandenen Nodeliste vergleicht, um den richtigen Node zu finden. Dieser wird dann einfach an die Funktion mouseclick(node) übergeben, die auch bei einem Klick auf ein einzelnes Nodeelement aufgerufen wird.
