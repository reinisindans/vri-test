# Testa uzdevums no VRI

## Sistēmas frontend risinājums React vidē



Tas ir diezgan "generic" risinājums, bet tieši šāds tiek izmantots web-gis sistēmās.

 Pašlaik jaunus elementus var ievadīt datubāzē, tai pieslēdzoties, piemēram, ar QGIS. 

Izmantotās tehnoloģijas: 
Datubāze: PostgreSQL ar PostGIS extension, īstenota Google Cloud SQL servisā. Nodrošina datus.
"Backend" serveris: Geoserver, palaists konteinerizēts Google Engine nodrošinātā virtuālajā mašīnā. Servē WMS (Web Map Service) slāņus.
Frontend: React aplikācija, kas palaista konteinerizēta Google Engine nodrošinātā virtuālajā mašīnā. 

Risinājums ir dinamisks un datos centrēts. T.i. datu bāzē pievienojot (elementāri ar QGIS) jaunus datus (jaunas akas, grāvjus utt.), izmaiņas automātiski parādās gala lietotājam. Pievienojot datu bāzei jaunus slāņus, tie pēc reģistrācijas ģeoserverī ir uzreiz pieejami gala lietotājam.
 Risinājums ir piemērots dinamiskām datu kopām, kuras potenciāli varētu rediģēt paši lietotāji (kā pamats, piemēram, lauka apsekošanas/inventarizācijas sistēmām). 
