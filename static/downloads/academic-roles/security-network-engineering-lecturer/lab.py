"""Offline address and policy simulations; sends no network traffic."""
import ipaddress
import sys


def allow(authenticated, device_compliant, role, action):
    return authenticated and device_compliant and role == "learner" and action == "read-lab"


def tests():
    subnet=ipaddress.ip_network("10.20.0.0/26")
    assert subnet.num_addresses == 64
    assert str(subnet.broadcast_address) == "10.20.0.63"
    assert not subnet.overlaps(ipaddress.ip_network("10.20.0.64/26"))
    assert allow(True,True,"learner","read-lab")
    assert not allow(True,True,"learner","change-grades")
    assert not allow(False,True,"learner","read-lab")
    print("6 network checks passed")


if __name__ == "__main__":
    command=sys.argv[1] if len(sys.argv)>1 else "test"
    if command == "subnets":
        for network in ipaddress.ip_network("10.20.0.0/24").subnets(new_prefix=26):
            hosts=list(network.hosts())
            print(network, hosts[0], hosts[-1], len(hosts))
    elif command == "policy":
        print("read-lab:", allow(True,True,"learner","read-lab"))
        print("change-grades:", allow(True,True,"learner","change-grades"))
    elif command == "logs":
        print("SIMULATED 09:00:00 DNS lab.example.com -> 192.0.2.10")
        print("SIMULATED 09:00:01 TCP 443 established; TLS verified in fictional fixture")
        print("SIMULATED 09:00:02 HTTP 403; policy=missing-course-role")
    elif command == "test": tests()
    else: raise SystemExit("Use subnets, policy, logs or test")
