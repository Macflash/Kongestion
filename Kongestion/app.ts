/// <reference path="Scripts/game/people.ts" />

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
        this.name = "Barnabus City";
        this.Money = 500;
        this.People = [];
        this.Housing = [];
        this.Businesses = [];
        this.People.push(new PoorPerson());
        this.People.push(new NormalPerson());
        this.People.push(new RichPerson());
    }

    public RemovePerson(p: Person) {
        console.log("removing");
        var i = this.People.indexOf(p);
        if (i > 0) {
            this.People.splice(i, 1);
            console.log("removed");
        }
    }

    public addPerson() {
        this.People.push(new PoorPerson());
    }

    public addHousing() {
        this.Housing.push(new ApartmentComplex());
    }

    public addBusiness() {
        this.Businesses.push(new BasicBusiness());
    }

    public runDay() {
        // hmm...

        // all businesses hire a position if they have one open
        for (var b in this.Businesses) {
            var business = this.Businesses[b];

            for (var j in business.positions) {
                var position = business.positions[j];

                if (position.employee == null) {
                    //go through the list of people and find the first qualified person with no job
                    for (var p in this.People) {
                        var person = this.People[p];
                        if (person.job == null) {
                            if (person.education >= position.educationRequired) {
                                position.employee = person;
                                person.job = position;
                            }
                        }
                    }

                }
            }
        }

    }
}

//kongestion.controller("CityController", City);

kongestion.component("person", {
    controller: () => { },
    bindings: {
        p: '='
    },
    template:
    '<div class="Item">' +
        '<h4>Person</h4>' +
        '<b>Name:</b> <input ng-model="$ctrl.p.name"/><br>' +
        '<b>Money:</b> ${{$ctrl.p.money }} <br>' +
        '<b>Education:</b> {{$ctrl.p.education }} <br>' +
        '<b>HasJob:</b> {{$ctrl.p.job != null }} <br>' +
        '<b>HasHouse:</b> {{$ctrl.p.residence != null }} <br>' +
    '</div>'
});

kongestion.component("housingUnit", {
    controller: () => { },
    bindings: {
        p: '='
    },
    template:
    '<div class="Item">' +
    '<h4>Housing Unit</h4>' +
    '<b>Name:</b> {{$ctrl.p.name}} <br>' +
    '<b>Cost:</b> ${{$ctrl.p.cost }} <br>' +
    '<b>Quality:</b> {{$ctrl.p.quality }} <br>' +
    '<b>Resident:</b> <person p="$ctrl.p.resident"></person>' +
    '</div>'
});

kongestion.component("position", {
    controller: () => { },
    bindings: {
        p: '='
    },
    template:
    '<div class="Item">' +
    '<h4>Position</h4>' +
    '<b>Income:</b> ${{$ctrl.p.income }} <br>' +
    '<b>Req. Ed.:</b> {{$ctrl.p.educationRequired }} <br>' +
    '<b>Employee:</b> <person p="$ctrl.p.employee"></person>' +
    '</div>'
});

kongestion.component("housingComplex", {
    controller: () => { },
    bindings: {
        p: '='
    },
    template:
    '<div class="Item">' +
    '<h4>Housing Complex</h4>' +
    '<b>Name:</b> {{$ctrl.p.name}} <br>' +
    '<b>Cost:</b> ${{$ctrl.p.cost }} <br>' +
    '<b>Quality:</b> {{$ctrl.p.quality }} <br>' +
    '<housing-unit ng-repeat="k in $ctrl.p.units" p="k"></housing-unit>' + 
    '</div>'
});

kongestion.component("business", {
    controller: () => { },
    bindings: {
        p: '='
    },
    template:
    '<div class="Item">' +
    '<h4>Business</h4>' +
    '<b>Name:</b> {{$ctrl.p.name}} <br>' +
    '<position ng-repeat="k in $ctrl.p.positions" p="k"></position>' + 
    '</div>'
});

kongestion.component("city", {
    controller: City,
    bindings: {
    },
    template:
    '<div>Welcome to {{$ctrl.name}}. Your city has ${{$ctrl.Money}} <br>' +
    '<button ng-click="$ctrl.addPerson()">Add person</button>' +
    '<button ng-click="$ctrl.addBusiness()">Add business</button>' +
    '<button ng-click="$ctrl.addHousing()">Add housing</button>' +
    '<button ng-click="$ctrl.runDay()">RUN DAY</button>' +
    '</div>' +

    '<div class="Categories">' +
        '<div class="Category">' +
            '<h3>People:</h3>' +
            '<div class="Items">' +
                '<person ng-repeat="k in $ctrl.People" p="k"></person>' +
            '</div>' +
        '</div>' +

        '<div class="Category">' +
            '<h3>Housing:</h3>' +
            '<div class="Items">' +
                '<housing-complex ng-repeat="k in $ctrl.Housing" p="k"></housing-complex>' +
            '</div>' +
        '</div>' +

        '<div class="Category">' +
            '<h3>Businesses:</h3>' +
            '<div class="Items">' +
                '<business ng-repeat="k in $ctrl.Businesses" p="k"></business>' +
            '</div>' +
        '</div>' +
    '</div>' +

    '<div>wait theres more!</div>'
});