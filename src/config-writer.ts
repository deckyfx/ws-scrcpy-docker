import fs from "fs";

const WS_SCRCPY_PORT = process.env.WS_SCRCPY_PORT || 3001;

const CONFIG_TEMPLATE = "./configs/config.yaml.template";
const CONFIG_TARGET = "./configs/config.yaml";

const PORT_REPLACER = /\{\$WS_SCRCPY_PORT\}/gi;
const template = fs.readFileSync(CONFIG_TEMPLATE).toString();

const new_template = template.replace(PORT_REPLACER, WS_SCRCPY_PORT.toString());

fs.writeFileSync(CONFIG_TARGET, new_template);
