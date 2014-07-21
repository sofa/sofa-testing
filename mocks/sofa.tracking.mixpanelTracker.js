'use strict';
/* global sofa */

/**
 * @name mixpanelTracker
 * @namespace sofa.tracking.mixpanelTracker
 *
 * @description
 * A Mixpanel Tracker abstraction layer to connect to the SDK's
 * tracker interface.
 */
sofa.define('sofa.tracking.MixpanelTracker', function (options) {

    var self = {};

    /**
     * @method setup
     * @memberof sofa.tracking.mixpanelTracker
     *
     * @description
     * Sets up Mixpanel tracking code snippet with provided client
     * information like account number and domain name.
     */
    self.setup = function () {

    };

    /**
     * @method trackEvent
     * @memberof sofa.tracking.mixpanelTracker
     *
     * @description
     * The bread and butter of Mixpanel, where it can track actions instead of pageviews
     */
    self.trackAction = function (action, actionData) {

    };

    /**
     * @method trackEvent
     * @memberof sofa.tracking.mixpanelTracker
     *
     * @description
     * Dummy tracking method for Mixpanel, only actions can be tracked.
     */
    self.trackEvent = function () {

    };

    /**
     * @method trackTransaction
     * @memberof sofa.tracking.mixpanelTracker
     *
     * @description
     * Dummy tracking method for Mixpanel, only actions can be tracked.
     */
    self.trackTransaction = function () {

    };

    return self;
});
