"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function GitHubLink() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-4 md:right-8 z-50"
    >
      <Link
        href="https://github.com/abhirajthakur"
        target="_blank"
        className="glass-button px-4 py-2 rounded-lg inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <GithubIcon className="w-6 h-6 pt-1" />
        <span className="hidden sm:inline">View my GitHub</span>
      </Link>
    </motion.div>
  );
}

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill={"none"}
    {...props}
  >
    <path
      d="M9.25 19.5C4 21 4 17 2.5 16.5M16 19.5V16.5C16 15.5 16.1667 15 15.5 14C18.1667 13.6667 21 12.5 21 8.5C20.9999 7.301 20.5523 6.15103 19.75 5.25C20.0323 4.21891 20.0323 3.12227 19.75 2.09118C19.75 2.09118 18.75 1.84118 16 3.59118C13.708 3.01238 11.292 3.01238 9 3.59118C6.25 1.84118 5.25 2.09118 5.25 2.09118C4.96773 3.12227 4.96773 4.21891 5.25 5.25C4.44772 6.15103 4.00006 7.301 4 8.5C4 12.5 6.83333 13.6667 9.5 14C8.83333 15 9 15.5 9 16.5V19.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
