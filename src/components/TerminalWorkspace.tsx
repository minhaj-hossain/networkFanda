import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Monitor, Laptop, HelpCircle, Trash2 } from 'lucide-react';

interface TerminalWorkspaceProps {
  isGatewayBroken: boolean;
  isDnsBroken: boolean;
  isCableUnplugged: boolean;
}

export const TerminalWorkspace: React.FC<TerminalWorkspaceProps> = ({
  isGatewayBroken,
  isDnsBroken,
  isCableUnplugged,
}) => {
  const [osMode, setOsMode] = useState<'windows' | 'linux'>('windows');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Microsoft Windows [Version 10.0.22631.3296]',
    '(c) Microsoft Corporation. All rights reserved.',
    '',
    'TechNova IT Support Trainee Diagnostic Workstation',
    'Type "help" to display available diagnostic commands.',
    '',
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const switchOsMode = (mode: 'windows' | 'linux') => {
    setOsMode(mode);
    if (mode === 'windows') {
      setHistory([
        'Microsoft Windows [Version 10.0.22631.3296]',
        '(c) Microsoft Corporation. All rights reserved.',
        '',
        'TechNova IT Support Trainee Diagnostic Workstation (CMD Prompt)',
        'Type "help" for a list of Windows network diagnostics.',
        '',
      ]);
    } else {
      setHistory([
        'Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)',
        'Welcome to TechNova Internal Web Server console.',
        '',
        'Type "help" for a list of Linux networking commands.',
        '',
      ]);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const promptText = osMode === 'windows' ? 'C:\\Users\\tech_trainee> ' : 'tech_trainee@technova-srv:~$ ';
    const newLines = [`${promptText}${cmd}`];

    const args = cmd.toLowerCase().split(' ');
    const baseCmd = args[0];

    // Helper for command processing
    switch (baseCmd) {
      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'help':
        if (osMode === 'windows') {
          newLines.push(
            'TechNova Windows Network Diagnostic Utility:',
            '  ipconfig           - Display IP address, subnet mask, default gateway',
            '  ipconfig /all      - Detailed adapter properties, MAC address, DNS, DHCP',
            '  ipconfig /flushdns - Flush and reset DNS resolver client cache',
            '  ping <host/ip>     - Send ICMP Echo requests to verify reachability',
            '  tracert <host/ip>  - Trace intermediate network hops to destination',
            '  nslookup <domain>  - Query DNS name server for domain IP records',
            '  arp -a             - Display Address Resolution Protocol cache table',
            '  netstat -ano       - Display active TCP/UDP ports and listening sockets',
            '  cls                - Clear terminal screen'
          );
        } else {
          newLines.push(
            'TechNova Linux Network Diagnostic Suite:',
            '  ip addr            - Show all IP addresses on network interfaces',
            '  ip route           - Display kernel routing table',
            '  ping <host/ip>     - Send ICMP echo requests',
            '  traceroute <host>  - Trace packet route hops',
            '  ss -tuln           - Display listening TCP/UDP sockets and port numbers',
            '  dig <domain>       - Query DNS name server details',
            '  curl -I <url>      - Fetch HTTP response headers',
            '  clear              - Clear terminal screen'
          );
        }
        break;

      case 'ipconfig':
        if (isCableUnplugged) {
          newLines.push(
            'Ethernet adapter Ethernet 1:',
            '   Media State . . . . . . . . . . . : Media disconnected',
            '   Connection-specific DNS Suffix  . :'
          );
        } else if (args[1] === '/all') {
          newLines.push(
            'Windows IP Configuration',
            '   Host Name . . . . . . . . . . . . : TECHNOVA-PC-01',
            '   Primary Dns Suffix  . . . . . . . : technova.local',
            '   Node Type . . . . . . . . . . . . : Hybrid',
            '   IP Routing Enabled. . . . . . . . : No',
            '',
            'Ethernet adapter Ethernet 1:',
            '   Connection-specific DNS Suffix  . : technova.local',
            '   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM',
            '   Physical Address. . . . . . . . . : AA-BB-CC-01-01-01',
            '   DHCP Enabled. . . . . . . . . . . : Yes',
            '   IPv4 Address. . . . . . . . . . . : 192.168.1.10(Preferred)',
            '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
            `   Default Gateway . . . . . . . . . : ${isGatewayBroken ? '192.168.1.250 (INVALID)' : '192.168.1.1'}`,
            '   DHCP Server . . . . . . . . . . . : 192.168.1.254',
            `   DNS Servers . . . . . . . . . . . : ${isDnsBroken ? '192.168.1.254 (UNRESPONSIVE)' : '192.168.1.254, 8.8.8.8'}`
          );
        } else if (args[1] === '/flushdns') {
          newLines.push(
            'Windows IP Configuration',
            'Successfully flushed the DNS Resolver Cache.'
          );
        } else {
          newLines.push(
            'Windows IP Configuration',
            '',
            'Ethernet adapter Ethernet 1:',
            '   Connection-specific DNS Suffix  . : technova.local',
            '   IPv4 Address. . . . . . . . . . . : 192.168.1.10',
            '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
            `   Default Gateway . . . . . . . . . : ${isGatewayBroken ? '192.168.1.250' : '192.168.1.1'}`
          );
        }
        break;

      case 'ip':
        if (args[1] === 'addr' || args[1] === 'a') {
          newLines.push(
            '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN',
            '    inet 127.0.0.1/8 scope host lo',
            '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP',
            '    link/ether 52:54:00:12:34:56 brd ff:ff:ff:ff:ff:ff',
            '    inet 10.0.5.20/24 brd 10.0.5.255 scope global eth0'
          );
        } else if (args[1] === 'route' || args[1] === 'r') {
          newLines.push(
            `default via ${isGatewayBroken ? '10.0.5.254 dev eth0 (BROKEN)' : '10.0.5.1 dev eth0 proto dhcp metric 100'}`,
            '10.0.5.0/24 dev eth0 proto kernel scope link src 10.0.5.20 metric 100'
          );
        } else {
          newLines.push('Usage: ip [addr | route]');
        }
        break;

      case 'ping': {
        const target = args[1] || '127.0.0.1';
        if (isCableUnplugged) {
          newLines.push(
            `Pinging ${target}:`,
            'Transmit failed. General failure. (Media disconnected)'
          );
        } else if (target === '127.0.0.1' || target === 'localhost') {
          newLines.push(
            `Pinging 127.0.0.1 with 32 bytes of data:`,
            'Reply from 127.0.0.1: bytes=32 time<1ms TTL=128',
            'Reply from 127.0.0.1: bytes=32 time<1ms TTL=128',
            'Reply from 127.0.0.1: bytes=32 time<1ms TTL=128',
            'Ping statistics for 127.0.0.1: Packets: Sent = 3, Received = 3, Lost = 0 (0% loss)'
          );
        } else if (target.includes('technova.local') || target.includes('google.com') || target.includes('example.com')) {
          if (isDnsBroken) {
            newLines.push(`Ping request could not find host ${target}. Please check the name and try again.`);
          } else if (isGatewayBroken) {
            newLines.push(
              `Pinging ${target} [93.184.216.34] with 32 bytes of data:`,
              'Destination host unreachable.',
              'Destination host unreachable.',
              'Request timed out.'
            );
          } else {
            newLines.push(
              `Pinging ${target} [93.184.216.34] with 32 bytes of data:`,
              'Reply from 93.184.216.34: bytes=32 time=14ms TTL=56',
              'Reply from 93.184.216.34: bytes=32 time=15ms TTL=56',
              'Reply from 93.184.216.34: bytes=32 time=13ms TTL=56',
              'Ping statistics: Packets: Sent = 3, Received = 3, Lost = 0 (0% loss)'
            );
          }
        } else if (target === '192.168.1.1') {
          if (isGatewayBroken) {
            newLines.push(
              'Pinging 192.168.1.1 with 32 bytes of data:',
              'Request timed out.',
              'Request timed out.'
            );
          } else {
            newLines.push(
              'Pinging 192.168.1.1 with 32 bytes of data:',
              'Reply from 192.168.1.1: bytes=32 time=1ms TTL=64',
              'Reply from 192.168.1.1: bytes=32 time<1ms TTL=64'
            );
          }
        } else {
          newLines.push(
            `Pinging ${target} with 32 bytes of data:`,
            'Reply from ' + target + ': bytes=32 time=22ms TTL=54',
            'Reply from ' + target + ': bytes=32 time=21ms TTL=54'
          );
        }
        break;
      }

      case 'tracert':
      case 'traceroute': {
        const dest = args[1] || '8.8.8.8';
        if (isCableUnplugged) {
          newLines.push('Unable to resolve target system name. Error: Media disconnected.');
        } else if (isGatewayBroken) {
          newLines.push(
            `Tracing route to ${dest} over a maximum of 30 hops:`,
            '  1    *        *        *     Request timed out.',
            '  2  Destination net unreachable.'
          );
        } else {
          newLines.push(
            `Tracing route to ${dest} over a maximum of 30 hops:`,
            '  1    <1 ms    <1 ms    <1 ms  192.168.1.1 [TechNova Gateway]',
            '  2    12 ms    11 ms    13 ms  203.0.113.1 [ISP Metro-Ethernet]',
            '  3    18 ms    17 ms    18 ms  72.14.215.85 [Tier 1 Transit]',
            `  4    20 ms    19 ms    20 ms  ${dest} [Destination Reached]`,
            'Trace complete.'
          );
        }
        break;
      }

      case 'nslookup':
      case 'dig': {
        const query = args[1] || 'portal.technova.local';
        if (isDnsBroken) {
          newLines.push(
            `Server:  UnKnown`,
            `Address:  192.168.1.254`,
            '',
            `*** UnKnown can't find ${query}: Server failed / Timed out`
          );
        } else {
          newLines.push(
            'Server:  dc01.technova.local',
            'Address:  192.168.1.254',
            '',
            'Name:    ' + query,
            'Address: 192.168.10.50'
          );
        }
        break;
      }

      case 'arp':
        newLines.push(
          'Interface: 192.168.1.10 --- 0x3',
          '  Internet Address      Physical Address      Type',
          '  192.168.1.1           cc-dd-ee-01-00-01     dynamic',
          '  192.168.1.2           00-1a-2b-sw-01-00     dynamic',
          '  192.168.1.254         00-50-56-d0-01-53     dynamic',
          '  192.168.1.255         ff-ff-ff-ff-ff-ff     static'
        );
        break;

      case 'netstat':
      case 'ss':
        newLines.push(
          'State      Recv-Q Send-Q  Local Address:Port      Peer Address:Port',
          'LISTEN     0      128     0.0.0.0:80              0.0.0.0:*         (HTTP)',
          'LISTEN     0      128     0.0.0.0:443             0.0.0.0:*         (HTTPS)',
          'LISTEN     0      50      127.0.0.1:3306          0.0.0.0:*         (MySQL)',
          'ESTAB      0      0       192.168.1.10:49152      93.184.216.34:443'
        );
        break;

      case 'curl':
        newLines.push(
          'HTTP/1.1 200 OK',
          'Date: Mon, 28 Sep 2026 09:40:00 GMT',
          'Server: TechNova-NGINX/1.24.0',
          'Content-Type: text/html; charset=UTF-8',
          'Content-Length: 1256',
          'Connection: keep-alive'
        );
        break;

      default:
        newLines.push(
          `'${baseCmd}' is not recognized as an internal or external command. Type 'help' for guidance.`
        );
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  return (
    <div className="w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
      {/* Console Top Bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-slate-200">
            {osMode === 'windows' ? 'Command Prompt — Administrator' : 'bash — root@technova-srv'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* OS Switcher */}
          <div className="flex items-center p-0.5 bg-slate-950 rounded border border-slate-800 text-[11px]">
            <button
              onClick={() => switchOsMode('windows')}
              className={`px-2 py-0.5 rounded transition-colors ${
                osMode === 'windows' ? 'bg-slate-800 text-sky-300 font-semibold' : 'text-slate-400'
              }`}
            >
              Windows CMD
            </button>
            <button
              onClick={() => switchOsMode('linux')}
              className={`px-2 py-0.5 rounded transition-colors ${
                osMode === 'linux' ? 'bg-slate-800 text-emerald-300 font-semibold' : 'text-slate-400'
              }`}
            >
              Linux Bash
            </button>
          </div>

          <button
            onClick={() => setHistory([])}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
            title="Clear Console"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Console Screen Output */}
      <div className="p-4 h-72 sm:h-80 overflow-y-auto space-y-1 text-slate-300 bg-slate-950/90 select-text">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`${
              line.startsWith('C:\\') || line.startsWith('tech_trainee@')
                ? 'text-sky-300 font-semibold mt-2'
                : line.includes('timed out') || line.includes('unreachable') || line.includes('failed')
                ? 'text-rose-400'
                : line.includes('Reply from') || line.includes('200 OK')
                ? 'text-emerald-400'
                : 'text-slate-300'
            }`}
          >
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Form Prompt */}
      <form
        onSubmit={handleCommand}
        className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-sky-400 font-semibold shrink-0 select-none">
          {osMode === 'windows' ? 'C:\\Users\\tech_trainee>' : 'tech_trainee@technova-srv:~$'}
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Try: ping google.com, ipconfig /all, nslookup, tracert 8.8.8.8"
          className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded text-xs font-semibold shrink-0 transition-colors"
        >
          Execute
        </button>
      </form>
    </div>
  );
};
