var kongestion = angular.module('kongestion', []);

kongestion.component("tile",
    {
        controller: () => {
            this.myColor = { 'background-color': 'green' };
        },
        bindings: {
            t: '='
        },
        template: 
        '<div style="width:100%; height:100%;" ng-style="myColor">' +
        '<div style="background-color: darkgrey; width:100%; height:100%" ng-show="$ctrl.t.pavement != null">P</div>' +
        '<div style="background-color: brown; width:100%; height:100%" ng-show="$ctrl.t.building != null">B</div>' +
        '<div style="background-color: green; width:100%; height:100%" ng-hide="$ctrl.t.building || $ctrl.t.pavement"> </div>' +
        '</div>'
    });

kongestion.component("grid", {
    controller: () => { },
    bindings: {
        grid: '=',
        clickHandler: '='
    },
    template:
    '<div style=""> GRID <br>' +
    '<div style="border:1px solid black; width:25px; float:left;" class="column" ng-repeat="x in $ctrl.grid.terrain">' +
    '<div class="cell" style="border: 1px solid black; width:25px; height:25px" ng-repeat="y in x" ng-click="y.log()"><tile t="y"></tile></div>' +
    '</span>' +
    '</div>'
});

kongestion.component("person", {
    controller: () => { },
    bindings: {
        p: '='
    },
    template:
    '<div class="Item" ng-hide="$ctrl.p==null">' +
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
    '<div class="Item" ng-hide="$ctrl.p==null">' +
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
    '<div class="Item" ng-hide="$ctrl.p==null">' +
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
    '<div class="Item" ng-hide="$ctrl.p==null">' +
    '<h4>Housing Complex</h4>' +
    '<b>Name:</b> {{$ctrl.p.name}} <br>' +
    '<housing-unit ng-repeat="k in $ctrl.p.units" p="k"></housing-unit>' + 
    '</div>'
});

kongestion.component("business", {
    controller: () => { },
    bindings: {
        p: '='
    },
    template:
    '<div class="Item" ng-hide="$ctrl.p==null">' +
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
    '<grid grid="$ctrl.Grid" clickHandler="$ctrl.clickHandler"></grid>'+
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