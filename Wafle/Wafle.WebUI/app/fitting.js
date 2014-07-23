define(["require", "exports", 'knockout', 'wafle'], function(require, exports, ko, Wafle) {
    var FittingTreeNodeViewModel = (function () {
        function FittingTreeNodeViewModel(data) {
            this.data = data;
            this.self = this;
            this.n = ko.observable();
            this.mgid = ko.observable();
            this.pgid = ko.observable();
            this.children = ko.observableArray();
            this.toggleTwistyCollapse = function (data, event) {
                console.log($(event.target.parentNode).html());
                $(event.target.parentNode).children("ul").children().toggleClass("twistyCollapse");
            };
            this.n(data.n);
            this.mgid(data.mgid);
            this.pgid(data.pgid);
            this.children(ko.utils.arrayMap(data.children, function (c) {
                return new FittingTreeNodeViewModel(c);
            }));
        }
        return FittingTreeNodeViewModel;
    })();

    function WafleMarketGroupItemRoot() {
        var rootFittingGroup = {
            n: "Fitting",
            mgid: 0,
            children: Wafle.Data.WafleRootMarketGroups()
        };

        return new FittingTreeNodeViewModel(rootFittingGroup);
    }

    return {
        wafleMarketGroupItemRoot: WafleMarketGroupItemRoot()
    };
});
//# sourceMappingURL=fitting.js.map
