var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var url = "https://www.reddit.com/top/";

request(url, function(err, response, html) {
	if(!err) {
		var $ = cheerio.load(html);
		var allItems = $("#siteTable").children();
		var items = [];
		allItems.each(function(index) {
			var result = $("#siteTable").children().eq(index).children().eq(4).find("a.title").text();
			if(result !== "") {
				items.push(result);
			}
		});

		fs.writeFile("output.xls", JSON.stringify(items, null, 4), function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("Data has been added to a file!");
			}
		});

		console.log(items);
	}
});