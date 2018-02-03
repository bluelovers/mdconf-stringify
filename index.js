"use strict";
const crlf_normalize_1 = require("crlf-normalize");
const moment = require("moment");
const isPlainObject = require("is-plain-object");
module.exports = function stringify(data, level = 1, skip = [], k) {
    let rs1 = [];
    let rs2 = [];
    if (Array.isArray(data)) {
        if (k || k === 0) {
            rs2.push('#'.repeat(level) + '' + k);
            data.forEach(function (value, index, array) {
                rs2.push(`- ${value}`);
            });
        }
        else {
            data.forEach(function (value, index, array) {
                rs1.push(`- ${value}`);
            });
        }
    }
    else if (typeof data == 'object') {
        for (let k in data) {
            if (skip.includes(k)) {
                continue;
            }
            let row = data[k];
            if (Array.isArray(row)) {
                rs2.push('#'.repeat(level) + '' + k);
                rs2.push(stringify(row, level + 1));
            }
            else if (isPlainObject(row)) {
                rs2.push('#'.repeat(level) + '' + k);
                rs2.push(stringify(row, level + 1));
            }
            else if (moment.isMoment(row)) {
                rs1.push(`- ${k}: ${row.format()}`);
            }
            else if (typeof row == 'string' && /[\r\n]/.test(row)) {
                rs2.push('#'.repeat(level) + '' + k);
                rs2.push(`\n\`\`\`\n${row}\n\`\`\`\n`);
            }
            else {
                rs1.push(`- ${k}: ${row}`);
            }
        }
    }
    else if (typeof data == 'string' && /[\r\n]/.test(data)) {
        if (k || k === 0) {
            rs2.push('#'.repeat(level) + '' + k);
        }
        rs2.push(`\n\`\`\`\n${data}\n\`\`\`\n`);
    }
    else {
        rs1.push(`- ${k || k === 0 ? k + ': ' : ''}${data}`);
    }
    return crlf_normalize_1.LF + (rs1.concat([''].concat(rs2)).join(crlf_normalize_1.LF)).replace(/^\n+|\s+$/g, '') + crlf_normalize_1.LF;
};
