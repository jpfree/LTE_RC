module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            // List native deps here if they don't work
            // If you are using Yarn Workspaces, you may have multiple node_modules folders
            // List them all here so that VCP Electron Builder can find them
            nodeModulesPath: ['../../node_modules', './node_modules'],
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                appId: 'kr.re.keti.app',
                productName: "LTE_RC",
                win: {
                    icon: "./public/logo.png",
                    target: [
                        {
                            target: "nsis",
                            arch: ["x64", "ia32"]
                        }
                    ]
                },
                nsis: {
                    oneClick: false,
                    perMachine: true,
                    allowToChangeInstallationDirectory: true
                },
                // publish: [
                //     {
                //         provider: "github",
                //         owner: "dnjstjr93",
                //         releaseType: "release",
                //         channel: "latest",
                //         url: "https://github.com/dnjstjr93/LTE_RC.git",
                //         private: true,
                //         token: process.env.GH_TOKEN
                //     }
                // ]
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    outputDir: '../backend/public',
}
