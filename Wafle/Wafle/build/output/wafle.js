/*
The MIT License (MIT)
Copyright (c) 2013 Shamna Skor
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
@license
*/
define(["require", "exports", "./src/Pilot", "./src/Skills", "./src/InventoryTypeAttributes", "./src/BaseShipData", "./src/Ship", "./src/Resistance", "./src/ResistSet", "./src/TypeInfo", "./src/PowergridFormulas", "./src/CpuFormulas", "./src/FittingSlot", "./src/CuratedData"], function(require, exports, Pilot, Skills, InventoryTypeAttributes, BaseShipData, Ship, Resistance, ResistSet, TypeInfo, PowergridFormulas, CpuFormulas, FittingSlot, Data) {
    /* Todo:
    . more rigs and other modules.
    . modules that use capacitor - adjust stats for active or inactive.
    . track capacitor usage of ship/cap stability
    . cruisers, bc, bs, other
    . align time, warp speed, other navigation concerns
    . Offline Modules
    . Overheating
    . UI
    . track calibration remaining for rigs.
    */
    exports.Pilot = Pilot;
    exports.Skills = Skills;
    exports.InventoryTypeAttributes = InventoryTypeAttributes;
    exports.BaseShipData = BaseShipData;
    exports.Ship = Ship;
    exports.Resistance = Resistance;
    exports.ResistSet = ResistSet;
    exports.TypeInfo = TypeInfo;
    exports.PowergridFormulas = PowergridFormulas;
    exports.CpuFormulas = CpuFormulas;
    exports.FittingSlot = FittingSlot;
    exports.Data = Data;

    exports.ProjectName = "Wafle Project";
    exports.ProjectDescription = "Web Accessible Fitting Library for EVE";
    exports.Version = "0.1.0-alpha.7";
    exports.VersionDescription = "Alpha Release - UI construction";
    exports.AuthorName = "Shamna Skor";
    exports.SourceWebSite = "http://github.com/ShamnaSkor/WafleProject";

    (function (RaceType) {
        RaceType[RaceType["Unknown"] = 0] = "Unknown";
        RaceType[RaceType["Caldari"] = 1] = "Caldari";
        RaceType[RaceType["Minmatar"] = 2] = "Minmatar";
        RaceType[RaceType["Amarr"] = 4] = "Amarr";
        RaceType[RaceType["Gallente"] = 8] = "Gallente";
        RaceType[RaceType["ORE"] = 9] = "ORE";
    })(exports.RaceType || (exports.RaceType = {}));
    var RaceType = exports.RaceType;

    (function (FittingSlotType) {
        FittingSlotType[FittingSlotType["Unknown"] = 0] = "Unknown";
        FittingSlotType[FittingSlotType["High"] = 1] = "High";
        FittingSlotType[FittingSlotType["Mid"] = 2] = "Mid";
        FittingSlotType[FittingSlotType["Low"] = 3] = "Low";
        FittingSlotType[FittingSlotType["Rig"] = 4] = "Rig";
    })(exports.FittingSlotType || (exports.FittingSlotType = {}));
    var FittingSlotType = exports.FittingSlotType;

    (function (RigSize) {
        RigSize[RigSize["Unknown"] = 0] = "Unknown";
        RigSize[RigSize["Small"] = 1] = "Small";
        RigSize[RigSize["Medium"] = 2] = "Medium";
        RigSize[RigSize["Large"] = 3] = "Large";
        RigSize[RigSize["Capital"] = 4] = "Capital";
    })(exports.RigSize || (exports.RigSize = {}));
    var RigSize = exports.RigSize;

    (function (InventoryGroups) {
        InventoryGroups[InventoryGroups["Unknown"] = -1] = "Unknown";
        InventoryGroups[InventoryGroups["Frigate"] = 25] = "Frigate";
        InventoryGroups[InventoryGroups["ShieldExtender"] = 38] = "ShieldExtender";
        InventoryGroups[InventoryGroups["Propulsion"] = 46] = "Propulsion";
        InventoryGroups[InventoryGroups["WarpScrambler"] = 52] = "WarpScrambler";
        InventoryGroups[InventoryGroups["EnergyWeapon"] = 53] = "EnergyWeapon";
        InventoryGroups[InventoryGroups["ProjectileWeapon"] = 55] = "ProjectileWeapon";
        InventoryGroups[InventoryGroups["Gyrostabilizer"] = 59] = "Gyrostabilizer";
        InventoryGroups[InventoryGroups["DamageControl"] = 60] = "DamageControl";
        InventoryGroups[InventoryGroups["ArmorRepairUnit"] = 62] = "ArmorRepairUnit";
        InventoryGroups[InventoryGroups["StasisWeb"] = 65] = "StasisWeb";
        InventoryGroups[InventoryGroups["EnergyVampire"] = 68] = "EnergyVampire";
        InventoryGroups[InventoryGroups["EnergyDestabilizer"] = 71] = "EnergyDestabilizer";
        InventoryGroups[InventoryGroups["HybridWeapon"] = 74] = "HybridWeapon";
        InventoryGroups[InventoryGroups["ShieldHardener"] = 77] = "ShieldHardener";
        InventoryGroups[InventoryGroups["ProjectileAmmo"] = 83] = "ProjectileAmmo";
        InventoryGroups[InventoryGroups["HybridCharge"] = 85] = "HybridCharge";
        InventoryGroups[InventoryGroups["FrequencyCrystal"] = 86] = "FrequencyCrystal";
        InventoryGroups[InventoryGroups["ArmorCoating"] = 98] = "ArmorCoating";
        InventoryGroups[InventoryGroups["CombatDrone"] = 100] = "CombatDrone";
        InventoryGroups[InventoryGroups["HeatSink"] = 205] = "HeatSink";
        InventoryGroups[InventoryGroups["MagneticFieldStabilizer"] = 302] = "MagneticFieldStabilizer";
        InventoryGroups[InventoryGroups["ArmorRepairProjector"] = 325] = "ArmorRepairProjector";
        InventoryGroups[InventoryGroups["ArmorPlatingEnergized"] = 326] = "ArmorPlatingEnergized";
        InventoryGroups[InventoryGroups["ArmorPlate"] = 329] = "ArmorPlate";
        InventoryGroups[InventoryGroups["AuxiliaryPowerCore"] = 339] = "AuxiliaryPowerCore";
        InventoryGroups[InventoryGroups["BallisticControlSystem"] = 367] = "BallisticControlSystem";
        InventoryGroups[InventoryGroups["AdvancedAutocannonAmmo"] = 372] = "AdvancedAutocannonAmmo";
        InventoryGroups[InventoryGroups["AdvancedRailgunCharge"] = 373] = "AdvancedRailgunCharge";
        InventoryGroups[InventoryGroups["AdvancedBeamLaserCrystal"] = 374] = "AdvancedBeamLaserCrystal";
        InventoryGroups[InventoryGroups["AdvancedPulseLaserCrystal"] = 375] = "AdvancedPulseLaserCrystal";
        InventoryGroups[InventoryGroups["AdvancedArtilleryAmmo"] = 376] = "AdvancedArtilleryAmmo";
        InventoryGroups[InventoryGroups["AdvancedBlasterCharge"] = 377] = "AdvancedBlasterCharge";
        InventoryGroups[InventoryGroups["TargetPainter"] = 379] = "TargetPainter";
        InventoryGroups[InventoryGroups["LightMissile"] = 384] = "LightMissile";
        InventoryGroups[InventoryGroups["HeavyMissile"] = 385] = "HeavyMissile";
        InventoryGroups[InventoryGroups["Rocket"] = 387] = "Rocket";
        InventoryGroups[InventoryGroups["FoFHeavyMissile"] = 395] = "FoFHeavyMissile";
        InventoryGroups[InventoryGroups["RocketLauncher"] = 507] = "RocketLauncher";
        InventoryGroups[InventoryGroups["LightMissileLauncher"] = 509] = "LightMissileLauncher";
        InventoryGroups[InventoryGroups["HeavyMissileLauncher"] = 510] = "HeavyMissileLauncher";
        InventoryGroups[InventoryGroups["RapidLightMissileLauncher"] = 511] = "RapidLightMissileLauncher";
        InventoryGroups[InventoryGroups["AdvancedRocket"] = 648] = "AdvancedRocket";
        InventoryGroups[InventoryGroups["AdvancedLightMissile"] = 653] = "AdvancedLightMissile";
        InventoryGroups[InventoryGroups["AdvancedHeavyAssaultMissile"] = 654] = "AdvancedHeavyAssaultMissile";
        InventoryGroups[InventoryGroups["AdvancedHeavyMissile"] = 655] = "AdvancedHeavyMissile";
        InventoryGroups[InventoryGroups["Nanofiber"] = 763] = "Nanofiber";
        InventoryGroups[InventoryGroups["HeavyAssaultMissileLauncher"] = 771] = "HeavyAssaultMissileLauncher";
        InventoryGroups[InventoryGroups["HeavyAssaultMissile"] = 772] = "HeavyAssaultMissile";
        InventoryGroups[InventoryGroups["ArmorRig"] = 773] = "ArmorRig";
        InventoryGroups[InventoryGroups["ShieldRig"] = 774] = "ShieldRig";
        InventoryGroups[InventoryGroups["NavigationRig"] = 782] = "NavigationRig";
    })(exports.InventoryGroups || (exports.InventoryGroups = {}));
    var InventoryGroups = exports.InventoryGroups;

    function Round(value, decimalPlace) {
        return Math.round(value * Math.pow(10, decimalPlace * -1)) * Math.pow(10, decimalPlace);
    }
    exports.Round = Round;

    function e() {
        return 2.718281828459;
    }
    exports.e = e;

    /**
    ** Diminishing effectiveness ratio.  The most powerful modifier should be passed in with 0.
    **  The second most powerful modifier should be passed in with 1, etc.
    **/
    function dimEffRatio(zeroBasedIndex) {
        return Math.pow(exports.e(), (-0.140274 * Math.pow((zeroBasedIndex), 2)));
    }
    exports.dimEffRatio = dimEffRatio;

    

    

    

    //shim for getOwnPropertyNames (not supported in EVE IGB as of Odyssey 1.1) http://stackoverflow.com/questions/8240802/is-it-possible-to-simulated-object-getownpropertynames-in-ie8
    if (typeof Object.getOwnPropertyNames !== "function") {
        Object.getOwnPropertyNames = function (obj) {
            var keys = [];

            // Only iterate the keys if we were given an object, and
            // a special check for null, as typeof null == "object"
            if (typeof obj === "object" && obj !== null) {
                for (var x in obj) {
                    // A for in will iterate over members on the prototype
                    // chain as well, but Object.getOwnPropertyNames returns
                    // only those directly on the object, so use hasOwnProperty.
                    if (obj.hasOwnProperty(x)) {
                        keys.push(x);
                    }
                }
            }

            return keys;
        };
    }
});
//# sourceMappingURL=wafle.js.map
