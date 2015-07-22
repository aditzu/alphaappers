'use strict';

angular.module('ofertamea', ['aoc'])
    .controller('main', function ($scope, aocControls, $timeout, catalogs, markets, catalogPages, $q) {

        var availableMarkets = markets.available(),
            catalogsSlider = angular.element('#catalogsSlider'),
            pagesSlider = angular.element('#pagesSlider'),
            catalogsForMarket;

        $scope.onMarketChange = function (slickSlider) {
            var market = availableMarkets[slickSlider.currentSlide];
            catalogsForMarket = catalogs.forMarket(market);
            $q.all(catalogsForMarket.map(catalogPages.pagesForCatalog)).then(function (responses) {
                return responses.map(function (r) {
                    return r.data.pages
                })
            }).then(function (result) {
                    catalogsSlider.slickRemoveAll();
                    result.forEach(function (pages) {
                        var content = angular.element('<div class="catalog-container"><img src="' + pages[0] + '" class="market-image"></div>');
                        content.click(function () {
                            pagesSlider.slickRemoveAll();
                            aocControls('pagesDialog').dialog.open();
                            pages.forEach(function (page) {

                                var pageContent = angular.element('<div class="page-container"><img src="'+page+'" class="market-image page-image"></div>');

                                pageContent.on('mousedown','img',function(e){
                                    e.preventDefault();
                                    e.stopPropagation();
                                })

                                pagesSlider.slickAdd(pageContent);
                            });
                        });

                        catalogsSlider.slickAdd(content);
                    })
                });
        }
        $timeout(function () {
            var marketsSlider = angular.element('#marketsSlider'),
                idx;
            for (idx in availableMarkets) {
                marketsSlider.slickAdd('<div class="market-container"><img src="' + availableMarkets[idx].miniLogoURL + '" class="market-image"></div>');
            }
            marketsSlider.slickGoTo(0);
        }, 100);
    })
    .service('catalogs', function ($window) {
        var catalogs = $window.catalogs;
        return {
            all: function () {
                return catalogs;
            },
            forMarket: function (market) {
                var catalogsForMarket = [],
                    idx, catalog;
                for (idx in catalogs) {
                    catalog = catalogs[idx];
                    if (catalog.market.identifier === market.identifier)
                        catalogsForMarket.push(catalog);
                }
                return catalogsForMarket;
            }
        }
    })
    .service('markets', function ($window, catalogs, aocTools) {
        var availableMarkets = {},
            allCatalogs = catalogs.all(),
            idx, catalog;
        for (idx in allCatalogs) {
            catalog = allCatalogs[idx];
            availableMarkets[catalog.market.identifier] = catalog.market;
        }
        availableMarkets = aocTools.flatten(availableMarkets, function (v) {
            return v;
        })
        return {
            all: function () {
                return $window.markets;
            },
            available: function () {
                return availableMarkets;
            }
        }
    })
    .service('catalogPages', function ($http, $q) {
        var cache = {},
            url = "getPages.php";
        return {
            pagesForCatalog: function (catalog) {
                var id = catalog.identifier,
                    deffered = $q.defer();

                if (cache[id])
                    deffered.resolve(cache[id])
                else
                    $http.get(url, {params: {id: catalog.identifier}}).then(function (data) {
                        cache[id] = data;
                        deffered.resolve(data);
                    });
                return deffered.promise;
            }
        }
    })
    .run(function (aocConfigure) {
        aocConfigure({
            dialog: {
                'default': function () {
                    return {
                        actions: {
                            'default': ['open', 'close']
                        }
                    }
                }
            }

        });
    });
