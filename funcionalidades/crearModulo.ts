import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { styleText } from "node:util";

export default class CrearModulo {
    private _nombreModulo: string = "";
    private baseDir: string = process.cwd();
    private directorioCreado: string = "";

    constructor(nombreModulo: string) {
        this._nombreModulo = nombreModulo;
    }

    public set nombreModulo(nombre: string) {
        this._nombreModulo = nombre;
    }

    public async crearModuloCompleto(): Promise<void> {
        const carpetaModulos = path.join(this.baseDir, "modulos");

        this.directorioCreado = path.join(carpetaModulos, this._nombreModulo);
        console.log("\n");
        console.log(styleText("bgRed", `Nombre del directorio creado: -> ${this.directorioCreado}`))

        let archivosBasePath = path.join(this.baseDir, "archivos_base");

        try {

            await fs.access(archivosBasePath);
        } catch {

            const packagePath = path.dirname(fileURLToPath(import.meta.url));
            archivosBasePath = path.join(packagePath, "../../archivos_base");
        }


        console.log("\n");
        console.log(styleText(["gray", "bgGreenBright"], `Carpeta de módulos en: ${carpetaModulos}`));
        console.log("\n");
        console.log(styleText(["gray", "bgGreenBright"], `Carpeta del modulo ${this._nombreModulo} en: ${this.directorioCreado}`));
        console.log("\n");
        console.log(styleText(["gray", "bgGreenBright"], `Usando archivos base desde: ${archivosBasePath}`));
        console.log("\n");

        try {
            await fs.mkdir(carpetaModulos, { recursive: true });
            await fs.mkdir(this.directorioCreado, { recursive: true });
            console.log(styleText(["gray", "bgGreenBright"], `Módulo creado en: ${this.directorioCreado}`));

            const archivos: string[] = await fs.readdir(archivosBasePath);
            await this.crearArchivos(archivos, archivosBasePath);
        } catch (error) {
            console.error(`Error al crear el módulo: ${error}`);
        }
    }



    private async crearArchivos(archivos: string[], archivosBasePath: string): Promise<void> {
        for (const archivoBase of archivos) {
            const archivoBasePath = path.join(archivosBasePath, archivoBase);
            try {
                let contenido = await fs.readFile(archivoBasePath, "utf-8");
                // Reemplazar el placeholder {{nombreModulo}} con el nombre del módulo
                contenido = contenido.replace(/{{nombreModulo}}/g, this._nombreModulo);

                // Verificar si el archivo es el Router y asignar un nombre diferente
                let nuevoArchivoNombre: string;
                if (archivoBase.toLowerCase().includes("router")) {
                    nuevoArchivoNombre = `${this._nombreModulo}Router.ts`; // Nombre especial para el Router
                } else {
                    nuevoArchivoNombre = archivoBase.replace(/\.txt$/, ".ts"); // Mantener el nombre original con extensión .ts
                }

                const nuevoArchivoPath = path.join(this.directorioCreado, nuevoArchivoNombre);
                await fs.writeFile(nuevoArchivoPath, contenido);

                console.log(styleText(["greenBright"], `Archivo creado: ${nuevoArchivoPath}`));
            } catch (error) {
                console.error(`Error al leer/escribir el archivo ${archivoBase}: ${error}`);
            }
        }
    }
}
