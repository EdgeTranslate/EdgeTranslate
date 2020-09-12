import Moveable from "content/display/library/moveable/moveable.js";

describe("test moveable api in content module", () => {
    it("to test on function(set event handlers)", done => {
        let moveable = new Moveable(document.body, {});
        let testFunction = function() {
            let a = 1;
            let b = 2;
            return a + b;
        };
        // test return value
        expect(moveable.on("dragStart")).toEqual(moveable);

        moveable.on("dragStart", testFunction);
        expect(moveable.handlers.dragStart).toEqual(testFunction);

        moveable.on("drag", testFunction);
        expect(moveable.handlers.drag).toEqual(testFunction);

        moveable.on("resize", testFunction);
        expect(moveable.handlers.resize).toEqual(testFunction);

        done();
    });

    it("to test moveable request api", done => {
        let moveable = new Moveable(document.body, {});
        // draggable is false
        expect(moveable.request("drag", {})).toBeFalsy();
        // resizable is false
        expect(moveable.request("resize", {})).toBeFalsy();
        // options is undefined
        expect(moveable.request("resize")).toBeFalsy();

        done();
    });

    it("to set the the direction option", done => {
        let moveable = new Moveable(document.body, {});
        expect(moveable.setDirections({})).toBeFalsy();
        done();
    });

    it("to set the the threshold value option", done => {
        let moveable = new Moveable(document.body, {});
        expect(moveable.setThreshold({})).toBeFalsy();
        done();
    });
});
