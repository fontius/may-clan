// File: components/Contact.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { validationSchema } from "@/lib/validations";
import { ToastContainer, toast } from "react-toastify";

type FormValues = {
  email: string;
  message: string;
};

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [isLoading, setIsLoading] = useState(false);
  const formspreeEndpoint = "mgvkbjrl";

  const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    try {
      setIsLoading(true);
      await fetch(`https://formspree.io/f/${formspreeEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      resetForm();
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Failed to send email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mt-20 sm:mt-28 mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="text-gray-500 -mt-2 dark:text-gray-400 text-[0.9rem] font-medium">
          What matters to you, matters to us.
        </p>
      </motion.div>

      <Formik
        initialValues={{ email: "", message: "" }}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6 flex flex-col bg-white bg-opacity-80 backdrop-blur-[0.5rem] shadow-lg shadow-black/[0.03] 
                         dark:bg-gray-950 dark:bg-opacity-75 p-6 rounded-2xl">
            <Field
              name="email"
              type="email"
              className="h-14 px-4 rounded-lg border border-black/10 dark:bg-gray-900 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2
                         placeholder-gray-500/70 dark:placeholder-gray-400/50 bg-white/50"
              placeholder="Your email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            
            <Field
              name="message"
              as="textarea"
              className="h-52 my-4 rounded-lg border border-black/10 p-4 dark:bg-gray-900 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2
                         placeholder-gray-500/70 dark:placeholder-gray-400/50 resize-none bg-white/50"
              placeholder="Your message"
            />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm -mt-2 mb-2" />
            
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="tracking-wider flex mx-auto rounded-md bg-gray-700 py-2 px-8 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>

      {/* Contact info footer */}
      <footer className="mt-8 sticky bottom-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm py-4 border-t border-gray-200 dark:border-gray-700 sm:static">
        <div className="container mx-auto px-4 text-center">
          <div className="font-medium text-lg">Main: 0203 305 7585</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Mobile: 07958 361 364
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            <p>Registered in England and Wales. Registered No: 05548267.</p>
            <p>Office: PO Box 560, Welwyn, Hertfordshire AL7 9ND.</p>
          </div>
        </div>
      </footer>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
    </motion.section>
  );
}
