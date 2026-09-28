# TechNova IT & Networking Project Tracker

This tracker monitors the structural implementation of the 30-Day Interactive Networking & IT Support Simulator, covering completed modules, current architecture, and upcoming milestones.

---

## 1. Project Implementation Status Overview

| Phase | Days | Focus Area | Simulation Engine | Tracker Status |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 01** | Day 01 - 05 | How Networks Actually Work | Packet flow, MAC learning, IPv4, Subnet Mask slider, Subnetting | **COMPLETED & READY** |
| **Phase 02** | Day 06 - 10 | Protocols Behind Network Communication | ARP broadcast, DHCP DORA flow, DNS resolution, TCP vs UDP, Ping/Tracert | **COMPLETED & READY** |
| **Phase 03** | Day 07 - 15 | Switching & Layer 2 | CAM MAC learning, VLAN logical zoning, Access/Trunk 802.1Q, Inter-VLAN routing, Switch Lab | **COMPLETED & READY** |
| **Phase 04** | Day 16 - 20 | Routing & Layer 3 | Routing table matching, Static routes, Default gateway 0.0.0.0/0, NAT/PAT translation, Routing Lab | **COMPLETED & READY** |
| **Phase 05** | Day 21 - 25 | Real IT Support Skills | Windows CMD (`ipconfig`, `netstat`, etc.), Linux Bash (`ip addr`, `ss`, etc.), Tickets #1001 & #1002, Scope Analysis | **COMPLETED & READY** |
| **Phase 06** | Day 26 - 30 | Simulated First Job at TechNova | Onboarding map, Customer Support expansion, RCA report, Branch designer, Final Capstone | **COMPLETED & READY** |

---

## 2. Interactive Feature Matrix

### A. Core Engine Components
- [x] **5-Layer Learning Architecture**: Visual Story → Concept Sim → Experiment → Workplace Application → Troubleshooting
- [x] **Animated Packet Engine**: Visual packet travel between Client, Switch, Router, DNS, Server with play/pause/replay/speed controls
- [x] **Interactive Packet Inspector**: Layer 2 (MAC), Layer 3 (IP), Layer 4 (Ports/Protocol), and payload inspection
- [x] **Dual Terminal System**:
  - Windows CMD prompt with `ipconfig`, `ipconfig /all`, `ping`, `tracert`, `nslookup`, `arp -a`, `netstat -ano`
  - Linux Bash console with `ip addr`, `ip route`, `ping`, `ss -tuln`, `curl`, `dig`, `traceroute`
- [x] **Subnet & CIDR Visualizer**: Interactive boundary slider for `/16` to `/30` calculating mask, total hosts, usable range, and broadcast
- [x] **Subnetting Department Allocator**: Drag-and-drop / click allocation of `/26` subnets to HR, IT, Finance, and Sales
- [x] **Protocol Interactive Explorers**:
  - ARP request broadcast & unicast reply
  - DHCP 4-step DORA message exchange
  - DNS lookup & DNS failure toggle
  - TCP 3-Way Handshake vs UDP packet stream comparison
  - ICMP Ping & Traceroute hop-by-hop TTL simulation
- [x] **Switching & VLAN Visualizer**:
  - Dynamic MAC Address Table learning
  - VLAN color-coded logical partitioning (VLAN 10, 20, 30)
  - Trunk link 802.1Q tagged frame transport
  - Inter-VLAN routing gateway
- [x] **Routing & NAT Visualizer**:
  - Routing table lookup engine (Destination, Netmask, Gateway, Interface)
  - Static route builder
  - Default route fallback (0.0.0.0/0)
  - NAT private-to-public port address translation table
- [x] **IT Support Ticket Desk**:
  - Ticket #1001: "User cannot access the Internet" (cable, IP, DHCP, gateway diagnosis)
  - Ticket #1002: "Google works, internal company portal fails" (DNS & Intranet isolation)
  - Ticket #1003: "30 employees offline" (Blast radius & scope analysis)
- [x] **TechNova Corporate Simulation (Phase 6)**:
  - Day 26: Network diagram inspection & inventory review
  - Day 27: Customer Support 25-seat expansion planner
  - Day 28: 10:15 AM Production outage & Root Cause Analysis (RCA) editor
  - Day 29: Branch office architecture designer
  - Day 30: Final comprehensive network capstone challenge
- [x] **Competency Radar & Progress Tracking**:
  - Persistent state in browser (`localStorage`)
  - Tracks scores across 6 core competency domains
  - Complete curriculum viewer with copyable markdown

---

## 3. Detailed Day-by-Day Implementation Roadmap

