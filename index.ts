/**
 * Created by user on 2018/2/4/004.
 */

import { crlf, LF } from 'crlf-normalize';
import * as moment from 'moment';
import * as isPlainObject from 'is-plain-object';

export = function stringify(data, level: number = 1, skip: string[] = [], k?): string
{
	let rs1: string[] = [];
	let rs2: string[] = [];

	if (Array.isArray(data))
	{
		if (k || k === 0)
		{
			rs2.push('#'.repeat(level) + '' + k);

			data.forEach(function (value, index, array)
			{
				rs2.push(`- ${value}`);
			})
		}
		else
		{
			data.forEach(function (value, index, array)
			{
				rs1.push(`- ${value}`);
			})
		}
	}
	else if (typeof data == 'object')
	{
		for (let k in data)
		{
			if (skip.includes(k))
			{
				continue;
			}

			let row = data[k];

			if (Array.isArray(row))
			{
				rs2.push('#'.repeat(level) + '' + k);
				rs2.push(stringify(row, level + 1));
			}
			else if (isPlainObject(row))
			{
				rs2.push('#'.repeat(level) + '' + k);
				rs2.push(stringify(row, level + 1));
			}
			else if (moment.isMoment(row))
			{
				rs1.push(`- ${k}: ${row.format()}`);
			}
			else if (typeof row == 'string' && /[\r\n]/.test(row))
			{
				rs2.push('#'.repeat(level) + '' + k);
				rs2.push(`\n\`\`\`\n${row}\n\`\`\`\n`);
			}
			else
			{
				rs1.push(`- ${k}: ${row}`);
			}
		}
	}
	else if (typeof data == 'string' && /[\r\n]/.test(data))
	{
		if (k || k === 0)
		{
			rs2.push('#'.repeat(level) + '' + k);
		}
		rs2.push(`\n\`\`\`\n${data}\n\`\`\`\n`);
	}
	else
	{
		rs1.push(`- ${ k || k === 0 ? k + ': ' : '' }${data}`);
	}

	return LF + (rs1.concat([''].concat(rs2)).join(LF)).replace(/^\n+|\s+$/g, '') + LF;
}
