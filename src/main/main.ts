import path from "path";
import { format } from "url";
import { app, Tray, BrowserWindow, globalShortcut } from "electron";
import { is } from "electron-util";
import { WINDOW_ANIMATION_DURATION } from "src/constants";

let win: BrowserWindow | null = null;
let tray = undefined;

const iconPath = path.join(__dirname, "icon/icon.png");

app.dock.hide();

const createTray = () => {
  tray = new Tray(iconPath);
  tray.on("right-click", toggleWindow);
  tray.on("double-click", toggleWindow);
  tray.on("click", toggleWindow);

  globalShortcut.register("Shift+CommandOrControl+G", () => {
    toggleWindow();
  });

  globalShortcut.register("Escape", () => {
    sendMessage("hide");
    win.hide();
  });
};

const toggleWindow = () => {
  if (win.isVisible()) {
    sendMessage("hide");
    setTimeout(() => {
      win.hide();
    }, WINDOW_ANIMATION_DURATION);
  } else {
    sendMessage("show");
    showWindow();
  }
};

const getWindowPosition = () => {
  const windowBounds = win.getBounds();
  const trayBounds = tray.getBounds();

  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  const y = Math.round(trayBounds.y + trayBounds.height + 10);

  return { x: x, y: y };
};

const showWindow = () => {
  const position = getWindowPosition();
  win.setPosition(position.x, position.y, false);
  sendMessage("show");
  win.show();
  win.focus();
};

const sendMessage = (state: "show" | "hide") => {
  win.webContents.send("showWindow", state);
};

async function createWindow() {
  const isDev = is.development;

  win = new BrowserWindow({
    width: 370,
    height: isDev ? 750 : 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      devTools: true,
      enableRemoteModule: false,
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.webContents.openDevTools();
    win.loadURL("http://localhost:9080");
  } else {
    win.loadURL(
      format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  win.on("closed", () => {
    win = null;
  });

  win.on("blur", () => {
    if (win.isVisible()) {
      sendMessage("hide");
      setTimeout(() => {
        win.hide();
      }, WINDOW_ANIMATION_DURATION);
    }
  });

  win.on("focus", () => {
    if (win.isVisible()) {
      sendMessage("show");
    }
  });
}

app.on("ready", () => {
  createTray();
  createWindow();
});