| Day | Topic | Module Status | Interactive Features Built |
| :---: | :--- | :---: | :--- |
| **01** | What Actually Happens When You Open a Website? | `COMPLETED` | Interactive request packet journey from laptop to internet server |
| **02** | MAC Addresses & Ethernet | `COMPLETED` | 4 PCs on switch, MAC table population, unicast vs broadcast |
| **03** | IPv4 Addressing | `COMPLETED` | Building vs Apartment analogy + live IP ping test |
| **04** | Subnet Masks | `COMPLETED` | Interactive CIDR boundary slider (`/16` - `/30`) with live bit calculation |
| **05** | Subnetting | `COMPLETED` | 4-department subnet divider (/24 into four /26 blocks) |
| **06** | ARP (Address Resolution Protocol) | `COMPLETED` | ARP request broadcast & unicast ARP reply cache inspector |
| **07** | DHCP (Dynamic Host Configuration Protocol) | `COMPLETED` | Step-by-step DORA packet exchange animation |
| **08** | DNS (Domain Name System) | `COMPLETED` | DNS query resolver simulation with "Break DNS" toggle |
| **09** | TCP vs UDP | `COMPLETED` | Side-by-side 3-way handshake with ACK vs UDP fire-and-forget |
| **10** | ICMP, Ping & Traceroute | `COMPLETED` | Live ping RTT calculation and hop-by-hop traceroute explorer |
| **11** | Switch Fundamentals | `COMPLETED` | Empty switch CAM table learning demo |
| **12** | VLANs | `COMPLETED` | Visual switch partitioning into VLAN 10, 20, 30 with isolated broadcasts |
| **13** | Access Ports & Trunk Ports | `COMPLETED` | 802.1Q tagged frame transport across switch-to-switch trunk |
| **14** | Inter-VLAN Routing | `COMPLETED` | Sub-interface router bridging traffic across separate VLANs |
| **15** | Switching Troubleshooting | `COMPLETED` | Interactive lab: diagnose misconfigured port, wrong VLAN, down link |
| **16** | Routers & Routing Tables | `COMPLETED` | Longest prefix match routing table inspector |
| **17** | Static Routing | `COMPLETED` | Bidirectional static route configuration interface |
| **18** | Default Route | `COMPLETED` | Gateway of Last Resort `0.0.0.0/0` logic visualizer |
| **19** | NAT (Network Address Translation) | `COMPLETED` | Inside Local to Outside Global translation mapping table |
| **20** | Routing Troubleshooting | `COMPLETED` | Interactive lab: diagnose dead hop and missing return route |
| **21** | Windows Network Troubleshooting | `COMPLETED` | Windows CMD terminal with `ipconfig`, `tracert`, `nslookup`, `netstat` |
| **22** | Linux Networking | `COMPLETED` | Linux Bash terminal with `ip addr`, `ip route`, `ss`, `curl`, `dig` |
| **23** | IT Support Ticket #1001 | `COMPLETED` | Investigate workstation connectivity failure without hints |
| **24** | IT Support Ticket #1002 | `COMPLETED` | Resolve Intranet portal outage while public web functions |
| **25** | Network-Wide Incident (Scope Analysis) | `COMPLETED` | Blast radius analysis: single host vs switch stack vs core router |
| **26** | Joining TechNova Ltd. | `COMPLETED` | Enterprise network diagram inspection and device inventory explorer |
| **27** | Network Expansion | `COMPLETED` | Customer Support 25-user subnet design and VLAN provisioning |
| **28** | Production Incident (10:15 AM) | `COMPLETED` | Production outage triage & interactive Root Cause Analysis builder |
| **29** | Design a Branch Network | `COMPLETED` | 40-user multi-department branch architecture specifier |
| **30** | Final Practical Assessment | `COMPLETED` | Comprehensive capstone network restoration and sign-off |

---

## 4. What Is Finished vs What To Finish

### Finished:
1. Complete curriculum specification document (`/CURRICULUM.md`).
2. Project tracking and roadmap specification (`/PROJECT_TRACKER.md`).
3. Core architecture structure for all 30 days across 6 phases.
4. UI and Simulation Engine with visual packet animations, topology canvas, packet inspector, terminal emulator, ticket simulator, and competency radar.
5. Persistent progress tracking in localStorage so user can check off finished days and maintain skills scores.
6. **Progressive Web App (PWA) Integration**: Configured with `vite-plugin-pwa`, service worker asset caching, Web App Manifest, 192x192 & 512x512 maskable icons, in-app install button (`PWAInstallButton`), and `OfflineIndicator` for field network troubleshooting without internet.
7. **Applet SEO & Structured Data**: Enhanced with OpenGraph share cards, Twitter cards, and Schema.org Educational `WebApplication` JSON-LD markup.
8. **UI/UX Redesign — Premium Learning Platform & Learning Journey**:
   - Implemented "One screen = one primary purpose" hierarchy.
   - Clean top navigation bar with persistent tabs (`Learning Journey`, `Simulations`, `Practice & Tickets`, `Competencies`, `Curriculum .md`), live curriculum search, progress indicator, mentor trigger, and PWA install button.
   - Atmospheric Hero Section with high-fidelity network asset, clear role orientation ("Where am I"), and prominent Current Mission spotlight card ("What should I do next").
   - 6-Level Sequential Career Roadmap connecting days horizontally (`Day 01 → Day 02 → Day 03 → Day 04 → Day 05`) with clear completion and active status indicators.
   - Verified zero-pill metadata compliance, anti-slop typography discipline, and seamless transition to the dedicated pre-flight Mission Briefing and full-screen mission simulation workspace.

### To Finish (Next Extensible Features):
1. User-created custom packet generator (crafting raw TCP/IP packets with custom TTL and payload).
2. Advanced Wireshark-style `.pcap` export format for simulated packet traces.
3. Multi-branch WAN BGP/OSPF dynamic routing simulation lab.
4. Expanded ticket library with community-contributed incident scenarios.
