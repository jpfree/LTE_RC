module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pluginOptions: {
        electronBuilder: {
            // List native deps here if they don't work
            externals: [''],
            // If you are using Yarn Workspaces, you may have multiple node_modules folders
            // List them all here so that VCP Electron Builder can find them
            nodeModulesPath: ['../../node_modules', './node_modules'],
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                appId: 'kr.re.keti.app',
                productName: "radio_calibration",
                win: {
                    icon: "./public/logo.png",
                    target: [
                        {
                            target: "nsis",
                            arch: ["x64", "ia32"]
                        }
                    ]
                },
                nsis:{
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
                //         url: "https://github.com/dnjstjr93/radio_calibration.git",
                //         private: true,
                //         token: process.env.GH_TOKEN
                //     }
                // ]
            }
        }
    }
}
