const mqtt = require('mqtt');
const fs = require('fs');

const config = {
    host: '',  // IP tlačiarne
    port: 8883,
    username: 'bblp',
    password: '',  // Access code z tlačiarne
    serial: ''      // Serial z tlačiarne
};

const client = mqtt.connect(`mqtts://${config.host}:${config.port}`, {
    username: config.username,
    password: config.password,
    rejectUnauthorized: false
});

client.on('connect', () => {
    console.log('Connected to Bambu printer');
    client.subscribe(`device/${config.serial}/report`);
});

client.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        // console.log(data.print)
        // Extrahuj údaje
        const stats = {
            nozzle_temp: data.print?.nozzle_temper || 0,
            bed_temp: data.print?.bed_temper || 0,
            nozzle_target: data.print?.nozzle_target_temper || 0,
            bed_target: data.print?.bed_target_temper || 0,
            progress: data.print?.mc_percent || 0,
            layer: data.print?.layer_num || 0,
            speed: data.print?.spd_mag || 100,
            print_time: data.print?.mc_remaining_time || 0
        };

        // Zapíš do súboru pre OBS
        const output = `Nozzle: ${stats.nozzle_temp}°C / ${stats.nozzle_target}°C
Bed: ${stats.bed_temp}°C / ${stats.bed_target}°C
Progress: ${stats.progress}%
Layer: ${stats.layer}
Speed: ${stats.speed}%
Remaining: ${Math.floor(stats.print_time)}min`;

        fs.writeFileSync('./bambu_stats.txt', output);

    } catch (e) {
        console.error('Parse error:', e);
    }
});

client.on('error', (err) => {
    console.error('MQTT Error:', err);
});
