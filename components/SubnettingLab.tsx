
import React, { useState, useEffect } from 'react';
import { Network, Calculator, RefreshCw, ArrowDown } from 'lucide-react';

const SubnettingLab: React.FC = () => {
  const [ip, setIp] = useState<string>("192.168.1.10");
  const [cidr, setCidr] = useState<number>(24);
  const [binaryIp, setBinaryIp] = useState<string>("");
  const [binaryMask, setBinaryMask] = useState<string>("");
  const [networkId, setNetworkId] = useState<string>("");
  const [broadcastId, setBroadcastId] = useState<string>("");
  const [hosts, setHosts] = useState<number>(0);

  useEffect(() => {
    calculateSubnet();
  }, [ip, cidr]);

  const toBinary = (addr: string) => {
    return addr.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('.');
  };

  const fromBinary = (bin: string) => {
    return bin.split('.').map(octet => parseInt(octet, 2)).join('.');
  };

  const calculateSubnet = () => {
    const ipParts = ip.split('.').map(Number);
    if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) return;

    // Create Binary IP
    const binIpStr = ipParts.map(p => p.toString(2).padStart(8, '0')).join('');
    const formattedBinIp = ipParts.map(p => p.toString(2).padStart(8, '0')).join('.');
    setBinaryIp(formattedBinIp);

    // Create Binary Mask
    const maskBits = '1'.repeat(cidr) + '0'.repeat(32 - cidr);
    const formattedMask = maskBits.match(/.{1,8}/g)?.join('.') || "";
    setBinaryMask(formattedMask);

    // Calculate Network ID (Bitwise AND)
    let netIdBin = "";
    for (let i = 0; i < 32; i++) {
      netIdBin += (binIpStr[i] === '1' && maskBits[i] === '1') ? '1' : '0';
    }
    const formattedNetIdBin = netIdBin.match(/.{1,8}/g)?.join('.') || "";
    setNetworkId(fromBinary(formattedNetIdBin));

    // Calculate Broadcast ID
    let broadcastBin = "";
    for (let i = 0; i < 32; i++) {
      broadcastBin += (maskBits[i] === '1') ? binIpStr[i] : '1';
    }
    const formattedBroadcastBin = broadcastBin.match(/.{1,8}/g)?.join('.') || "";
    setBroadcastId(fromBinary(formattedBroadcastBin));

    // Calculate Hosts
    setHosts(Math.pow(2, 32 - cidr) - 2);
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          IP Subnet Visualizer (Unit 6)
        </h2>
        <div className="text-slate-400 text-sm font-mono bg-slate-900 px-3 py-1 rounded-full">
          Advanced Networking
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">CIDR Notation (/{cidr})</label>
          <input
            type="range"
            min="8"
            max="30"
            value={cidr}
            onChange={(e) => setCidr(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer mt-4"
          />
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>/8 (Class A)</span>
            <span>/16 (Class B)</span>
            <span>/24 (Class C)</span>
            <span>/30</span>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 space-y-6 overflow-x-auto">
        
        {/* Bitwise Operation */}
        <div className="space-y-2">
          <div className="flex items-center gap-4 font-mono text-lg">
            <span className="w-24 text-slate-400 text-xs uppercase tracking-wider">IP Addr</span>
            <div className="flex gap-1">
              {binaryIp.split('').map((bit, i) => (
                <span key={i} className={`${bit === '.' ? 'text-slate-600 w-2 text-center' : cidr > (i - Math.floor(i/9)) ? 'text-emerald-400' : 'text-orange-400'}`}>{bit}</span>
              ))}
            </div>
            <span className="text-slate-400 text-sm ml-4">{ip}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-lg">
            <span className="w-24 text-slate-400 text-xs uppercase tracking-wider">Subnet Mask</span>
            <div className="flex gap-1">
              {binaryMask.split('').map((bit, i) => (
                <span key={i} className={`${bit === '.' ? 'text-slate-600 w-2 text-center' : bit === '1' ? 'text-emerald-600' : 'text-slate-700'}`}>{bit}</span>
              ))}
            </div>
            <span className="text-slate-400 text-sm ml-4">/{cidr}</span>
          </div>

          <div className="flex items-center gap-4 pl-28 my-2">
            <div className="h-px w-[400px] bg-slate-600"></div>
            <span className="text-xs text-slate-500">Bitwise AND</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-lg">
            <span className="w-24 text-emerald-400 text-xs uppercase tracking-wider font-bold">Network ID</span>
            <div className="flex gap-1">
              {toBinary(networkId).split('').map((bit, i) => (
                <span key={i} className={`${bit === '.' ? 'text-slate-600 w-2 text-center' : 'text-emerald-400 font-bold'}`}>{bit}</span>
              ))}
            </div>
            <span className="text-white text-sm font-bold ml-4">{networkId}</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Total Usable Hosts</div>
            <div className="text-2xl text-white font-mono">{hosts.toLocaleString()}</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Broadcast Address</div>
            <div className="text-xl text-orange-300 font-mono">{broadcastId}</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Subnet Mask</div>
            <div className="text-xl text-emerald-300 font-mono">{fromBinary(binaryMask)}</div>
          </div>
        </div>

        <div className="bg-emerald-900/20 border border-emerald-600/30 p-4 rounded-lg">
          <h4 className="text-emerald-400 text-sm font-bold mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4" /> logic: Bitwise AND
          </h4>
          <p className="text-emerald-100/70 text-sm">
            The Network ID is calculated by performing a bitwise AND operation between the IP address and the Subnet Mask. 
            <br/>1 AND 1 = 1
            <br/>1 AND 0 = 0
            <br/>0 AND 0 = 0
          </p>
        </div>

      </div>
    </div>
  );
};

export default SubnettingLab;
