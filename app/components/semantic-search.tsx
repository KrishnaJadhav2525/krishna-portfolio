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
        <div className={`w-full ${className}`}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-8">
                    {/* Query field */}
                    <div className="relative">
                        <label htmlFor="semantic-q" className="t-label mb-3 block">
                            Query
                        </label>
                        <input
                            id="semantic-q"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g. how retrieval pipelines stay accurate"
                            className="field"
                        />
                        {isLoading && (
                            <span className="t-label absolute bottom-3.5 right-3 text-[var(--subtle)]">
                                Retrieving
                            </span>
                        )}
                    </div>

                    {error && (
                        <div className="t-mono mt-4 border border-red-500/30 p-3 uppercase text-red-500">
                            {error}
                        </div>
                    )}

                    {/* Results */}
                    {hasSearched && !error && (
                        <div className="mt-8 border-t" style={{ borderColor: 'var(--line-2)' }}>
                            {results.length === 0 ? (
                                <p className="t-body py-8">
                                    No semantic matches for &ldquo;{query}&rdquo;.
                                </p>
                            ) : (
                                results.map(({ score, blog }) => (
                                    <Link
                                        key={blog._id}
                                        href={`/blog/${blog.slug}`}
                                        className="riser group relative block border-b px-4 py-6"
                                        style={{ borderColor: 'var(--line)' }}
                                    >
                                        <div className="relative">
                                            <div className="flex items-baseline justify-between gap-4">
                                                <h3 className="hover-text is-title text-[1rem] leading-snug transition-transform duration-500 group-hover:translate-x-1">
                                                    {blog.title}
                                                </h3>
                                                <span className="t-label shrink-0">{formatScore(score)}</span>
                                            </div>

                                            {blog.description && (
                                                <p className="t-body mt-2 line-clamp-2 max-w-[58ch] text-[0.875rem]">
                                                    <Typewriter text={blog.description} speed={12} />
                                                </p>
                                            )}

                                            {blog.tags && blog.tags.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-1.5">
                                                    {blog.tags.slice(0, 4).map((tag) => (
                                                        <span key={tag} className="tag">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Side note */}
                <div className="relative lg:col-span-3 lg:col-start-10">
                    <div
                        className="absolute -left-8 bottom-0 top-0 hidden w-px lg:block"
                        style={{ background: 'var(--line)' }}
                    />
                    <div className="t-label mb-4">How it works</div>
                    <p className="t-body text-[0.875rem]">
                        Articles are embedded into a vector index. Your query is embedded the same
                        way, and the closest passages come back ranked by similarity — so
                        &ldquo;keeping models honest&rdquo; can surface a post that never uses
                        those words.
                    </p>
                    {!hasSearched && !isLoading && (
                        <p className="t-label mt-6">Enter a concept to begin</p>
                    )}
                </div>
            </div>
        </div>
    );
}
