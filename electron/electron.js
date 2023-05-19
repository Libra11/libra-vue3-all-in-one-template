/*
 * @Author: Libra
 * @Date: 2023-03-08 16:59:46
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /libra-vue3-all-in-one-template/electron/electron.js
 */
const path = require('path')
const { app, BrowserWindow, globalShortcut, protocol, Menu, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')

const isDev = process.env.IS_DEV === 'true'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
app.commandLine.appendSwitch('ignore-certificate-errors')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{
		scheme: 'app',
		privileges: {
			secure: true,
			standard: true,
			corsEnabled: true,
			supportFetchAPI: true,
		},
	},
])

function createWindow() {
	Menu.setApplicationMenu(null)
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 700,
		center: true,
		show: true,
		minimizable: false,
		maximizable: false,
		resizable: false,
		autoHideMenuBar: true,
		webPreferences: {
			webSecurity: false,
			enableRemoteModule: true,
			nodeIntegration: true,
			contextIsolation: false,
		},
	})
	openDevTool(mainWindow)
	checkUpdate(mainWindow)
	mainWindow.on('resize', (event) => {
		event.preventDefault()
	})
	// 启用 explorer
	mainWindow.on('close', () => {
		// BrowserWindow.getFocusedWindow().webContents.send('closeWindow')
		// exec('cmd.exe /s /c "C:\\windows\\explorer.exe"')
		// exec('taskkill /im hotkey.exe')
	})

	mainWindow.loadURL(isDev ? 'http://localhost:5173/#/welcome' : `file://${path.join(__dirname, '../dist/index.html#/welcome')}`)
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
}

app.whenReady().then(() => {
	createWindow()
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('will-quit', () => {
	globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
	app.quit()
})

// 方便调试
function openDevTool(win) {
	globalShortcut.register('CommandOrControl+R+T+Y', () => {
		win.webContents.openDevTools()
	})
	// globalShortcut.register('CommandOrControl+R', function() {
	//   // console.log('CommandOrControl+R is pressed')
	//   win.reload()
	// })
}

// check update
function checkUpdate(win) {
	if (process.platform === 'darwin') {
		autoUpdater.setFeedURL({
			provider: 'generic',
			url: 'https://exam-file.iguokao.com/client/darwin',
		})
	} else {
		autoUpdater.setFeedURL({
			provider: 'generic',
			url: 'https://exam-file.iguokao.com/client/win32',
		})
	}
	autoUpdater.autoDownload = false
	ipcMain.on('checkForUpdates', () => {
		autoUpdater.checkForUpdatesAndNotify()
	})
	autoUpdater.on('error', function (error) {
		printUpdaterMessage('error')
		win.webContents.send('updateError', error)
	})
	autoUpdater.on('checking-for-update', function () {
		printUpdaterMessage('checking')
	})
	autoUpdater.on('update-available', function (info) {
		printUpdaterMessage('updateAvailable')
		win.webContents.send('updateAvailable', info)
	})
	ipcMain.on('comfirmUpdate', () => {
		autoUpdater
			.downloadUpdate()
			.then((path) => {
				win.webContents.send('feedURL', JSON.stringify(path))
			})
			.catch((e) => win.webContents.send('feedURL', JSON.stringify(e)))
	})
	autoUpdater.on('update-not-available', function (info) {
		printUpdaterMessage('updateNotAvailable')
		win.webContents.send('updateNotAvailable', info)
	})
	autoUpdater.on('download-progress', function (progressObj) {
		printUpdaterMessage('downloadProgress')
		win.webContents.send('downloadProgress', progressObj)
	})
	autoUpdater.on('update-downloaded', function () {
		win.webContents.send('updateDownloaded')
		ipcMain.on('updateNow', () => {
			autoUpdater.quitAndInstall()
		})
	})

	function printUpdaterMessage(arg) {
		const message = {
			error: '更新出错',
			checking: '正在检查更新',
			updateAvailable: '检测到新版本',
			downloadProgress: '下载中',
			updateNotAvailable: '无新版本',
		}
		win.webContents.send('printUpdaterMessage', message[arg])
	}
}
