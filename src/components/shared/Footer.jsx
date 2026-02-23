const Footer = () => {
    return (
        <footer className="w-full text-white bg-[#101828]">
            {/* Top Section: Link Columns */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <nav aria-label="Footer navigation" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1 – About TSRS */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">About TSRS</h3>
                        <ul className="space-y-2 text-sm/6 text-white/90">
                            <li><a href="#" className="hover:underline hover:text-white">About the System</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Features</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">News &amp; Updates</a></li>
                        </ul>
                    </div>

                    {/* Column 2 – Resources */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm/6 text-white/90">
                            <li><a href="#" className="hover:underline hover:text-white">User Manual</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">FAQ’s</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Video Tutorials</a></li>
                        </ul>
                    </div>

                    {/* Column 3 – Support */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-sm/6 text-white/90">
                            <li><a href="#" className="hover:underline hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Helpdesk</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Report Issue</a></li>
                        </ul>
                    </div>

                    {/* Column 4 – Legal */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm/6 text-white/90">
                            <li><a href="#" className="hover:underline hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Accessibility</a></li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Bottom Bar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between text-xs text-white/90">
                    {/* Left (single line) */}
                    <div className="flex items-center gap-2">
                        <span>© 2022 – Copyright UX4G. All rights reserved.</span>
                        <span className="text-white/80">Powered by NeGD | MeitY Government of India</span>
                    </div>

                    {/* Right (single line with bar) */}
                    <nav aria-label="Footer policies" className="flex items-center gap-2">
                        <a href="#" className="hover:underline hover:text-white">Terms &amp; Conditions</a>
                        <span>|</span>
                        <a href="#" className="hover:underline hover:text-white">Privacy Policy</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;