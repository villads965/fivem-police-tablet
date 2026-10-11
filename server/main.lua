local Config = require('config')
local isOpen = false

local function getTabletData()
    return {
        player = {
            name = GetPlayerName(PlayerId()),
            id = GetPlayerServerId(PlayerId()),
            job = 'Police',
            rank = 'Officer',
            department = 'LSPD'
        },
        stats = {
            calls = 42,
            arrests = 23,
            tickets = 17,
            boats = 2,
            suspects = 8,
            vehicles = 11
        },
        incidents = {
            { id = 1, title = 'Bank robbery', location = 'Vinewood', priority = 'High', status = 'Active' },
            { id = 2, title = 'Traffic stop', location = 'Downtown', priority = 'Normal', status = 'In progress' },
            { id = 3, title = 'Street fight', location = 'Sandy Shores', priority = 'High', status = 'Active' },
            { id = 4, title = 'Drug operation', location = 'La Mesa', priority = 'Critical', status = 'Monitoring' }
        },
        fines = {
            { id = 1, name = 'Speeding', amount = 1500 },
            { id = 2, name = 'Aggressive driving', amount = 3500 },
            { id = 3, name = 'Weapon violation', amount = 5000 }
        },
        fleet = {
            { id = 1, name = 'Patrol Boat 01', type = 'Boat', status = 'On patrol', zone = 'Harbor' },
            { id = 2, name = 'Patrol Boat 02', type = 'Boat', status = 'Docked', zone = 'Pier' },
            { id = 3, name = 'Unit 17', type = 'Car', status = 'On scene', zone = 'Downtown' },
            { id = 4, name = 'Air Unit 01', type = 'Helicopter', status = 'Airborne', zone = 'City' }
        },
        callers = {
            { id = 1, name = 'Anonymous', type = '911', location = 'Vinewood' },
            { id = 2, name = 'Witness', type = 'Dispatch', location = 'Downtown' },
            { id = 3, name = 'Citizen', type = '911', location = 'Sandy Shores' }
        },
        persons = {
            { id = 1, name = 'John Doe', wanted = true, code = 'WANTED' },
            { id = 2, name = 'Max Hill', wanted = false, code = 'CLEAR' },
            { id = 3, name = 'Ryan Cole', wanted = true, code = 'WANTED' }
        }
    }
end

local function toggleTablet()
    isOpen = not isOpen
    SetNuiFocus(isOpen, isOpen)
    SendNUIMessage({
        type = 'toggle',
        open = isOpen,
        data = getTabletData()
    })
end

RegisterCommand('tablet', function()
    toggleTablet()
end)

RegisterKeyMapping('tablet', 'Open police tablet', 'keyboard', Config.key)

RegisterNUICallback('closeTablet', function(_, cb)
    isOpen = false
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('issueFine', function(data, cb)
    if data and data.name and data.amount then
        TriggerServerEvent('police_tablet:issueFine', data.name, data.amount)
    end
    cb('ok')
end)

RegisterNUICallback('setFleetStatus', function(data, cb)
    if data and data.id and data.status then
        TriggerServerEvent('police_tablet:setFleetStatus', data.id, data.status)
    end
    cb('ok')
end)

RegisterNUICallback('togglePoliceAction', function(data, cb)
    if data and data.action then
        TriggerServerEvent('police_tablet:toggleAction', data.action)
    end
    cb('ok')
end)

RegisterNUICallback('setWaypoint', function(data, cb)
    if data and data.x and data.y and data.z then
        SetNewWaypoint(data.x, data.y)
    end
    cb('ok')
end)

RegisterNetEvent('police_tablet:showToast')
AddEventHandler('police_tablet:showToast', function(message)
    SendNUIMessage({
        type = 'toast',
        message = message
    })
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        if isOpen then
            SendNUIMessage({
                type = 'updateData',
                data = getTabletData()
            })
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if isOpen and IsControlJustPressed(0, 200) then
            isOpen = false
            SetNuiFocus(false, false)
            SendNUIMessage({ type = 'toggle', open = false })
        end
    end
end)
