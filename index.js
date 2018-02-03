"use strict";
const crlf_normalize_1 = require("crlf-normalize");
const moment = require("moment");
const isPlainObject = require("is-plain-object");
module.exports = function stringify(data, level = 1, skip = []) {
    let rs1 = [];
    let rs2 = [];
    if (Array.isArray(data)) {
        data.forEach(function (value, index, array) {
            rs1.push(`- ${value}`);
        });
    }
    else if (typeof data == 'object') {
        for (let k in data) {
            if (skip.includes(k)) {
                continue;
            }
            if (Array.isArray(data[k])) {
                rs2.push('#'.repeat(level) + '' + k);
                rs2.push(stringify(data[k], level + 1));
            }
            else if (isPlainObject(data[k])) {
                rs2.push('#'.repeat(level) + '' + k);
                rs2.push(stringify(data[k], level + 1));
            }
            else if (moment.isMoment(data[k])) {
                rs1.push(`- ${k}: ${data[k].format()}`);
            }
            else {
                rs1.push(`- ${k}: ${data[k]}`);
            }
        }
    }
    else {
        rs1.push(`- ${data}`);
    }
    return crlf_normalize_1.LF + (rs1.concat([''].concat(rs2)).join(crlf_normalize_1.LF)).replace(/^\n+|\s+$/g, '') + crlf_normalize_1.LF;
};
