#!/usr/bin/env node

/**
 * edl-to-yt
 * Create YouTube chapters from EDL exported markers from DaVinci Resolve
 *
 * @author Maxime Rouiller <https://github.com/MaximRouiller>
 */

const fs = require('fs');
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const flags = cli.flags;

(async () => {
    init();

    fs.readFile(flags.path, 'utf8', (err, data) => {
        if (err) throw err;

        var markers = [];
        var lines = data.split('\r\n');
        var regexTimestamp = new RegExp(
            /\d{3,4}  \d{3,4}      V     C        (?<markerTimestamp>\d{2}:\d{2}:\d{2}:\d{2}) \d{2}:\d{2}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}:\d{2}  /
        );
        var regexMarkerName = new RegExp(
            / \|C:\w+ \|M:(?<markerName>[\w\s]+) \|D:1/
        );

        let toYouTubeTimecode = function (toParse) {
            let parts = toParse.split(':');
            let time = new Date(
                Date.parse(`1970-01-01T${parts[0]}:${parts[1]}:${parts[2]}Z`)
            );
            time.setHours(time.getHours() - 1);
            return `${time.getMinutes().toString().padStart(2, '0')}:${time
                .getSeconds()
                .toString()
                .padStart(2, '0')}`;
        };

        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            const followingLine = lines[index + 1];

            let firstMatch = line.match(regexTimestamp)?.groups;
            if (firstMatch) {
                let secondMatch = followingLine.match(regexMarkerName)?.groups;
                if (secondMatch) {
                    markers.push({
                        timecode: toYouTubeTimecode(firstMatch.markerTimestamp),
                        markerName: secondMatch.markerName
                    });
                }
            }
        }

        let output = '';
        if (markers[0].timecode != '00:00') {
            output += '00:00 Intro\r\n';
        }
        markers.forEach(marker => {
            output += `${marker.timecode} ${marker.markerName}\r\n`;
        });

        console.log(output);
    });
})();
