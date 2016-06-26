/// <reference path="roads.ts" />
declare function postMessage(message: any, ports?: any): void;

console.log("in worker?");
onmessage = (e) => {
    console.debug("[WORKER] Recieved: ", e);
    
    postMessage("oh shit whaddup");
}

// SET UP THE DB
var db: IDBDatabase;
var request = indexedDB.open("kongestion");
request.onsuccess = (e: any) => {
    db = e.target.result;
}
request.onupgradeneeded = (ev: any) => {
    var d = ev.target.result;
    ////var objectStore = d.createObjectStore("game", 
}