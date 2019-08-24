export const componentName = 'oauth2AuthorizationProxyLogin';

export default {
    template: function oauth2AuthorizationProxyLoginTemplate(OAuth2AuthorizationProxyService) {
        'ngInject';
        const preferredOAuth2Provider = OAuth2AuthorizationProxyService.getPreferredOAuth2Provider();
        let oauth2Providers = [...OAuth2AuthorizationProxyService.getOAuth2Providers()]
            .sort((componentConfiguration1, componentConfiguration2) => (componentConfiguration1.priority > componentConfiguration2.priority) ? 1 : -1);
        if (preferredOAuth2Provider) {
            oauth2Providers = [
                preferredOAuth2Provider,
                ...oauth2Providers.filter(oauth2Provider => oauth2Provider.id !== preferredOAuth2Provider.id)
            ];
        }
        const template = oauth2Providers
            .map((componentConfiguration) => componentConfiguration.componentName)
            .map((componentName) => `<${componentName}></${componentName}>`)
            .reduce((template, component) => template + component, '');
        return `<div class="oauth2-authorization-proxy-login" flex layout="column" layout-align="start center">${template}</div>`;
    }
};
