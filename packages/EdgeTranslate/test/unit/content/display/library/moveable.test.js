import Moveable from "content/display/library/moveable/moveable.js";

describe("test moveable api in content module", () => {
    it("to test on function(set event handlers)", () => {
        let moveable = new Moveable(document.body, {});
        let testFunction = () => {
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
    });

    it("to test moveable request api", () => {
        let moveable = new Moveable(document.body, {});
        // draggable is false
        expect(moveable.request("drag", {})).toBeFalsy();
        // resizable is false
        expect(moveable.request("resize", {})).toBeFalsy();
        // options is undefined
        expect(moveable.request("resize")).toBeFalsy();
    });

    it("to set the the direction option", () => {
        let moveable = new Moveable(document.body, {});
        expect(moveable.setDirections({})).toBeFalsy();
    });

    it("to set the the threshold value option", () => {
        let moveable = new Moveable(document.body, {});
        expect(moveable.setThreshold({})).toBeFalsy();
    });
});
