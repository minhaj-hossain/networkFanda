# 30-Day Interactive Networking & IT Support Curriculum

## From Networking Fundamentals to a Simulated Junior IT Support Job

### Core Philosophy

This curriculum is not designed as a traditional networking course.

The learner should not primarily learn by reading definitions, watching lectures, or memorizing commands.

Instead, the learning cycle should be:

**See → Interact → Predict → Experiment → Break → Troubleshoot → Understand → Apply**

The learner should gradually move from:

> “I know what a router is.”

to:

> “I can look at a network, understand what is happening, predict what should happen next, and troubleshoot when reality differs from my expectation.”

---

# 1. Overall Learning Architecture

Every learning day contains five layers.

### Layer 1 — Visual Story
Introduce a realistic situation.
*Example:* “You just joined TechNova Ltd. as a Junior IT Support Engineer. An employee says their computer cannot access the company server.”
The learner sees the actual environment rather than being presented with a definition.

### Layer 2 — Interactive Concept Simulation
The system temporarily isolates the concept that the learner needs.
*For example, when teaching ARP:*
Instead of reciting “ARP maps an IP address to a MAC address”, show PC-A querying “Who owns 192.168.1.1?” across the switch, the router answering with its physical MAC, and PC-A caching the entry.
The learner can replay the process, slow it down, inspect the packet headers, and change the network to see what happens.

### Layer 3 — Guided Experiment
The learner gets control.
*For example:* “Change PC-A's IP address to 192.168.2.10. What do you think will happen when pinging PC-B (192.168.1.20)?”
The learner enters their prediction, runs the simulation, and observes the real consequence directly.

### Layer 4 — Workplace Application
The learner returns to the fictional company.
*Example:* “The Finance department has just been moved to a new network. Configure their PCs and switch ports so they can communicate with the company's internal server.”

### Layer 5 — Troubleshooting
Something goes wrong. The learner must investigate without spoilers.
*Example:* Finance reports their server is unreachable. The learner inspects cables, IP configurations, subnet masks, default gateways, and DNS settings.

---

# 2. The Visual Learning Engine

The browser layout acts as an interactive workspace:

```text
┌──────────────────────────────────────────────────────────┐
│ TechNova Ltd.                         Day 07    ☰        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│                  INTERNET                                │
│                      │                                   │
│                   ROUTER                                 │
│                  /       \                               │
│                 /         \                              │
│             Switch A     Switch B                        │
│             /    \          /    \                       │
│           PC1    PC2      PC3    PC4                     │
│                                                          │
│        ● Packet travelling → → →                         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Packet Inspector                                         │
│ Source: 192.168.1.10                                     │
│ Destination: 192.168.2.20                                │
│ Protocol: TCP                                            │
│ Status: Waiting at Router                                │
├──────────────────────────────────────────────────────────┤
│ [▶ Play] [⏸ Pause] [↶ Replay] [🐢 Slow Motion]           │
└──────────────────────────────────────────────────────────┘
```

Features provided:
- Zoom in / out & click devices
- Inspect IP / MAC addresses
- Watch packets physically move
- Pause, replay, and single-step traffic
- Intentionally break configurations
- Change values and predict outcomes
- Compare expected vs actual behavior

---

# 3. Complete Curriculum by Phase

## PHASE 01 — HOW NETWORKS ACTUALLY WORK

### Day 1 — What Actually Happens When You Open a Website?
- **Concepts**: Network, Client, Server, LAN, WAN, Internet, Packet, Switch, Router, Basic topology.
- **Visual Experience**: Laptop → Wi-Fi / Switch → Router → ISP → Internet → Web Server. Inspecting the traveling packet.
- **Required Understanding**: "My computer does not directly talk to the entire Internet. It sends traffic through local equipment and routers."
- **Workplace Scenario**: TechNova IT trainee onboarding: identify PCs, switches, router, company server, and internet uplink.

### Day 2 — MAC Addresses & Ethernet
- **Concepts**: NIC, MAC address, Ethernet frame, Switch, MAC address table, Unicast, Broadcast.
- **Visual Experience**: 4 PCs on a switch with MAC IDs (`AA:..:01`, `BB:..:02`). Switch populates its CAM/MAC table and forwards unicast frames directly without flooding.
- **Required Understanding**: MAC identifies a network interface at Layer 2; switch uses MAC tables to avoid unnecessary flooding.

### Day 3 — IPv4 Addressing
- **Concepts**: IPv4 address, Network portion, Host portion, Private vs Public IP, Loopback (127.0.0.1).
- **Visual Simulation**: Apartment building analogy (Building = Network ID, Apartment = Host ID) coupled with live network ping test.
- **Required Understanding**: Logical addressing allows inter-network routing; devices on different network IDs cannot communicate directly without a gateway.

