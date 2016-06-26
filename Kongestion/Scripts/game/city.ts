class City {
    name: string; // again shits and giggles man
    People: Person[];
    Places: Building[];
    Businesses: Business[];
    Housing: HousingComplex[];
    Money: number; // idk, taxes or something
    Grid: Grid;

    constructor() {
        this.name = "Barnabus City";
        this.Money = 500;
        this.People = [];
        this.Housing = [];
        this.Businesses = [];
        this.Grid = new Grid(10);
    }

    public RemovePerson(p: Person) {
        console.log("removing");
        var i = this.People.indexOf(p);
        if (i > 0) {
            var exPerson = this.People.splice(i, 1);
            console.log("removed");
        }
    }

    public addPerson() {
        this.People.push(new NormalPerson());
    }

    public addHousing(building: Building) {
        if (!building) {
            var x = Math.floor(Math.random() * 9.9);
            var y = Math.floor(Math.random() * 9.9);
            building = new OneBlockBuilding(x, y);
            this.Grid.terrain[x][y].building = building;
            this.Grid.terrain[x][y].pavement = null;
        }
        this.Housing.push(new ApartmentComplex(building));
    }

    public addBusiness(building?: Building) {
        if (!building) {
            var x = Math.floor(Math.random() * 9.9);
            var y = Math.floor(Math.random() * 9.9);
            building = new OneBlockBuilding(x, y);
            this.Grid.terrain[x][y].building = building;
            this.Grid.terrain[x][y].pavement = null;
        }
        this.Businesses.push(new BasicBusiness(building));
    }

    public clickHandler(x: any) {
        console.log("clicked");
        console.log(x);
    }

    public runDay() {
        // BUSINESS ------------------------------------------------------
        // all businesses hire a position if they have one open
        for (var b in this.Businesses) {
            var business = this.Businesses[b];

            for (var j in business.positions) {
                var position = business.positions[j];

                if (position.employee == null) {
                    var employeeHired = false;
                    //go through the list of people and find the first qualified person with no job
                    for (var p in this.People) {
                        var person = this.People[p];
                        if (person.job == null) {
                            if (person.education >= position.educationRequired) {
                                position.employee = person;
                                person.job = position;
                                employeeHired = true;
                                break;
                            }
                        }
                    }

                    if (employeeHired) {
                        break;
                    }

                    // no one in town. import someone!
                    console.log("hiring someone from 'out of town'");
                    var newHire = new NormalPerson(position.educationRequired);
                    this.People.push(newHire);
                    position.employee = newHire;
                    newHire.job = position;

                    // only hire one a day for now
                    break;
                }
            }
        }

        // END BUSINESS ------------------------------------------------------

        // HOUSING ------------------------------------------------------


        // END HOUSING ------------------------------------------------------

        // PEOPLE ------------------------------------------------------

        for (var p in this.People) {
            var person = this.People[p];
            
            // ideally the person only gets paid when they made it to work? right? and at the same time the city gets a cut as TAXES! woop

            //oh but they have to ALWAYS pay their housing or they get kicked the f#$% out

            // look for houses if they don't have any
            if (person.residence == null) {
                var desiredPrice = person.job == null ? person.money / 10 : person.job.income / 2;
                var best = { unit: <HousingUnit>null, value: 0 };
                var cheapest = { unit: <HousingUnit>null, cost: Number.MAX_VALUE }; // seller's market
                for (var h in this.Housing) {
                    for (var u in this.Housing[h].units) {
                        var unit = this.Housing[h].units[u];
                        if (unit.resident == null) {
                            // best value
                            if (unit.cost <= desiredPrice) {
                                var uVal = unit.quality / unit.cost;
                                if (uVal > best.value) {
                                    best.unit = unit;
                                    best.value = uVal;
                                }
                            }

                            // cheapest cost
                            if (unit.cost < cheapest.cost) {
                                cheapest.unit = unit;
                                cheapest.cost = unit.cost;
                            }
                        }
                    }
                }

                //console.debug("best",best);
                //console.debug("cheapest", cheapest);

                // ok we looked at literally everything. (this is bad should do a random sample each day maybe?)
                if (best.unit != null && best.unit.resident == null && person.money >= best.unit.cost) { // have to afford one day at least...
                    best.unit.resident = person;
                    person.residence = best.unit;
                    //console.log("best");
                }
                else if (cheapest.unit != null && cheapest.unit.resident == null && person.money >= cheapest.unit.cost) { // have to afford at least one day man
                    cheapest.unit.resident = person;
                    person.residence = cheapest.unit; // enjoy yourself
                    //console.log("cheapest");
                }
            }

            // pay rent or GTFO
            if (person.residence != null) {
                if (person.money >= person.residence.cost) {
                    person.money -= person.residence.cost;
                }
                else {
                    // feel free to come to the open house tomorrow
                    person.residence.resident = null;
                    person.residence = null;
                }
            }

        }

        // END PEOPLE ------------------------------------------------------
    }
}
