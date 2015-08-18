var http = require("http");

module.exports =
{
	"methods":
	{
		"shorten": function(msg, sender, api)
		{
			var url = msg.split(/\s+/)[0];

			//don't shorten short links
			if (url.length < 25)
				return;

			api.request("http://xeo.la/url/?url="+url.split("#")[0], function(err, res, body)
			{
				if (err) throw err;

				var shortened = body.split(/\n/)[0];

				api.request(url.split("#")[0], function(err, res, body) {
					if (err) throw err;

					var title;
					var match = body.match(/<\s*title\s*>([^>]+)<\s*\/\s*title\s*>/mi);
					if (!match)
						title = "No Title";
					else
						title = match[1] || "No Title";

					api.say(shortened+" ("+title+")");
				});
			});
		}
	}
}
