"""Synthetic performance arithmetic; does not measure this computer."""
import sys


def speedup(fraction, improvement): return 1/((1-fraction)+fraction/improvement)


if __name__ == "__main__":
    command=sys.argv[1] if len(sys.argv)>1 else "test"
    if command == "performance": print(f"Predicted speedup: {speedup(0.4,2):.2f}x")
    elif command == "diagnose":
        print("SIMULATED baseline: CPU=25%; free_memory=4GiB; I/O_wait=35%; request_p95=800ms")
        print("SIMULATED after fixture correction: I/O_wait=5%; request_p95=200ms")
    elif command == "test":
        assert speedup(0.4,2)==1.25; assert speedup(0,10)==1.0
        print("2 performance checks passed")
    else: raise SystemExit("Use performance, diagnose or test")
