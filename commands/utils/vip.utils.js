const { bmApiId, hllServers } = require('../../config.json');
const axios = require('axios');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function addVIP(interaction, steamId, description) {
    interaction.reply({ 
        content: 'Adding member to VIP Lists.',
        ephemeral: true,
    });
    const data = JSON.stringify({
        "data": {
            "type": "rconCommand",
            "attributes": {
            "command": "hll:vipadd",
            "options": {
                "steamID": `${steamId}`,
                "description": description
            }
            }
        }
    });
    const runCommandAdd = async () => {
        for (server of hllServers) {
            await sleep(2000);
            const config = {
                method: 'post',
                url: `https://api.battlemetrics.com/servers/${server.id}/command`,
                headers: { 
                    'Authorization': `Bearer ${bmApiId}`, 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            axios(config)
            .catch(function (error) {
                interaction.followUp({ content: `❌ ${steamId} was unable to add to ${server.name}.` });
                console.log(error);
            })
        }
    }
    runCommandAdd();
}

function removeVIP(interaction, steamId) {
    interaction.reply({ 
        content: 'Removing member from VIP Lists.',
        ephemeral: true,
    });
    const data = JSON.stringify({
        "data": {
            "type": "rconCommand",
            "attributes": {
            "command": "hll:vipdel",
            "options": {
                "steamID": `${steamId}`
            }
            }
        }
    });
    const runCommandRemove = async () => {
        for (server of hllServers) {
            await sleep(2000);
            const config = {
                method: 'post',
                url: `https://api.battlemetrics.com/servers/${server.id}/command`,
                headers: { 
                    'Authorization': `Bearer ${bmApiId}`, 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            axios(config)
            .catch (function (error) {
                interaction.followUp({ content: `❌ ${steamId} was unable to remove from ${server.name}.` });
                return console.log(error);
            })
        }
    }
    runCommandRemove();
}

module.exports = { addVIP, removeVIP };