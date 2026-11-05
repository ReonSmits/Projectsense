# SOGI projectwebsite

Projectwebsite van SOGI, een OPZuid project van Seecure Surgery Group. In het project wordt het Smart Optical Guidance Instrument ontwikkeld. De site staat op [wemakesense.tech](https://wemakesense.tech).

Het is een statische site van één pagina, zonder buildstap, database of externe diensten.

## Opzet

```
html/                    de website zelf
  index.html             de enige pagina, met alle tekst
  robots.txt             weert AI crawlers
  assets/
    sogi.css             alle opmaak, ook voor mobiel
    sogi.js              e-mailadres, jaartal en lijn onder de header
    figtree-*.woff2      lettertype Figtree (licentie in figtree-LICENSE.txt)
    img-*.png/jpg/webp   projectafbeelding en logo's
nginx.conf               webserver met beveiligingsheaders
docker-compose.yml       nginx container voor Unraid
Dockerfile               als je liever een eigen image bouwt
```

* De site draait op Unraid in een `nginx:1.27-alpine` container op poort 8088. Nginx Proxy Manager zit ervoor en regelt https.
* `nginx.conf` stuurt een strenge Content Security Policy mee. Opmaak, lettertypes en scripts staan daarom als los bestand in `assets/`. Gebruik geen `<style>` blokken, geen `style` attributen, geen inline scripts en geen externe CDN's of Google Fonts. Pas de CSP niet aan zonder overleg.
* De site hoort niet in zoekmachines. Dat staat in de robots meta tag in `index.html`, in de `X-Robots-Tag` header uit `nginx.conf` en in `robots.txt`. Laat dat zo.

## Afspraken over de inhoud

* Het project heet SOGI, het instrument heet Smart Optical Guidance Instrument. Gebruik de oude naam SENSE nergens meer. Het domein wemakesense.tech blijft.
* Het instrument is nog geen goedgekeurd medisch hulpmiddel. Schrijf dat het een instrument wordt en dat het moet waarschuwen of helpen, niet dat het iets is of doet.
* Partners zijn Seecure Surgery Group (penvoerder), Maastricht University en Demcon life sciences & health (projectpartners), Unitron Systems en Saxion Hogeschool (uitvoerende partijen).
* De vermelding van OPZuid, de EU en de provincie Noord-Brabant onderaan blijft staan.
* Teksten in eenvoudig Nederlands, zonder dubbele punten en gedachtestreepjes in lopende tekst.

## De site op Unraid bijwerken

De container leest de bestanden uit `/mnt/user/appdata/sogi-website/`.

1. Haal de laatste versie op uit GitHub, als zip of met `git pull`.
2. Kopieer de map `html` naar `/mnt/user/appdata/sogi-website/html` en vervang de oude inhoud. Bestanden die niet meer in de repo staan kun je weghalen.
3. Is `nginx.conf` veranderd, kopieer dat bestand dan ook en herstart de container in het Docker tabblad. Voor alleen nieuwe tekst of afbeeldingen is een herstart niet nodig.
4. Ververs de site in de browser met Ctrl+F5, want afbeeldingen en opmaak worden 30 dagen gecachet.

Eerste keer installeren gaat zo.

1. Zet `html` en `nginx.conf` in `/mnt/user/appdata/sogi-website/`. Zet `nginx.conf` er als bestand neer voordat je de container start, anders maakt Docker er een lege map van.
2. Maak in Docker Compose Manager een stack `sogi-website` en plak `docker-compose.yml` erin.
3. Klik op Compose Up. De site staat dan op `http://<ip-van-unraid>:8088`.
4. Zet in Nginx Proxy Manager een proxy host voor wemakesense.tech naar dat adres en vraag een Let's Encrypt certificaat aan.

## Controle na een wijziging

* Open de site met de ontwikkelaarstools van de browser open. In de console mogen geen meldingen over de Content Security Policy staan en in het netwerkoverzicht geen rode 404's.
* Zoek in de bestanden op `SENSE`. Alleen het domein wemakesense.tech mag voorkomen.
