'use client'
import Link from "next/link";
import { FacebookIcon, Instagram, Twitter, Youtube } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });
  return (
    <motion.footer 
      ref={footerRef}
      className="bg-black text-white py-12 mt-28"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Whiteboard</h2>
          <p className="text-gray-400 mb-6">
            Виртуальные доски для совместной работы, доступные для каждого
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">О платформе</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">О нас</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Поддержка</h3>
          <ul className="space-y-2">
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Связаться с нами</Link></li>
            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Контакты</h3>
          <p className="text-gray-400 mb-2">📧 info@whiteboard.com</p>
          <p className="text-gray-400 mb-4">📞 +7 (707) 000-00-00</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <FacebookIcon size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
