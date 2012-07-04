/*
 * MultiModels plugin for Knockout JS
 * 
 * Author: Sergey Zwezdin (2012)
 *
 * https://github.com/sergun/Knockout-MultiModels
 *
 * License: MIT http://www.opensource.org/licenses/mit-license.php
 *
 */

(function () {
    function checkDependencies() {
        /// <summary>Checks dependencies for the plugin.</summary>

        if (typeof ($) !== "function")
            throw "Knockout JS MultiModels plugin: jQuery not found. Please ensure jQuery is referenced before the knockout.multimodels.js file.";

        if (typeof ($.fn.livequery) != "function")
            throw "Knockout JS MultiModels plugin: livequery not found. Please ensure livequery is referenced before the knockout.multimodels.js file.";

        if ((typeof (ko.observable) != "function") || (typeof (ko.applyBindings) != "function"))
            throw "Knockout JS MultiModels plugin: Knockout JS not found. Please ensure knockout js is referenced before the knockout.multimodels.js file.";
    }

    var _viewModels = {};

    function checkViewModelName(name) {
        /// <summary>Checks name of view model.</summary>

        var nameExpression = /^[a-z]+[a-z0-9_]*$/i;

        if (!nameExpression.test(name))
            throw "Knockout JS MultiModels plugin: view model name is incorrect."
    }


    function refreshBindings(viewModelName) {
        /// <summary>Updates bindings for specific view model name.</summary>

        $("*[data-model]").each(function () {
            var currentViewModelName = $(this).attr("data-model");

            if (currentViewModelName == viewModelName) {
                var currentViewModel = _viewModels[currentViewModelName];
                var currentElement = $(this).get(0);

                // we don't rebind to alreay binded elements (therefore knockoutjs have trouble with it)
                var isBinded = !!ko.dataFor(currentElement);

                if ((currentViewModel != null) && (isBinded==false))
                    ko.applyBindings(currentViewModel, currentElement);
            }
        });
    };

    checkDependencies();

    ko.attach = function (viewModelName, viewModel) {
        /// <summary>Attaches view model.</summary>

        checkViewModelName(viewModelName);
        _viewModels[viewModelName] = viewModel;
        refreshBindings(viewModelName);
    };

    ko.detach = function (viewModelName) {
        /// <summary>Detaches view model.</summary>

        checkViewModelName(viewModelName);
        _viewModels[viewModelName] = null;
        refreshBindings(viewModelName);
    };

    ko.resolve = function (viewModelName) {
        /// <summary>Returns view model from list of view models.</summary>

        checkViewModelName(viewModelName);
        return _viewModels[viewModelName];
    };

    $("*[data-model]").livequery(function () {
        refreshBindings($(this).attr("data-model"));
    });
})();