local function notifyClient(source, message)
    TriggerClientEvent('police_tablet:showToast', source, message)
end

RegisterNetEvent('police_tablet:issueFine')
AddEventHandler('police_tablet:issueFine', function(name, amount)
    local src = source
    if name and amount then
        TriggerClientEvent('police_tablet:showToast', src, 'Fine issued: ' .. name .. ' - $' .. tostring(amount))
    end
end)

RegisterNetEvent('police_tablet:setFleetStatus')
AddEventHandler('police_tablet:setFleetStatus', function(id, status)
    local src = source
    if id and status then
        TriggerClientEvent('police_tablet:showToast', src, 'Fleet update: Unit ' .. tostring(id) .. ' -> ' .. tostring(status))
    end
end)

-- VRP integration example:
-- Replace these with your own vRP exports if needed.
-- Example:
-- local Tunnel = module('vrp', 'lib/Tunnel')
-- local Proxy = module('vrp', 'lib/Proxy')
-- vRP = Proxy.getInterface('vRP')

print('Police tablet resource started')
