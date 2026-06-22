"use client";

interface ProgressBarProps {
    progress: number;
    current: number;
    total: number;
}

export default function ProgressBar({ progress, current, total }: ProgressBarProps) {
    return (
        <div className="w-full max-w-xl mx-auto space-y-3">
            <div className="flex justify-between items-center font-serif text-xs tracking-widest text-secondary/60">
                <span>SOUL ATELIER</span>
                <span>
                    {current + 1} / {total}
                </span>
            </div>

            <div className="w-full h-0.5 bg-primary/10 rounded-full">
                <div
                    className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}