# FiveM Police Tablet

En fuldt funktionel politi tablet til FiveM VRP med flåde styring, bødeopgørelser og incident tracking.

## Features

- 📊 **Dashboard** - Oversigt over opkald, arrestationer, bøder og både
- 🚨 **Incidents** - Se aktive opkald og nødsituationer
- 🎫 **Tickets/Bøder** - Udsted bøder direkte fra tablet
- ⛵ **Fleet Management** - Styr både, helikoptere og køretøjer
- 👮 **Officer Overview** - Se officerens info og status

## Installation

1. Download resourcen
2. Læg den i din `resources` mappe
3. Tilføj `ensure fivem-police-tablet` til din server.cfg
4. Genstart serveren

## Brug

- Tryk `F7` for at åbne tabletten
- Naviger via menuen på siden
- Udsted bøder, styr flåde og se incidents

## Genveje

- `F7` - Åbn/Luk tablet
- Click buttons for at udføre handlinger

## VRP Integration

For fuld VRP integration, se kommentarerne i `server/main.lua` og tilføj dine eget VRP callbacks.

## Tilpasning

Du kan tilpasse:
- Farver i `html/style.css`
- Layout i `html/index.html`
- Funktionalitet i `client/main.lua` og `server/main.lua`
