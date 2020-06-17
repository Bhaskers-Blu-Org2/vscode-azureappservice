import { commands, ProgressLocation, window } from 'vscode';
import { IActionContext } from 'vscode-azureextensionui';
import { TrialAppLoginSession } from '../../constants';
import { TrialAppTreeItem } from '../../explorer/trialApp/TrialAppTreeItem';
import { ext } from '../../extensionVariables';
import { localize } from '../../localize';

export async function importTrialApp(_context: IActionContext, loginSession: string): Promise<void> {

    await window.withProgress({ location: ProgressLocation.Notification, cancellable: false }, async p => {
        p.report({ message: localize('importingTrialApp', 'Importing trial app...') });

        await commands.executeCommand('workbench.view.extension.azure');
        ext.azureAccountTreeItem.trialAppNode = await TrialAppTreeItem.createTrialAppTreeItem(ext.azureAccountTreeItem, loginSession);
        ext.context.globalState.update(TrialAppLoginSession, loginSession);
        await commands.executeCommand('workbench.view.extension.azure');
        await ext.azureAccountTreeItem.refresh();
    });
}
