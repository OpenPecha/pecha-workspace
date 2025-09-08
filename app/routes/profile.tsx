import { Form } from 'react-router';
import { useUserStore } from '../store/user';
import Layout from '../components/Layout';

export function meta() {
  return [
    { title: 'Profile - Pecha AI Studio' },
    { name: 'description', content: 'User profile page' }
  ];
}

export default function Profile() {
  const { user } = useUserStore();
  
  if (!user) return null;
  
  return (
    <Layout>
      <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">    
            <div className="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8">
            {/* Profile Header - Mobile Responsive */}
            <div className="mb-6">
              {/* User Info */}
              <div className="mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{user.name}</h1>
                <p className="text-sm sm:text-base text-gray-600 break-all">{user.email}</p>
              </div>
              
              {/* Action Buttons - Stack on mobile */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="bg-blue-50 px-3 sm:px-4 py-2 rounded-full">
                  <span className="text-xs sm:text-sm font-medium text-blue-600">Active</span>
                </div>
                <Form action="/auth/logout" method="get">
                  <button
                    type="submit"
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </Form>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Profile Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-600 break-all">ID: {user.sub}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-600 break-all">{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Account Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-600">Account Verified</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-600">Active Session</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}
