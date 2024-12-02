mod plugins;

use crate::plugins::{build_log_plugin, build_si_plugin};
use tauri::Manager;
use tauri_plugin_deep_link;
use tauri_plugin_dialog;
use tauri_plugin_fs;
use tauri_plugin_http;
use tauri_plugin_os;
use tauri_plugin_process;
use tauri_plugin_sql;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(build_si_plugin())
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(build_log_plugin())
        .setup(|_app| {
            let _window = _app.get_webview_window("WechatDemo");
            #[cfg(debug_assertions)]
            if _window.is_some() {
                _window.unwrap().open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
