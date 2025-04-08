#!/usr/bin/env node
import Menu from "./menu.js";

const menu = new Menu();
menu.mostrarMenu();

//crear un index.ts dentro de cada modulo que inicialice el modulo completo y reciba dependencias