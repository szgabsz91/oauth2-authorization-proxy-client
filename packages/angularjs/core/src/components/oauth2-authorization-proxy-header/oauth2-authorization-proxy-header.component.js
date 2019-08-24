import templateUrl from './oauth2-authorization-proxy-header.component.html';
import controller from './oauth2-authorization-proxy-header.controller';

export const componentName = 'oauth2AuthorizationProxyHeader';

export default {
    bindings: {
        goToProfile: '&?oauth2GoToProfile'
    },
    templateUrl,
    controller
};
