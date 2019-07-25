"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const nodeDependencies_1 = require("./nodeDependencies");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let nodeDependenciesProvider;
    if (vscode.workspace.rootPath !== undefined) {
        nodeDependenciesProvider = new nodeDependencies_1.DepNodeProvider(vscode.workspace.rootPath);
    }
    else {
        nodeDependenciesProvider = new nodeDependencies_1.DepNodeProvider("C:\\Users\\t-vimcde\\Hackathon\\Kids-Dev-Studio\\kids-dev-studio");
    }
    vscode.window.registerTreeDataProvider('saveFile', nodeDependenciesProvider);
    vscode.window.registerTreeDataProvider('newFile', nodeDependenciesProvider);
    vscode.window.registerTreeDataProvider('library', nodeDependenciesProvider);
    vscode.commands.registerCommand('newFile.new', () => vscode.commands.executeCommand('workbench.action.files.newUntitledFile'));
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "kids-dev-studio" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.kidsDevStudio', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Welcome to Kids Dev Studio!');
    });
    context.subscriptions.push(disposable);
    let commandArray = [
        //name in package.json , name of command to execute
        ["extension.save", "workbench.action.files.save"],
    ];
    let disposableCommandsArray = [];
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    commandArray.forEach(command => {
        disposableCommandsArray.push(vscode.commands.registerCommand(command[0], () => {
            vscode.commands.executeCommand(command[1]).then(function () {
            });
        }));
    });
    disposableCommandsArray.forEach(i => {
        context.subscriptions.push(i);
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map