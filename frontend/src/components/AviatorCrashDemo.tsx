import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plane } from 'lucide-react';

type GameState = 'idle' | 'running' | 'crashed' | 'cashed-out';

export function AviatorCrashDemo() {
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [result, setResult] = useState<string>('');
  const crashPointRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  const startGame = () => {
    if (gameState === 'running') return;

    // Reset state
    setMultiplier(1.0);
    setResult('');
    setGameState('running');

    // Generate random crash point between 1.00x and 6.00x
    crashPointRef.current = parseFloat((Math.random() * 5 + 1).toFixed(2));

    // Start the multiplier increment
    intervalRef.current = window.setInterval(() => {
      setMultiplier((prev) => {
        const newMultiplier = prev + 0.05;

        // Check if we've reached the crash point
        if (newMultiplier >= crashPointRef.current) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setGameState('crashed');
          setResult(`💥 Crashed at ${crashPointRef.current.toFixed(2)}x`);
          return crashPointRef.current;
        }

        return newMultiplier;
      });
    }, 100);
  };

  const cashOut = () => {
    if (gameState !== 'running') return;

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setGameState('cashed-out');
    setResult(`✅ Cashed out at ${multiplier.toFixed(2)}x`);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const isRunning = gameState === 'running';
  const canStart = gameState === 'idle' || gameState === 'crashed' || gameState === 'cashed-out';

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(/assets/generated/aviator-sky-bg.dim_1920x1080.png)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-6">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/aviator-plane-icon.dim_256x256.png" 
                alt="Aviator" 
                className="h-10 w-10 animate-float"
              />
              <h1 className="font-display text-2xl font-bold tracking-wider text-foreground sm:text-3xl">
                ✈ Simple Aviator Game <span className="text-muted-foreground">(Demo)</span>
              </h1>
            </div>
          </div>
        </header>

        {/* Main Game Area */}
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <Card className="w-full max-w-2xl border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-md sm:p-12">
            <div className="space-y-8">
              {/* Multiplier Display */}
              <div className="text-center">
                <div 
                  className={`font-display text-7xl font-black tracking-tight transition-all duration-200 sm:text-8xl ${
                    isRunning 
                      ? 'animate-pulse-glow text-primary drop-shadow-[0_0_30px_rgba(16,185,129,0.6)]' 
                      : gameState === 'crashed'
                      ? 'text-destructive'
                      : gameState === 'cashed-out'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {multiplier.toFixed(2)}x
                </div>
                {isRunning && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Plane className="h-4 w-4 animate-pulse" />
                    <span className="font-display">Flying...</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  onClick={startGame}
                  disabled={!canStart}
                  size="lg"
                  className="flex-1 font-display text-lg font-semibold tracking-wide shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-50 disabled:shadow-none"
                >
                  {isRunning ? 'In Flight' : 'Start'}
                </Button>
                <Button
                  onClick={cashOut}
                  disabled={!isRunning}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2 border-primary font-display text-lg font-semibold tracking-wide text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                >
                  Cash Out
                </Button>
              </div>

              {/* Result Message */}
              {result && (
                <div 
                  className={`rounded-lg border-2 p-4 text-center font-display text-xl font-bold tracking-wide transition-all ${
                    gameState === 'crashed'
                      ? 'border-destructive/50 bg-destructive/10 text-destructive'
                      : 'border-primary/50 bg-primary/10 text-primary'
                  }`}
                >
                  {result}
                </div>
              )}

              {/* Instructions */}
              <div className="space-y-2 rounded-lg border border-border/30 bg-muted/20 p-4 text-sm text-muted-foreground">
                <h3 className="font-display font-semibold text-foreground">How to Play:</h3>
                <ul className="space-y-1 pl-5">
                  <li className="list-disc">Click <strong>Start</strong> to begin a round</li>
                  <li className="list-disc">The multiplier increases from 1.00x</li>
                  <li className="list-disc">Click <strong>Cash Out</strong> before it crashes to win</li>
                  <li className="list-disc">The plane crashes randomly between 1.00x and 6.00x</li>
                </ul>
              </div>
            </div>
          </Card>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} · Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'aviator-demo'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
