define(["require", "exports", "../wafle"], function(require, exports, Wafle) {
    var TypeInfo = (function () {
        function TypeInfo(typeId, groupId) {
            this.typeId = typeId;
            if (groupId === undefined) {
                this.FindOwnGroupId();
            } else {
                this.groupId = groupId;
            }
        }
        TypeInfo.prototype.FindOwnGroupId = function () {
            if (this.groupId && this.groupId > 0) {
                return;
            }
            this.groupId = TypeInfo.TypeInfoByTypeId(this.typeId).groupId;
        };

        /** Give a second shot to see if the data variable has loaded. */
        TypeInfo.AllWafleTypeInventoryData = function () {
            return Wafle.Data.Types;
        };

        /** returns a new TypeInfo object based on the name of the type */
        TypeInfo.TypeInfoByTypeId = function (typeId) {
            var t = TypeInfo.AllWafleTypeInventoryData();
            for (var groupIndex = 0; groupIndex < t.length; groupIndex++) {
                var g = t[groupIndex], groupTypes = g.gts;
                for (var typeIndex = 0; typeIndex < groupTypes.length; typeIndex++) {
                    if (groupTypes[typeIndex].id === typeId) {
                        return new TypeInfo(groupTypes[typeIndex].id, t[groupIndex].gid);
                    }
                }
            }
            return null;
        };

        /** returns a new TypeInfo object based on the name of the type */
        TypeInfo.TypeInfoByName = function (name) {
            var t = TypeInfo.AllWafleTypeInventoryData();
            for (var groupIndex = 0; groupIndex < t.length; groupIndex++) {
                var g = t[groupIndex], groupTypes = g.gts;
                for (var typeIndex = 0; typeIndex < groupTypes.length; typeIndex++) {
                    if (groupTypes[typeIndex].n === name) {
                        return new TypeInfo(groupTypes[typeIndex].id, t[groupIndex].gid);
                    }
                }
            }
            return null;
        };

        /** returns a new type attribute property bag based on the passed parameters */
        TypeInfo.GetTypeAttributes = function (typeId, groupId) {
            var t = TypeInfo.AllWafleTypeInventoryData();
            for (var groupIndex = 0; groupIndex < t.length; groupIndex++) {
                if (t[groupIndex].gid === groupId) {
                    var g = t[groupIndex], groupTypes = g.gts;
                    for (var typeIndex = 0; typeIndex < groupTypes.length; typeIndex++) {
                        if (groupTypes[typeIndex].id === typeId) {
                            return groupTypes[typeIndex];
                        }
                    }
                }
            }
            return null;
        };

        /** Returns the index of the groupId in the array or -1 if the groupId is not found. */
        TypeInfo.groupIndex = function (groupId) {
            var t = TypeInfo.AllWafleTypeInventoryData();
            for (var groupIndex = 0; groupIndex < t.length; groupIndex++) {
                if (t[groupIndex].gid === groupId) {
                    return groupIndex;
                }
            }
            return -1;
        };

        TypeInfo.FindNamedTypesByGroup = function (theGroupId) {
            var types = [];
            var groupIndex = TypeInfo.groupIndex(theGroupId);
            if (groupIndex > -1) {
                var t = TypeInfo.AllWafleTypeInventoryData();
                var groupTypes = t[groupIndex].gts;
                for (var typeIndex = 0; typeIndex < groupTypes.length; typeIndex++) {
                    var theItem = {
                        name: groupTypes[typeIndex].n,
                        groupId: theGroupId,
                        typeId: groupTypes[typeIndex].id
                    };
                    types.push(theItem);
                }
            }
            return types;
        };
        return TypeInfo;
    })();
    
    return TypeInfo;
});
//# sourceMappingURL=TypeInfo.js.map
