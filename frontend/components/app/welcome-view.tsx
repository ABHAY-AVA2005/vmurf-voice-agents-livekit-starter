import { Button } from '@/components/ui/button';

function WelcomeImage() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/swastika-logo.svg"
      alt="Swastika Seva Sanstha logo"
      className="h-16 w-16 rounded-3xl object-contain"
    />
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
  isConnected?: boolean;
  isStarting?: boolean;
  statusMessage?: string;
  statusTone?: 'default' | 'success' | 'error';
  agentState?: string;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  isConnected = false,
  isStarting = false,
  statusMessage,
  statusTone = 'default',
  agentState,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const buttonLabel = isConnected
    ? 'Connected'
    : isStarting
    ? 'Starting…'
    : startButtonText;
  const isDisabled = isConnected || isStarting;

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-4xl rounded-[2rem] border border-border/60 bg-gradient-to-br from-popover/95 via-popover/80 to-background/90 p-6 shadow-[0_35px_120px_-70px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-lg shadow-primary/20 sm:h-24 sm:w-24">
            <WelcomeImage />
          </div>

          <div className="space-y-4 max-w-3xl">
            <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Talk to your responsive voice AI assistant
            </p>
            <p className="mx-auto max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg">
              Start a voice session with Sevika and enjoy a polished interface that adapts beautifully to phones,
              tablets, laptops, and ultra-wide screens.
            </p>
          </div>

          <Button
            size="lg"
            onClick={onStartCall}
            disabled={isDisabled}
            className="mt-4 w-full max-w-xs rounded-full bg-primary text-primary-foreground font-mono text-sm font-semibold uppercase tracking-[0.22em] sm:w-auto"
          >
            {buttonLabel}
          </Button>

          <p
            className={`text-sm ${
              statusTone === 'error'
                ? 'text-destructive'
                : statusTone === 'success'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            {statusMessage ?? (isConnected
              ? 'You are connected and ready to speak.'
              : isStarting
              ? 'Connecting to the voice agent...'
              : 'Ready when you are — tap the button to begin.')}
          </p>

          {agentState && agentState !== 'failed' && (
            <p className="text-xs uppercase tracking-[0.23em] text-muted-foreground/80">
              Agent state: {agentState.replace('-', ' ')}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-border/70 bg-background/80 p-5 text-left shadow-sm ring-1 ring-inset ring-border/10">
            <p className="text-sm font-semibold text-foreground">Mobile friendly</p>
            <p className="mt-2 text-sm text-muted-foreground">The interface scales cleanly for phones, tablets, and desktop screens.</p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-background/80 p-5 text-left shadow-sm ring-1 ring-inset ring-border/10">
            <p className="text-sm font-semibold text-foreground">Voice-first</p>
            <p className="mt-2 text-sm text-muted-foreground">Launch directly into voice interaction with a single tap.</p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-background/80 p-5 text-left shadow-sm ring-1 ring-inset ring-border/10">
            <p className="text-sm font-semibold text-foreground">Clear feedback</p>
            <p className="mt-2 text-sm text-muted-foreground">Button and status text update together so you always know the app state.</p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 left-0 flex w-full justify-center px-4 sm:hidden">
        <p className="max-w-prose text-center text-xs leading-5 text-muted-foreground">
          Need help getting set up? Check out the{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.livekit.io/agents/start/voice-ai/"
            className="underline"
          >
            Voice AI quickstart
          </a>
          .
        </p>
      </div>
    </div>
  );
};
