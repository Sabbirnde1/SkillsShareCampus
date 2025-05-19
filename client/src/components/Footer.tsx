import { Link } from "wouter";
import {
  RiInstagramLine,
  RiTwitterLine,
  RiLinkedinBoxLine,
  RiDiscordLine,
} from "react-icons/ri";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about">
                  <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">Our Story</span>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">How It Works</span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">Testimonials</span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">Careers</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/help">
                  <a className="text-base text-gray-500 hover:text-gray-900">Help Center</a>
                </Link>
              </li>
              <li>
                <Link href="/safety">
                  <a className="text-base text-gray-500 hover:text-gray-900">Safety Guidelines</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-base text-gray-500 hover:text-gray-900">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/ambassadors">
                  <a className="text-base text-gray-500 hover:text-gray-900">Campus Ambassadors</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/explore?category=tutoring">
                  <a className="text-base text-gray-500 hover:text-gray-900">Tutoring</a>
                </Link>
              </li>
              <li>
                <Link href="/explore?category=design">
                  <a className="text-base text-gray-500 hover:text-gray-900">Design & Creative</a>
                </Link>
              </li>
              <li>
                <Link href="/explore?category=coding">
                  <a className="text-base text-gray-500 hover:text-gray-900">Tech & Programming</a>
                </Link>
              </li>
              <li>
                <Link href="/explore">
                  <a className="text-base text-gray-500 hover:text-gray-900">All Categories</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              Stay Connected
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base text-gray-500 hover:text-gray-900"
                >
                  <RiInstagramLine className="mr-2 text-lg" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base text-gray-500 hover:text-gray-900"
                >
                  <RiTwitterLine className="mr-2 text-lg" /> Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base text-gray-500 hover:text-gray-900"
                >
                  <RiLinkedinBoxLine className="mr-2 text-lg" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base text-gray-500 hover:text-gray-900"
                >
                  <RiDiscordLine className="mr-2 text-lg" /> Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
          <div>
            <p className="text-base text-gray-400">
              &copy; {currentYear} SkillShare Campus. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy">
              <a className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
            </Link>
            <Link href="/cookies">
              <a className="text-sm text-gray-500 hover:text-gray-900">Cookie Policy</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
