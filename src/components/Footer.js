import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pb-4 text-gray-200 bg-gray-950">
      <div className="max-w-5xl xl:max-w-5xl mx-auto divide-y divide-gray-900 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col-reverse justify-between pt-5 pb-4 border-t lg:flex-row bg-top border-white">
          <ul className="flex flex-col space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <Link
                href="/"
                className="text-md text-gray-200 hover:text-white
                transition-colors duration-300 hover:text-deep-purple-accent-400
                font-semibold"
              >
                {" "}
                Cause I&apos;m Ballin
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <Link
              href="/"
              className="text-md text-gray-200 hover:text-white transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold tracking-tight"
            >
              © {new Date().getFullYear()} M. Yazid Akbar
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
}
