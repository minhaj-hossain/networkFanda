export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6;

export type LearningMode = 'guided' | 'assisted' | 'realistic';

export type ProtocolType = 'ARP' | 'DHCP' | 'DNS' | 'TCP' | 'UDP' | 'ICMP' | 'HTTP';

export interface PacketInfo {
  id: string;
  sourceDevice: string;
  destDevice: string;
  sourceIp: string;
  destIp: string;
  sourceMac: string;
  destMac: string;
  protocol: ProtocolType;
  port?: number;
  status: 'transmitting' | 'inspecting' | 'delivered' | 'dropped';
  currentHopIndex: number;
  hops: string[];
  description: string;
  payload: string;
  layer2Header: {
    srcMac: string;
    dstMac: string;
    etherType: string;
    vlanTag?: number;
  };
  layer3Header: {
    version: string;
    srcIp: string;
    dstIp: string;
    ttl: number;
    protocol: string;
  };
  layer4Header: {
    srcPort?: number;
    dstPort?: number;
    flags?: string;
    type?: string;
  };
}

export interface NetworkDevice {
  id: string;
  name: string;
  type: 'pc' | 'switch' | 'router' | 'server' | 'dns' | 'cloud';
  ip: string;
  mac: string;
  subnetMask: string;
  gateway: string;
  dns: string;
  vlan?: number;
  status: 'online' | 'offline' | 'misconfigured';
  x: number; // percentage on canvas
  y: number;
  ports?: { portNumber: number; vlan: number; connectedTo?: string; status: 'up' | 'down' }[];
  macTable?: { port: number; mac: string; vlan: number }[];
  routingTable?: { destination: string; netmask: string; nextHop: string; interface: string }[];
  arpCache?: { ip: string; mac: string }[];
}

export interface DayCurriculum {
  id: number;
  title: string;
  phase: PhaseId;
  phaseTitle: string;
  concepts: string[];
  visualStory: string;
  visualExperience: string;
  requiredUnderstanding: string;
  workplaceScenario: string;
  troubleshootingNote?: string;
  simulationType:
    | 'packet_flow'
    | 'mac_learning'
    | 'ipv4_addressing'
    | 'subnet_mask'
    | 'subnetting'
    | 'arp'
    | 'dhcp'
    | 'dns'
    | 'tcp_udp'
    | 'icmp'
    | 'switching_vlan'
    | 'access_trunk'
    | 'inter_vlan'
    | 'switch_troubleshoot'
    | 'routing_table'
    | 'static_routing'
    | 'default_route'
    | 'nat'
    | 'routing_troubleshoot'
    | 'windows_cli'
    | 'linux_cli'
    | 'ticket_1001'
    | 'ticket_1002'
    | 'incident_scope'
    | 'technova_onboard'
    | 'expansion_design'
    | 'production_rca'
    | 'branch_design'
    | 'capstone_exam';
  experimentPrompt: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  };
  defaultDevices: NetworkDevice[];
}

export interface ITTicket {
  id: string;
  dayId: number;
  title: string;
  reporter: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  department: string;
  description: string;
  symptoms: string[];
  rootCause: string;
  resolutionOptions: string[];
  correctOptionIndex: number;
  solved: boolean;
}

export interface CompetencyScore {
  name: string;
  score: number; // 0 to 100
  totalTasks: number;
  completedTasks: number;
}
