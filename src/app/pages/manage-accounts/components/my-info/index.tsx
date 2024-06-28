import { Mail, MapPin, Phone, User } from 'lucide-react';

function MyInformation() {
  return (
    <div className="space-y-2">
      <div className="p-4 bg-[#e6f1f9] rounded">
        <p className="font-bold flex">
          <User size={18} fill="#00308F" color="#ffffff00" className="mr-2" />{' '}
          <span>Test324APR User</span>
        </p>
        <div className="flex">
          <Mail size={18} fill="#00308F" color="white" className="mr-2" />{' '}
          <p>
            <span>sapientdev@brownadvisory.com</span>
            <br />
            <span>sapientdev@brownadvisory.com</span>
          </p>
        </div>
        <p className="flex">
          <Phone size={18} fill="#00308F" color="#ffffff00" className="mr-2" />{' '}
          <span>+91 920802193</span>
        </p>
        <p className="flex">
          <MapPin size={18} fill="#00308F" color="white" className="mr-2" />{' '}
          <span>Street address line 0, huston, MS 11111, USA</span>
        </p>
      </div>
      <div className="border-t my-2"></div>
      <div>
        <div className="mb-4">
          <div className="font-bold text-gray-800">Other Mailing Addresses</div>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin />
                <span className="ml-2 font-bold">Business 3</span>
              </div>
              <div className="text-sm ml-8 text-gray-600">
                <span>Test address 02</span>
                <br />
                <span>Test city 22233, MO 01001, USA</span>
              </div>
            </div>
            <div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin />
                <span className="ml-2 font-bold">Home 02</span>
              </div>
              <div className="text-sm ml-8 text-gray-600">
                <span>Test address 02</span>
                <br />
                <span>Test city 22233, MO 01001, USA</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-gray-800">Other Phone Numbers</div>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone />
                <span className="ml-2 font-bold">Business</span>
              </div>
              <div className="text-sm ml-8 text-gray-600">+123 1234567891</div>
            </div>
            <div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone />
                <span className="ml-2 font-bold">Other</span>
              </div>
              <div className="text-sm ml-8 text-gray-600">
                +91 0000000000, Ext: 321
              </div>
            </div>
            <div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone />
                <span className="ml-2 font-bold">Vacation Home</span>
              </div>
              <div className="text-sm ml-8 text-gray-600">+11 9999999999</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyInformation;
