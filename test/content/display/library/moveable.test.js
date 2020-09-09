import moveable from "../../../../src/content/display/library/moveable/moveable.js";

describe("moveable api in content module", () => {
    it("to parse the direction option", done => {
        let moveableE = new moveable(document.body, {});
        moveableE.parseDirection();
        expect(moveableE.directions).toEqual({
            s: null,
            se: null,
            e: null,
            ne: null,
            n: null,
            nw: null,
            w: null,
            sw: null
        });

        moveableE.options.directions = [];
        moveableE.parseDirection();
        expect(moveableE.directions).toEqual({});

        let directionTarget = {
            se: null,
            ne: null,
            nw: null,
            sw: null
        };
        moveableE.options.directions = ["se", "ne", "nw", "sw"];
        moveableE.parseDirection();
        expect(moveableE.directions).toEqual(directionTarget);

        moveableE.options.directions = "";
        moveableE.parseDirection();
        expect(moveableE.directions).toEqual({});

        moveableE.options.directions = "se,ne,nw,sw";
        moveableE.parseDirection();
        expect(moveableE.directions).toEqual(directionTarget);

        moveableE.options.directions = directionTarget;
        moveableE.parseDirection();
        expect(moveableE.directions).toEqual(directionTarget);

        done();
    });
});
