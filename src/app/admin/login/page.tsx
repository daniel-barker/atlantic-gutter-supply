import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Atlantic Gutter Supply",
  description: "Login to the Atlantic Gutter Supply admin panel",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
          </svg>
        </div>
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your Atlantic Gutter Supply catalog
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-8 py-10 shadow-lg sm:rounded-xl sm:px-12 border border-gray-100">
          <LoginForm />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-500">Need help?</span>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Contact system administrator or{' '}
              <a href="/" className="font-semibold text-blue-600 hover:text-blue-500">
                return to homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
