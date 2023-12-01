// pages/help.tsx
import React from 'react';

const helpSections = [
  {
    title: 'DISPATCH & DELIVERY',
    links: [
      { text: 'How do I get free delivery on orders?', href: '#' },
      { text: "What are the delivery options?", href: '#' },
      { text: 'Can my order be dispatched internationally?', href: '#' },
    ],
  },
  {
    title: 'ORDERS',
    links: [
      { text: 'Where is my order?', href: '#' },
      { text: 'Can I cancel or change my order?', href: '#' },
      { text: 'What payment options can I use on orders?', href: '#' },
    ],
  },
  {
    title: 'RETURNS',
    links: [
      { text: 'How do I return my order?', href: '#' },
      { text: "What is the returns policy?", href: '#' },
      { text: 'Where is my refund?', href: '#' },
    ],
  },
  {
    title: 'PRODUCT INFO',
    links: [
      { text: 'How do I get the newest sneaker releases?', href: '#' },
      { text: 'How do I find the right size and fit?', href: '#' },
      { text: "What is By You's personalisation policy?", href: '#' },
    ],
  },
  {
    title: 'NIKE MEMBERSHIP',
    links: [
      { text: 'What is Nike Membership?', href: '#' },
      { text: 'How do I become a Nike Member?', href: '#' },
      { text: 'How do I get the most out of NRC and NTC?', href: '#' },
    ],
  },
  {
    title: 'CORPORATE',
    links: [
      { text: 'Where can I get more info about Inc.?', href: '#' },
      { text: 'Where is the store closest to me?', href: '#' },
    ],
  },
];

const HelpPage = () => {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl leading-9 font-extrabold text-gray-900">
              GET HELP
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="w-full md:w-3/4 lg:w-1/2">
                <input
                  type="text"
                  placeholder="What can we help you with?"
                  className="mt-1 block w-full border-2 border-gray-300 px-4 py-3 rounded-md text-base leading-6 placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                />
              </div>
            </div>
          </div>
  
          <div className="mt-12">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              QUICK ASSISTS
            </h3>
            <p className="mt-2 text-base leading-6 text-gray-500">
              Answers to our most frequently asked questions are just one click away.
            </p>
            <div className="mt-6 border-t-2 border-gray-100 pt-6 grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
              {helpSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-lg leading-6 font-medium text-gray-900">{section.title}</h4>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    {section.links.map((link) => (
                      <li key={link.text} className="text-base leading-6 text-gray-500">
                        <a href={link.href} className="text-indigo-600 hover:text-indigo-900">
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
  
          {/* CONTACT US Section */}
          <div className="bg-white py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 my-6">CONTACT US</h2>
                <div className="border-t border-gray-300 pt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Phone Section */}
                  <div className="text-center">
                    <img src="/images/help_logo/phone.png" alt="Phone" className="mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900">PRODUCTS & ORDERS</h4>
                    <p className="mt-2 text-base text-gray-500">12280903 (Viettel)</p>
                    <p className="text-base text-gray-500">12032487 (VTI)</p>
                    <p className="text-base text-gray-500">05:00 - 23:00</p>
                    <p className="text-base text-gray-500">7 days a week</p>
                  </div>
  
                  {/* Chat Section */}
                  <div className="text-center">
                    <img src="/images/help_logo/chat.png" alt="Chat" className="mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900">PRODUCTS & ORDERS</h4>
                    <p className="mt-2 text-base text-gray-500">Chat with us</p>
                    <p className="text-base text-gray-500">24 hours a day</p>
                    <p className="text-base text-gray-500">7 days a week</p>
                  </div>
  
                  {/* Store Locator Section */}
                  <div className="text-center">
                    <img src="/images/help_logo/location.png" alt="Location" className="mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900">STORE LOCATOR</h4>
                    <p className="mt-2 text-base text-gray-500">Find retail stores near you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HelpPage;