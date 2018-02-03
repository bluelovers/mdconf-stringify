/**
 * Created by user on 2018/2/4/004.
 */

import { crlf, LF } from 'crlf-normalize';
import * as moment from 'moment';
import * as isPlainObject from 'is-plain-object';

export = function stringify(data, level: number = 1, skip = []): string
{
	let rs1: string[] = [];
	let rs2: string[] = [];

	if (Array.isArray(data))
	{
		data.forEach(function (value, index, array)
		{
			rs1.push(`- ${value}`);
		})
	}
	else if (typeof data == 'object')
	{
		for (let k in data)
		{
			if (skip.includes(k))
			{
				continue;
			}

			if (Array.isArray(data[k]))
			{
				rs2.push('#'.repeat(level) + '' + k);
				rs2.push(stringify(data[k], level + 1));
			}
			else if (isPlainObject(data[k]))
			{
				rs2.push('#'.repeat(level) + '' + k);
				rs2.push(stringify(data[k], level + 1));
			}
			else if (moment.isMoment(data[k]))
			{
				rs1.push(`- ${k}: ${data[k].format()}`);
			}
			else
			{
				rs1.push(`- ${k}: ${data[k]}`);
			}
		}
	}
	else
	{
		rs1.push(`- ${data}`);
	}

	return LF + (rs1.concat([''].concat(rs2)).join(LF)).replace(/^\n+|\s+$/g, '') + LF;
}
