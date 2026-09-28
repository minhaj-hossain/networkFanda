import { DayCurriculum, ITTicket, PhaseId } from '../types/curriculum';

export const PHASES_METADATA: { id: PhaseId; title: string; subtitle: string; days: string }[] = [
  {
    id: 1,
    title: 'Phase 01 — How Networks Actually Work',
    subtitle: 'From physical frames to IP boundaries and subnet division',
    days: 'Days 01–05',
  },
  {
    id: 2,
    title: 'Phase 02 — The Protocols Behind Network Communication',
    subtitle: 'ARP, DHCP DORA, recursive DNS, TCP vs UDP, and ICMP diagnostics',
    days: 'Days 06–10',
  },
  {
    id: 3,
    title: 'Phase 03 — Switching & Layer 2',
    subtitle: 'CAM tables, broadcast isolation, 802.1Q trunks, and inter-VLAN routing',
    days: 'Days 11–15',
  },
  {
    id: 4,
    title: 'Phase 04 — Routing & Layer 3',
    subtitle: 'Routing table lookups, static routing, default gateway 0.0.0.0/0, and NAT/PAT',
    days: 'Days 16–20',
  },
  {
    id: 5,
    title: 'Phase 05 — Real IT Support Skills',
    subtitle: 'Windows CMD, Linux bash, Ticket #1001, Ticket #1002, and Scope Analysis',
    days: 'Days 21–25',
  },
  {
    id: 6,
    title: 'Phase 06 — Simulated First Job at TechNova',
    subtitle: 'Onboarding audit, Customer Support expansion, RCA report, Branch design & Capstone',
    days: 'Days 26–30',
  },
];

