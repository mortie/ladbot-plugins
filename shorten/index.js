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

			api.request("http://url.xeo.la/api/?url="+url.split("#")[0], function(err, res, body)
			{
				if (err) throw err;

				var obj = JSON.parse(body);
				var shortened = "http://xeo.la/"+obj.code;

				api.request(url.split("#")[0], function(err, res, body) {
					if (err) throw err;

					var title;
					var match = body.match(/<\s*title\s*>([^>]+)<\s*\/\s*title\s*>/mi);
					if (!match)
						title = "No Title";
					else
						title = (match[1] || "No Title").trim()
							.replace(/\s+/g, " ")
							.replace("&quot;", "'")
							.replace("&gt;", ">")
							.replace("&lt;", "<");

					api.say(shortened+" ("+title+")");
				});
			});
		}
	}
}
