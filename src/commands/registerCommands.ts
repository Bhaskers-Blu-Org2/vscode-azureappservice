/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { commands } from 'vscode';
import { AppSettingTreeItem, registerSiteCommand } from 'vscode-azureappservice';
import { AzureTreeItem, IActionContext, openInPortal as uiOpenInPortal, registerCommand } from 'vscode-azureextensionui';
import { DeploymentSlotsNATreeItem, ScaleUpTreeItem } from '../explorer/DeploymentSlotsTreeItem';
import { ext } from '../extensionVariables';
import { addAppSetting } from './appSettings/addAppSetting';
import { deleteAppSetting } from './appSettings/deleteAppSettings';
import { downloadAppSettings } from './appSettings/downloadAppSettings';
import { editAppSetting } from './appSettings/editAppSetting';
import { renameAppSetting } from './appSettings/renameAppSetting';
import { toggleSlotSetting } from './appSettings/toggleSlotSetting';
import { uploadAppSettings } from './appSettings/uploadAppSettings';
import { browseWebsite } from './browseWebsite';
import { addCosmosDBConnection } from './connections/addCosmosDBConnection';
import { removeCosmosDBConnection } from './connections/removeCosmosDBConnection';
import { revealConnection } from './connections/revealConnection';
import { revealConnectionInAppSettings } from './connections/revealConnectionInAppSettings';
import { createSlot } from './createSlot';
import { createWebApp, createWebAppAdvanced } from './createWebApp/createWebApp';
import { deleteWebApp } from './deleteWebApp';
import { deploy } from './deploy/deploy';
import { deploySlot } from './deploy/deploySlot';
import { connectToGitHub } from './deployments/connectToGitHub';
import { disconnectRepo } from './deployments/disconnectRepo';
import { editScmType } from './deployments/editScmType';
import { redeployDeployment } from './deployments/redeployDeployment';
import { viewCommitInGitHub } from './deployments/viewCommitInGitHub';
import { viewDeploymentLogs } from './deployments/viewDeploymentLogs';
import { generateDeploymentScript } from './generateDeploymentScript';
import { installCosmosDBExtension } from './installCosmosDBExtension';
import { enableFileLogging } from './logstream/enableFileLogging';
import { startStreamingLogs } from './logstream/startStreamingLogs';
import { stopStreamingLogs } from './logstream/stopStreamingLogs';
import { openInPortal } from './openInPortal';
import { startRemoteDebug } from './remoteDebug/startRemoteDebug';
import { restartWebApp } from './restartWebApp';
import { showFile } from './showFile';
import { startSsh } from './startSsh';
import { startWebApp } from './startWebApp';
import { stopWebApp } from './stopWebApp';
import { swapSlots } from './swapSlots';
import { cloneTrialApp } from './trialApp/cloneTrialApp';
import { createTrialApp } from './trialApp/createTrialApp';
import { importTrialApp } from './trialApp/importTrialApp';
import { removeTrialApp } from './trialApp/removeTrialApp';
import { showTutorial } from './trialApp/showTutorial';
import { transferToSubscription } from './trialApp/transferToSubscription';

export function registerCommands(): void {
    registerCommand('appService.TransferToSubscription', transferToSubscription);
    registerCommand('appService.CreateTrialApp', createTrialApp);
    registerCommand('appService.CloneTrialApp', cloneTrialApp);
    registerCommand('appService.ShowTutorial', showTutorial);
    registerCommand('appService.ImportTrialApp', importTrialApp);
    registerCommand('appService.RemoveTrialApp', removeTrialApp);
    registerCommand('appService.AddCosmosDBConnection', addCosmosDBConnection);
    registerCommand('appService.appSettings.Add', addAppSetting);
    registerCommand('appService.appSettings.Delete', deleteAppSetting);
    registerCommand('appService.appSettings.Download', downloadAppSettings);
    registerCommand('appService.appSettings.Edit', editAppSetting);
    registerCommand('appService.appSettings.Rename', renameAppSetting);
    registerCommand('appService.appSettings.ToggleSlotSetting', toggleSlotSetting);
    registerCommand('appService.appSettings.Upload', uploadAppSettings);
    registerCommand('appService.Browse', browseWebsite);
    registerCommand('appService.ConfigureDeploymentSource', editScmType);
    registerCommand('appService.connectToGitHub', connectToGitHub);
    registerCommand('appService.CreateSlot', createSlot);
    registerCommand('appService.CreateWebApp', createWebApp);
    registerCommand('appService.CreateWebAppAdvanced', createWebAppAdvanced);
    registerCommand('appService.Delete', deleteWebApp);
    registerCommand('appService.DeploymentScript', generateDeploymentScript);
    registerCommand('appService.DisconnectRepo', disconnectRepo);
    registerCommand('appService.EnableFileLogging', enableFileLogging);
    registerCommand('appService.InstallCosmosDBExtension', installCosmosDBExtension);
    registerCommand('appService.LoadMore', async (actionContext: IActionContext, node: AzureTreeItem) => await ext.tree.loadMore(node, actionContext));
    registerCommand('appService.openFile', showFile, 500);
    registerCommand('appService.OpenInPortal', openInPortal);
    registerCommand('appService.Refresh', async (_actionContext: IActionContext, node?: AzureTreeItem) => await ext.tree.refresh(node));
    registerCommand('appService.RemoveCosmosDBConnection', removeCosmosDBConnection);
    registerCommand('appService.Restart', restartWebApp);
    registerCommand('appService.RevealConnection', revealConnection);
    registerCommand('appService.RevealConnectionInAppSettings', revealConnectionInAppSettings);
    registerCommand('appService.ScaleUp', async (_context: IActionContext, node: DeploymentSlotsNATreeItem | ScaleUpTreeItem) => await uiOpenInPortal(node.root, node.scaleUpId));
    registerCommand('appService.selectSubscriptions', () => commands.executeCommand("azure-account.selectSubscriptions"));
    registerCommand('appService.showOutputChannel', () => { ext.outputChannel.show(); });
    registerCommand('appService.Start', startWebApp);
    registerCommand('appService.StartRemoteDebug', startRemoteDebug);
    registerCommand('appService.StartSsh', startSsh);
    registerCommand('appService.startStreamingLogs', startStreamingLogs);
    registerCommand('appService.Stop', stopWebApp);
    registerCommand('appService.StopLogStream', stopStreamingLogs);
    registerCommand('appService.SwapSlots', swapSlots);
    registerCommand('appService.toggleAppSettingVisibility', async (_actionContext: IActionContext, node: AppSettingTreeItem) => { await node.toggleValueVisibility(); }, 250);
    registerCommand('appService.ViewCommitInGitHub', viewCommitInGitHub);
    registerSiteCommand('appService.Deploy', deploy);
    registerSiteCommand('appService.DeploySlot', deploySlot);
    registerSiteCommand('appService.Redeploy', redeployDeployment);
    registerSiteCommand('appService.viewDeploymentLogs', viewDeploymentLogs);
}
