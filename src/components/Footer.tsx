import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center px-4 lg:px-40 py-4 h-12 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center space-y-3 sm:mb-0 mb-3 border-gray-200">
      <div className="flex flex-col">
        <a className="flex text-teal-600 items-center" href="#">
          <img className="h-16" src="/logo.png" />
          <div>
            <span className="text-black text-2xl font-bold">Trash</span>
            <span className="text-[rgba(50,195,108,1)] text-2xl font-bold">Linker</span>
          </div>
        </a>

        <div className="flex flex-row">
        <h2>Jl. Dipati ukur No. 176
          Kec. Sukahaji, Kota Bandung
          Jawa Barat 40221</h2>
        <div>
          <span>0867-5678-3456 (WA CS 1)</span>
          <span>0867-5678-3456 (WA CS 2)</span>
          <span>info.trashlinker@gmail.com</span>
        </div>

        <h2>
        Partner Kami
        </h2>
        </div>
      </div>
    </footer>
  );
}