var safeEval = require("./libs/safe-eval");

var ctx = {
	"reverse": function(str) {
		return str.split("").reverse().join("");
	}
}
var names = Object.getOwnPropertyNames(Math);
for (var i in names) {
	var n = names[i];
	ctx[n] = Math[n];
}

module.exports = {
	"methods": {
		"eval": function(msg, sender, api) {
			var str = msg.replace(/eval\s+/i, "");
			try {
				var res = safeEval(str, ctx);
				if (res === undefined)
					res = "undefined";
				else if (res === null)
					res = "null";
				api.say(res);
			} catch (err) {
				api.say(err.toString());
			}
		}
	}
}
