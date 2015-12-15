module.exports =
{
	"methods":
	{

		"cref": function(msg, sender, api)
		{
			var word = msg.match(/\"[^\"]+\"/g)[0];
			word = word.substring(1, word.length-1);
			var type = "header_proto";
			if (msg.match(/\"[^\"]+\"/g).length >= 2) 
			{
				type = msg.match(/\"[^\"]+\"/g)[1];
				type = type.substring(1, type.length-1);
			}

			var base = "http://cplusplus.com/"+encodeURIComponent(word);

			api.request(base, function(err, res, body)
			{
				if (body.match("<title>404 Page Not Found</title>") == null) {
					var proto = "No prototypes for types!";
					if (body.match(/<div class=\"C_prototype\">(.+)<\/div></) != null) {
						proto = body.match(/<div class=\"C_prototype\">(.+)<\/div></)[0];
						proto = proto.replace(/<\/?div( class=\"[^\"]+\")?>/g, "");
						proto = proto.replace(/<\/?[^>]+>/g, "");
						proto = proto.replace(/<$/, "");
					}

					var descrip = body.match(/<div id=\"I_description\">(.+)<\/div>/)[0];
					descrip = descrip.replace(/<\/?div(id=\".+\")?>/g, "");
					descrip = descrip.replace(/<\/?[^>]+>/g, "");

					var ret = "Types can not return!";
					if (body.match(/<section id=\"return\">(.|\n)+<\/section>/m) != null) {
						ret = body.match(/<section id=\"return\">(.|\n)+<\/section>/m)[0];
						ret = ret.replace(/<br>/g, "\n");
						ret = ret.replace(/\n+/g, "\n");
						ret = ret.replace(/<\/?i>/g, "");
						ret = ret.replace(/<a href=\"/g, "http://cplusplus.com");
						ret = ret.replace(/\".+<\/a>/g, "");
						ret = ret.replace(/<\/?[^>]+>/g, "");
					}

					var header = body.match(/<div id=\"I_file\">(.+)<\/div>/)[0];
					header = header.replace(/<\/?div( id=\".+\")?>/g, "");
					header = header.replace(/&lt;/g, "<");
					header = header.replace(/&gt;/g, ">");
					header = header.replace(/&quot;/g, "\"");
					//List of c++ headers to be replaced by replace C headers
					var heads = ["cassert", "ccomplex", "cctype", "cerrno", "cfenv", "cfloat", "cinttypes", "ciso646",
					             "climits", "clocale", "cmath", "csetjmp", "csignal", "cstdalign", "cstdarg", "cstdbool", "cstddef",
					             "cstdint", "cstdio", "cstdlib", "cstring", "ctgmath", "ctime", "cuchar", "cwchar", "cwctype"];

					heads.forEach(function(entry)
					{
						header = header.replace(entry, entry.substring(1)+".h");
					});

					switch (type)
					{
						case "prototype":
							api.say(proto);
							break;
						case "description":
							api.say(descrip);
							break;
						case "return":
							api.say(ret);
							break;
						case "file":
						case "header":
						case "location":
							api.say(header);
							break;
						case "header_proto":
							api.say(header);
							api.say(proto);
							break;
						default:
							api.say("Unknown type.");
					}

				} 
				else
				{
					api.randomMessage("nodefs", {"word": word});
				}

			});
		}
	}
}
