var kongestion = angular.module('kongestion', []);

class City {
    name: string; // again shits and giggles man
    People: Person[];
    Places: Building[];
    Businesses: Business[];
    Housing: HousingComplex[];
    Money: number; // idk, taxes or something

    public static $inject = ["$scope"];
    constructor($scope: any) {
        this.name = "Barnabus";
        this.Money = 60;
    }
}

//kongestion.controller("CityController", City);

kongestion.component("city", {
    controller: City,
    bindings: {
    },
    template: '<div>waddup {{$ctrl.name}}, you got ${{$ctrl.Money}} </div>'
});