### Day 4 — Subnet Masks
- **Concepts**: Subnet mask, `/24`, `/16`, Network vs Host boundary.
- **Visual Experience**: Interactive network boundary slider (`/16`, `/20`, `/24`, `/26`). Visually reveals mask bits, total hosts, usable range, and broadcast address.
- **Required Understanding**: Calculating whether two IPs share the exact same subnet mask and network ID.

### Day 5 — Subnetting
- **Concepts**: Subnet division, usable host counts, network and broadcast addresses.
- **Scenario**: TechNova has 4 departments (HR, IT, Finance, Sales) and one `/24` block (192.168.1.0/24).
- **Interactive Simulation**: Split `/24` into four `/26` subnets (`192.168.1.0/26`, `64/26`, `128/26`, `192.168.192/26`) and assign them to department cards.
- **Required Understanding**: Basic subnet calculations and allocation.

---

## PHASE 02 — THE PROTOCOLS BEHIND NETWORK COMMUNICATION

### Day 6 — ARP (Address Resolution Protocol)
- **Core Question**: "If I know another computer's IP address, how do I find its MAC address on my local network?"
- **Visual Simulation**: "Who has 192.168.1.1? Tell 192.168.1.10." Broadcast goes to all switch ports; only the target answers with its unicast MAC response.
- **Required Understanding**: ARP table caching, Layer 2 to Layer 3 mapping.

### Day 7 — DHCP (Dynamic Host Configuration Protocol)
- **Core Question**: "How does a brand-new computer automatically get an IP address?"
- **Visual Simulation**: DORA exchange (Discover → Offer → Request → Acknowledge) with packet payload inspection.
- **Required Understanding**: Lease allocation, gateway assignment, DNS distribution.

### Day 8 — DNS (Domain Name System)
- **Scenario**: User enters `portal.technova.local`.
- **Visual Experience**: Computer queries DNS resolver; resolver maps name to `192.168.10.50`. IP replaces domain in packet destination.
- **Interactive Experiment**: Disable DNS server while keeping IP routing alive to prove "Internet is up, but Name Resolution is down."
- **Required Understanding**: DNS role and troubleshooting isolated DNS failures.

### Day 9 — TCP vs UDP
- **Visual Simulation**: Dual delivery track. TCP shows SYN → SYN-ACK → ACK 3-way handshake, sequence numbers, ACKs, and packet retransmission. UDP shows connectionless streaming without ACKs.
- **Required Understanding**: Port numbers, reliable vs best-effort transport.

### Day 10 — ICMP, Ping & Traceroute
- **Scenario**: "Company server is unreachable."
- **Visual Simulation**: `ping 192.168.10.20` sends ICMP Echo Request/Reply. `tracert` increments TTL (Time-To-Live) from 1 to discover each hop.
- **Required Understanding**: Interpreting echo replies, request timed out, destination host unreachable, TTL exceeded.

---

## PHASE 03 — SWITCHING

### Day 11 — Switch Fundamentals
- **Simulation**: Cold switch boots up. Devices transmit packets. Switch dynamically records Source MAC + Ingress Port.
- **Required Understanding**: Flooding unknown unicast frames vs forward-filtering known unicast.

### Day 12 — VLANs (Virtual Local Area Networks)
- **Scenario**: 1 physical switch with HR, IT, and Finance.
- **Visual Experience**: Switch logically partitions into VLAN 10 (HR), VLAN 20 (IT), VLAN 30 (Finance). Broadcasts stay inside their respective color zone.
- **Required Understanding**: Layer 2 broadcast domain isolation.

### Day 13 — Access Ports & Trunk Ports
- **Visual Simulation**: Two switches linked via a single cable. Access ports carry untagged traffic. Trunk carries 802.1Q tagged frames for multiple VLANs.
- **Required Understanding**: Frame tagging, access vs trunk configuration.

### Day 14 — Inter-VLAN Routing
- **Scenario**: HR (VLAN 10) must reach IT server (VLAN 20).
- **Visual Simulation**: Packet reaches trunk to Router-on-a-Stick or L3 switch sub-interfaces (`192.168.10.1`, `192.168.20.1`) to cross network boundaries.
- **Required Understanding**: Why routing is mandatory between different subnets/VLANs.

### Day 15 — Switching Troubleshooting
- **Hands-on Lab**: Broken switch scenario (VLAN mismatch, disabled port, access port assigned to wrong VLAN).
- **Required Outcome**: Systematic isolation using switch status and packet path inspector.

---

## PHASE 04 — ROUTING

### Day 16 — Routers & Routing Tables
- **Visual Simulation**: Packet reaches Router R1. Router inspects destination IP, performs longest-prefix match on routing table, and chooses next-hop exit interface.
- **Required Understanding**: Hop-by-hop forwarding logic.

