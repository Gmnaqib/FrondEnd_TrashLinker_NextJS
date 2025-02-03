"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-black dark:text-white">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Trashlinker</h3>
            <p className="text-sm">
              Trashlinker connects individuals, communities, and businesses to
              create a sustainable future by recycling waste into reusable
              resources. Join us in making a positive impact!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:underline">
                  Partners
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Partner Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Partners</h3>
            <div className="flex space-x-4">
              <img
                src="/img/img_bank.png"
                className="w-20"
                alt="Bank Partner"
              />
              <img
                src="/img/img_sipsn.png"
                className="w-20"
                alt="SIPSN Partner"
              />
            </div>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@trashlinker.com</p>
            <p className="text-sm mb-4">Phone: +123 456 7890</p>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-stroke dark:border-strokedark mt-8 pt-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Trashlinker. All rights reserved. |{" "}
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
