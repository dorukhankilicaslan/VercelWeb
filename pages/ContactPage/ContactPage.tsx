// pages/ContactPage/ContactPage.tsx
"use client";

import React from 'react';
import { FaLinkedin, FaGithub, FaCodepen, FaInstagram, FaEnvelopeOpen, FaPhoneSquare } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm'; // Import the new ContactForm component

export default function ContactPage() {
    return (
        <div className='relative min-h-screen bg-[var(--background)] overflow-y-auto lg:mx-30 font-[poppins]'>
            <h1 className='isolate text-center grid place-items-center mb-10 md:mb-15 mt-10'>
                <span className='col-start-1 row-start-1 text-9xl font-black text-[var(--passive)] z-0 uppercase'>contact</span>
                <span className='col-start-1 row-start-1 mt-2 text-6xl font-black text-[var(--foreground)] z-1 uppercase'>
                    <span className='text-[var(--primary)]'>bana</span> ulaşın
                </span>
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4'>
                {/* Left column (contact info) */}
                <div className='col-span-full md:col-span-1'>
                    <div className="flex flex-col">
                        <h3 className="uppercase mb-0 font-semibold pb-3 text-2xl text-[var(--foreground)]">Don't be shy !</h3>
                        <p className="my-3 text-sm text-[var(--foreground)] opacity-90 max-w-70">
                            Feel free to get in touch with me.
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>

                        <a className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-300 relative my-5 block group"
                            href="mailto:steve@mail.com">
                            {/* İkon rengi için text-primary, hover'da değişmesine gerek yok çünkü zaten primary */}
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xl text-primary"><FaEnvelopeOpen size={36} /></span>
                            <span className="block pl-12 pt-[2px] font-bold text-[var(--foreground)] opacity-80">Mail : </span>
                            <p className="ml-12 font-semibold">
                                steve@mail.com
                            </p>
                        </a>

                        <ul className="list-none pt-1 my-5 flex space-x-6">
                            <li>
                                <a title="Linkedin" href="https://www.linkedin.com/in/drkhn/" target="_blank" rel="noopener noreferrer"
                                    className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-400 text-3xl">
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                                <a title="Github" href="https://github.com/dorukhankilicaslan" target="_blank" rel="noopener noreferrer"
                                    className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-400 text-3xl">
                                    <FaGithub />
                                </a>
                            </li>
                            <li>
                                <a title="CodePen" href="https://codepen.io/Orway" target='_blank' rel='noopener noreferrer'
                                    className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-400 text-3xl">
                                    <FaCodepen />
                                </a>
                            </li>
                            <li>
                                <a title="Instagram" href="https://www.instagram.com/dorukhan.k/" target='_blank' rel='noopener noreferrer'
                                    className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-400 text-3xl">
                                    <FaInstagram />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right column (contact form) */}
                <div className='col-span-full md:col-span-2'>
                    <h3 className="uppercase mb-4 font-semibold pb-3 text-[var(--foreground)]">Send A Message</h3>
                    <ContactForm /> {/* Use the imported ContactForm component */}
                </div>
            </div>
        </div>
    );
}