import Controller from "../../Controllers/Controller.js";
import { Plugins } from "./Plugin/Plugin.js";

export const ListPlugin = [
    {
        plugin: Plugins,
        options:{
            Service: new Controller
        }
    }
];