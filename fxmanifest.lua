fx_version 'cerulean'
game 'gta5'

author 'Copilot'
description 'Police Tablet for FiveM VRP'
version '1.0.0'

ui_page 'html/index.html'

files {
  'html/index.html',
  'html/style.css',
  'html/app.js',
  'config.lua'
}

client_scripts {
  'config.lua',
  'client/main.lua'
}

server_scripts {
  'server/main.lua'
}
