interface FullWidthProgressProps {
    enabled: boolean;
}

export default function FullWidthProgress({ enabled }: FullWidthProgressProps) {
    if (!enabled) return null;
    return (
        <div className="w-full">
            <progress className="progress progress-primary p-0 m-0" max="100"></progress>
        </div>
    )
}
