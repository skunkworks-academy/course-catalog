"""Scalar simulations, not physical robot controllers or safety certification."""
import math
import sys


def step(x, y, theta, speed, angular_speed, dt):
    return (x+speed*math.cos(theta)*dt, y+speed*math.sin(theta)*dt, theta+angular_speed*dt)


def control(target, position, gain=0.5, limit=1.0):
    return max(-limit, min(limit, gain*(target-position)))


def next_state(current, valid, obstacle, reset=False):
    if not valid: return "FAULT"
    if current == "FAULT": return "STOP" if reset else "FAULT"
    return "STOP" if obstacle else "RUN"


def tests():
    assert step(0,0,0,1,0,2) == (2,0,0)
    assert control(10,0) == 1
    assert control(0,10) == -1
    assert next_state("RUN",False,False) == "FAULT"
    assert next_state("FAULT",True,False) == "FAULT"
    assert next_state("FAULT",True,False,True) == "STOP"
    print("6 robotics checks passed")


if __name__ == "__main__":
    command=sys.argv[1] if len(sys.argv)>1 else "test"
    if command == "motion": print(step(0,0,0,1,0,2))
    elif command == "control":
        position=0.0
        for tick in range(5):
            velocity=control(4,position)
            position += velocity
            print(tick, f"command={velocity:.3f}", f"position={position:.3f}")
    elif command == "states":
        state="RUN"
        for valid, obstacle, reset in [(False,False,False),(True,False,False),(True,False,True)]:
            state=next_state(state,valid,obstacle,reset); print(state)
    elif command == "test": tests()
    else: raise SystemExit("Use motion, control, states or test")
