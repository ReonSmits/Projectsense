# SENSE projectwebsite

Projectwebsite voor SENSE, een OPZuid project van Seecure Surgery Group met Maastricht University, Demcon, Unitron en Saxion Hogeschool. De site stelt het project voor, toont de partners en voldoet aan de communicatievoorwaarden van OPZuid.

Het is een statische website van één pagina. Er is geen buildstap, geen database en geen externe dienst. Nginx serveert de bestanden uit de map `html` en draait als Docker container op Unraid.

## Wat er is gedaan

De site is in een aantal rondes opgebouwd, samen met de A3 poster en het persbericht voor het project.

### Inhoud

* De tekst is gebaseerd op het projectplan en de A3 poster volgens het template van Stimulus.
* De beschrijving van de techniek is bewust algemeen gehouden. Er staat niets in over het meetprincipe, zodat er geen informatie over de technologie en het IP van Seecure naar buiten gaat.
* De tekstaanpassingen van Franklin Schuling uit de posterreview (september 2026) zijn verwerkt.
* De site noemt geen bedragen en geen planning per werkpakket.

### Vormgeving

* Rustige opbouw van één pagina met kop, projectafbeelding, beschrijving, partners, contact en financiers.
* Het Seecure logo staat linksboven. De kleuren sluiten aan bij de huisstijl van Seecure, met donkerblauw, blauw en leigrijs.
* De partnerlogo's staan per rol gegroepeerd en linken naar de websites van de partners. Ze zijn op het oog even groot gemaakt.
* Onderaan staan de verplichte logo's van OPZuid, de Europese Unie en de provincie Noord-Brabant, met een regel over de financiering.
* Op mobiel is de pagina compacter, met een afbeelding over de volle breedte en partnerlogo's in twee kolommen.

### Privacy en veiligheid

* Alles staat lokaal, ook het lettertype. Er zijn geen Google Fonts, geen tracking en geen cookies, dus ook geen cookiebanner nodig.
* Nginx stuurt beveiligingsheaders mee, waaronder een strikte Content Security Policy. Daarom staan er geen inline stijlen in de HTML.
* Het e-mailadres staat niet leesbaar in de broncode. Een klein script zet het in de browser in elkaar, zodat eenvoudige spambots het niet vinden.
* Het jaartal in de copyrightregel loopt automatisch mee.

### Zoekmachines

* De site hoort niet in zoekmachines. Dat staat op drie plekken, in een robots meta tag in de pagina, in een `X-Robots-Tag` header vanuit nginx en in `robots.txt`.
* Gewone zoekmachines mogen de site wel bezoeken. Anders kunnen ze de noindex instructie niet lezen en kan een link toch in de resultaten verschijnen.
* Bekende AI crawlers worden via `robots.txt` geweerd.

## Hoe het in elkaar zit

```
sense-website/
├── html/                      de website zelf
│   ├── index.html             de enige pagina
│   ├── robots.txt             instructies voor crawlers
│   └── assets/
│       ├── style.css          alle opmaak, inclusief mobiel
│       ├── fonts/figtree.woff2  lettertype (SIL Open Font License)
│       ├── hero.jpg / .webp   projectafbeelding
│       ├── favicon.png
│       └── logo-*.png         logo's van partners en financiers
├── nginx.conf                 webserver met caching en beveiligingsheaders
├── docker-compose.yml         alleen de webserver
├── docker-compose.sync.yml    webserver plus automatisch bijwerken vanuit GitHub
├── Dockerfile                 als je liever een eigen image bouwt
└── README.md
```

**index.html** bevat alle tekst. Kop, beschrijving, partners en contact staan in losse `<section>` blokken, zodat je snel vindt wat je zoekt. Onderaan staat een klein script voor het e-mailadres, het jaartal en de lijn onder de header bij scrollen.

**style.css** gebruikt een paar kleurvariabelen bovenaan (`--navy`, `--blue`, `--muted` en meer). De opmaak voor mobiel staat onderaan in het blok `/* mobiel */`. De hoogte van elk partnerlogo loopt via een class, zoals `h-26` voor 2,6rem.

**nginx.conf** zet de beveiligingsheaders en de noindex header. Nginx vervangt headers in een `location` blok in plaats van ze aan te vullen. Daarom staan de headers bij `/assets/` nog een keer.

## Op Unraid zetten

### Alleen de webserver

1. Zet de map `html` en het bestand `nginx.conf` in `/mnt/user/appdata/sense-website/`. Zet `nginx.conf` er echt als bestand neer voordat je start, anders maakt Docker er een map van.
2. Maak in Docker Compose Manager een stack `sense-website` en plak `docker-compose.yml` erin.
3. Klik op Compose Up. De site staat op `http://<ip-van-unraid>:8089`.

### Automatisch bijwerken vanuit GitHub

1. Clone deze repository naar `/mnt/user/appdata/sense-website`. Die map moet dan leeg zijn of nog niet bestaan.
2. Gebruik `docker-compose.sync.yml` als stack. Naast nginx draait dan een kleine container die elk uur de laatste versie van `main` ophaalt.
3. Deze container gebruikt de SSH sleutel uit `/root/.ssh` op Unraid. Die sleutel moet leesrechten hebben op de repository.

Wijzigingen die je naar `main` pusht, staan zo binnen een uur live. Verandert `nginx.conf`, herstart dan de nginx container.

## Bereikbaar via een domein

Zet een proxy host in Nginx Proxy Manager naar `http://<ip-van-unraid>:8089` en vraag daar een Let's Encrypt certificaat aan. Als NPM in een ander VLAN draait, moet de firewall poort 8089 op Unraid doorlaten. Wil je de site alleen voor partners openzetten, koppel dan in NPM een Access List met gebruikersnaam en wachtwoord.

## Inhoud aanpassen

* **Tekst.** Pas `html/index.html` aan. Een herstart is niet nodig.
* **Logo vervangen.** Zet een nieuw bestand met dezelfde naam in `html/assets`, bij voorkeur een png met transparante achtergrond. Is de verhouding anders, pas dan de class van het logo aan in `index.html`.
* **E-mailadres wijzigen.** Pas `data-u`, `data-d` en `data-t` aan op de knop met class `js-mail`. Dat zijn het deel voor de @, de domeinnaam en de extensie.

## Aandachtspunten

* De projectafbeelding is 1086 pixels breed. Op een groot scherm is dat voldoende, maar een versie in hogere resolutie zou mooier zijn.
* Het Seecure logo komt uit het projectplan en is klein. Een vector of grote png van Seecure is beter.
* Controleer bij Stimulus of de site aan alle communicatievoorwaarden van OPZuid voldoet voordat hij breed wordt gedeeld.
