import { cn } from '../../lib/utils';

interface LogoProps {
    className?: string;
    size?: number | string;
}

export function Logo({ className, size = 32 }: LogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("drop-shadow-sm", className)}
        >
            {/* House Outline - Minimalist Corner Style */}
            <path
                d="M50 15L85 45V85H15V45L50 15Z"
                fill="currentColor"
                className="text-forest/10"
            />
            <path
                d="M50 15L85 45V85M50 15L15 45V85"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-forest"
            />

            {/* Minimalist Sofa inside */}
            <rect x="30" y="55" width="40" height="20" rx="4" fill="currentColor" className="text-charcoal" />
            <rect x="25" y="60" width="10" height="12" rx="3" fill="currentColor" className="text-charcoal" />
            <rect x="65" y="60" width="10" height="12" rx="3" fill="currentColor" className="text-charcoal" />
            <path d="M35 55C35 50 65 50 65 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-charcoal" />
        </svg>
    );
}
