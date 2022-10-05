import resizable from "content/display/library/moveable/resizable.js";

describe("test resizable api in content module", () => {
    it("to parse the direction option", () => {
        // test undefined type
        expect(resizable.parseDirection()).toEqual({
            s: null,
            se: null,
            e: null,
            ne: null,
            n: null,
            nw: null,
            w: null,
            sw: null,
        });

        // test array type
        expect(resizable.parseDirection([])).toEqual({});

        let directionTarget = {
            se: null,
            ne: null,
            nw: null,
            sw: null,
        };
        // test array type
        expect(resizable.parseDirection(["se", "ne", "nw", "sw"])).toEqual(directionTarget);

        // test string type
        expect(resizable.parseDirection("")).toEqual({});

        expect(resizable.parseDirection("se,ne,nw,sw")).toEqual(directionTarget);

        // test object type
        expect(resizable.parseDirection(directionTarget)).toEqual(directionTarget);
    });

    it("to parse the resize threshold option", () => {
        // test undefined type
        let thresholdValue = 10;
        expect(resizable.parseThreshold()).toEqual({
            s: thresholdValue,
            se: thresholdValue,
            e: thresholdValue,
            ne: thresholdValue,
            n: thresholdValue,
            nw: thresholdValue,
            w: thresholdValue,
            sw: thresholdValue,
        });

        // test number type
        thresholdValue = 5;
        expect(resizable.parseThreshold(thresholdValue)).toEqual({
            s: thresholdValue,
            se: thresholdValue,
            e: thresholdValue,
            ne: thresholdValue,
            n: thresholdValue,
            nw: thresholdValue,
            w: thresholdValue,
            sw: thresholdValue,
        });

        // test object type
        let edgeValue = 5,
            cornerValue = 3;
        expect(
            resizable.parseThreshold({
                edge: edgeValue,
                corner: cornerValue,
            })
        ).toEqual({
            s: edgeValue,
            se: cornerValue,
            e: edgeValue,
            ne: cornerValue,
            n: edgeValue,
            nw: cornerValue,
            w: edgeValue,
            sw: cornerValue,
        });

        edgeValue = 5;
        cornerValue = 3;
        thresholdValue = 10;
        expect(
            resizable.parseThreshold({
                edge: edgeValue,
                s: 1,
                e: 2,
                sw: 7,
            })
        ).toEqual({
            s: 1,
            se: thresholdValue,
            e: 2,
            ne: thresholdValue,
            n: edgeValue,
            nw: thresholdValue,
            w: edgeValue,
            sw: 7,
        });

        expect(
            resizable.parseThreshold({
                se: 1,
                ne: 2,
                n: 3,
                nw: 4,
                w: 6,
            })
        ).toEqual({
            s: thresholdValue,
            se: 1,
            e: thresholdValue,
            ne: 2,
            n: 3,
            nw: 4,
            w: 6,
            sw: thresholdValue,
        });
    });
});
