import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { footer_data } from "../assets/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-primary/5 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <img
              src={assets.logo}
              alt="QuickBlog Logo"
              className="w-32 sm:w-40 mb-6"
            />
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              A modern AI-powered blogging platform designed for developers,
              innovators, and tech enthusiasts to share knowledge seamlessly.
            </p>
          </div>

          {/* Dynamic Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footer_data.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900 mb-4 text-base">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors duration-200 flex items-center gap-1"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="hover:text-primary transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear}{" "}
            <span className="font-medium text-gray-700">QuickBlog</span>.
            Developed by{" "}
            <span className="font-medium text-gray-700">MH Newaz</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
