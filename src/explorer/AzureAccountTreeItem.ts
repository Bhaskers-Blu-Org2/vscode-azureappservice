/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzExtTreeItem, AzureAccountTreeItemBase, GenericTreeItem, IActionContext, ISubscriptionContext } from 'vscode-azureextensionui';
import { TrialAppLoginSession } from '../constants';
import { ext } from '../extensionVariables';
import { localize } from '../localize';
import { SubscriptionTreeItem } from './SubscriptionTreeItem';
import { TrialAppTreeItem } from './trialApp/TrialAppTreeItem';

export class AzureAccountTreeItem extends AzureAccountTreeItemBase {

    public trialAppNode: TrialAppTreeItem | undefined;
    public trialAppTreeItem: TrialAppTreeItem | undefined;

    public constructor(testAccount?: {}) {
        super(undefined, testAccount);
    }

    public get childTypeLabel(): string {
        return this.trialAppTreeItem ?
            localize('subscriptionOrTrialApp', 'subscription or trial app') :
            localize('subscription', 'subscription');
    }

    public createSubscriptionTreeItem(root: ISubscriptionContext): SubscriptionTreeItem {
        return new SubscriptionTreeItem(this, root);
    }

    public async loadMoreChildrenImpl(clearCache: boolean, context: IActionContext): Promise<AzExtTreeItem[]> {
        const children: AzExtTreeItem[] = await super.loadMoreChildrenImpl(clearCache, context);

        if (this.trialAppTreeItem) {
            await this.trialAppTreeItem.refresh();
            children.push(this.trialAppTreeItem);
        } else {
            const loginSession: string | undefined = ext.context.globalState.get(TrialAppLoginSession);
            if (loginSession) {
                const ti: AzExtTreeItem[] = await this.createTreeItemsWithErrorHandling(
                    [loginSession],
                    'trialAppInvalid',
                    async (source: string): Promise<AzExtTreeItem> => {
                        return await TrialAppTreeItem.createTrialAppTreeItem(this, source);
                    },
                    (_source: unknown): string => {
                        return 'Trial App';
                    });
                if (ti.length > 0) {
                    const treeItem: AzExtTreeItem = ti[0];
                    children.push(treeItem);
                    this.trialAppTreeItem = treeItem instanceof TrialAppTreeItem ? treeItem : this.trialAppTreeItem;
                }
            }
        }

        return children;
    }

    public compareChildrenImpl(item1: AzExtTreeItem, item2: AzExtTreeItem): number {
        if (item2 instanceof GenericTreeItem) {
            return 1; // trial apps below sign in / create account items
        }
        if (!(item1 instanceof SubscriptionTreeItem) && item2 instanceof SubscriptionTreeItem) {
            return -1; // trial apps on top of subscription items
        }
        return super.compareChildrenImpl(item1, item2);
    }
}
