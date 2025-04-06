"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Presentation, UserPlus } from "lucide-react";

const links = [
  {
    label: "О нас",
    href: "/about",
  },
  {
    label: "Контакты",
    href: "/contact",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Профиль",
    href: "/profile",
  },
];

function Navbar() {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} 
    className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 shadow-sm bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex items-center gap-4 ml-20">
          <Link href="/">
            <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} custom={0} transition={{ duration: 0.5}} className="text-2xl font-bold text-white hover:text-blue-300 transition-colors duration-500">
              <span className="flex items-center gap-2"><Presentation/>Whiteboard</span>
            </motion.h2>
          </Link>
        </div>
        <div className="flex items-center gap-8 mr-20">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} className="text-white hover:text-blue-300 transition-all duration-300">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} custom={index+1} transition={{ duration: 0.5, delay: 0.5 * (index+1) }}>
                {link.label}
              </motion.div>
            </Link>
          ))}
          <motion.button initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} custom={links.length+1} transition={{ duration: 0.5, delay: 0.5 * (links.length+1) }} className="bg-transparent text-white border-2 border-white font-bold py-2 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 cursor-pointer">
            <span className="flex flex-row gap-2">
              <UserPlus/>
              Войти
            </span>
          </motion.button>
        </div>
    </motion.div>
  );
}

export default Navbar;