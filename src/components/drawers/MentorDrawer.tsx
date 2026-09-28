import React, { useState } from 'react';
import { X, Lightbulb, Send, Sparkles } from 'lucide-react';
import { DayCurriculum } from '../../types/curriculum';

interface MentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  day: DayCurriculum;
  currentStepName: string;
}

export const MentorDrawer: React.FC<MentorDrawerProps> = ({
  isOpen,
  onClose,
  day,
  currentStepName,
}) => {
  const [messages, setMessages] = useState<{ sender: 'mentor' | 'user'; text: string }[]>([
    {
      sender: 'mentor',
      text: `Hello! I'm your TechNova senior IT mentor. We are on Day ${day.id}: "${day.title}". For the ${currentStepName} step, remember: observe where the packet is sent and verify Layer 2 vs Layer 3 boundaries. What would you like to check?`,
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    const newMessages = [...messages, { sender: 'user' as const, text: userText }];

    // Contextual guidance
    let mentorReply = `Good question. Always isolate layer by layer: First confirm physical link (Layer 1), verify MAC resolution via ARP (Layer 2), then check subnet match and gateway routing (Layer 3).`;
    if (userText.toLowerCase().includes('ping')) {
      mentorReply = `Ping tests ICMP echo. If pinging 127.0.0.1 works, your TCP/IP stack is healthy. If pinging your neighbor fails, check if your subnet masks match!`;
    } else if (userText.toLowerCase().includes('gateway')) {
      mentorReply = `The default gateway is your exit door. Without a correct gateway IP, your packet cannot reach another network or the Internet.`;
    } else if (userText.toLowerCase().includes('dns')) {
      mentorReply = `If you can ping 8.8.8.8 but cannot open a website by name, DNS is failing, but your network connection is fine!`;
    }

    setMessages([...newMessages, { sender: 'mentor' as const, text: mentorReply }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-slate-900 border-l border-slate-800 shadow-2xl p-5 flex flex-col justify-between overflow-hidden font-sans text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-xs text-slate-100">Senior Mentor</h3>
            <p className="text-[10px] font-mono text-slate-400">TechNova Engineering</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-200 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl leading-relaxed ${
              m.sender === 'mentor'
                ? 'bg-slate-950 border border-slate-800 text-slate-200'
                : 'bg-sky-500/15 border border-sky-500/30 text-sky-200 ml-4'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleSend} className="pt-3 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask a technical question..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-sans"
        />
        <button
          type="submit"
          className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
