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

    it("to set the the direction option", done => {
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
        moveableE.setDirections([]);
        expect(moveableE.directions).toEqual({});

        let directionTarget = {
            se: null,
            ne: null,
            nw: null,
            sw: null
        };
        moveableE.setDirections(["se", "ne", "nw", "sw"]);
        expect(moveableE.directions).toEqual(directionTarget);

        moveableE.setDirections(directionTarget);
        expect(moveableE.directions).toEqual(directionTarget);

        done();
    });

    it("to parse the resize threshold option", done => {
        // test undefined type
        let moveableE = new moveable(document.body, {});
        let thresholdValue = 10;
        moveableE.parseThreshold();
        expect(moveableE.resizeThreshold).toEqual({
            s: thresholdValue,
            se: thresholdValue,
            e: thresholdValue,
            ne: thresholdValue,
            n: thresholdValue,
            nw: thresholdValue,
            w: thresholdValue,
            sw: thresholdValue
        });

        // test number type
        thresholdValue = 5;
        moveableE.options.threshold = thresholdValue; // set a number
        moveableE.parseThreshold();
        expect(moveableE.resizeThreshold).toEqual({
            s: thresholdValue,
            se: thresholdValue,
            e: thresholdValue,
            ne: thresholdValue,
            n: thresholdValue,
            nw: thresholdValue,
            w: thresholdValue,
            sw: thresholdValue
        });

        // test object type
        let edgeValue = 5,
            cornerValue = 3;
        moveableE.options.threshold = {
            edge: edgeValue,
            corner: cornerValue
        }; // set an object
        moveableE.parseThreshold();
        expect(moveableE.resizeThreshold).toEqual({
            s: edgeValue,
            se: cornerValue,
            e: edgeValue,
            ne: cornerValue,
            n: edgeValue,
            nw: cornerValue,
            w: edgeValue,
            sw: cornerValue
        });

        edgeValue = 5;
        cornerValue = 3;
        thresholdValue = 10;
        moveableE.options.threshold = {
            edge: edgeValue,
            s: 1,
            e: 2,
            sw: 7
        }; // set an object
        moveableE.parseThreshold();
        expect(moveableE.resizeThreshold).toEqual({
            s: 1,
            se: thresholdValue,
            e: 2,
            ne: thresholdValue,
            n: edgeValue,
            nw: thresholdValue,
            w: edgeValue,
            sw: 7
        });

        moveableE.options.threshold = {
            se: 1,
            ne: 2,
            n: 3,
            nw: 4,
            w: 6
        }; // set an object
        moveableE.parseThreshold();
        expect(moveableE.resizeThreshold).toEqual({
            s: thresholdValue,
            se: 1,
            e: thresholdValue,
            ne: 2,
            n: 3,
            nw: 4,
            w: 6,
            sw: thresholdValue
        });

        done();
    });
});
