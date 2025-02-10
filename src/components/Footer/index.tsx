"use client";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection py-10">
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
