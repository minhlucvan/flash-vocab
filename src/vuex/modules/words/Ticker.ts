export class Ticker {
    public ttl: number = 0;
    public paused: boolean = true;
    private intervalId: number = 0;
    private timeoutFn?: () => any;
    private stopped: boolean = false;

    constructor(private maxTtl: number) {
        this.intervalId = window.setInterval(() => this.update(), 1000);
    }

    public onTimeOut(fn: () => any) {
        this.timeoutFn = fn;
    }

    public update() {
        if ( !this.paused && !this.stopped) {
            this.ttl--;
            this.onUpdate();
        }
    }

    public play() {
        this.paused = false;
    }

    public pause() {
        this.paused = true;
    }

    public reset() {
        this.ttl = this.maxTtl;
    }

    public stop() {
        if ( this.intervalId ) {
            clearInterval(this.intervalId);
        }
    }

    private onUpdate() {
        if ( this.ttl <= 0) {
            this.stopped = true;
            if ( this.timeoutFn ) {
                this.timeoutFn.call(null);
            }
        }
    }
}
