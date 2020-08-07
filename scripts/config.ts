/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, IncrementCompilePlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, RenamePlugin } from 'built-in';
import { CustomPlugin } from './myplugin';
import { EuiCompilerPlugin } from './plugins/eui-compiler-plugin';
import { WebpackDevServerPlugin, WebpackBundlePlugin } from './plugins/webpack-plugin';

const config: ResourceManagerConfig = {


    buildConfig: (params) => {

        const { target, command, projectName, version } = params;

        if (command == 'build') {
            const outputDir = '.';
            return {
                outputDir,
                commands: [
                    new WebpackDevServerPlugin({ //新的 Webpack 编译器
                        libraryType: "debug",
                        defines: { DEBUG: true, RELEASE: false },
                        typescript: { mode: 'modern' },
                        html: {
                            templateFilePath: "template/web/index.html"
                        },
                        open: true
                    }),
                ]
            }
        }
    },

    mergeSelector: (path) => {
        if (path.indexOf("assets/bitmap/") >= 0) {
            return "assets/bitmap/sheet.sheet"
        }
        else if (path.indexOf("armature") >= 0 && path.indexOf(".json") >= 0) {
            return "assets/armature/1.zip";
        }
    },

    typeSelector: (path) => {
        const ext = path.substr(path.lastIndexOf(".") + 1);
        const typeMap = {
            "jpg": "image",
            "png": "image",
            "webp": "image",
            "json": "json",
            "fnt": "font",
            "pvr": "pvr",
            "mp3": "sound",
            "zip": "zip",
            "sheet": "sheet",
            "exml": "text"
        }
        let type = typeMap[ext];
        if (type == "json") {
            if (path.indexOf("sheet") >= 0) {
                type = "sheet";
            } else if (path.indexOf("movieclip") >= 0) {
                type = "movieclip";
            };
        }
        return type;
    }
}


export = config;
