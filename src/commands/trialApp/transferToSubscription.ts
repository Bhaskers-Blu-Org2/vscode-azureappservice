/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IActionContext } from 'vscode-azureextensionui';
import { TrialAppTreeItem } from '../../explorer/trialApp/TrialAppTreeItem';
import { deploy } from '../deploy/deploy';

export async function transferToSubscription(context: IActionContext, node: TrialAppTreeItem): Promise<void> {

    await deploy(context, node, undefined, true);
}
