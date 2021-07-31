const banner = `                                               
_____     _   _               _____ _       _ _                 
|   __|___| |_|_|___    ___   |     | |_ ___| | |___ ___ ___ ___ 
|  |  | -_|  _| |  _|  |___|  |   --|   | .'| | | -_|   | . | -_|
|_____|___|_| |_|_|           |_____|_|_|__,|_|_|___|_|_|_  |___|
                                                        |___|                           
(v0.0.1 Author: Huseyin CAPAN)
****************************************************************************************************
`;
console.log(banner);

import App from "./app";


App.init().then(() => {
	console.log("[Boot] Boot success.");
	App.listen();
}
).catch((err) => {
	console.log(`Error booting app: ${err}`);
	process.exit(2);
});