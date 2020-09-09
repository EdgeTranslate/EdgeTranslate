import moveable from "../../../../src/content/display/library/moveable/moveable.js";

describe("moveable api in content module", () => {
    it("to parse the direction option", done => {
        expect(new moveable(document.body, {}).directions).toEqual([
            "s",
            "se",
            "e",
            "ne",
            "n",
            "nw",
            "w",
            "sw"
        ]);
        let arrayTarget = ["se", "ne", "nw", "sw"];
        expect(new moveable(document.body, { directions: arrayTarget }).directions).toEqual(
            arrayTarget
        );
        expect(new moveable(document.body, { directions: "" }).directions).toEqual([]);
        expect(new moveable(document.body, { directions: "se,ne,nw,sw" }).directions).toEqual(
            arrayTarget
        );
        expect(
            new moveable(document.body, { directions: { se: null, ne: null, nw: null, sw: null } })
                .directions
        ).toEqual(arrayTarget);
        done();
    });
});