export const DAYS_DATA: DayCurriculum[] = [
  {
    id: 1,
    title: 'What Actually Happens When You Open a Website?',
    phase: 1,
    phaseTitle: 'Phase 01 — How Networks Actually Work',
    concepts: ['Client Workstation', 'Floor Switch', 'Edge Router', 'Web Server'],
    visualStory: 'Join TechNova IT and trace what physically happens when Sarah from Accounting opens example.com. Follow the digital request through the 4 core equipment boxes that power every network on Earth.',
    visualExperience: 'Laptop → Blue Ethernet Cable → Office Floor Switch → Edge Router → Global Internet → Web Server.',
    requiredUnderstanding: 'My computer never talks directly to a remote website. It passes digital envelopes through local switches and edge routers.',
    workplaceScenario: 'TechNova Incident #1001: Sarah cannot reach example.com because her physical desk cable is loose. Inspect the hardware path and restore connectivity.',
    simulationType: 'packet_flow',
    experimentPrompt: {
      question: 'When Sarah’s laptop sends a request to example.com, which physical device receives the electrical signal first?',
      options: [
        'The remote web server across the ocean',
        'The local floor switch / access point connected to her desk cable',
        'The root DNS server of the Internet',
        'The Google data center'
      ],
      correctAnswerIndex: 1,
      explanation: 'Traffic must first exit through your physical network cable into your local floor switch or access point before travelling to the router.'
    },
    defaultDevices: [
      { id: 'pc1', name: "Sarah's Laptop", type: 'pc', ip: '192.168.1.10', mac: 'AA:BB:CC:01:01:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 12, y: 70 },
      { id: 'sw1', name: 'Floor 2 Office Switch', type: 'switch', ip: '192.168.1.2', mac: '00:1A:2B:SW:01:00', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 32, y: 50 },
      { id: 'r1', name: 'TechNova Edge Router', type: 'router', ip: '192.168.1.1', mac: 'CC:DD:EE:01:00:01', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 55, y: 30 },
      { id: 'cloud', name: 'Global Internet Backbone', type: 'cloud', ip: '203.0.113.1', mac: 'FF:FF:FF:00:00:00', subnetMask: '255.255.255.248', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 75, y: 30 },
      { id: 'srv1', name: 'Remote Server (example.com)', type: 'server', ip: '93.184.216.34', mac: 'EE:FF:11:22:33:44', subnetMask: '255.255.255.0', gateway: '93.184.216.1', dns: '8.8.8.8', status: 'online', x: 90, y: 65 }
    ]
  },
  {
    id: 2,
    title: 'MAC Addresses & Ethernet',
    phase: 1,
    phaseTitle: 'Phase 01 — How Networks Actually Work',
    concepts: ['NIC', 'MAC Address (Layer 2)', 'Ethernet Frame', 'Switch CAM Table', 'Unicast', 'Broadcast'],
    visualStory: 'Enter the TechNova Office Postroom. Four colleagues (Alice, Bob, Carol, Dave) are connected to Core Switch A. Follow the switch clerk as it reads physical hardware badges, fills its clipboard (CAM table), and discovers why a silent printer stays invisible.',
    visualExperience: 'Interactive Office Postroom & Hardware Name-Badge Experience: Inspect 48-bit silicon MAC addresses, explore the clear windows of an Ethernet envelope, contrast ancient shouting hubs against smart switches, and test CAM learning step-by-step.',
    requiredUnderstanding: 'MAC addresses identify hardware interfaces at Layer 2. A switch consults its MAC address table to forward frames selectively.',
    workplaceScenario: 'A newly installed printer cannot be reached until the switch records its MAC address upon initial traffic generation.',
    simulationType: 'mac_learning',
    experimentPrompt: {
      question: 'What happens when a switch receives a frame destined for a MAC address not yet stored in its MAC address table?',
      options: [
        'It immediately drops the frame and shuts down the port',
        'It floods the frame out all ports except the receiving port (Unknown Unicast Flooding)',
        'It sends an email alert to the network administrator',
        'It asks the internet router to resolve the MAC address'
      ],
      correctAnswerIndex: 1,
      explanation: 'When the destination MAC is unknown, the switch floods the frame across all ports on that VLAN so the intended device can respond and reveal its port location.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'PC-A (Accounting)', type: 'pc', ip: '192.168.1.10', mac: 'AA:AA:AA:AA:00:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 15, y: 25 },
      { id: 'pc2', name: 'PC-B (Finance)', type: 'pc', ip: '192.168.1.11', mac: 'BB:BB:BB:BB:00:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 15, y: 75 },
      { id: 'sw1', name: 'Core Switch A', type: 'switch', ip: '192.168.1.2', mac: '00:1A:2B:SW:01:00', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 50, y: 50 },
      { id: 'pc3', name: 'PC-C (HR)', type: 'pc', ip: '192.168.1.12', mac: 'CC:CC:CC:CC:00:03', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 85, y: 25 },
      { id: 'pc4', name: 'PC-D (Sales)', type: 'pc', ip: '192.168.1.13', mac: 'DD:DD:DD:DD:00:04', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 85, y: 75 }
    ]
  },
  {
    id: 3,
    title: 'IPv4 Addressing',
    phase: 1,
    phaseTitle: 'Phase 01 — How Networks Actually Work',
    concepts: ['IPv4 Address', 'Network Portion', 'Host Portion', 'Private IP (RFC 1918)', 'Public IP', 'Loopback 127.0.0.1'],
    visualStory: 'An IP address acts like an apartment address: the street & building name identifies the neighborhood (Network ID), while the apartment unit number identifies the specific resident (Host ID).',
    visualExperience: 'Changing PC-A from 192.168.1.10 to 192.168.2.10 causes local pings to fail because the network portions no longer align.',
    requiredUnderstanding: 'Logical addressing enables structured routing; devices on different network IDs cannot speak directly at Layer 2 without a router.',
    workplaceScenario: 'An employee manually typed an IP address with a different third octet, cutting off access to the local office print server.',
    simulationType: 'ipv4_addressing',
    experimentPrompt: {
      question: 'If PC-A is 192.168.1.10/24 and PC-B is 192.168.2.10/24 without a router in between, what happens when PC-A pings PC-B?',
      options: [
        'They communicate instantly because both are 192.168 private IPs',
        'PC-A realizes PC-B is on a different subnet and looks for a gateway; without one, the ping fails immediately',
        'The switch translates the IP automatically',
        'The ping works, but transfers at half speed'
      ],
      correctAnswerIndex: 1,
      explanation: 'Since the network portions differ (192.168.1.x vs 192.168.2.x), PC-A knows the destination is off-subnet and requires a Layer 3 default gateway.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'PC-A', type: 'pc', ip: '192.168.1.10', mac: 'AA:11:22:33:44:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 20, y: 50 },
      { id: 'sw1', name: 'Switch', type: 'switch', ip: '192.168.1.2', mac: '00:11:22:33:44:55', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 50, y: 50 },
      { id: 'pc2', name: 'PC-B', type: 'pc', ip: '192.168.1.20', mac: 'BB:11:22:33:44:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 80, y: 50 }
    ]
  },
  {
    id: 4,
    title: 'Subnet Masks & CIDR Notation',
    phase: 1,
    phaseTitle: 'Phase 01 — How Networks Actually Work',
    concepts: ['Subnet Mask', 'CIDR Notation (/24, /16, /26)', 'Network Bits vs Host Bits', 'Network ID', 'Broadcast Address'],
    visualStory: 'Drag the CIDR boundary slider across the 32 bits of an IPv4 address. Watch the usable host count and network address adjust in real time.',
    visualExperience: 'Interactive visual boundary line splitting 32 bits into 1s (Network) and 0s (Host). Shift from /24 (254 hosts) down to /26 (62 hosts) or up to /16 (65,534 hosts).',
    requiredUnderstanding: 'The subnet mask tells a network interface exactly where the network identifier stops and where individual host identifiers begin.',
    workplaceScenario: 'TechNova branch office was assigned 255.255.255.128 (/25). You must verify which IPs are valid usable host addresses.',
    simulationType: 'subnet_mask',
    experimentPrompt: {
      question: 'On a 192.168.1.0/24 subnet, why can you NOT assign 192.168.1.0 or 192.168.1.255 to a user computer?',
      options: [
        'They are reserved for high-speed fiber devices only',
        '192.168.1.0 is the Network Address and 192.168.1.255 is the Broadcast Address',
        'Windows operating systems reject numbers ending with 0 or 255',
        'Those numbers are reserved for public internet routers only'
      ],
      correctAnswerIndex: 1,
      explanation: 'In any standard IPv4 subnet, the first address represents the network identifier itself, and the final address is the broadcast address for all hosts on that segment.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'Workstation 1', type: 'pc', ip: '192.168.1.10', mac: 'AA:11:22:33:44:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 25, y: 50 },
      { id: 'sw1', name: 'Distribution Switch', type: 'switch', ip: '192.168.1.2', mac: '00:11:22:33:44:00', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 50, y: 50 },
      { id: 'pc2', name: 'Workstation 2', type: 'pc', ip: '192.168.1.130', mac: 'BB:11:22:33:44:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 75, y: 50 }
    ]
  },
  {
    id: 5,
    title: 'Subnetting: Dividing TechNova Networks',
    phase: 1,
    phaseTitle: 'Phase 01 — How Networks Actually Work',
    concepts: ['Subnet Division', 'Usable Hosts Calculation', 'Block Size', 'Department Isolation'],
    visualStory: 'TechNova has four corporate departments (HR, IT, Finance, Sales) and only one available /24 network block: 192.168.1.0/24. Subnet it into four /26 blocks.',
    visualExperience: 'Divide 192.168.1.0/24 into 4 equal segments: 192.168.1.0/26, .64/26, .128/26, and .192/26. Assign each block to a department card.',
    requiredUnderstanding: 'Subnetting borrows host bits to create multiple smaller subnets, reducing broadcast domains and improving security.',
    workplaceScenario: 'Allocate IP ranges for 30 HR staff, 40 IT engineers, 20 Finance staff, and 50 Sales representatives without wasting IP space.',
    simulationType: 'subnetting',
    experimentPrompt: {
      question: 'With a /26 prefix length (mask 255.255.255.192), what is the maximum number of usable host addresses in each subnet?',
      options: ['64 usable hosts', '62 usable hosts (64 total minus Network and Broadcast)', '30 usable hosts', '128 usable hosts'],
      correctAnswerIndex: 1,
      explanation: '2^(32-26) = 2^6 = 64 total addresses. Subtract 2 (1 for Network ID, 1 for Broadcast), yielding 62 usable IP addresses.'
    },
    defaultDevices: [
      { id: 'hr_pc', name: 'HR Staff PC', type: 'pc', ip: '192.168.1.10', mac: 'AA:01:00:00:00:01', subnetMask: '255.255.255.192', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 20, y: 30 },
      { id: 'it_pc', name: 'IT Staff PC', type: 'pc', ip: '192.168.1.70', mac: 'AA:02:00:00:00:02', subnetMask: '255.255.255.192', gateway: '192.168.1.65', dns: '192.168.1.1', status: 'online', x: 20, y: 70 },
      { id: 'core_sw', name: 'TechNova L3 Switch', type: 'switch', ip: '192.168.1.1', mac: '00:99:88:77:66:55', subnetMask: '255.255.255.0', gateway: '192.168.1.254', dns: '192.168.1.1', status: 'online', x: 50, y: 50 },
      { id: 'fin_pc', name: 'Finance PC', type: 'pc', ip: '192.168.1.135', mac: 'AA:03:00:00:00:03', subnetMask: '255.255.255.192', gateway: '192.168.1.129', dns: '192.168.1.1', status: 'online', x: 80, y: 30 },
      { id: 'sales_pc', name: 'Sales PC', type: 'pc', ip: '192.168.1.200', mac: 'AA:04:00:00:00:04', subnetMask: '255.255.255.192', gateway: '192.168.1.193', dns: '192.168.1.1', status: 'online', x: 80, y: 70 }
    ]
  },
  {
    id: 6,
    title: 'ARP (Address Resolution Protocol)',
    phase: 2,
    phaseTitle: 'Phase 02 — The Protocols Behind Network Communication',
    concepts: ['ARP Request (Broadcast)', 'ARP Reply (Unicast)', 'ARP Cache Table', 'Layer 2 to Layer 3 Binding'],
    visualStory: 'PC-A knows the IP address of the Default Gateway (192.168.1.1), but cannot build an Ethernet frame without the destination MAC address. Watch ARP resolve this in real time.',
    visualExperience: 'PC-A broadcasts: "Who has 192.168.1.1? Tell 192.168.1.10." Every switch port flashes. Router replies with its unicast MAC (CC:DD:EE:01:00:01). PC-A records it in its ARP cache.',
    requiredUnderstanding: 'ARP bridges Layer 3 IP logic with physical Layer 2 hardware delivery across the local link.',
    workplaceScenario: 'You run `arp -a` in Windows CMD to verify whether a device is active on the local subnet and detect IP conflicts or ARP spoofing.',
    simulationType: 'arp',
    experimentPrompt: {
      question: 'What is the destination MAC address of an ARP Request frame broadcasted by PC-A?',
      options: [
        '00:00:00:00:00:00',
        'FF:FF:FF:FF:FF:FF (Ethernet Broadcast)',
        '192.168.1.1',
        'The MAC address of the Google DNS server'
      ],
      correctAnswerIndex: 1,
      explanation: 'Ethernet broadcasts use FF:FF:FF:FF:FF:FF so every network card on that local broadcast domain receives and parses the payload.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'PC-A (192.168.1.10)', type: 'pc', ip: '192.168.1.10', mac: 'AA:BB:CC:11:22:33', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 15, y: 30 },
      { id: 'pc2', name: 'PC-B (192.168.1.20)', type: 'pc', ip: '192.168.1.20', mac: 'AA:BB:CC:44:55:66', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 15, y: 70 },
      { id: 'sw1', name: 'Switch', type: 'switch', ip: '192.168.1.2', mac: '00:1A:2B:3C:4D:5E', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 50, y: 50 },
      { id: 'r1', name: 'Default Gateway (192.168.1.1)', type: 'router', ip: '192.168.1.1', mac: 'CC:DD:EE:01:00:01', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 85, y: 50 }
    ]
  },
  {
    id: 7,
    title: 'DHCP (Dynamic Host Configuration Protocol)',
    phase: 2,
    phaseTitle: 'Phase 02 — The Protocols Behind Network Communication',
    concepts: ['DORA Process', 'Discover (Broadcast)', 'Offer (Unicast/Broadcast)', 'Request (Broadcast)', 'Acknowledge (ACK)', 'Lease Duration'],
    visualStory: 'A newly arrived laptop plugs into TechNova network port. It has no IP address, subnet mask, or gateway. Watch the 4-step DORA exchange automatically configure it in seconds.',
    visualExperience: 'Animate Discover → Offer → Request → Acknowledge. Inspect each packet to see lease time, allocated IP, default gateway, and DNS server options.',
    requiredUnderstanding: 'DHCP automates IP assignment; if DHCP fails, client falls back to 169.254.x.x (APIPA) and loses external access.',
    workplaceScenario: 'A user gets an IP address starting with 169.254.12.5. Diagnose why the DHCP server is not responding to DORA packets.',
    simulationType: 'dhcp',
    experimentPrompt: {
      question: 'If a computer turns on and receives an IP address of 169.254.45.89 with mask 255.255.0.0, what does this indicate?',
      options: [
        'The computer is connected to a special high-security government network',
        'APIPA: The computer sent a DHCP Discover, but no DHCP server replied',
        'The internet connection is running at maximum gigabit speed',
        'The router assigned a dynamic private address successfully'
      ],
      correctAnswerIndex: 1,
      explanation: '169.254.0.0/16 is the Automatic Private IP Addressing (APIPA) range assigned by the OS when DHCP negotiation fails.'
    },
    defaultDevices: [
      { id: 'pc_new', name: 'Unconfigured Laptop', type: 'pc', ip: '0.0.0.0', mac: '70:85:C2:A1:B2:C3', subnetMask: '0.0.0.0', gateway: '0.0.0.0', dns: '0.0.0.0', status: 'misconfigured', x: 20, y: 50 },
      { id: 'sw1', name: 'Office Switch', type: 'switch', ip: '192.168.1.2', mac: '00:AA:BB:CC:DD:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 50, y: 50 },
      { id: 'dhcp_srv', name: 'TechNova DHCP Server', type: 'server', ip: '192.168.1.254', mac: '00:50:56:A0:01:FE', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 80, y: 50 }
    ]
  },
  {
    id: 8,
    title: 'DNS (Domain Name System)',
    phase: 2,
    phaseTitle: 'Phase 02 — The Protocols Behind Network Communication',
    concepts: ['DNS Resolution', 'A Records', 'Recursive Resolver', 'Authoritative Server', 'DNS Failure vs Internet Failure'],
    visualStory: 'An engineer visits portal.technova.local. Watch the computer query the DNS server on UDP port 53. Then intentionally disable DNS to see the critical difference between name failure and network failure.',
    visualExperience: 'Computer sends DNS query for portal.technova.local. DNS server answers 192.168.10.50. With DNS disabled, direct IP pings still work, but domain queries fail.',
    requiredUnderstanding: 'DNS failure and Internet disconnection are completely different problems; pinging 8.8.8.8 vs pinging google.com isolates DNS quickly.',
    workplaceScenario: 'Employees complain the internet is down, but their VoIP phones and direct IP connections still work normally.',
    simulationType: 'dns',
    experimentPrompt: {
      question: 'If you can successfully ping 8.8.8.8 but pinging google.com returns "Could not find host", what is the root cause?',
      options: [
        'The Ethernet cable is unplugged from the wall',
        'DNS resolution failure: The computer cannot translate google.com into an IP address',
        'The default gateway router is powered off',
        'The Wi-Fi card driver has crashed'
      ],
      correctAnswerIndex: 1,
      explanation: 'Since numeric IP pinging works, Layer 1, 2, and 3 routing to the internet are functioning properly; only the DNS translation service is failing.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'Workstation', type: 'pc', ip: '192.168.1.10', mac: 'AA:11:22:33:44:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 15, y: 50 },
      { id: 'sw1', name: 'Switch', type: 'switch', ip: '192.168.1.2', mac: '00:11:22:33:44:55', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 45, y: 50 },
      { id: 'dns_srv', name: 'Internal DNS Server', type: 'dns', ip: '192.168.1.254', mac: '00:50:56:D0:01:53', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 75, y: 25 },
      { id: 'web_srv', name: 'Company Portal Server', type: 'server', ip: '192.168.10.50', mac: '00:50:56:W0:01:80', subnetMask: '255.255.255.0', gateway: '192.168.10.1', dns: '192.168.1.254', status: 'online', x: 85, y: 75 }
    ]
  },
  {
    id: 9,
    title: 'TCP vs UDP: Transport Layer Protocols',
    phase: 2,
    phaseTitle: 'Phase 02 — The Protocols Behind Network Communication',
    concepts: ['TCP 3-Way Handshake (SYN, SYN-ACK, ACK)', 'Reliable Delivery & Retransmission', 'UDP Best-Effort', 'Port Numbers'],
    visualStory: 'Watch a side-by-side race: TCP initiates a 3-way handshake, sends sequenced data, and retransmits dropped packets; UDP fires streaming audio packets continuously without overhead.',
    visualExperience: 'Drop a packet in the TCP lane: sender pauses and retransmits. Drop a packet in the UDP lane: receiver continues uninterrupted.',
    requiredUnderstanding: 'TCP guarantees delivery and order at the cost of overhead; UDP maximizes speed for real-time video/voice and lightweight queries.',
    workplaceScenario: 'TechNova VoIP calls sound choppy while large file downloads over SFTP take longer but never corrupt.',
    simulationType: 'tcp_udp',
    experimentPrompt: {
      question: 'Which protocol would be preferred for a live Zoom meeting or multiplayer game where latency matters more than a lost audio sample?',
      options: ['TCP', 'UDP', 'FTP', 'SMTP'],
      correctAnswerIndex: 1,
      explanation: 'UDP does not wait for acknowledgments or retransmit lost packets, preventing lag spikes and buffering during real-time media streams.'
    },
    defaultDevices: [
      { id: 'sender', name: 'Client App', type: 'pc', ip: '192.168.1.10', mac: 'AA:11:11:11:11:11', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 20, y: 50 },
      { id: 'router', name: 'Network Gateway', type: 'router', ip: '192.168.1.1', mac: '00:11:22:33:44:55', subnetMask: '255.255.255.0', gateway: '10.0.0.1', dns: '8.8.8.8', status: 'online', x: 50, y: 50 },
      { id: 'receiver', name: 'Media Server', type: 'server', ip: '10.0.0.50', mac: 'BB:22:22:22:22:22', subnetMask: '255.255.255.0', gateway: '10.0.0.1', dns: '8.8.8.8', status: 'online', x: 80, y: 50 }
    ]
  },
  {
    id: 10,
    title: 'ICMP, Ping & Traceroute',
    phase: 2,
    phaseTitle: 'Phase 02 — The Protocols Behind Network Communication',
    concepts: ['ICMP Echo Request/Reply', 'Round-Trip Time (RTT)', 'Traceroute / Tracert', 'TTL (Time-To-Live) Decrement'],
    visualStory: 'A TechNova engineer reports the server is unreachable. Run `ping` to verify round-trip health, then run `tracert` to watch packets decrement their TTL hop-by-hop and pinpoint the exact failing router.',
    visualExperience: 'Traceroute packet starts with TTL=1 and expires at Router 1; then TTL=2 expires at Router 2; then TTL=3 reaches the server.',
    requiredUnderstanding: 'Ping tests basic reachability; traceroute identifies where along the multi-hop path the transmission is blocked or dropped.',
    workplaceScenario: 'Diagnose whether an outage is inside TechNova internal network or within the ISP upstream transit provider.',
    simulationType: 'icmp',
    experimentPrompt: {
      question: 'How does traceroute discover the IP addresses of intermediate routers along the path?',
      options: [
        'It queries a secret global satellite routing database',
        'It sends packets with incrementally increasing TTL values (1, 2, 3...) which force each router to send back an ICMP "Time Exceeded" message',
        'It asks the destination server to list all routers it knows',
        'It reboots each router in sequence'
      ],
      correctAnswerIndex: 1,
      explanation: 'Each router decrements TTL by 1. When TTL reaches 0, the router discards the packet and sends an ICMP Type 11 (Time Exceeded) reply containing its own IP.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'Workstation', type: 'pc', ip: '192.168.1.10', mac: 'AA:11:22:33:44:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 10, y: 50 },
      { id: 'r1', name: 'Office Router (R1)', type: 'router', ip: '192.168.1.1', mac: 'CC:01:00:00:00:01', subnetMask: '255.255.255.0', gateway: '10.1.1.2', dns: '8.8.8.8', status: 'online', x: 35, y: 50 },
      { id: 'r2', name: 'ISP Router (R2)', type: 'router', ip: '10.1.1.2', mac: 'CC:02:00:00:00:02', subnetMask: '255.255.255.252', gateway: '172.16.0.1', dns: '8.8.8.8', status: 'online', x: 65, y: 50 },
      { id: 'srv', name: 'Cloud Server', type: 'server', ip: '172.16.0.10', mac: 'EE:01:00:00:00:01', subnetMask: '255.255.255.0', gateway: '172.16.0.1', dns: '8.8.8.8', status: 'online', x: 90, y: 50 }
    ]
  },
  {
    id: 11,
    title: 'Switch Fundamentals & CAM Table Building',
    phase: 3,
    phaseTitle: 'Phase 03 — Switching & Layer 2',
    concepts: ['MAC Address Table (CAM)', 'Dynamic Learning', 'Forwarding & Filtering', 'Port Aging'],
    visualStory: 'Start with an empty switch. Devices power on one by one. Watch the switch populate its table dynamically by inspecting ingress source MAC addresses.',
    visualExperience: 'Empty MAC table: [Port | MAC]. As PC-1 transmits, the switch logs Port 1 = AA:01. Subsequent traffic destined for AA:01 avoids flooding.',
    requiredUnderstanding: 'Switches learn source MAC addresses on incoming frames and forward based on destination MAC addresses.',
    workplaceScenario: 'Verify switch port security when a user moves their laptop from conference room to their desk.',
    simulationType: 'mac_learning',
    experimentPrompt: {
      question: 'When a switch inspects an incoming Ethernet frame, which header field does it record into its MAC address table?',
      options: ['Destination MAC address', 'Source MAC address', 'Destination IP address', 'Subnet Mask'],
      correctAnswerIndex: 1,
      explanation: 'The switch learns which MAC address is attached to which physical port by inspecting the incoming frame Source MAC address.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'PC-1', type: 'pc', ip: '192.168.1.10', mac: 'AA:AA:00:00:00:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 20, y: 30 },
      { id: 'sw1', name: 'Cisco 2960 Switch', type: 'switch', ip: '192.168.1.2', mac: '00:22:33:44:55:66', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 50, y: 50 },
      { id: 'pc2', name: 'PC-2', type: 'pc', ip: '192.168.1.20', mac: 'BB:BB:00:00:00:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 80, y: 30 },
      { id: 'pc3', name: 'PC-3', type: 'pc', ip: '192.168.1.30', mac: 'CC:CC:00:00:00:03', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 80, y: 70 }
    ]
  },
  {
    id: 12,
    title: 'VLANs: Virtual Local Area Networks',
    phase: 3,
    phaseTitle: 'Phase 03 — Switching & Layer 2',
    concepts: ['VLAN Segmentation', 'Broadcast Domains', 'VLAN ID (10, 20, 30)', 'Logical vs Physical Isolation'],
    visualStory: 'One physical switch serves HR, IT, and Finance. Partition the switch ports into VLAN 10 (HR), VLAN 20 (IT), and VLAN 30 (Finance). Watch broadcasts stay confined within their color-coded zones.',
    visualExperience: 'Switch displays color-coded ports: Emerald for VLAN 10, Sky for VLAN 20, Amber for VLAN 30. An ARP broadcast in VLAN 10 never touches VLAN 20 or 30.',
    requiredUnderstanding: 'VLANs create separate logical Layer 2 broadcast domains on the same physical switch hardware.',
    workplaceScenario: 'TechNova security policy mandates that Finance payroll computers cannot receive broadcast traffic or malware probes from Sales workstations.',
    simulationType: 'switching_vlan',
    experimentPrompt: {
      question: 'If PC-1 is in VLAN 10 and PC-2 is in VLAN 20 on the same physical switch, can they ping each other without a router or Layer 3 switch?',
      options: [
        'Yes, because they share the same physical cables',
        'No, VLANs completely isolate Layer 2 broadcast domains and traffic between them requires routing',
        'Yes, if they use the same password',
        'Yes, but only during business hours'
      ],
      correctAnswerIndex: 1,
      explanation: 'VLANs act as separate virtual switches. Traffic cannot cross VLAN boundaries without a Layer 3 routing mechanism.'
    },
    defaultDevices: [
      { id: 'hr_pc', name: 'HR PC (VLAN 10)', type: 'pc', ip: '192.168.10.10', mac: '00:10:00:00:00:01', subnetMask: '255.255.255.0', gateway: '192.168.10.1', dns: '192.168.10.1', vlan: 10, status: 'online', x: 20, y: 30 },
      { id: 'it_pc', name: 'IT PC (VLAN 20)', type: 'pc', ip: '192.168.20.10', mac: '00:20:00:00:00:01', subnetMask: '255.255.255.0', gateway: '192.168.20.1', dns: '192.168.10.1', vlan: 20, status: 'online', x: 20, y: 70 },
      { id: 'sw1', name: 'TechNova Switch 1', type: 'switch', ip: '192.168.1.2', mac: '00:AA:BB:CC:11:00', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 50, y: 50 },
      { id: 'fin_pc', name: 'Finance PC (VLAN 30)', type: 'pc', ip: '192.168.30.10', mac: '00:30:00:00:00:01', subnetMask: '255.255.255.0', gateway: '192.168.30.1', dns: '192.168.10.1', vlan: 30, status: 'online', x: 80, y: 50 }
    ]
  },
  {
    id: 13,
    title: 'Access Ports & Trunk Ports (802.1Q)',
    phase: 3,
    phaseTitle: 'Phase 03 — Switching & Layer 2',
    concepts: ['Access Port', 'Trunk Port', 'IEEE 802.1Q Tagging', 'Native VLAN'],
    visualStory: 'Two switches located on Floor 1 and Floor 2 need to link HR and IT across both floors. See why access ports carry only one VLAN, while a trunk port adds 802.1Q tags to carry multiple VLANs over a single cable.',
    visualExperience: 'Frame leaves HR PC untagged → Switch 1 inserts 802.1Q VLAN 10 tag → Frame crosses trunk cable → Switch 2 strips tag and delivers to Floor 2 HR PC.',
    requiredUnderstanding: 'Access ports connect end devices (untagged); trunk ports connect switches and carry tagged frames for multiple VLANs.',
    workplaceScenario: 'Configure the uplink between Floor 1 distribution switch and Core switch to allow VLANs 10, 20, and 30.',
    simulationType: 'access_trunk',
    experimentPrompt: {
      question: 'What is the purpose of the 802.1Q tag inserted into an Ethernet frame on a trunk link?',
      options: [
        'To encrypt the packet with AES 256-bit encryption',
        'To identify which VLAN the frame belongs to as it crosses between switches',
        'To boost Wi-Fi signal power across copper wires',
        'To compress video files for faster download'
      ],
      correctAnswerIndex: 1,
      explanation: 'The 4-byte 802.1Q header tag contains the 12-bit VLAN ID so receiving switches know which VLAN broadcast domain to forward the frame into.'
    },
    defaultDevices: [
      { id: 'pc_f1', name: 'Floor 1 HR (VLAN 10)', type: 'pc', ip: '192.168.10.5', mac: 'AA:10:00:00:01:05', subnetMask: '255.255.255.0', gateway: '192.168.10.1', dns: '192.168.10.1', vlan: 10, status: 'online', x: 15, y: 50 },
      { id: 'sw1', name: 'Switch Floor 1', type: 'switch', ip: '192.168.1.101', mac: '00:01:01:01:01:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 35, y: 50 },
      { id: 'sw2', name: 'Switch Floor 2', type: 'switch', ip: '192.168.1.102', mac: '00:02:02:02:02:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 65, y: 50 },
      { id: 'pc_f2', name: 'Floor 2 HR (VLAN 10)', type: 'pc', ip: '192.168.10.6', mac: 'AA:10:00:00:02:06', subnetMask: '255.255.255.0', gateway: '192.168.10.1', dns: '192.168.10.1', vlan: 10, status: 'online', x: 85, y: 50 }
    ]
  },
  {
    id: 14,
    title: 'Inter-VLAN Routing (Router-on-a-Stick)',
    phase: 3,
    phaseTitle: 'Phase 03 — Switching & Layer 2',
    concepts: ['Router-on-a-Stick (ROAS)', 'Sub-interfaces (.10, .20)', 'Default Gateway per VLAN', 'Layer 3 Routing'],
    visualStory: 'Finance (VLAN 30) needs to access the internal database in IT (VLAN 20). Watch the packet travel from Finance PC to the router sub-interface, get routed across subnets, and return down to the IT server.',
    visualExperience: 'Packet from 192.168.30.10 leaves Switch up the trunk to Router sub-interface G0/0.30 (192.168.30.1). Router shifts packet to G0/0.20 (192.168.20.1) and transmits to IT Server.',
    requiredUnderstanding: 'Routing is mandatory between different subnets and VLANs. A router or L3 switch acts as default gateway for each VLAN.',
    workplaceScenario: 'TechNova HR cannot access employee payroll server in Finance until Inter-VLAN sub-interfaces are provisioned.',
    simulationType: 'inter_vlan',
    experimentPrompt: {
      question: 'In a Router-on-a-Stick configuration, how does one physical router cable handle multiple VLAN gateways?',
      options: [
        'By using 10 different colors of copper wires inside the cable',
        'By configuring logical sub-interfaces (e.g. Gig0/0.10, Gig0/0.20) with 802.1Q encapsulation for each VLAN',
        'By running multiple power adapters',
        'By disabling the firewall permanently'
      ],
      correctAnswerIndex: 1,
      explanation: 'Sub-interfaces divide a single physical router port into virtual interfaces, each assigned to an 802.1Q VLAN ID with its own IP gateway.'
    },
    defaultDevices: [
      { id: 'fin_pc', name: 'Finance PC (VLAN 30)', type: 'pc', ip: '192.168.30.15', mac: '00:30:11:22:33:44', subnetMask: '255.255.255.0', gateway: '192.168.30.1', dns: '192.168.20.2', vlan: 30, status: 'online', x: 20, y: 65 },
      { id: 'sw1', name: 'VLAN Switch', type: 'switch', ip: '192.168.1.5', mac: '00:55:66:77:88:99', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.20.2', status: 'online', x: 50, y: 65 },
      { id: 'r1', name: 'Core Router (ROAS)', type: 'router', ip: '192.168.30.1', mac: '00:CC:DD:00:01:01', subnetMask: '255.255.255.0', gateway: '10.0.0.1', dns: '8.8.8.8', status: 'online', x: 50, y: 20 },
      { id: 'it_srv', name: 'IT DB Server (VLAN 20)', type: 'server', ip: '192.168.20.50', mac: '00:20:AA:BB:CC:DD', subnetMask: '255.255.255.0', gateway: '192.168.20.1', dns: '8.8.8.8', vlan: 20, status: 'online', x: 80, y: 65 }
    ]
  },
  {
    id: 15,
    title: 'Switching Troubleshooting Lab',
    phase: 3,
    phaseTitle: 'Phase 03 — Switching & Layer 2',
    concepts: ['Port Status (Up/Down)', 'VLAN Mismatch', 'Access vs Trunk Misconfiguration', 'Duplex/Speed Mismatch'],
    visualStory: 'An executive PC cannot connect to the network. Use the switch inspector, port status view, and packet trace to isolate whether the issue is a disabled port, wrong VLAN ID, or disconnected patch cable.',
    visualExperience: 'Interactive Switch Port Manager: Inspect Port 1 through Port 8. Toggle port administrative state (Shut / No Shut) and reassign port VLAN to fix connectivity.',
    requiredUnderstanding: 'Systematic troubleshooting at Layer 1 & 2: Cable/Link status → Speed/Duplex → Access port VLAN assignment → Trunk allowed list.',
    workplaceScenario: 'TechNova ticket: "Executive printer offline after desk relocation." Discover port was accidentally left in Guest VLAN 99.',
    simulationType: 'switch_troubleshoot',
    experimentPrompt: {
      question: 'If a PC link light is green (Layer 1 UP) but the PC cannot ping other devices in its department, what is the most common Layer 2 culprit?',
      options: [
        'The switch port is assigned to the wrong VLAN',
        'The power cord of the monitor is loose',
        'The internet provider is experiencing a nationwide fiber cut',
        'The computer CPU is overheating'
      ],
      correctAnswerIndex: 0,
      explanation: 'When link is up but local traffic fails, the switch port is frequently assigned to the wrong VLAN, isolating the workstation from its subnet.'
    },
    defaultDevices: [
      { id: 'exec_pc', name: 'Executive PC', type: 'pc', ip: '192.168.10.25', mac: 'AA:99:88:11:22:33', subnetMask: '255.255.255.0', gateway: '192.168.10.1', dns: '192.168.10.1', vlan: 99, status: 'misconfigured', x: 20, y: 50 },
      { id: 'sw1', name: 'Floor Switch (Port 4 Misconfigured)', type: 'switch', ip: '192.168.1.10', mac: '00:11:22:99:88:77', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 50, y: 50 },
      { id: 'hr_srv', name: 'HR File Server (VLAN 10)', type: 'server', ip: '192.168.10.5', mac: '00:10:55:66:77:88', subnetMask: '255.255.255.0', gateway: '192.168.10.1', dns: '192.168.10.1', vlan: 10, status: 'online', x: 80, y: 50 }
    ]
  },
  {
    id: 16,
    title: 'Routers & Routing Tables',
    phase: 4,
    phaseTitle: 'Phase 04 — Routing & Layer 3',
    concepts: ['Routing Table', 'Destination Network', 'Next Hop', 'Longest Prefix Match', 'Exit Interface'],
    visualStory: 'A packet reaches Router R1. Watch R1 inspect the Destination IP header, compare it against its routing table using Longest Prefix Match, and determine which physical interface to forward the packet out.',
    visualExperience: 'Animate routing table lookup: 192.168.2.50 matches entry "192.168.2.0/24 via 10.0.0.2 on Gi0/1". Router swaps Layer 2 MAC and sends packet across link.',
    requiredUnderstanding: 'Routers make forwarding decisions hop-by-hop based purely on destination IP addresses and routing tables.',
    workplaceScenario: 'TechNova added a new server rack. Verify router R1 has a valid routing entry pointing toward the new subnet.',
    simulationType: 'routing_table',
    experimentPrompt: {
      question: 'When a router receives an IP packet, what does it modify in the packet before sending it to the next hop?',
      options: [
        'It modifies the destination IP address to the router IP',
        'It decrements the TTL by 1 and replaces the Layer 2 Source/Destination MAC addresses for the next link',
        'It converts all TCP headers into UDP headers',
        'It encrypts the payload with a new password'
      ],
      correctAnswerIndex: 1,
      explanation: 'IP addresses stay constant end-to-end (unless NATed), but the router decrements TTL and rebuilds new Layer 2 MAC addresses for each hop.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'PC (192.168.1.10)', type: 'pc', ip: '192.168.1.10', mac: 'AA:01:00:00:00:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', status: 'online', x: 15, y: 50 },
      { id: 'r1', name: 'Router R1', type: 'router', ip: '192.168.1.1', mac: '00:R1:00:00:00:01', subnetMask: '255.255.255.0', gateway: '10.0.0.2', dns: '8.8.8.8', status: 'online', x: 40, y: 50 },
      { id: 'r2', name: 'Router R2', type: 'router', ip: '10.0.0.2', mac: '00:R2:00:00:00:02', subnetMask: '255.255.255.252', gateway: '192.168.2.1', dns: '8.8.8.8', status: 'online', x: 65, y: 50 },
      { id: 'srv', name: 'Server (192.168.2.50)', type: 'server', ip: '192.168.2.50', mac: 'EE:02:00:00:00:50', subnetMask: '255.255.255.0', gateway: '192.168.2.1', dns: '8.8.8.8', status: 'online', x: 88, y: 50 }
    ]
  },
  {
    id: 17,
    title: 'Static Routing: Bidirectional Paths',
    phase: 4,
    phaseTitle: 'Phase 04 — Routing & Layer 3',
    concepts: ['Static Route', 'ip route <network> <mask> <next-hop>', 'Return Route Requirement'],
    visualStory: 'Router R1 knows Network A. Router R2 knows Network B. Neither knows the other. Configure a static route on R1. Watch the packet reach Server B, but fail until you ALSO configure the return route on R2!',
    visualExperience: 'Before: Packet reaches R1 and drops (No route to host). After adding forward route: Packet reaches Server, but reply drops at R2! After adding return route: Full communication succeeds!',
    requiredUnderstanding: 'Routing is inherently bidirectional. A packet cannot successfully communicate unless routers have routes in both directions.',
    workplaceScenario: 'TechNova acquired a partner office. Users could send requests, but got no replies because the return route was omitted.',
    simulationType: 'static_routing',
    experimentPrompt: {
      question: 'Why does pinging a remote server fail if Router 1 has a route to the server, but Router 2 has no route back to Router 1?',
      options: [
        'The server refuses to process packets from unknown manufacturers',
        'The Echo Request reaches the server, but the server Echo Reply cannot find a path back to the sender',
        'Ping only works when both routers share the same serial number',
        'The fiber cable burns out'
      ],
      correctAnswerIndex: 1,
      explanation: 'Communication is a two-way conversation. The request reaches the destination, but the return reply is dropped by the remote router.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'Site A PC', type: 'pc', ip: '192.168.1.10', mac: 'AA:AA:01:01:01:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 15, y: 50 },
      { id: 'r1', name: 'Site A Router (R1)', type: 'router', ip: '192.168.1.1', mac: 'CC:01:01:01:01:01', subnetMask: '255.255.255.0', gateway: '10.0.0.2', dns: '8.8.8.8', status: 'online', x: 38, y: 50 },
      { id: 'r2', name: 'Site B Router (R2)', type: 'router', ip: '10.0.0.2', mac: 'CC:02:02:02:02:02', subnetMask: '255.255.255.252', gateway: '192.168.2.1', dns: '8.8.8.8', status: 'misconfigured', x: 62, y: 50 },
      { id: 'srv', name: 'Site B Server', type: 'server', ip: '192.168.2.10', mac: 'EE:02:02:02:02:02', subnetMask: '255.255.255.0', gateway: '192.168.2.1', dns: '8.8.8.8', status: 'online', x: 85, y: 50 }
    ]
  },
  {
    id: 18,
    title: 'Default Route (0.0.0.0/0): Gateway of Last Resort',
    phase: 4,
    phaseTitle: 'Phase 04 — Routing & Layer 3',
    concepts: ['Default Route (0.0.0.0 0.0.0.0)', 'Gateway of Last Resort', 'Upstream ISP Gateway'],
    visualStory: 'A router cannot store all 4 billion IPv4 addresses. What happens when traffic is destined for an unlisted internet address? Watch the router check its specific subnets, and then fallback to the Default Route.',
    visualExperience: 'Animate decision tree: Destination = 192.168.1.0/24? No. Destination = 10.0.0.0/8? No. Forward via Default Route 0.0.0.0/0 out to ISP uplink.',
    requiredUnderstanding: 'A default route catches all packets not matching any specific route and forwards them toward the internet edge.',
    workplaceScenario: 'TechNova internet was down after a router reboot wiped the static default route to the Comcast/AT&T ISP gateway.',
    simulationType: 'default_route',
    experimentPrompt: {
      question: 'What does the notation 0.0.0.0/0 signify in an IP routing table?',
      options: [
        'An error message indicating that all network cards are disabled',
        'The Default Route (Gateway of Last Resort) matching any destination address not specifically listed',
        'A multicast group address for streaming movies',
        'A loopback test for the CPU'
      ],
      correctAnswerIndex: 1,
      explanation: '0.0.0.0/0 has a mask length of 0, matching zero specific bits, making it the universal fallback route for all unmatched destinations.'
    },
    defaultDevices: [
      { id: 'lan_pc', name: 'Office PC', type: 'pc', ip: '192.168.1.25', mac: 'AA:11:22:33:44:55', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 15, y: 50 },
      { id: 'edge_rtr', name: 'Edge Router', type: 'router', ip: '192.168.1.1', mac: 'CC:AA:00:11:22:33', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 45, y: 50 },
      { id: 'isp_rtr', name: 'ISP Gateway', type: 'router', ip: '203.0.113.1', mac: 'FF:00:11:22:33:44', subnetMask: '255.255.255.252', gateway: '0.0.0.0', dns: '8.8.8.8', status: 'online', x: 75, y: 35 },
      { id: 'cloud_dns', name: 'Cloudflare (1.1.1.1)', type: 'dns', ip: '1.1.1.1', mac: 'DD:11:11:11:11:11', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '1.1.1.1', status: 'online', x: 90, y: 70 }
    ]
  },
  {
    id: 19,
    title: 'NAT (Network Address Translation) & PAT',
    phase: 4,
    phaseTitle: 'Phase 04 — Routing & Layer 3',
    concepts: ['NAT (Network Address Translation)', 'PAT (Port Address Translation)', 'Inside Local vs Outside Global', 'RFC 1918'],
    visualStory: 'Private IPs (192.168.x.x) cannot be routed across the public internet. Watch the router translate PC-A private IP:port (192.168.1.10:50241) into the router public IP:port (203.0.113.5:10442) and track it in the NAT translation table.',
    visualExperience: 'Packet crosses router: Source changes from 192.168.1.10 to 203.0.113.5. Web server responds to public IP. Router inspects port table and forwards back to internal PC.',
    requiredUnderstanding: 'NAT/PAT preserves IPv4 address space and hides internal corporate network topography from outside attackers.',
    workplaceScenario: 'TechNova employees all browse the internet simultaneously while sharing a single public IP address assigned by the ISP.',
    simulationType: 'nat',
    experimentPrompt: {
      question: 'How does Port Address Translation (PAT) allow 500 company computers to share a single public IPv4 address simultaneously?',
      options: [
        'It compresses the computers into 1-minute time slices',
        'It assigns a unique source TCP/UDP port number to each internal connection in its state table',
        'It changes the cables every 5 seconds',
        'It converts IP packets into Bluetooth signals'
      ],
      correctAnswerIndex: 1,
      explanation: 'PAT tracks internal connections by mapping unique Layer 4 source port numbers to the single public IP address.'
    },
    defaultDevices: [
      { id: 'pc1', name: 'Workstation 1', type: 'pc', ip: '192.168.1.10', mac: 'AA:11:11:11:00:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 15, y: 35 },
      { id: 'pc2', name: 'Workstation 2', type: 'pc', ip: '192.168.1.20', mac: 'AA:11:11:11:00:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 15, y: 65 },
      { id: 'nat_rtr', name: 'NAT Gateway Router', type: 'router', ip: '192.168.1.1', mac: 'CC:00:11:22:33:44', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 50, y: 50 },
      { id: 'pub_srv', name: 'Public Web Server', type: 'server', ip: '198.51.100.25', mac: 'EE:99:88:77:66:55', subnetMask: '255.255.255.0', gateway: '198.51.100.1', dns: '8.8.8.8', status: 'online', x: 85, y: 50 }
    ]
  },
  {
    id: 20,
    title: 'Routing Troubleshooting Lab',
    phase: 4,
    phaseTitle: 'Phase 04 — Routing & Layer 3',
    concepts: ['Show IP Route', 'Next Hop Verification', 'Gateway Discrepancy', 'Route Blackhole'],
    visualStory: 'HQ cannot reach the Database Server at Branch 2. Use `ping`, `tracert`, and inspect router routing tables to discover which router drops the packet or lacks a valid return path.',
    visualExperience: 'Step-by-step packet tracer: Packet leaves HQ → Passes R1 → Arrives at R2 → R2 has wrong gateway for Branch 2 → Packet discarded. Fix the route entry!',
    requiredUnderstanding: 'Transition from "it does not work" to "the packet reaches R2, but R2 lacks a route to Branch 2".',
    workplaceScenario: 'TechNova incident: "Branch 2 CRM unreachable after router software update." Locate the dropped route and restore static route.',
    simulationType: 'routing_troubleshoot',
    experimentPrompt: {
      question: 'When troubleshooting an unreachable remote server across three routers, what command isolates the exact hop where traffic stops?',
      options: ['arp -a', 'tracert (Windows) / traceroute (Linux)', 'netstat -ano', 'ipconfig /flushdns'],
      correctAnswerIndex: 1,
      explanation: 'Traceroute prints each successive hop IP and response time until it reaches an asterisk timeout or Destination Unreachable, exposing the broken link.'
    },
    defaultDevices: [
      { id: 'hq_pc', name: 'HQ Admin PC', type: 'pc', ip: '10.1.0.10', mac: 'AA:10:01:00:00:10', subnetMask: '255.255.255.0', gateway: '10.1.0.1', dns: '8.8.8.8', status: 'online', x: 15, y: 50 },
      { id: 'r1', name: 'HQ Core Router (R1)', type: 'router', ip: '10.1.0.1', mac: 'CC:10:01:00:00:01', subnetMask: '255.255.255.0', gateway: '172.16.1.2', dns: '8.8.8.8', status: 'online', x: 40, y: 50 },
      { id: 'r2', name: 'Branch Router (R2)', type: 'router', ip: '172.16.1.2', mac: 'CC:10:02:00:00:02', subnetMask: '255.255.255.252', gateway: '10.2.0.1', dns: '8.8.8.8', status: 'misconfigured', x: 65, y: 50 },
      { id: 'db_srv', name: 'Branch 2 Database', type: 'server', ip: '10.2.0.100', mac: 'EE:10:02:00:00:99', subnetMask: '255.255.255.0', gateway: '10.2.0.1', dns: '8.8.8.8', status: 'online', x: 88, y: 50 }
    ]
  },
  {
    id: 21,
    title: 'Windows Network Troubleshooting & CMD Mastery',
    phase: 5,
    phaseTitle: 'Phase 05 — Real IT Support Skills',
    concepts: ['ipconfig [/all /release /renew /flushdns]', 'ping', 'tracert', 'nslookup', 'arp -a', 'netstat -ano'],
    visualStory: 'Open a simulated Windows CMD terminal on a TechNova workstation. An employee reports they cannot load the internal company portal. Execute real diagnostic commands to inspect IP, DNS, and gateway settings.',
    visualExperience: 'Full Windows CMD terminal interface: Type real commands like `ipconfig /all`, `ping 192.168.1.1`, `nslookup portal.technova.local`, `arp -a`.',
    requiredUnderstanding: 'Knowing what each Windows network command outputs and which command to run first during ticket triage.',
    workplaceScenario: 'IT Helpdesk Level 1: Walk a remote user through verifying their IP address and renewing their DHCP lease.',
    simulationType: 'windows_cli',
    experimentPrompt: {
      question: 'Which Windows command displays the computer IP address, subnet mask, default gateway, MAC address, and DNS servers all in one view?',
      options: ['ping -t', 'ipconfig /all', 'arp -d *', 'netstat -r'],
      correctAnswerIndex: 1,
      explanation: '`ipconfig /all` outputs the full network configuration including physical MAC address, DHCP lease timestamps, and DNS server IPs.'
    },
    defaultDevices: [
      { id: 'win_pc', name: 'Windows 11 Workstation', type: 'pc', ip: '192.168.1.45', mac: 'D4:5D:64:12:34:56', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 25, y: 50 },
      { id: 'sw1', name: 'Office Switch', type: 'switch', ip: '192.168.1.2', mac: '00:11:22:33:44:55', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 50, y: 50 },
      { id: 'gate', name: 'Default Gateway', type: 'router', ip: '192.168.1.1', mac: '00:CC:DD:EE:FF:11', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 75, y: 50 }
    ]
  },
  {
    id: 22,
    title: 'Linux Networking & Server Administration',
    phase: 5,
    phaseTitle: 'Phase 05 — Real IT Support Skills',
    concepts: ['ip addr / ip link', 'ip route', 'ss -tuln (socket statistics)', 'curl -I', 'dig / host', 'traceroute'],
    visualStory: 'Log into an Ubuntu server console hosting TechNova web portal. Users report timeout errors. Check interface IP, routing table, and verify if Nginx/Apache is actually listening on port 80/443.',
    visualExperience: 'Interactive Linux Bash terminal: Run `ip addr`, `ip route`, `ss -tuln`, `curl http://localhost:80`. See listening sockets and active daemon ports.',
    requiredUnderstanding: 'Linux server networking inspection and identifying whether issues are network-related or application service crashes.',
    workplaceScenario: 'TechNova web server is reachable via ping, but `curl -I http://localhost` fails because the web service daemon died.',
    simulationType: 'linux_cli',
    experimentPrompt: {
      question: 'On modern Linux distributions, which command has replaced the legacy `netstat` to view listening TCP and UDP ports?',
      options: ['ss -tuln', 'ls -la', 'top', 'traceroute -p'],
      correctAnswerIndex: 0,
      explanation: '`ss` (Socket Statistics) is the modern replacement for netstat, with `-tuln` displaying TCP, UDP, listening ports, and numeric addresses.'
    },
    defaultDevices: [
      { id: 'lnx_srv', name: 'Ubuntu Web Server', type: 'server', ip: '10.0.5.20', mac: '52:54:00:12:34:56', subnetMask: '255.255.255.0', gateway: '10.0.5.1', dns: '10.0.5.1', status: 'online', x: 40, y: 50 },
      { id: 'lnx_gate', name: 'Gateway Router', type: 'router', ip: '10.0.5.1', mac: '00:52:54:00:00:01', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 70, y: 50 }
    ]
  },
  {
    id: 23,
    title: 'IT Support Ticket #1001: User Cannot Access the Internet',
    phase: 5,
    phaseTitle: 'Phase 05 — Real IT Support Skills',
    concepts: ['Unassisted Troubleshooting', 'Ticket Triage', 'Physical vs Logical Isolation', 'APIPA Diagnosis'],
    visualStory: 'Ticket #1001: "Sarah from Marketing cannot access the internet or open her email." No tutorial, no checklist. Use your diagnostic terminal, inspect her workstation, and solve the ticket.',
    visualExperience: 'Workplace Ticket Interface: Read user ticket symptoms. Open workstation CMD. Run diagnostics. Identify wrong default gateway. Fix configuration and submit solution.',
    requiredUnderstanding: 'Methodical diagnostic habits: Physical link → IP configuration → Gateway ping → DNS check → Internet target.',
    workplaceScenario: 'First unguided IT support ticket on the job. Track investigation steps and time to resolution.',
    simulationType: 'ticket_1001',
    experimentPrompt: {
      question: 'When diagnosing a user who cannot access the internet, what is the recommended starting step in the OSI troubleshooting model?',
      options: [
        'Reinstall the operating system from scratch',
        'Verify physical connectivity (cable plugged in, link light active) and Layer 3 IP configuration via ipconfig',
        'Call the ISP CEO directly',
        'Replace the motherboard'
      ],
      correctAnswerIndex: 1,
      explanation: 'Beginning with Layer 1/2 physical link status and inspecting the Layer 3 IP/gateway configuration eliminates the vast majority of desk-side tickets quickly.'
    },
    defaultDevices: [
      { id: 'sarah_pc', name: 'Sarah Workstation', type: 'pc', ip: '192.168.1.85', mac: '00:26:B9:AA:BB:CC', subnetMask: '255.255.255.0', gateway: '192.168.1.250', dns: '8.8.8.8', status: 'misconfigured', x: 25, y: 50 },
      { id: 'sw1', name: 'Floor Switch', type: 'switch', ip: '192.168.1.2', mac: '00:11:22:33:44:55', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 50, y: 50 },
      { id: 'gate', name: 'Real Gateway (192.168.1.1)', type: 'router', ip: '192.168.1.1', mac: 'CC:01:00:00:00:01', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 75, y: 50 }
    ]
  },
  {
    id: 24,
    title: 'IT Support Ticket #1002: Google Works, Intranet Fails',
    phase: 5,
    phaseTitle: 'Phase 05 — Real IT Support Skills',
    concepts: ['Split DNS', 'Internal vs External Resolution', 'Intranet Routing', 'False Assumptions'],
    visualStory: 'Ticket #1002: "Employee reports they can stream YouTube and search Google, but cannot open the company intranet portal (intranet.technova.local)."',
    visualExperience: 'Run `nslookup intranet.technova.local`. Discover PC is configured with public 8.8.8.8 DNS instead of TechNova internal DNS (192.168.1.254), which alone knows internal private records.',
    requiredUnderstanding: 'Public DNS resolvers cannot resolve internal private Active Directory or corporate intranet domains.',
    workplaceScenario: 'User manually entered 8.8.8.8 to "speed up gaming" at lunch, breaking internal Active Directory and SharePoint access.',
    simulationType: 'ticket_1002',
    experimentPrompt: {
      question: 'Why does a computer configured exclusively with Google DNS (8.8.8.8) fail to open internal company websites ending in .local or internal domains?',
      options: [
        'Google blocked the company domain for copyright infringement',
        'Google public DNS only contains public internet records and cannot query internal private DNS servers',
        'The computer ethernet port runs out of bandwidth',
        'Public DNS only works over Wi-Fi'
      ],
      correctAnswerIndex: 1,
      explanation: 'Public DNS resolvers do not have visibility into internal private DNS zones hosted inside corporate intranets.'
    },
    defaultDevices: [
      { id: 'user_pc', name: 'User PC (Wrong DNS)', type: 'pc', ip: '192.168.1.92', mac: 'AA:92:00:00:00:92', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'misconfigured', x: 20, y: 50 },
      { id: 'corp_dns', name: 'Internal DNS Server', type: 'dns', ip: '192.168.1.254', mac: '00:50:56:D0:01:25', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 50, y: 25 },
      { id: 'gate', name: 'Gateway Router', type: 'router', ip: '192.168.1.1', mac: '00:CC:01:00:00:01', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 50, y: 75 },
      { id: 'intranet_srv', name: 'Intranet Portal Server', type: 'server', ip: '192.168.10.80', mac: '00:50:56:80:10:80', subnetMask: '255.255.255.0', gateway: '192.168.10.1', dns: '192.168.1.254', status: 'online', x: 80, y: 50 }
    ]
  },
  {
    id: 25,
    title: 'Network-Wide Incident: Scope & Blast Radius Analysis',
    phase: 5,
    phaseTitle: 'Phase 05 — Real IT Support Skills',
    concepts: ['Scope Analysis', 'Blast Radius', 'Single Point of Failure (SPOF)', 'Systemic Outage vs Individual Fault'],
    visualStory: 'Ticket Alert: "30 employees suddenly lost network access!" Learn the essential skill of scope analysis: Is it one PC? One desk row? One department switch? The core router? Locate the exact failure node.',
    visualExperience: 'Interactive Scope Matrix: Click Department A, B, and C nodes. See that only Floor 2 Switch is dark, while Floor 1 and the Core Router remain completely green.',
    requiredUnderstanding: 'Determining incident scope prevents wasting time troubleshooting individual endpoints when an upstream switch or uplink cable failed.',
    workplaceScenario: 'TechNova major incident triage: Quickly establish the boundary of an outage to mobilize the right response team.',
    simulationType: 'incident_scope',
    experimentPrompt: {
      question: 'If 30 users on Floor 2 lose connectivity simultaneously while users on Floor 1 work normally, what should you inspect FIRST?',
      options: [
        'Inspect each of the 30 workstations one-by-one',
        'Inspect the Floor 2 distribution switch, its power supply, and its uplink cable to Core',
        'Call the ISP to report a citywide outage',
        'Change all company passwords'
      ],
      correctAnswerIndex: 1,
      explanation: 'A concentrated outage affecting exactly one floor points directly to the shared infrastructure on that floor: the switch, its uplink, or power.'
    },
    defaultDevices: [
      { id: 'core_sw', name: 'Core Switch', type: 'switch', ip: '10.0.0.1', mac: '00:C0:00:00:00:01', subnetMask: '255.255.255.0', gateway: '10.0.0.254', dns: '8.8.8.8', status: 'online', x: 50, y: 30 },
      { id: 'sw_f1', name: 'Floor 1 Switch (Healthy)', type: 'switch', ip: '10.0.1.1', mac: '00:F1:00:00:00:01', subnetMask: '255.255.255.0', gateway: '10.0.0.1', dns: '8.8.8.8', status: 'online', x: 25, y: 65 },
      { id: 'sw_f2', name: 'Floor 2 Switch (Uplink Down)', type: 'switch', ip: '10.0.2.1', mac: '00:F2:00:00:00:01', subnetMask: '255.255.255.0', gateway: '10.0.0.1', dns: '8.8.8.8', status: 'offline', x: 75, y: 65 }
    ]
  },
  {
    id: 26,
    title: 'Joining TechNova Ltd.: Environment Discovery',
    phase: 6,
    phaseTitle: 'Phase 06 — Simulated First Job at TechNova',
    concepts: ['Enterprise Topology Audit', 'Device Inventory', 'IP Address Management (IPAM)', 'Network Documentation'],
    visualStory: 'Welcome to your first day as Junior IT Support Engineer at TechNova Ltd.! Senior Engineer gives you the company topology map, VLAN spreadsheet, and credentials. Audit the network and verify all segments.',
    visualExperience: 'Interactive Corporate Dashboard: Click every server, switch, firewall, and access point. Review IPAM allocations, VLAN mappings, and active service roles.',
    requiredUnderstanding: 'A great IT engineer starts by understanding existing baseline architecture before attempting changes or fixes.',
    workplaceScenario: 'Perform initial asset and topology verification for the IT Director.',
    simulationType: 'technova_onboard',
    experimentPrompt: {
      question: 'Why is it critical for an IT support engineer to review network documentation and IP schemas during their first week?',
      options: [
        'To prepare for a typing contest',
        'To understand normal baseline topology so abnormal behavior and misconfigurations can be spotted immediately',
        'Because all networking equipment changes brands every month',
        'It is required by the fire department'
      ],
      correctAnswerIndex: 1,
      explanation: 'You cannot troubleshoot an abnormal state unless you know what the normal operating baseline looks like.'
    },
    defaultDevices: [
      { id: 'gw', name: 'TechNova Edge Firewall', type: 'router', ip: '192.168.1.1', mac: '00:0C:29:AA:01:01', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 50, y: 20 },
      { id: 'sw_core', name: 'Core Distribution Switch', type: 'switch', ip: '192.168.1.2', mac: '00:0C:29:AA:01:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', status: 'online', x: 50, y: 50 },
      { id: 'srv_ad', name: 'Active Directory / DNS', type: 'dns', ip: '192.168.1.254', mac: '00:50:56:01:00:AD', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '127.0.0.1', status: 'online', x: 20, y: 75 },
      { id: 'srv_erp', name: 'ERP Application Server', type: 'server', ip: '192.168.20.10', mac: '00:50:56:01:00:20', subnetMask: '255.255.255.0', gateway: '192.168.20.1', dns: '192.168.1.254', status: 'online', x: 80, y: 75 }
    ]
  },
  {
    id: 27,
    title: 'Network Expansion: Customer Support Department',
    phase: 6,
    phaseTitle: 'Phase 06 — Simulated First Job at TechNova',
    concepts: ['Subnet Design (/27)', 'VLAN Provisioning', 'Switch Port Configuration', 'DHCP Scope Creation'],
    visualStory: 'TechNova is opening a brand-new Customer Support department with 25 agents. Design a dedicated /27 subnet, create VLAN 40, configure switch access ports, and provision a DHCP pool with gateway and DNS.',
    visualExperience: 'Interactive Expansion Builder: Configure IP pool 192.168.40.0/27, gateway 192.168.40.1, assign ports to VLAN 40, and test an agent laptop getting a DHCP lease.',
    requiredUnderstanding: 'End-to-end network deployment: Addressing design → VLAN creation → Switch port assignment → Routing gateway → DHCP service.',
    workplaceScenario: 'Deliver a production-ready department network on time for Monday morning staff onboarding.',
    simulationType: 'expansion_design',
    experimentPrompt: {
      question: 'Which subnet mask prefix length is ideal for a department of 25 workstations with minimal IP waste?',
      options: ['/24 (254 hosts)', '/27 (30 usable hosts)', '/29 (6 usable hosts)', '/30 (2 usable hosts)'],
      correctAnswerIndex: 1,
      explanation: '/27 provides 32 total addresses minus 2 = 30 usable host IPs, fitting 25 employees perfectly with room for growth.'
    },
    defaultDevices: [
      { id: 'core_sw', name: 'TechNova Core Switch', type: 'switch', ip: '192.168.1.2', mac: '00:0C:29:AA:01:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 50, y: 35 },
      { id: 'cs_agent1', name: 'Support Agent 01', type: 'pc', ip: '192.168.40.10', mac: 'AA:40:00:00:00:01', subnetMask: '255.255.255.224', gateway: '192.168.40.1', dns: '192.168.1.254', vlan: 40, status: 'online', x: 25, y: 70 },
      { id: 'cs_agent2', name: 'Support Agent 02', type: 'pc', ip: '192.168.40.11', mac: 'AA:40:00:00:00:02', subnetMask: '255.255.255.224', gateway: '192.168.40.1', dns: '192.168.1.254', vlan: 40, status: 'online', x: 75, y: 70 }
    ]
  },
  {
    id: 28,
    title: 'Production Incident (10:15 AM): Root Cause Analysis',
    phase: 6,
    phaseTitle: 'Phase 06 — Simulated First Job at TechNova',
    concepts: ['Incident Response', 'Root Cause Analysis (RCA)', 'Executive Communication', 'Remediation Plan'],
    visualStory: '🚨 10:15 AM CRITICAL ALERT: Customer Support cannot take calls or access the ticketing system. Triage the failure, restore service, and write the formal Root Cause Analysis (RCA) report.',
    visualExperience: 'Real-time incident response console: High-priority alarms, server logs, network status, interactive fix applicator, and RCA report generator.',
    requiredUnderstanding: 'Writing clear, blameless post-mortem reports detailing Problem, Evidence, Root Cause, Remediation, and Prevention.',
    workplaceScenario: 'TechNova Executive Incident Review: Present your RCA findings to the Chief Technology Officer.',
    simulationType: 'production_rca',
    experimentPrompt: {
      question: 'What is the primary objective of a Root Cause Analysis (RCA) document following a production outage?',
      options: [
        'To find out which junior employee to blame and fire',
        'To identify technical and process vulnerabilities and implement preventative safeguards so the incident never recurs',
        'To hide the incident from company executives',
        'To increase software license fees'
      ],
      correctAnswerIndex: 1,
      explanation: 'A blameless RCA focuses on learning from the failure and hardening systems and monitoring to prevent repeat occurrences.'
    },
    defaultDevices: [
      { id: 'r1', name: 'Edge Gateway', type: 'router', ip: '192.168.1.1', mac: 'CC:01:00:00:00:01', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'online', x: 50, y: 25 },
      { id: 'sw_cs', name: 'Support Floor Switch', type: 'switch', ip: '192.168.40.2', mac: '00:40:00:00:00:01', subnetMask: '255.255.255.0', gateway: '192.168.40.1', dns: '8.8.8.8', status: 'misconfigured', x: 50, y: 60 },
      { id: 'agent_pc', name: 'Agent Workstation', type: 'pc', ip: '192.168.40.15', mac: 'AA:40:00:00:00:15', subnetMask: '255.255.255.224', gateway: '192.168.40.1', dns: '8.8.8.8', status: 'offline', x: 80, y: 60 }
    ]
  },
  {
    id: 29,
    title: 'Design a Branch Office Network',
    phase: 6,
    phaseTitle: 'Phase 06 — Simulated First Job at TechNova',
    concepts: ['Branch Architecture', '40 Users across 4 Departments', 'VLAN Topology', 'IP Addressing Scheme', 'WAN Uplink'],
    visualStory: 'TechNova is opening a new regional branch in Chicago: 40 employees across Management, Operations, Support, and Guests. Design the complete network topology, IP addressing, VLAN IDs, and gateway uplinks.',
    visualExperience: 'Interactive Network Architect Canvas: Drag routers, switches, and departmental blocks. Assign VLAN 10 (Mgmt), 20 (Ops), 30 (Support), 99 (Guests) and calculate subnets.',
    requiredUnderstanding: 'Synthesizing addressing, switching, routing, and security into a cohesive multi-department branch architecture.',
    workplaceScenario: 'Submit the Chicago Branch Engineering Design Proposal for budget approval.',
    simulationType: 'branch_design',
    experimentPrompt: {
      question: 'Why should a Guest Wi-Fi network at a branch office always be isolated on its own dedicated VLAN (e.g. VLAN 99)?',
      options: [
        'To prevent guests from seeing and accessing sensitive internal company servers, databases, and employee workstations',
        'Because guest smartphones consume twice as much electricity',
        'Because guest devices cannot understand Ethernet frames',
        'To force guests to use slower USB cables'
      ],
      correctAnswerIndex: 0,
      explanation: 'A dedicated Guest VLAN isolates untrusted visitor devices from internal corporate assets, preventing eavesdropping and malware traversal.'
    },
    defaultDevices: [
      { id: 'branch_rtr', name: 'Branch Edge Router', type: 'router', ip: '10.50.0.1', mac: '00:50:00:00:00:01', subnetMask: '255.255.0.0', gateway: '198.51.100.1', dns: '8.8.8.8', status: 'online', x: 50, y: 25 },
      { id: 'branch_sw', name: 'Branch Core Switch', type: 'switch', ip: '10.50.0.2', mac: '00:50:00:00:00:02', subnetMask: '255.255.0.0', gateway: '10.50.0.1', dns: '8.8.8.8', status: 'online', x: 50, y: 60 },
      { id: 'mgmt_pc', name: 'Management', type: 'pc', ip: '10.50.10.5', mac: 'AA:50:10:00:00:05', subnetMask: '255.255.255.0', gateway: '10.50.10.1', dns: '8.8.8.8', vlan: 10, status: 'online', x: 20, y: 80 },
      { id: 'ops_pc', name: 'Operations', type: 'pc', ip: '10.50.20.5', mac: 'AA:50:20:00:00:05', subnetMask: '255.255.255.0', gateway: '10.50.20.1', dns: '8.8.8.8', vlan: 20, status: 'online', x: 40, y: 80 },
      { id: 'supp_pc', name: 'Support', type: 'pc', ip: '10.50.30.5', mac: 'AA:50:30:00:00:05', subnetMask: '255.255.255.0', gateway: '10.50.30.1', dns: '8.8.8.8', vlan: 30, status: 'online', x: 60, y: 80 },
      { id: 'guest_pc', name: 'Guest Wi-Fi', type: 'pc', ip: '10.50.99.5', mac: 'AA:50:99:00:00:05', subnetMask: '255.255.255.0', gateway: '10.50.99.1', dns: '8.8.8.8', vlan: 99, status: 'online', x: 80, y: 80 }
    ]
  },
  {
    id: 30,
    title: 'Final Practical Assessment: The Broken Enterprise Network',
    phase: 6,
    phaseTitle: 'Phase 06 — Simulated First Job at TechNova',
    concepts: ['Comprehensive Capstone', 'Multi-Layer Faults', 'Physical, Data Link, Network, Transport & DNS Isolation', 'Job Readiness'],
    visualStory: 'THE CAPSTONE TRIAL: TechNova entire enterprise network has multiple compounding faults across Layer 1, 2, 3, and DNS. You receive zero hints. Diagnose, fix every issue, verify end-to-end connectivity, and earn your certification.',
    visualExperience: 'Full unrestricted simulation mode: Terminal access to all devices, switch CLI, router route tables, DNS tester, and live packet visualizer. Resolve all 4 hidden defects!',
    requiredUnderstanding: 'True diagnostic autonomy: You can look at any enterprise network, understand what is happening, predict what should happen, and fix discrepancies without hesitation.',
    workplaceScenario: 'Senior IT Support Engineer Sign-Off Evaluation: Pass the ultimate practical test.',
    simulationType: 'capstone_exam',
    experimentPrompt: {
      question: 'What is the true measure of a competent Junior IT Support Engineer?',
      options: [
        'Memorizing 1,000 pages of textbook definitions without touching hardware',
        'Being able to look at a network, inspect its state, form testable hypotheses, isolate faults systematically, and verify solutions',
        'Guessing randomly until a ping turns green',
        'Relying entirely on vendor customer support'
      ],
      correctAnswerIndex: 1,
      explanation: 'Practical troubleshooting ability, methodical reasoning, and deep conceptual understanding are the bedrock of real IT engineering.'
    },
    defaultDevices: [
      { id: 'cap_pc', name: 'Workstation 01', type: 'pc', ip: '192.168.1.10', mac: 'AA:30:00:00:00:01', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'online', x: 15, y: 60 },
      { id: 'cap_sw', name: 'Enterprise Switch', type: 'switch', ip: '192.168.1.2', mac: '00:30:00:00:00:02', subnetMask: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.254', status: 'misconfigured', x: 40, y: 60 },
      { id: 'cap_rtr', name: 'Core Gateway', type: 'router', ip: '192.168.1.1', mac: 'CC:30:00:00:00:01', subnetMask: '255.255.255.0', gateway: '203.0.113.1', dns: '8.8.8.8', status: 'misconfigured', x: 65, y: 40 },
      { id: 'cap_srv', name: 'Global TechNova Cloud', type: 'server', ip: '93.184.216.34', mac: 'EE:30:00:00:00:99', subnetMask: '255.255.255.0', gateway: '93.184.216.1', dns: '8.8.8.8', status: 'online', x: 88, y: 40 }
    ]
  }
];

export const INITIAL_TICKETS: ITTicket[] = [
  {
    id: 'TICK-1001',
    dayId: 23,
    title: 'User Sarah cannot access the Internet',
    reporter: 'Sarah Jenkins (Marketing)',
    priority: 'high',
    department: 'Marketing',
    description: 'Sarah arrived at her desk this morning. Her computer shows "No Internet Access". She cannot check email or reach any web pages. Other employees in Marketing report no issues.',
    symptoms: [
      'Cannot open websites in Chrome or Edge',
      'Local network icon shows warning yellow triangle',
      'Neighbors in marketing have working connections'
    ],
    rootCause: 'Default Gateway was manually misconfigured to 192.168.1.250 instead of the real gateway 192.168.1.1.',
    resolutionOptions: [
      'Replace the Ethernet network cable with Cat6',
      'Update the Default Gateway on Sarah PC adapter to 192.168.1.1 or enable DHCP',
      'Reboot the entire company ISP edge router',
      'Tell Sarah marketing is not allowed internet access'
    ],
    correctOptionIndex: 1,
    solved: false
  },
  {
    id: 'TICK-1002',
    dayId: 24,
    title: 'Google works, but Company Intranet fails',
    reporter: 'David Miller (Finance)',
    priority: 'medium',
    department: 'Finance',
    description: 'David can browse YouTube, Wikipedia, and Google, but when he tries to access intranet.technova.local or portal.technova.local, the browser displays ERR_NAME_NOT_RESOLVED.',
    symptoms: [
      'Public internet websites work perfectly',
      'Company intranet and internal SharePoint are unreachable',
      'Pinging 8.8.8.8 succeeds with 12ms latency'
    ],
    rootCause: 'David manually set his primary DNS server to 8.8.8.8, which cannot resolve private TechNova internal DNS zones.',
    resolutionOptions: [
      'Reset DNS server address to TechNova internal DNS (192.168.1.254) or obtain DNS automatically via DHCP',
      'Change David IP address to 10.0.0.1',
      'Replace the Finance department switch',
      'Delete Google Chrome cache'
    ],
    correctOptionIndex: 0,
    solved: false
  },
  {
    id: 'TICK-1003',
    dayId: 25,
    title: 'Mass outage: 30 employees offline on Floor 2',
    reporter: 'Elena Vance (Office Manager)',
    priority: 'critical',
    department: 'Operations & Floor 2',
    description: 'At 09:45 AM, all 30 employees sitting in the North wing of Floor 2 lost complete network connectivity. Floor 1 and the Executive suites on Floor 3 are completely unaffected.',
    symptoms: [
      '30 PCs simultaneous disconnection',
      'Floor 1 employees have uninterrupted network access',
      'Core router CPU and bandwidth are nominal'
    ],
    rootCause: 'Floor 2 Distribution Switch uplink cable to Core switch was accidentally severed during cleaning, or switch power supply tripped.',
    resolutionOptions: [
      'Re-image all 30 employee PCs',
      'Inspect Floor 2 Distribution Switch power and reconnect its fiber/copper uplink to the Core switch',
      'Call the ISP to ask for more bandwidth',
      'Tell 30 employees to work from smartphones'
    ],
    correctOptionIndex: 1,
    solved: false
  }
];
