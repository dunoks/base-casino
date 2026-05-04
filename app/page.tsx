'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coins, 
  Dices, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Zap,
  Wallet,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { ConnectWallet, Wallet as OnchainWallet, WalletDropdown, WalletDropdownDisconnect, WalletDropdownLink } from '@coinbase/onchainkit/wallet';
import { Address, Avatar, Name, Identity, EthBalance } from '@coinbase/onchainkit/identity';

// Coin Flip Game Component
const CoinFlip = () => {
  const [side, setSide] = useState<'heads' | 'tails' | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [betAmount, setBetAmount] = useState('0.001');

  const flip = (chosenSide: 'heads' | 'tails') => {
    setFlipping(true);
    setResult(null);
    setSide(null);

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? 'heads' : 'tails';
      setSide(outcome);
      setResult(outcome === chosenSide ? 'win' : 'lose');
      setFlipping(false);
    }, 2000);
  };

  return (
    <div className="casino-card p-6 rounded-2xl flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-gold-text font-bold text-xl">
        <Coins className="w-6 h-6 text-[#d4af37]" />
        <span>Base Coin Flip</span>
      </div>

      <div className="relative w-32 h-32">
        <motion.div
          animate={flipping ? { rotateY: 1800 } : { rotateY: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-200 border-4 border-yellow-700 flex items-center justify-center text-4xl shadow-2xl shadow-yellow-500/20"
        >
          {flipping ? "?" : side === 'heads' ? "H" : side === 'tails' ? "T" : "B"}
        </motion.div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
          <span className="text-sm opacity-60">Bet Amount</span>
          <span className="font-mono text-gold">{betAmount} ETH</span>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            onClick={() => flip('heads')}
            disabled={flipping}
            className="py-3 rounded-xl bg-yellow-600/20 border border-yellow-600/50 hover:bg-yellow-600/40 transition-colors disabled:opacity-50"
          >
            Heads
          </button>
          <button
            onClick={() => flip('tails')}
            disabled={flipping}
            className="py-3 rounded-xl bg-yellow-600/20 border border-yellow-600/50 hover:bg-yellow-600/40 transition-colors disabled:opacity-50"
          >
            Tails
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-lg font-bold ${result === 'win' ? 'text-green-400' : 'text-red-400'}`}
          >
            {result === 'win' ? "YOU WON! 🎉" : "BET LOST 💀"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Dice Game Component
const DiceRoll = () => {
  const [rolling, setRolling] = useState(false);
  const [diceValues, setDiceValues] = useState([1, 1]);
  const [bet, setBet] = useState(7);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setDiceValues([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
      setRolling(false);
    }, 1000);
  };

  const total = diceValues[0] + diceValues[1];

  return (
    <div className="casino-card p-6 rounded-2xl flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-gold-text font-bold text-xl">
        <Dices className="w-6 h-6 text-[#d4af37]" />
        <span>Lucky Roll</span>
      </div>

      <div className="flex gap-4">
        {diceValues.map((val, i) => (
          <motion.div
            key={i}
            animate={rolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: rolling ? Infinity : 0, duration: 0.3 }}
            className="w-16 h-16 bg-white rounded-xl shadow-inner border-2 border-gray-200 flex items-center justify-center text-3xl font-black text-black"
          >
            {val}
          </motion.div>
        ))}
      </div>

      <div className="w-full text-center">
        <button
          onClick={roll}
          disabled={rolling}
          className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-black uppercase tracking-widest rounded-xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform disabled:opacity-50"
        >
          {rolling ? "Rolling..." : "Roll Dice"}
        </button>
      </div>

      {!rolling && (
        <div className="text-sm opacity-60">
          Last Total: <span className="text-gold font-bold">{total}</span>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
      } catch (err) {
        console.error("SDK initialization failed", err);
      }
    };
    init();
  }, []);

  return (
    <div className="h-screen w-full bg-[#020408] text-[#e2e8f0] font-sans flex flex-col overflow-hidden select-none">
      {/* Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-white/5 bg-[#05070a] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0052ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,82,255,0.4)]">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">BASE<span className="text-[#0052ff]">NOIR</span></span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> BASE MAINNET
          </div>
          
          <OnchainWallet>
            <ConnectWallet className="h-8 bg-slate-900 border border-white/10 text-white hover:bg-slate-800 transition-colors rounded-full flex items-center gap-2 px-4 py-0 min-w-0">
               <Identity className="flex items-center gap-2" hasCopyAddressOnClick>
                <Avatar className="w-4 h-4" />
                <Name className="text-xs font-bold" />
              </Identity>
            </ConnectWallet>
          </OnchainWallet>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Controls */}
        <aside className="w-80 bg-[#05070a] border-r border-white/5 p-6 hidden lg:flex flex-col gap-6 overflow-y-auto">
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Wager Amount</label>
            <div className="relative">
              <input type="text" value="0.15" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-[#0052ff]" readOnly />
              <div className="absolute right-3 top-3 flex gap-1">
                <button className="px-2 py-1 bg-white/5 rounded text-[10px] hover:bg-white/10">1/2</button>
                <button className="px-2 py-1 bg-white/5 rounded text-[10px] hover:bg-white/10">X2</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Multiplier</label>
              <span className="text-[#0052ff] font-mono text-sm">2.00x</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full relative">
              <div className="absolute h-2 w-1/2 bg-[#0052ff] rounded-full"></div>
              <div className="absolute h-5 w-5 bg-white border-4 border-[#0052ff] rounded-full -top-1.5 left-1/2 -ml-2.5 shadow-lg"></div>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Profit on Win</span>
                <span className="text-emerald-400 font-mono">+0.1485 ETH</span>
              </div>
            </div>
            <button className="w-full py-4 bg-[#0052ff] text-white font-bold rounded-xl shadow-[0_0_30px_rgba(0,82,255,0.3)] hover:bg-[#0042cc] active:scale-[0.98] transition-all">
              PLACE WAGER
            </button>
          </div>
        </aside>

        {/* Center - Game Stage */}
        <section className="flex-1 relative flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#111827_0%,_#020408_100%)] overflow-y-auto p-8">
           <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 z-10 w-full justify-center">
            <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 tracking-widest whitespace-nowrap">
              PROVABLY FAIR SEED: 0x892A...F312
            </div>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 my-auto">
            <CoinFlip />
            <DiceRoll />
          </div>

          <div className="w-full max-w-4xl mt-12 mb-8">
            <div className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">W</div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">W</div>
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xs">L</div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">W</div>
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs">-</div>
              </div>
              <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Recent History</div>
            </div>
          </div>
        </section>

        {/* Right Sidebar - Feed */}
        <aside className="w-80 bg-[#05070a] border-l border-white/5 hidden xl:flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Live Network Feed</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-800"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-300">anon_user</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-tighter">Coin Flip Win</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400">+0.002 ETH</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-800"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-300">whale_base</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-tighter">Dice Loss</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-rose-500">-0.500 ETH</span>
            </div>
          </div>
          <div className="p-4 bg-black/40 border-t border-white/5">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              <span>Total Volume</span>
              <span>2,142 ETH</span>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="h-12 px-8 bg-black flex items-center justify-between border-t border-white/5 text-[10px] font-medium text-slate-500 tracking-wider shrink-0">
        <div>&copy; 2026 BASENOIR · DECENTRALIZED CASINO</div>
        <div className="hidden md:flex gap-6 uppercase">
          <span>Fairness Protocol</span>
          <span>Terms of Service</span>
          <span>Responsible Play</span>
        </div>
      </footer>
    </div>
  );
}
