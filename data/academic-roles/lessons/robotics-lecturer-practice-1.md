## Outcomes

Define a planar robot pose with units; predict one discrete motion step; distinguish model assumptions from physical behaviour.

## Explain and demonstrate

A simple mobile-robot model describes pose as x, y and heading theta. In this lesson x points right, y points up, heading is measured counterclockwise in radians and speed is metres per second. A forward-Euler update uses the current heading to calculate displacement over a time step: x changes by speed × cos(theta) × dt, y by speed × sin(theta) × dt, and theta by angular speed × dt.

This is a teaching model. It ignores wheel slip, acceleration limits, localization error and collision geometry. For straight motion from the origin with heading zero, speed 1 m/s and dt 2 s, the new pose is (2, 0, 0). If angular speed is nonzero, a long Euler step approximates a curved path poorly. Reducing the step can improve the numerical approximation, but it does not remove the physical assumptions.

### Worked example: name the quantities

| Quantity | Meaning | Unit | Example |
|---|---|---|---|
| x, y | Position in world frame | metres | 0, 0 |
| theta | Heading from positive x | radians | 0 |
| speed | Forward body speed | metres/second | 1 |
| angular speed | Heading change rate | radians/second | 0 |
| dt | Step duration | seconds | 2 |

A body frame moves with the robot, while the world frame remains fixed for this scenario. The trigonometric terms convert forward body motion into world-coordinate displacement. Naming the frame prevents a learner from treating “forward” as always increasing world x.

## Lab — predict and trace motion

**Setup:** Download `lab.py`. Use only the Python simulation; do not connect motors, hardware interfaces or physical robots.

1. Predict the straight-motion pose, then run `python lab.py motion`. Expect `(2.0, 0.0, 0)`.
2. Call `step` with heading approximately pi/2 and zero angular speed. Predict displacement along positive y; allow small floating-point residuals near zero.
3. Compare one 1-second turning step with ten 0.1-second steps using the same speed and angular speed. Record the different positions and explain the approximation.
4. Add a zero-speed case. Check that position remains fixed while heading may still change.
5. Prepare a trace table with initial pose, inputs, duration and resulting pose for each case.

**Fault injection:** Pass 90 as a heading while treating it as degrees. Explain the unexpected direction; convert degrees to radians before rerunning. **Expected observations:** Units and integration interval affect results even when the code executes without error.

**Evidence:** Trace table, units, model assumptions and a short learner explanation. **Cleanup:** Retain the offline fixture only; no devices or services were provisioned.

## Common pitfalls and teaching decisions

A simulator can produce an apparently precise number from an unrealistic model. Do not describe that output as a measured physical result. For a learner struggling with trigonometry, begin with headings 0 and pi/2 before introducing arbitrary angles. Provide the coordinate table as an alternative to a plotted trajectory.

## Retrieval and reflection

<details><summary>Does a smaller time step make the model physically complete?</summary>

No. It can reduce integration error while leaving slip, sensing and actuator limitations unmodelled.

</details>

<details><summary>Why is a frame declaration necessary?</summary>

Position and direction depend on the reference frame. Body-forward movement is converted into world displacement using the heading.

</details>

## Official references

[ROS coordinate conventions, REP 103](https://github.com/ros-infrastructure/rep/blob/master/rep-0103.rst) · [Python trigonometric functions](https://docs.python.org/3.14/library/math.html). This fixture is not a ROS installation or a physical robot controller.
