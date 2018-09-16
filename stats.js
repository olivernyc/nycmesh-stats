const fs = require("fs");

var data = "{\n";
readFiles(
	"./potential/",
	function(filename, content) {
		try {
			const date = filename.split(".")[1];
			let count = 0;
			const nodes = JSON.parse(content).features;
			nodes.forEach(node => {
				count += 1;
				if (node.properties.otherNodes) {
					const otherNodeCount =
						node.properties.otherNodes.split(",").length - 1;
					count += otherNodeCount;
				}
			});
			data += `"${date}": ${count},\n`;
		} catch (e) {
			console.log(filename, e);
		}
	},
	function(err) {
		throw err;
	},
	() => {
		console.log(data);
	}
);

function readFiles(dirname, onFileContent, onError, cb) {
	fs.readdir(dirname, function(err, filenames) {
		if (err) {
			onError(err);
			return;
		}
		filenames.reverse().forEach(function(filename) {
			const content = fs.readFileSync(dirname + filename, "utf-8");
			onFileContent(filename, content);
		});
		cb();
	});
}
