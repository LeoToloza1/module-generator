import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { styleText } from "node:util";

export default class CrearVista {
    private _nombreModulo: string;
    private baseDir: string = process.cwd();
    private directorioCreado: string;

    constructor(nombreModulo: string) {
        this._nombreModulo = nombreModulo;
        this.directorioCreado = path.join(this.baseDir, "modulos", this._nombreModulo, "views");
    }

    public set nombreModulo(nombre: string) {
        this._nombreModulo = nombre;
        this.directorioCreado = path.join(this.baseDir, "modulos", this._nombreModulo, "views"); // Se actualiza la ruta
    }

    public async crearVista() {
        try {
            await fs.mkdir(this.directorioCreado, { recursive: true });
            console.log("\n");
            console.log(styleText(["gray", "bgGreenBright"], `Directorio de vistas creado en: ${this.directorioCreado}`));
            console.log("\n");

            let archivosBasePath = path.join(this.baseDir, "vistas_base");
            try {
                await fs.access(archivosBasePath);
            } catch {
                const packagePath = path.dirname(fileURLToPath(import.meta.url));
                archivosBasePath = path.join(packagePath, "../../vistas_base");
            }

            console.log(styleText(["blueBright"], `Usando archivos base desde: ${archivosBasePath}`));

            const archivos: string[] = await fs.readdir(archivosBasePath);
            await this.crearArchivos(archivos, archivosBasePath);

        } catch (error) {
            console.error(styleText(["redBright"], `Error al crear la vista: ${error}`));
        }
    }

    private async crearArchivos(archivos: string[], archivosBasePath: string): Promise<void> {
        console.log(styleText(["gray", "bgGreenBright"], `Creando archivos en: ${this.directorioCreado}`));

        for (const archivoBase of archivos) {
            const archivoBasePath = path.join(archivosBasePath, archivoBase);
            try {
                let contenido = await fs.readFile(archivoBasePath, "utf-8");
                //la letra g es para que busque en todo el texto y reemplace en todos los lugares deonde se usa
                contenido = contenido.replace(/{{nombreModulo}}/g, this._nombreModulo);

                const nuevoArchivoPath = path.join(this.directorioCreado, archivoBase);
                await fs.writeFile(nuevoArchivoPath, contenido);

                console.log(styleText(["greenBright"], `Archivo creado: ${nuevoArchivoPath}`));
            } catch (error) {
                console.error(styleText(["redBright"], `Error al leer o escribir el archivo ${archivoBase}: ${error}`));
            }
        }
    }
}
