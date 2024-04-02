/*
 * @Author: Libra
 * @Date: 2023-05-30 10:44:24
 * @LastEditTime: 2024-04-02 14:25:00
 * @LastEditors: Libra
 * @Description:/*
 */
import path from 'path'
import { app, BrowserWindow, protocol, powerSaveBlocker, globalShortcut } from 'electron'
import remote from '@electron/remote/main'

remote.initialize()

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

const isDev = process.env.VITE_DEV_SERVER_URL
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
powerSaveBlocker.start('prevent-display-sleep')
app.setLoginItemSettings({ openAtLogin: true, path: app.getPath('exe') })

let mainWindow: BrowserWindow | null = null

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
		},
	})
	remote.enable(mainWindow.webContents)
	mainWindow.loadURL(isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`)
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
}

function devTools() {
	globalShortcut.register('CommandOrControl+T+Y', () => {
		mainWindow?.webContents.openDevTools()
	})
}

app.whenReady().then(() => {
	createWindow()
	devTools()
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	app.quit()
})
