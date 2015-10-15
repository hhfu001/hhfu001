var fs = require('fs');


function copy(src, dst){
	fs.wirteFileSync(dst, fs.readFileSync(src));
}

function main(argv){
	copy(argv[0], argv[1]);

}


main();