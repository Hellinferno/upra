'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
    className?: string;
    label?: string;
    href?: string; // Optional: if provided, links to specific path instead of router.back()
}

export function BackButton({ className, label = "Back", href }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        if (href) {
            router.push(href);
        } else {
            router.back();
        }
    };

    return (
        <button
            onClick={handleBack}
            className={cn(
                "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10",
                className
            )}
        >
            <ArrowLeft className="h-4 w-4" />
            <span>{label}</span>
        </button>
    );
}
