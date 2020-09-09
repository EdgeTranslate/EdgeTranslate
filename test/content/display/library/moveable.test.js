import moveable from "../../../../src/content/display/library/moveable/moveable.js";

describe("moveable api in content module", () => {
    it("to parse the direction option", done => {
        expect(new moveable(document.body, {}).directions).toEqual({
            s: null,
            se: null,
            e: null,
            ne: null,
            n: null,
            nw: null,
            w: null,
            sw: null
        });
        let directionTarget = {
            se: null,
            ne: null,
            nw: null,
            sw: null
        };
        expect(new moveable(document.body, { directions: [] }).directions).toEqual({});
        expect(
            new moveable(document.body, { directions: ["se", "ne", "nw", "sw"] }).directions
        ).toEqual(directionTarget);
        expect(new moveable(document.body, { directions: "" }).directions).toEqual({});
        expect(new moveable(document.body, { directions: "se,ne,nw,sw" }).directions).toEqual(
            directionTarget
        );
        expect(new moveable(document.body, { directions: directionTarget }).directions).toEqual(
            directionTarget
        );
        done();
    });
});
