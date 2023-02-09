const Footer = () => {
  var d = new Date();
  const currentYear = d.getFullYear();
  return (
    <div className="flex p-6 items-center justify-between border-t-2 mx-auto max-w-7xl mt-20 text-sm md:text-base ">
      <small>&copy; Copyright {currentYear}, ETK Technologies</small>
      <small>
        <span>Created by ETK Technologies</span>
      </small>
    </div>
  );
};

export default Footer;
