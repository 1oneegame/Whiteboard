import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-28">
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
              <Facebook size={20} />
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
    </footer>
  );
}
