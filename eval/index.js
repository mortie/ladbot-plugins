var safeEval = require("./libs/safe-eval");

var ctx = {
	"reverse": function(str) {
		return str.split("").reverse().join("");
	},
	"Math": {}
}
var names = Object.getOwnPropertyNames(Math);
for (var i in names) {
	var n = names[i];
	ctx[n] = Math[n];
	ctx.Math[n] = Math[n];
}

function strify(obj) {
	if (obj === Infinity)
		return "Infinity";
	if (obj === -Infinity)
		return "-Infinity";
	if (obj === 0 && 1/obj === -Infinity)
		return "-0";
	return JSON.stringify(obj);
}

module.exports = {
	"methods": {
		"eval": function(msg, sender, api) {
			var str = msg.replace(/eval\s+/i, "");
			console.log("evaling", str);
			try {
				var res = safeEval(str, ctx);
				console.log("res is", res);
				if (res === undefined)
					res = "undefined";
				api.say(strify(res));
			} catch (err) {
				console.log("error", err);
				api.say(err.toString());
			}
		}
	}
}
