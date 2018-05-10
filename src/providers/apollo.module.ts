import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const GRAPHQL_ENDPOINT_WS = 'ws://vps540915.ovh.net:9080/graphql/%2Fteam%2F21775152-d838-4c44-9b51-fc49ec726b68';
const GRAPHQL_ENDPOINT_HTTP = 'graphql';

@NgModule({
	imports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule
	],
	exports: [
		HttpClientModule, // provides HttpClient for HttpLink
		ApolloModule,
		HttpLinkModule,
	],
	declarations: []
})
export class AppApolloModule {
	constructor(private apollo: Apollo, private httpLink: HttpLink) {
		this.init();
	}

	async init() {
		// Create an http link:
		const http = this.httpLink.create({
			uri: GRAPHQL_ENDPOINT_HTTP
		});

		// Create a WebSocket link:
		const ws = new WebSocketLink({
			uri: GRAPHQL_ENDPOINT_WS,
			options: {
				reconnect: true
			}
		});

		// using the ability to split links, you can send data to each link
		// depending on what kind of operation is being sent
		const link = split(
			// split based on operation type
			({ query }) => {
				const { kind, operation } = getMainDefinition(query) as any;
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			ws,
			http,
		);

		this.apollo.create({
			link,
			connectToDevTools: true,
			cache: new InMemoryCache()
		});
	}
}
