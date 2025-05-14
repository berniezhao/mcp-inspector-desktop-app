// @ts-ignore
// eslint-disable-next-line
import { app, BrowserWindow } from 'electron';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import waitOn from 'wait-on';

const UI_PORT = '6274';

let inspectorProcess: ChildProcess;

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    webPreferences: { contextIsolation: true, preload: path.join(__dirname, 'preload.js') }
  });
  win.loadURL(`http://127.0.0.1:${UI_PORT}`);
}

function startInspector() {
  const bin = path.join(__dirname, '../node_modules/.bin/mcp-inspector');
  const cli = process.platform === 'win32' ? `${bin}.cmd` : bin;
  inspectorProcess = spawn(cli, [], { stdio: 'inherit', shell: false });
  inspectorProcess.on('exit', (code: number | null) =>
    console.log(`[MCP-Inspector] exited with code ${code}`)
  );
}

app.whenReady().then(async () => {
  startInspector();
  await waitOn({ resources: [`http://127.0.0.1:${UI_PORT}`] });
  createMainWindow();
});

app.on('before-quit', () => {
  if (inspectorProcess) inspectorProcess.kill();
}); 