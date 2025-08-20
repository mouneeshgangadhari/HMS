
import footerData from "../data/footer.json";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* About Section */}
        <div>
          <img className="mb-5 w-40" src={footerData.about.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 dark:text-gray-400 leading-6">
            {footerData.about.text}
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-900 dark:text-gray-100">{footerData.company.title}</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
            {footerData.company.links.map((link, index) => (
              <li key={index} className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-900 dark:text-gray-100">{footerData.contact.title}</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
            {footerData.contact.info.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <hr className="border-gray-300 dark:border-gray-700" />
        <p className="py-5 text-sm text-center text-gray-600 dark:text-gray-400">{footerData.copyright}</p>
      </div>
    </div>
  );
};

export default Footer;
