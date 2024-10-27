import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-brand">
                <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start">
                    <div>
                        <div className="mr-4 md:flex mb-4">
                            <a
                                className="flex items-center justify-center space-x-2 text-2xl font-bold text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10 py-0"
                                href="/"
                            >
                                <div className="flex flex-col">
                                    <h1 className="text-black dark:text-white font-sans">Aceternity UI</h1>
                                </div>
                            </a>
                        </div>
                        <div>
                            A product by{' '}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dark:text-sky-500 text-neutral-600 font-medium"
                                href="https://aceternity.com"
                            >
                                Aceternity
                            </a>
                        </div>
                        <div className="mt-2">
                            Building in public at{' '}
                            <a
                                className="dark:text-sky-500 font-medium text-neutral-600"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://twitter.com/mannupaaji"
                            >
                                @mannupaaji
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
                        <div className="flex justify-center space-y-4 flex-col mt-4">
                            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/pricing">
                                Pricing
                            </a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/components">
                                Components
                            </a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/templates">
                                Templates
                            </a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/categories">
                                Categories
                            </a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/blog">
                                Blog
                            </a>
                            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/tools/box-shadows">
                                Box Shadows
                            </a>
                        </div>
                        <div className="flex justify-center space-y-4 flex-col mt-4">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                                href="https://twitter.com/aceternitylabs"
                            >
                                Twitter
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                                href="https://discord.gg/ftZbQvCdN7"
                            >
                                Discord
                            </a>
                        </div>
                        <div className="flex justify-center space-y-4 flex-col mt-4">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                                href="https://pro.aceternity.com"
                            >
                                Aceternity UI Pro
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                                href="https://aceternity.com"
                            >
                                Aceternity
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
