local isOpen = false

local function toggleTablet()
    isOpen = not isOpen
    SetNuiFocus(isOpen, isOpen)
    SendNUIMessage({
        type = 'toggle',
        open = isOpen,
        data = getTabletData()
    })
end

local function getTabletData()
    return {
        player = {
            name = GetPlayerName(PlayerId()),
            id = GetPlayerServerId(PlayerId()),
            job = 'Police',
            rank = 'Officer'
        },
        incidents = {
            { id = 1, title = 'Bank robbery', location = 'Vinewood', priority = 'High', status = 'Active' },
            { id = 2, title = 'Traffic stop', location = 'Downtown', priority = 'Normal', status = 'In progress' },
            { id = 3, title = 'Street fight', location = 'Sandy Shores', priority = 'High', status = 'Active' }
        },
        fines = {
            { id = 1, name = 'Speeding', amount = 1500 },
            { id = 2, name = 'Aggressive driving', amount = 3500 },
            { id = 3, name = 'Weapon violation', amount = 5000 }
        },
        fleet = {
            { id = 1, name = 'Patrol Boat 01', type = 'Boat', status = 'On patrol', zone = 'Harbor' },
            { id = 2, name = 'Patrol Boat 02', type = 'Boat', status = 'Docked', zone = 'Pier' },
            { id = 3, name = 'Unit 17', type = 'Car', status = 'On scene', zone = 'Downtown' }
        },
        stats = {
            calls = 42,
            arrests = 23,
            tickets = 17,
            boats = 2
        }
    }
end

RegisterCommand('tablet', function()
    toggleTablet()
end)

RegisterKeyMapping('tablet', 'Open police tablet', 'keyboard', 'F7')

RegisterNUICallback('closeTablet', function(_, cb)
    isOpen = false
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('issueFine', function(data, cb)
    TriggerServerEvent('police_tablet:issueFine', data.name, data.amount)
    cb('ok')
end)

RegisterNUICallback('setFleetStatus', function(data, cb)
    TriggerServerEvent('police_tablet:setFleetStatus', data.id, data.status)
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
