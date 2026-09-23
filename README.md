# SENSE projectwebsite

Een statische website voor het OPZuid project SENSE. Alles staat lokaal in de map `html`, ook het lettertype. Er worden geen externe diensten of cookies gebruikt, dus je hebt geen cookiebanner nodig.

## Op Unraid zetten

Er zijn twee manieren. De eerste is het eenvoudigst.

### Manier 1 met Docker Compose Manager

1. Installeer de plugin Docker Compose Manager via Community Applications als je die nog niet hebt.
2. Kopieer de map `html` en het bestand `nginx.conf` naar `/mnt/user/appdata/sense-website/` op je Unraid server, bijvoorbeeld via de share `appdata` in Verkenner of Finder.
3. Maak in Docker Compose Manager een nieuwe stack aan met de naam `sense-website` en plak de inhoud van `docker-compose.yml` erin.
4. Klik op Compose Up. De site staat nu op `http://<ip-van-unraid>:8089`.

Wil je later tekst aanpassen? Wijzig dan `html/index.html` in de appdata map en ververs de pagina. Een herstart is niet nodig.

### Manier 2 als losse container

1. Kopieer `html` en `nginx.conf` naar `/mnt/user/appdata/sense-website/` zoals hierboven.
2. Ga in Unraid naar Docker en kies Add Container.
3. Vul in
   * Name `sense-website`
   * Repository `nginx:1.27-alpine`
   * Port mapping container poort 80 naar host poort 8089
   * Path `/usr/share/nginx/html` naar `/mnt/user/appdata/sense-website/html`, alleen lezen
   * Path `/etc/nginx/conf.d/default.conf` naar `/mnt/user/appdata/sense-website/nginx.conf`, alleen lezen
4. Klik op Apply.

Je kunt ook zelf een image bouwen met `docker build -t sense-website .` in deze map. Dan zitten de bestanden in het image en heb je de volumes niet nodig.

## Bereikbaar maken via een domein

Voor een publieke website met https zet je er een reverse proxy voor, zoals Nginx Proxy Manager, SWAG of een Cloudflare Tunnel. Laat de proxy doorverwijzen naar `http://<ip-van-unraid>:8089` en vraag daar het certificaat aan.

## Niet in zoekmachines

De site vraagt zoekmachines op drie manieren om hem niet op te nemen. In de pagina staat een robots meta tag, nginx stuurt bij elk bestand een X-Robots-Tag header mee en `robots.txt` weert bekende AI crawlers. Gewone zoekmachines mogen de site wel bezoeken, anders kunnen ze de noindex instructie niet lezen.

## Logo's vervangen

De logo's staan in `html/assets`. Wil je er later een vervangen, gebruik dan dezelfde bestandsnaam, bij voorkeur een png met transparante achtergrond.

## Bestanden

* `html` de website zelf
* `nginx.conf` webserver instellingen met caching en beveiligingsheaders
* `docker-compose.yml` voor Docker Compose Manager
* `Dockerfile` als je liever een eigen image bouwt
