"""Original Skunkworks Academy formative examples. Python 3.12+; offline only."""
import sys
import unittest


def reserve(capacity, enrolled, requested):
    values = (capacity, enrolled, requested)
    if any(type(value) is not int for value in values):
        raise TypeError("integer counts required")
    if capacity < 0 or enrolled < 0 or enrolled > capacity or requested < 1:
        raise ValueError("invalid booking counts")
    return enrolled + requested <= capacity


def unique_scan(values):
    result, comparisons = [], 0
    for value in values:
        found = False
        for present in result:
            comparisons += 1
            if value == present:
                found = True
                break
        if not found:
            result.append(value)
    return result, comparisons


def mean_valid(image):
    """3x3 valid-window mean; border pixels have no output position."""
    return [[sum(image[r+dr][c+dc] for dr in range(3) for dc in range(3))/9
             for c in range(len(image[0])-2)] for r in range(len(image)-2)]


class Contracts(unittest.TestCase):
    def test_exact_capacity(self): self.assertTrue(reserve(10, 8, 2))
    def test_over_capacity(self): self.assertFalse(reserve(10, 8, 3))
    def test_invalid_request(self):
        with self.assertRaises(ValueError): reserve(10, 8, 0)
    def test_bad_state(self):
        with self.assertRaises(ValueError): reserve(10, 11, 1)
    def test_boolean_not_count(self):
        with self.assertRaises(TypeError): reserve(10, 8, True)
    def test_filter(self):
        image = [[0.0]*5 for _ in range(5)]
        image[2][2] = 90
        self.assertEqual(mean_valid(image), [[10.0]*3 for _ in range(3)])
    def test_scan(self): self.assertEqual(unique_scan([1, 2, 1]), ([1, 2], 2))


if __name__ == "__main__":
    command = sys.argv[1] if len(sys.argv)>1 else "test"
    if command == "contracts": print(reserve(10,8,2), reserve(10,8,3))
    elif command == "design":
        for n in (4,8): print(f"n={n}; comparisons={unique_scan(list(range(n)))[1]}")
    elif command == "image":
        image = [[0.0]*5 for _ in range(5)]; image[2][2]=90
        for row in mean_valid(image): print(row)
    elif command == "test": unittest.main(argv=[sys.argv[0]])
    else: raise SystemExit("Use contracts, design, image or test")
