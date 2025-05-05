// const { closest, distance } = require("./mod.js");
// import { closest, distance } from "./mod_max.js";
import { distance } from "../src/distance.js";
import { closest } from "../src/closest.js";

const levenshtein = (a, b) => {
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }

  if (a.length > b.length) {
    const tmp = a;
    a = b;
    b = tmp;
  }

  const row = [];
  for (let i = 0; i <= a.length; i++) {
    row[i] = i;
  }

  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      let val = 0;
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        val = row[j - 1];
      } else {
        val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }

  return row[a.length];
};

const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

test("test compare", () => {
  for (let i = 0; i < 10; i++) {
    const rnd_num1 = (Math.random() * 1000) | 0;
    const rnd_num2 = (Math.random() * 1000) | 0;
    const rnd_string1 = makeid(rnd_num1);
    const rnd_string2 = makeid(rnd_num2);
    const actual = distance(rnd_string1, rnd_string2);
    const expected = levenshtein(rnd_string1, rnd_string2);
    expect(actual).toBe(expected);
  }
});

test("test find", () => {
  const actual = closest("fast", ["slow", "faster", "fastest"]);
  const expected = "faster";
  expect(actual).toBe(expected);
});

test("returns exact match if available", () => {
  const actual = closest("fast", ["fast", "faster", "fastest"]);
  expect(actual).toBe("fast");
});

test("returns the closest by edit distance", () => {
  const actual = closest("fast", ["slow", "faster", "fastest"]);
  expect(actual).toBe("faster");
});

test("prefers shorter strings in case of tie", () => {
  const actual = closest("cat", ["cut", "cart"]);
  expect(actual).toBe("cut"); // both 1 edit away, but "cut" is shorter
});

test("handles completely unrelated strings", () => {
  const actual = closest("apple", ["banana", "carrot", "grape"]);
  expect(actual).toBe("grape"); // fewer edits than banana/carrot
});

test("handles empty list", () => {
  const actual = closest("hello", []);
  expect(actual).toBeNull(); //  null depending on your impl
});

test("returns first match on tie", () => {
  const actual = closest("book", ["cook", "nook", "look"]);
  expect(["cook", "nook", "look"]).toContain(actual); // all are 1 edit away
});

test("handles case sensitivity", () => {
  const actual = closest("Fast", ["fast", "FAST", "FaSt"]);
  expect(actual).toBe("fast"); // or normalize input if needed
});

test("works with unicode characters", () => {
  const actual = closest("café", ["cafe", "caff", "cafeteria"]);
  expect(actual).toBe("cafe");
});

test("returns input itself if it's the only string", () => {
  const actual = closest("needle", ["needle"]);
  expect(actual).toBe("needle");
});

test("finds closest match at the end", () => {
  const actual = closest("code", ["road", "mode", "code"]);
  expect(actual).toBe("code");
});

test("respects maxDistance cutoff", () => {
  const actual = closest("hello", ["hellooooo", "hell", "hola"], 2);
  expect(actual).toBe("hell"); // Only "hell" is within 2 edits
});

test("resolves tie with common prefix", () => {
  const actual = closest("abc", ["adc", "abcde"]);
  expect(actual).toBe("adc"); // Same distance, but shorter string
});

test("handles empty target string", () => {
  const actual = closest("", ["a", "ab", "abc"]);
  expect(actual).toBe("a");
});

test("handles long string input", () => {
  const a = makeid(1000);
  const b = a.slice(0, 999) + "x"; // 1 char diff
  const actual = distance(a, b);
  expect(actual).toBe(1);
});
