import draggable from "content/display/library/moveable/draggable.js";

describe("test draggable api in content module", () => {
    it("to parse the bounds option", () => {
        expect(draggable.parseBounds()).toEqual({
            left: Number.NEGATIVE_INFINITY,
            top: Number.NEGATIVE_INFINITY,
            right: Number.POSITIVE_INFINITY,
            bottom: Number.POSITIVE_INFINITY,
        });

        expect(draggable.parseBounds({ left: 0 })).toEqual({
            left: 0,
            top: Number.NEGATIVE_INFINITY,
            right: Number.POSITIVE_INFINITY,
            bottom: Number.POSITIVE_INFINITY,
        });

        expect(draggable.parseBounds({ top: 0 })).toEqual({
            left: Number.NEGATIVE_INFINITY,
            top: 0,
            right: Number.POSITIVE_INFINITY,
            bottom: Number.POSITIVE_INFINITY,
        });

        expect(draggable.parseBounds({ right: 100 })).toEqual({
            left: Number.NEGATIVE_INFINITY,
            top: Number.NEGATIVE_INFINITY,
            right: 100,
            bottom: Number.POSITIVE_INFINITY,
        });

        expect(draggable.parseBounds({ bottom: 100 })).toEqual({
            left: Number.NEGATIVE_INFINITY,
            top: Number.NEGATIVE_INFINITY,
            right: Number.POSITIVE_INFINITY,
            bottom: 100,
        });
    });
});
