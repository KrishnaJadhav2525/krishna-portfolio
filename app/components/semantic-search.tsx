'use client';

/**
 * SemanticSearch Component
 *
 * A React component that provides semantic search functionality for blog posts.
 * Uses AI embeddings to find conceptually similar content, not just keyword matches.
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// TypeScript interfaces
interface Blog {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    tags?: string[];
}

interface SearchResult {
    score: number;
    blog: Blog;
}

interface SemanticSearchProps {
    className?: string;
}

// Debounce hook for search input
function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

// Typewriter Component for "Streaming" Effect
function Typewriter({ text, speed = 10 }: { text: string; speed?: number }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayedText}</span>;
}

export default function SemanticSearch({ className = '' }: SemanticSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const debouncedQuery = useDebounce(query, 500);

    const performSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery || searchQuery.length < 2) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        setResults([]);

        try {
            const response = await fetch(
                `/api/search?q=${encodeURIComponent(searchQuery)}&limit=5`
            );
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Search failed');
            }

            setResults(data.results || []);
            setHasSearched(true);
        } catch (err) {
            console.error('Search error:', err);
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while searching';
            setError(errorMessage);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        performSearch(debouncedQuery);
    }, [debouncedQuery, performSearch]);

    const formatScore = (score: number): string => {
        return `${Math.round(score * 100)}% match`;
    };

    return (
        <div className={`w-full max-w-2xl mx-auto ${className}`}>
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles semantically by concept..."
                    className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none focus:border-[var(--color-fg)] transition-colors duration-150"
                />

                {isLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[var(--color-subtle)]">
                        Searching...
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-3 p-3 border border-red-500/30 text-xs font-mono text-red-500">
                    {error}
                </div>
            )}

            {/* Results List */}
            {hasSearched && !error && (
                <div className="mt-4 border border-[var(--color-border)] divide-y divide-[var(--color-border)] bg-[var(--color-bg)]">
                    {results.length === 0 ? (
                        <p className="text-xs font-mono text-[var(--color-subtle)] text-center py-6">
                            No semantic matches found for &ldquo;{query}&rdquo;
                        </p>
                    ) : (
                        <>
                            <div className="px-4 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)] font-mono text-[11px] text-[var(--color-subtle)] uppercase tracking-wider">
                                {results.length} semantic result{results.length !== 1 ? 's' : ''}
                            </div>

                            {results.map(({ score, blog }) => (
                                <Link
                                    key={blog._id}
                                    href={`/blog/${blog.slug}`}
                                    className="block p-4 hover:bg-[var(--color-surface)] transition-colors duration-150 group"
                                >
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                        <h3 className="text-sm font-medium text-[var(--color-fg)] group-hover:underline underline-offset-4 decoration-[var(--color-border-strong)]">
                                            {blog.title}
                                        </h3>
                                        <span className="font-mono text-[10px] text-[var(--color-subtle)] border border-[var(--color-border)] px-1.5 py-0.5 shrink-0">
                                            {formatScore(score)}
                                        </span>
                                    </div>

                                    {blog.description && (
                                        <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed mb-2">
                                            <Typewriter text={blog.description} speed={12} />
                                        </p>
                                    )}

                                    {blog.tags && blog.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {blog.tags.slice(0, 4).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="font-mono text-[10px] text-[var(--color-subtle)] border border-[var(--color-border)] px-1 py-0.2"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </>
                    )}
                </div>
            )}

            {!hasSearched && !isLoading && (
                <p className="mt-2 text-xs font-mono text-[var(--color-subtle)] text-center">
                    Enter a topic or concept to run RAG vector search across articles
                </p>
            )}
        </div>
    );
}
