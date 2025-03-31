import * as fs from "node:fs/promises";
import path from "node:path";
import { styleText } from "node:util";

export default class CrearVista {
    private _nombreModulo: string = "";
    private baseDir: string = process.cwd();
    private directorioCreado: string = "";

    constructor(nombreModulo: string) {
        this._nombreModulo = nombreModulo;
    }

    public get nombreModulo(): string {
        return this._nombreModulo;
    }

    public set nombreModulo(nombre: string) {
        this._nombreModulo = nombre;
    }

    public async crearVista() {
        console.log(styleText(["gray", "bgGreenBright"], `Directorio actual de trabajo: ${this.baseDir}`));
        this.directorioCreado = path.join(this.baseDir, this._nombreModulo, "views");

        try {

            await fs.mkdir(this.directorioCreado, { recursive: true });
            console.log(styleText(["gray", "bgGreenBright"], `Directorio de vistas creado en: ${this.directorioCreado}`));
            const archivos: string[] = await fs.readdir(path.join(this.baseDir, "vistas_base"));
            await this.crearArchivos(archivos);

        } catch (error) {
            console.error(`Error al crear el módulo: ${error}`);
        }
    }

    private async crearArchivos(archivos: string[]): Promise<void> {
        console.log(styleText(["gray", "bgGreenBright"], `Creando archivos en: ${this.directorioCreado}\n`));
        for (const archivoBase of archivos) {
            const archivoBasePath = path.join(this.baseDir, "vistas_base", archivoBase);
            try {

                let contenido = await fs.readFile(archivoBasePath, "utf-8");
                //la letra g es para que busque en todo el texto y reemplace en todos los lugares deonde se usa
                contenido = contenido.replace(/{{nombreModulo}}/g, this._nombreModulo);

                const nuevoArchivoPath = path.join(this.directorioCreado, archivoBase);

                await fs.writeFile(nuevoArchivoPath, contenido);
                console.log(styleText(["gray", "bgGreenBright"], `Archivo creado: ${nuevoArchivoPath}`));

            } catch (error) {
                console.error(`Error al leer o escribir el archivo ${archivoBase}: ${error}`);
            }
        }
    }
}
