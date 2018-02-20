module.exports =
{
	"methods":
	{
		"wolfram": function(msg, sender, api)
		{
			var q = encodeURIComponent(msg.replace(/wolfram\s*/, ""));
			var host = "http://api.wolframalpha.com";
			var path = "/v1/result?appid=GWR7XK-X469P6XAL2&i="+q;

			api.request(host+path, function(err, res, body)
			{
				if (err) throw err;
				api.say(body);
			});
		}
	}
}

