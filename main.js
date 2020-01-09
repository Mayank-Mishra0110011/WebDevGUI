const { app, BrowserWindow, screen, Menu, globalShortcut } = require('electron');

let win;

function createWindow() {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	win = new BrowserWindow({
		width: width,
		height: height,
		webPreferences: {
			nodeIntegration: true
		},
		title: 'WebDev GUI'
	});

	const menu = Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{ label: 'New' },
				{ label: 'Create' },
				{ label: 'Open' },
				{ label: 'Save' },
				{ label: 'Save As' },
				{ label: 'Export' },
				{ label: 'Export As' },
				{ label: 'Print' },
				{ label: 'Properties' },
				{
					label: 'Exit',
					click() {
						app.quit();
					}
				}
			]
		}
	]);
	Menu.setApplicationMenu(menu);

	globalShortcut.register('CommandOrControl+Q', () => {
		app.quit();
	});

	win.loadFile('index.html');
	win.webContents.openDevTools();
	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});