### Day 17 — Static Routing
- **Scenario**: Network A (192.168.1.0/24) ↔ R1 ↔ R2 ↔ Network B (192.168.2.0/24).
- **Interactive Configuration**: Add static route `ip route 192.168.2.0 255.255.255.0 10.0.0.2` on R1 and return route on R2.
- **Required Understanding**: Bidirectional routing requirement (packets need a route forward AND a route back).

### Day 18 — Default Route
- **Scenario**: "Where should a router forward unknown external traffic?"
- **Visual**: Specific subnet matches internal interface; unlisted destinations hit `0.0.0.0/0` (Gateway of Last Resort) toward ISP.
- **Required Understanding**: Gateway of Last Resort concept and implementation.

### Day 19 — NAT (Network Address Translation)
- **Visual Simulation**: Internal PC `192.168.1.10:49152` reaches Router. NAT translates private IP to public IP `203.0.113.5:51020`. Reply packet is translated back.
- **Required Understanding**: Private RFC 1918 space, Port Address Translation (PAT/NAT Overload).

### Day 20 — Routing Troubleshooting
- **Lab**: R1 to R2 link failure or missing return route.
- **Tools**: `ping`, `tracert`, `show ip route`.
- **Outcome**: Finding where the packet dies rather than guessing.

---

## PHASE 05 — REAL IT SUPPORT SKILLS

### Day 21 — Windows Network Troubleshooting
- **Interactive Windows Desktop**: CMD terminal, Network Adapter settings, web browser.
- **Commands**: `ipconfig`, `ipconfig /all`, `ipconfig /release`, `ipconfig /renew`, `ipconfig /flushdns`, `ping`, `tracert`, `nslookup`, `arp -a`, `netstat -ano`.
- **Scenario**: Employee cannot reach company portal; diagnosis via Windows commands.

### Day 22 — Linux Networking
- **Interactive Linux Bash Terminal**: Ubuntu server console.
- **Commands**: `ip addr`, `ip route`, `ping`, `ss -tuln`, `curl -I`, `dig`, `traceroute`.
- **Scenario**: Web service running on Linux server; verify port binding, firewall, and default route.

### Day 23 — IT Support Ticket #1001
- **Ticket**: "User cannot access the Internet."
- **Environment**: Full simulated workstation and network.
- **Possible Culprits**: Unplugged cable, APIPA IP (169.254.x.x), DHCP scope exhaustion, incorrect gateway, DNS server down.

### Day 24 — IT Support Ticket #1002
- **Ticket**: "I can access Google, but I cannot access the internal intranet portal."
- **Key Skill**: Distinguishing public DNS / Internet connectivity from internal DNS / intranet server reachability.

### Day 25 — Network-Wide Incident (Scope Analysis)
- **Ticket**: "30 employees suddenly lost network access."
- **Key Skill**: Determining incident blast radius: Single PC? Single switch port? Switch stack? Department VLAN? Gateway router?

---

## PHASE 06 — SIMULATED FIRST JOB

### Day 26 — Joining TechNova Ltd.
- **Task**: First day as Junior IT Support Engineer. Review topology diagram, IP scheme, VLAN mapping, device inventory, and core server configurations.

### Day 27 — Network Expansion
- **Task**: TechNova launches Customer Support (25 employees).
- **Deliverables**: Subnet design (/27), VLAN 40 creation, switch trunk/access port assignment, DHCP pool creation, default gateway config.

### Day 28 — Production Incident (10:15 AM)
- **Incident**: Critical outage in Customer Support.
- **Deliverable**: Root Cause Analysis (RCA) report covering Problem Statement, Evidence, Root Cause, Remediation, and Verification.

### Day 29 — Design a Branch Network
- **Task**: Branch office for 40 employees across 4 departments (Management, Operations, Support, Guests).
- **Deliverable**: Network topology diagram, IP addressing scheme, VLAN definitions, DHCP setup, and uplink security policy.

### Day 30 — Final Practical Assessment (Capstone)
- **Challenge**: Severely broken enterprise network with multi-point failures across Layer 1, Layer 2, Layer 3, and Application Services.
- **Outcome**: Full resolution, functional connectivity, and signed-off completion report.

---

# 4. Learning Modes & Competencies

### Three Progressive Learning Modes
1. **Guided Mode**: Direct instructions and pointers for learning new concepts.
2. **Assisted Mode**: Clues and conceptual hints; learner chooses actions.
3. **Realistic Mode**: True-to-life ticket mode with no hints; evaluates real diagnostic habits.

### Competency Tracking
- **IP Addressing & Subnetting** (Structure, CIDR calculation, IP assignment)
- **DHCP** (DORA sequence, Scope config, Lease troubleshooting)
- **DNS** (Resolution pipeline, Record types, Diagnosis)
- **Switching** (MAC learning, VLANs, Trunking, 802.1Q)
- **Routing** (Routing tables, Static routing, Default gateway, NAT)
- **IT Support & Incident Response** (Scope analysis, Command mastery, Root Cause Analysis)
