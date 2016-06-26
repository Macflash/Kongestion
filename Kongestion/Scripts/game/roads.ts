// A class to wrap any generic item (person, car, train cargo)
// and handle all of the logic 
class Traveler<T> {
    occupant: T;
}

// concept: 
// paving lets you use cars and busses and stuff. 
// paving stuff takes time and is expensive.
// repainting lines is pretty easy and quick.

// represents the actual ground being paved. these will connect to all neighbors.
class Pavement {
    occupant: Traveler<any>;
    lane: Lane;

    public createTile(code: string) {
        return new Pavement(code);
    }

    constructor(code: string) {
        switch (code) {
            // basic turns
            case "r":
                this.lane = new Lane(LaneType.rightTurn, 0);
                break;
            case "l":
                this.lane = new Lane(LaneType.leftTurn, 0);
                break;

            // straight roads
            case "u":
                this.lane = new Lane(LaneType.straight, 0);
                break;
            case "d":
                this.lane = new Lane(LaneType.straight, 2);
                break;
            case ">":
                this.lane = new Lane(LaneType.straight, 1);
                break;
            case "<":
                this.lane = new Lane(LaneType.straight, 3);
                break;
            
            // other cases
            case "p":
                break;
            case " ":
                console.error("pavement got passed an ' ' empty lane code, should just be plain terrain then");
                break;
        }
    }
}

enum LaneType {
    straight,
    leftTurn,
    rightTurn,
    parkingSpot,
    crossWalk
}

// a lane that directs how you can move on the pavement. This will connect only based on direction and line markings.
class Lane {
    rotation: number; // 0 - 3, 0 is up, then right, then down etc.
    type: LaneType;
    next: Lane; // these directions are relative to the rotation
    prev: Lane;
    left: Lane; // these are like side ways but in the same "flow"
    right: Lane;

    constructor(type: LaneType, rotation: number) {
        this.rotation = rotation;
        this.type = type;
    }
}

class Terrain {
    building: Building;
    pavement: Pavement;
    x: number;
    y: number;

    log() {
        console.log("tile: " + this.x + "," + this.y);

        if (this.pavement) {
            this.pavement = null;
            return;
        }

        if (!this.building) {
            this.pavement = new Pavement("p");
        }
    }

    constructor(code: string, x: number, y: number) {
        this.x = x;
        this.y = y;
        switch (code) {
            case " ":
                break;
            case "b":
                this.building = <any>true;
                break;
            default:
                this.pavement = new Pavement(code);
        }
    }
}

class Grid {
    terrain: Terrain[][];

    createGrid(layout: string[][]) {
        this.terrain = [];
        for (var i in layout) {
            this.terrain[i] = [];
            for (var j in layout[i]) {
                this.terrain[i][j] = new Terrain(layout[i][j], i, j);
            }
        }
    }

    constructor(size?: number) {
        if (size) {
            this.terrain = [];
            for (var i = 0; i < size; i++) {
                this.terrain[i] = []
                for (var j = 0; j < size; j++) {
                    this.terrain[i][j] = new Terrain(" ", i, j);
                }
            }
        }

        console.log(this);
    }
}

var myWorker = new Worker("Scripts/game/worker.js");
myWorker.onerror = (x) => {
    console.debug("error worker:", x);
};
myWorker.onmessage = (x) => {
    console.debug("from worker:", x);
};
console.log(myWorker);
console.log("sending message");
myWorker.postMessage("hey");


