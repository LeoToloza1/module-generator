import { styleText } from "node:util";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import CrearModulo from "./funcionalidades/crearModulo.js";
import CrearVista from "./funcionalidades/crearVista.js";

export default class Menu {
    private leerDatos = readline.createInterface({ input, output });
    private nombreDirectorio: string = "";
    private crearModulo: CrearModulo;
    private crearVista: CrearVista;

    /**
     *
     */
    constructor() {
        this.crearModulo = new CrearModulo(this.nombreDirectorio);
        this.crearVista = new CrearVista(this.nombreDirectorio);
    }

    private async hacerPregunta(): Promise<void> {
        if (!this.nombreDirectorio) {
            this.nombreDirectorio = await this.leerDatos.question("Nombre del directorio: ");
            this.nombreDirectorio = this.nombreDirectorio.trim();
            this.nombreDirectorio = this.nombreDirectorio.replace(/\x1b\[[0-9;]*m/g, '');
        }
    }

    /**
     * Crea un modulo completo con el nombre especificado. Primero muestra un mensaje en la consola
     * con el nombre del modulo y luego llama al metodo crearModuloCompleto() de la clase CrearModulo.
     * @returns {Promise<void>}.
     */
    private async crearModuloCompleto(): Promise<void> {
        this.leerDatos.write(styleText(["black", "bgGreen"], `Creando modulo completo con el nombre: ${this.nombreDirectorio} \n`));
        this.crearModulo.nombreModulo = this.nombreDirectorio;
        await this.crearModulo.crearModuloCompleto();
        this.leerDatos.write("\n");
    }

    /**
     * Método para crear la vista, si el usuario lo desea.
     * @returns {Promise<void>}.
     */
    private async crearVistaCompleta(): Promise<void> {
        const respuestaVista = await this.leerDatos.question("¿Desea crear la vista para este módulo? (s/n): ");
        if (respuestaVista.toLowerCase() === 's') {
            this.crearVista.nombreModulo = this.nombreDirectorio;
            await this.crearVista.crearVista();
            this.leerDatos.write("\nVista creada correctamente.\n");
        } else {
            this.leerDatos.write("\nNo se creará la vista.\n");
        }
    }

    /**
     * Muestra el menu principal del sistema, donde se puede interactuar
     * para crear modulos.
     * @returns {Promise<void>}.
     */
    public async mostrarMenu(): Promise<void> {
        this.leerDatos.write(styleText(["blackBright"], "=====================\n"));
        this.leerDatos.write(styleText(["blackBright"], "Bienvenido al generador de modulos\n"));
        this.leerDatos.write(styleText(["blackBright"], "Ingrese el nombre del modulo que desea crear\n"));
        this.leerDatos.write(styleText(["blackBright"], "=====================\n"));

        await this.hacerPregunta();

        let continuar = true;

        while (continuar) {

            await this.crearModuloCompleto();

            await this.crearVistaCompleta();

            const respuesta = await this.leerDatos.question("¿Desea crear otro módulo? (s/n): ");
            if (respuesta.toLowerCase() !== 's') {
                continuar = false;
            } else {
                this.nombreDirectorio = "";
                await this.hacerPregunta();
            }
        }

        this.leerDatos.write("Saliendo del sistema\n");
        this.leerDatos.close();
    }
}
