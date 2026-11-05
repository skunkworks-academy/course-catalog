"""Original synthetic teaching examples; not medical guidance."""
import sys
from fractions import Fraction


def logic():
    for enrolled in (False, True):
        for active in (False, True):
            print(int(enrolled), int(active), int(enrolled and active), int(enrolled or active))


def rotate(point): return (-point[1], point[0])


def posterior(prevalence, sensitivity, false_positive_rate):
    numerator = prevalence * sensitivity
    return numerator / (numerator + (1-prevalence)*false_positive_rate)


def tests():
    assert rotate((2,1)) == (-1,2)
    assert sum(x*x for x in (2,1)) == sum(x*x for x in rotate((2,1)))
    assert posterior(Fraction(1,100),Fraction(9,10),Fraction(1,20)) == Fraction(2,13)
    assert not (True and False) and (True or False)
    print("4 mathematics checks passed")


if __name__ == "__main__":
    command = sys.argv[1] if len(sys.argv)>1 else "test"
    if command == "logic": logic()
    elif command == "vectors": print(rotate((2,1)), "squared length:", 5)
    elif command == "probability":
        result=posterior(Fraction(1,100),Fraction(9,10),Fraction(1,20))
        print(f"{result} = {float(result):.4%}")
    elif command == "test": tests()
    else: raise SystemExit("Use logic, vectors, probability or test")
