/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { SiteConfigResource, SiteSourceControl } from 'azure-arm-website/lib/models';
import { BasicAuthenticationCredentials, ServiceClientCredentials } from 'ms-rest';
import { IDeploymentsClient, IFilesClient, IHostKeys } from 'vscode-azureappservice';
import { addExtensionUserAgent } from 'vscode-azureextensionui';
import KuduClient from 'vscode-azurekudu';
import { localize } from '../../localize';
import { ITrialAppMetadata } from './ITrialAppMetadata';

export class TrialAppClient implements IDeploymentsClient, IFilesClient {

    public get fullName(): string {
        return this.metadata.hostName;
    }
    public isFunctionApp: boolean = false;
    public defaultHostUrl: string;
    public get id(): string {
        return this.metadata.siteGuid;
    }
    public get kuduUrl(): string | undefined {
        return `https://${this.metadata.scmHostName}`;
    }

    private metadata: ITrialAppMetadata;
    private credentials: ServiceClientCredentials;

    public constructor(metadata: ITrialAppMetadata) {
        this.metadata = metadata;
        this.credentials = new BasicAuthenticationCredentials(metadata.publishingUserName, metadata.publishingPassword);
    }
    public async listHostKeys(): Promise<IHostKeys> {
        throw new Error('Method not implemented.');
    }
    public async getSiteConfig(): Promise<SiteConfigResource> {
        return {};
    }
    public async getSourceControl(): Promise<SiteSourceControl> {
        return {};
    }

    public async getKuduClient(): Promise<KuduClient> {
        if (!this.metadata.scmHostName) {
            throw new Error(localize('notSupportedLinux', 'This operation is not supported by this app service plan.'));
        }

        const kuduClient: KuduClient = new KuduClient(this.credentials, `https://${this.metadata.scmHostName}`);
        addExtensionUserAgent(kuduClient);
        return kuduClient;
    }

}
