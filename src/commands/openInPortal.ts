/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AppSettingsTreeItem, DeploymentsTreeItem } from "vscode-azureappservice";
import { IActionContext, openInPortal as uiOpenInPortal } from "vscode-azureextensionui";
import { DeploymentSlotsTreeItem } from "../explorer/DeploymentSlotsTreeItem";
import { SiteTreeItem } from "../explorer/SiteTreeItem";
import { WebAppTreeItem } from "../explorer/WebAppTreeItem";
import { ext } from "../extensionVariables";
import { nonNullProp } from "../utils/nonNull";

export async function openInPortal(context: IActionContext, node?: SiteTreeItem): Promise<void> {
    if (!node) {
        node = await ext.tree.showTreeItemPicker<WebAppTreeItem>(WebAppTreeItem.contextValue, context);
    }

    switch (node.contextValue) {
        // the deep link for slots does not follow the conventional pattern of including its parent in the path name so this is how we extract the slot's id
        case DeploymentSlotsTreeItem.contextValue:
            await uiOpenInPortal(node.root, `${nonNullProp(node, 'parent').fullId}/deploymentSlots`);
            return;
        // the deep link for "Deployments" do not follow the conventional pattern of including its parent in the path name so we need to pass the "Deployment Center" url directly
        case DeploymentsTreeItem.contextValueConnected:
        case DeploymentsTreeItem.contextValueUnconnected:
            await uiOpenInPortal(node.root, `${node.root.client.id}/vstscd`);
            return;
        case AppSettingsTreeItem.contextValue:
            await node.parent.openInPortal();
            return;
        default:
            await node.openInPortal();
            return;
    }
}
